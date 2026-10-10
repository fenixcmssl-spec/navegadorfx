'use client';

import React, { useState } from 'react';
import { FenixyLogo } from './FenixyLogo';
import {
  Search,
  Youtube,
  MessageSquare,
  Sparkles,
  Mail,
  Zap,
  Cpu,
  ShieldCheck,
  HardDrive,
  ExternalLink,
  Laptop,
  CheckCircle2,
  Sliders,
  Flame,
} from 'lucide-react';
import { BrowserAppType } from './types';

interface NewTabPageProps {
  onNavigate: (url: string, appType?: BrowserAppType) => void;
  ramUsageMB: number;
  onOpenSettings: () => void;
  onPurgeRam: () => void;
}

export function NewTabPage({
  onNavigate,
  ramUsageMB,
  onOpenSettings,
  onPurgeRam,
}: NewTabPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [engine, setEngine] = useState<'google' | 'duckduckgo' | 'brave'>('google');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (
      searchQuery.startsWith('http://') ||
      searchQuery.startsWith('https://') ||
      (searchQuery.includes('.') && !searchQuery.includes(' '))
    ) {
      let url = searchQuery;
      if (!url.startsWith('http')) url = 'https://' + url;
      onNavigate(url, 'web');
      return;
    }

    if (engine === 'duckduckgo') {
      onNavigate(`https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`, 'web');
    } else if (engine === 'brave') {
      onNavigate(`https://search.brave.com/search?q=${encodeURIComponent(searchQuery)}`, 'web');
    } else {
      onNavigate(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, 'web');
    }
  };

  const speedDials = [
    {
      title: 'YouTube Lite',
      desc: 'Vídeos fluidos sin sobrecargar la CPU',
      url: 'https://youtube.com',
      appType: 'youtube' as BrowserAppType,
      icon: <Youtube className="w-6 h-6 text-red-500" />,
      color: 'from-red-600/20 to-red-950/40 border-red-500/30 hover:border-red-500',
      badge: 'Bajo Consumo',
    },
    {
      title: 'ChatGPT',
      desc: 'IA conversacional rápida y ligera',
      url: 'https://chatgpt.com',
      appType: 'chatgpt' as BrowserAppType,
      icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-600/20 to-emerald-950/40 border-emerald-500/30 hover:border-emerald-500',
      badge: 'Ultra Rápido',
    },
    {
      title: 'Gemini AI',
      desc: 'Google Gemini con aceleración instantánea',
      url: 'https://gemini.google.com',
      appType: 'gemini' as BrowserAppType,
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      color: 'from-amber-600/20 to-amber-950/40 border-amber-500/30 hover:border-amber-500',
      badge: 'Motor Nativo',
    },
    {
      title: 'Gmail Web',
      desc: 'Entra a tu cuenta Google con baja memoria',
      url: 'https://mail.google.com',
      appType: 'gmail' as BrowserAppType,
      icon: <Mail className="w-6 h-6 text-rose-400" />,
      color: 'from-rose-600/20 to-rose-950/40 border-rose-500/30 hover:border-rose-500',
      badge: 'Sesión Segura',
    },
    {
      title: 'Google Drive',
      desc: 'Tus documentos y nube sin lentitud',
      url: 'https://drive.google.com',
      appType: 'web' as BrowserAppType,
      icon: <HardDrive className="w-6 h-6 text-yellow-400" />,
      color: 'from-yellow-600/20 to-yellow-950/40 border-yellow-500/30 hover:border-yellow-500',
      badge: 'Google Cloud',
    },
    {
      title: 'Wikipedia',
      desc: 'Enciclopedia en modo lectura instantáneo',
      url: 'https://es.wikipedia.org',
      appType: 'web' as BrowserAppType,
      icon: <span className="font-serif font-black text-2xl text-slate-200">W</span>,
      color: 'from-sky-600/20 to-sky-950/40 border-sky-500/30 hover:border-sky-500',
      badge: 'Zero Bloat',
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-[#0b0d12] via-[#0e1118] to-[#07090d] text-slate-100 p-6 flex flex-col items-center select-text">
      {/* Brand Hero */}
      <div className="flex flex-col items-center mt-6 mb-8 text-center max-w-2xl">
        <div className="relative mb-4 group cursor-pointer" onClick={onPurgeRam} title="Haz clic para purgar RAM">
          <FenixyLogo size="xl" withGlow />
          <div className="absolute -bottom-2 bg-gradient-to-r from-red-600 to-amber-500 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full shadow-lg shadow-red-500/30">
            Turbo Engine
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center justify-center gap-2">
          <span>Navegador</span>
          <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
            Fenixy
          </span>
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-md">
          Diseñado para revivir ordenadores antiguos con poca memoria. Máxima velocidad de renderizado, consumo mínimo de RAM y acceso fluido a tus cuentas.
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-8">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative flex items-center bg-[#131720] border-2 border-[#222a3a] rounded-2xl shadow-2xl focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/10 transition-all">
            <div className="pl-4 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en la web o escribir dirección..."
              className="w-full bg-transparent py-3.5 px-3 text-sm text-white placeholder-slate-500 outline-none font-medium"
              autoFocus
            />
            <button
              type="submit"
              className="mr-2 px-4 py-2 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-600/20"
            >
              Navegar
            </button>
          </div>

          {/* Engine Selector Pills */}
          <div className="flex items-center justify-center gap-2 mt-2.5 text-xs text-slate-400">
            <span className="text-[11px] text-slate-500">Buscar con:</span>
            <button
              type="button"
              onClick={() => setEngine('google')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                engine === 'google'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => setEngine('duckduckgo')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                engine === 'duckduckgo'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              DuckDuckGo (Privado)
            </button>
            <button
              type="button"
              onClick={() => setEngine('brave')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                engine === 'brave'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              Brave Search
            </button>
          </div>
        </form>
      </div>

      {/* Speed Dial Grid */}
      <div className="w-full max-w-4xl mb-10">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            Acceso Rápido Optimizado
          </h2>
          <span className="text-[11px] text-emerald-400 font-mono">
            Modo Turbo Activado
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {speedDials.map((dial) => (
            <div
              key={dial.title}
              onClick={() => onNavigate(dial.url, dial.appType)}
              className={`group flex items-start gap-3.5 p-3.5 rounded-xl bg-gradient-to-br ${dial.color} border cursor-pointer hover:scale-[1.02] active:scale-[0.99] transition-all shadow-lg backdrop-blur-sm`}
            >
              <div className="p-2.5 rounded-lg bg-[#0d1017] border border-slate-700/60 shadow-inner group-hover:scale-110 transition-transform shrink-0">
                {dial.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h3 className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors truncate">
                    {dial.title}
                  </h3>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-900/80 text-amber-400 border border-amber-500/20 shrink-0">
                    {dial.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {dial.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Low-End PC Hardware Diagnostics & Optimization Banner */}
      <div className="w-full max-w-4xl bg-[#11151e] border border-[#222a3a] rounded-2xl p-5 mb-10 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-amber-400">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                Arquitectura Fenixy para Equipos con Poca Memoria
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Activo
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Reducción agresiva de sobrecarga, congelación de pestañas dormidas y códecs livianos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center">
            <button
              type="button"
              onClick={onPurgeRam}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-300" />
              Purgar RAM
            </button>
            <button
              type="button"
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <Sliders className="w-3.5 h-3.5" />
              Configurar
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="bg-[#0b0d13] p-3 rounded-xl border border-slate-800/80">
            <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
              <span>Consumo Actual Fenixy</span>
              <span className="text-emerald-400 font-bold">~42 MB</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-1.5">
              <div className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full w-[12%]" />
            </div>
            <span className="text-[10px] text-slate-500">
              Google Chrome usaría ~1,350 MB en la misma sesión.
            </span>
          </div>

          <div className="bg-[#0b0d13] p-3 rounded-xl border border-slate-800/80">
            <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
              <span>Carga de Procesador</span>
              <span className="text-amber-400 font-bold">Modo Eco 15%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-1.5">
              <div className="bg-gradient-to-r from-amber-400 to-red-500 h-full w-[20%]" />
            </div>
            <span className="text-[10px] text-slate-500">
              Desactivados rastreadores y animaciones innecesarias.
            </span>
          </div>

          <div className="bg-[#0b0d13] p-3 rounded-xl border border-slate-800/80">
            <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
              <span>Seguridad & Cuentas</span>
              <span className="text-sky-400 font-bold">100% Cifrado</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-1.5">
              <div className="bg-gradient-to-r from-sky-400 to-blue-500 h-full w-[100%]" />
            </div>
            <span className="text-[10px] text-slate-500">
              Soporte nativo para iniciar sesión en Google, YouTube y OpenAI.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
