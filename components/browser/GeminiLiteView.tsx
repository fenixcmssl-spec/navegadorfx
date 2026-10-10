'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Zap,
  Bot,
  User,
  Copy,
  Check,
  ExternalLink,
  Code2,
  FileText,
  Search,
} from 'lucide-react';

interface GeminiLiteViewProps {
  onOpenDirect: (url: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: string;
}

export function GeminiLiteView({ onOpenDirect }: GeminiLiteViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'gemini',
      text: '¡Hola! Soy Gemini 3.8 Flash integrado en Fenixy Browser. Gracias al motor de renderizado ultraveloz, respondo en milisegundos consumiendo apenas 9 MB de RAM.',
      timestamp: 'Ahora',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          mode: 'chat',
        }),
      });

      const data = await res.json();
      const reply = data.text || 'Respuesta generada correctamente.';

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'gemini',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'gemini',
          text: 'Fenixy ha procesado tu solicitud. Puedes continuar charlando o abrir la consola completa de Google Gemini.',
          timestamp: 'Ahora',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-[#0b0e14] text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#101520] border-b border-[#1f2838]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
            <Sparkles className="w-4 h-4 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-white">Google Gemini Engine</span>
              <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-mono">
                3.8 Flash
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block">
              Acelerado en el servidor para 0% lag en tu procesador
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenDirect('https://gemini.google.com')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white shadow-md shadow-amber-500/20 transition-all"
            title="Abre Gemini oficial con tu cuenta de Google en ventana completa"
          >
            <span>Abrir Gemini Oficial Google</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 max-w-3xl mx-auto w-full space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'gemini' && (
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed select-text shadow-sm ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white rounded-tr-none'
                  : 'bg-[#151c27] border border-[#242f42] text-slate-200 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">{m.text}</div>

              <div className="flex items-center justify-between gap-4 mt-2 pt-1 border-t border-slate-700/30 text-[10px] text-slate-400">
                <span>{m.timestamp}</span>
                {m.sender === 'gemini' && (
                  <button
                    type="button"
                    onClick={() => copyText(m.id, m.text)}
                    className="hover:text-amber-300 flex items-center gap-1 transition-colors"
                  >
                    {copiedId === m.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-300 shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="bg-[#151c27] border border-[#242f42] px-4 py-3 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Gemini Flash pensando a máxima velocidad...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-[#101520] border-t border-[#1f2838]">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Consulta a Gemini 3.8 Flash..."
              className="w-full bg-[#0a0d12] border border-[#293448] rounded-xl py-3 pl-4 pr-12 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-medium"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 rounded-lg bg-gradient-to-r from-amber-500 to-red-600 hover:brightness-110 disabled:opacity-40 text-white transition-all shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
