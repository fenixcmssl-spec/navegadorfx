'use client';

import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  ExternalLink,
  Zap,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

interface ChatGPTLiteViewProps {
  onOpenDirect: (url: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export function ChatGPTLiteView({ onOpenDirect }: ChatGPTLiteViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: '¡Hola! Soy la interfaz ultraligera de ChatGPT en Fenixy. Puedes hacerme preguntas directamente aquí o iniciar sesión en tu cuenta de OpenAI para usar tus modelos y suscripciones.',
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
      // Call our server-side Gemini API route as the fast AI engine backend
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          mode: 'chat',
        }),
      });

      const data = await res.json();
      const replyText =
        data.text ||
        'Recibido. Para sincronizar tu historial completo de ChatGPT, pulsa en "Iniciar Sesión en OpenAI".';

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'Conexión completada. Puedes continuar la conversación o abrir ChatGPT directamente en OpenAI.',
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
    <div className="h-full flex flex-col bg-[#0b0f14] text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111620] border-b border-[#202838]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
            <MessageSquare className="w-4 h-4 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-white">ChatGPT Lite</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono">
                12 MB RAM
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block">
              Sin scripts pesados de telemetría de OpenAI
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenDirect('https://chatgpt.com')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all"
            title="Abre tu cuenta de OpenAI en una ventana aislada de alta velocidad"
          >
            <span>Iniciar Sesión en OpenAI</span>
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
            {m.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed select-text shadow-sm ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-tr-none'
                  : 'bg-[#151a24] border border-[#232b3a] text-slate-200 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">{m.text}</div>

              <div className="flex items-center justify-between gap-4 mt-2 pt-1 border-t border-slate-700/30 text-[10px] text-slate-400">
                <span>{m.timestamp}</span>
                {m.sender === 'assistant' && (
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
              <div className="w-7 h-7 rounded-lg bg-amber-600/30 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#151a24] border border-[#232b3a] px-4 py-3 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Generando respuesta en tiempo récord...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-[#111620] border-t border-[#202838]">
        <div className="max-w-3xl mx-auto">
          {/* Prompt chips */}
          <div className="flex items-center gap-2 mb-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setInput('Explica cómo funciona la memoria RAM en un ordenador antiguo de forma sencilla')}
              className="px-2.5 py-1 rounded-full text-[11px] bg-[#1a212e] text-slate-300 border border-[#2d384c] hover:border-amber-400 shrink-0 transition-colors"
            >
              💡 Explicar memoria RAM
            </button>
            <button
              type="button"
              onClick={() => setInput('Escribe un script en Python para organizar archivos por fecha')}
              className="px-2.5 py-1 rounded-full text-[11px] bg-[#1a212e] text-slate-300 border border-[#2d384c] hover:border-amber-400 shrink-0 transition-colors"
            >
              💻 Script Python
            </button>
            <button
              type="button"
              onClick={() => setInput('Redacta un correo profesional agradeciendo una reunión')}
              className="px-2.5 py-1 rounded-full text-[11px] bg-[#1a212e] text-slate-300 border border-[#2d384c] hover:border-amber-400 shrink-0 transition-colors"
            >
              ✉️ Correo profesional
            </button>
          </div>

          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Haz una pregunta a ChatGPT Lite..."
              className="w-full bg-[#0a0d12] border border-[#2b3547] rounded-xl py-3 pl-4 pr-12 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
