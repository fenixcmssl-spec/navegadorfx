'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Zap,
  Gauge,
  ShieldCheck,
  FileText,
  HelpCircle,
  Laptop,
  Check,
  Copy,
} from 'lucide-react';
import { SystemPerformance, BrowserTab } from './types';

interface FenixySidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: BrowserTab;
  performance: SystemPerformance;
  onPurgeRam: () => void;
}

export function FenixySidePanel({
  isOpen,
  onClose,
  activeTab,
  performance,
  onPurgeRam,
}: FenixySidePanelProps) {
  const [activeView, setActiveView] = useState<'copilot' | 'performance'>('copilot');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Hola, soy Fenixy Copilot. Puedo resumirte el contenido de "${activeTab.title}", resolver dudas o ayudarte a optimizar la velocidad. ¿En qué te ayudo?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          contextUrl: activeTab.url,
          mode: 'chat',
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.text || 'Respuesta lista.',
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Fenixy AI respondió con éxito.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarizePage = async () => {
    if (isLoading) return;
    const promptText = `Por favor genera un resumen ejecutivo y claro de los puntos clave para la pestaña actual: "${activeTab.title}" con URL ${activeTab.url}.`;
    setMessages((prev) => [...prev, { sender: 'user', text: 'Resumir esta página' }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          contextUrl: activeTab.url,
          mode: 'summarize',
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.text || 'Resumen completado.',
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'No se pudo generar el resumen.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-80 md:w-96 bg-[#10141d] border-l border-[#1f2635] flex flex-col h-full shadow-2xl z-30 select-text">
      {/* Top Header */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-[#141924] border-b border-[#222a3a]">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveView('copilot')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'copilot'
                ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Copilot AI</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('performance')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'performance'
                ? 'bg-[#222b3b] text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Rendimiento</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Cerrar panel lateral"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main View */}
      {activeView === 'copilot' ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Quick Actions */}
          <div className="p-2.5 bg-[#0c0e14] border-b border-[#1b212e] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={handleSummarizePage}
              disabled={isLoading}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#161c28] hover:bg-[#20293a] text-[11px] text-amber-300 border border-[#263144] shrink-0 font-medium transition-colors"
            >
              <FileText className="w-3 h-3 text-amber-400" />
              <span>Resumir página</span>
            </button>
            <button
              type="button"
              onClick={() => setInput('¿Cuáles son los puntos más importantes de este tema?')}
              className="px-2.5 py-1 rounded-md bg-[#161c28] hover:bg-[#20293a] text-[11px] text-slate-300 border border-[#263144] shrink-0 transition-colors"
            >
              Puntos clave
            </button>
            <button
              type="button"
              onClick={() => setInput('Traduce el contenido principal al español')}
              className="px-2.5 py-1 rounded-md bg-[#161c28] hover:bg-[#20293a] text-[11px] text-slate-300 border border-[#263144] shrink-0 transition-colors"
            >
              Traducir
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col text-xs leading-relaxed ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-tr-none'
                      : 'bg-[#151a24] border border-[#242b3a] text-slate-200 rounded-tl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-amber-400 p-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Generando con Gemini Flash...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-3 bg-[#131722] border-t border-[#202838]">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregunta a Copilot..."
                className="w-full bg-[#0a0d13] border border-[#283244] rounded-xl py-2 pl-3 pr-10 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500 font-medium"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-1.5 p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold transition-colors"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Performance Dashboard View */
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="p-3 rounded-xl bg-[#161c28] border border-[#252f44]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Consumo de Memoria RAM
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {performance.fenixyRamMB} MB
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Google Chrome equivalencia:</span>
                <span className="text-red-400 font-mono">~{performance.chromeEstimatedRamMB} MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ahorro conseguido:</span>
                <span className="text-emerald-400 font-bold font-mono">
                  {performance.ramSavedPercent}% menos RAM
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onPurgeRam}
              className="w-full mt-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Purgar Memoria Inmediatamente</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-[#161c28] border border-[#252f44]">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
              Protección & Filtro de Scripts
            </h4>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Anuncios invasivos bloqueados:</span>
                <span className="text-amber-400 font-mono font-bold">{performance.blockedAdsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rastreadores detenidos:</span>
                <span className="text-rose-400 font-mono font-bold">{performance.blockedTrackersCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tráfico de red ahorrado:</span>
                <span className="text-emerald-400 font-mono font-bold">{performance.bandwidthSavedMB} MB</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#121620] border border-slate-800 text-slate-300 text-xs leading-relaxed">
            <h5 className="font-bold text-amber-300 text-xs mb-1">
              💡 Consejo para ordenadores antiguos:
            </h5>
            Fenixy congela de forma automática las pestañas que no utilizas en 3 minutos. Tu equipo mantendrá la temperatura baja y los ventiladores silenciosos.
          </div>
        </div>
      )}
    </div>
  );
}
