'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Lock,
  Star,
  Shield,
  ShieldCheck,
  Sparkles,
  Zap,
  MoreVertical,
  Search,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { SearchEngine } from './types';

interface OmniboxProps {
  currentUrl: string;
  canGoBack: boolean;
  canGoForward: boolean;
  isLoading: boolean;
  isBookmarked: boolean;
  blockedCount: number;
  onNavigate: (url: string) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onReload: () => void;
  onGoHome: () => void;
  onToggleBookmark: () => void;
  onToggleCopilot: () => void;
  onOpenSettings: () => void;
  onPurgeRam: () => void;
}

const SEARCH_ENGINES: SearchEngine[] = [
  { id: 'google', name: 'Google', searchUrl: 'https://www.google.com/search?q=', icon: 'G' },
  { id: 'duckduckgo', name: 'DuckDuckGo (Privado)', searchUrl: 'https://duckduckgo.com/?q=', icon: 'D' },
  { id: 'brave', name: 'Brave Search', searchUrl: 'https://search.brave.com/search?q=', icon: 'B' },
  { id: 'youtube', name: 'YouTube', searchUrl: 'https://www.youtube.com/results?search_query=', icon: 'Y' },
];

export function Omnibox({
  currentUrl,
  canGoBack,
  canGoForward,
  isLoading,
  isBookmarked,
  blockedCount,
  onNavigate,
  onGoBack,
  onGoForward,
  onReload,
  onGoHome,
  onToggleBookmark,
  onToggleCopilot,
  onOpenSettings,
  onPurgeRam,
}: OmniboxProps) {
  const [prevUrl, setPrevUrl] = useState(currentUrl);
  const [inputValue, setInputValue] = useState(
    currentUrl === 'fenixy://newtab' ? '' : currentUrl
  );
  const [isFocused, setIsFocused] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState<SearchEngine>(SEARCH_ENGINES[0]);
  const [showEngineMenu, setShowEngineMenu] = useState(false);
  const [showShieldDetails, setShowShieldDetails] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (currentUrl !== prevUrl) {
    setPrevUrl(currentUrl);
    setInputValue(currentUrl === 'fenixy://newtab' ? '' : currentUrl);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    let target = inputValue.trim();

    // Check if it's already a URL
    const isUrl =
      target.startsWith('http://') ||
      target.startsWith('https://') ||
      target.startsWith('fenixy://') ||
      (target.includes('.') && !target.includes(' '));

    if (isUrl) {
      if (!target.startsWith('http') && !target.startsWith('fenixy://')) {
        target = 'https://' + target;
      }
      onNavigate(target);
    } else {
      // It's a search query
      onNavigate(`${selectedEngine.searchUrl}${encodeURIComponent(target)}`);
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#12151c] border-b border-[#1f242d] text-slate-300">
      {/* Navigation History Controls */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={onGoBack}
          disabled={!canGoBack}
          className={`p-1.5 rounded-md transition-colors ${
            canGoBack
              ? 'hover:bg-[#1f2532] text-slate-200 hover:text-white'
              : 'text-slate-600 cursor-not-allowed'
          }`}
          title="Atrás (Alt+Flecha Izq)"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onGoForward}
          disabled={!canGoForward}
          className={`p-1.5 rounded-md transition-colors ${
            canGoForward
              ? 'hover:bg-[#1f2532] text-slate-200 hover:text-white'
              : 'text-slate-600 cursor-not-allowed'
          }`}
          title="Adelante (Alt+Flecha Der)"
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onReload}
          className={`p-1.5 rounded-md hover:bg-[#1f2532] text-slate-300 hover:text-amber-400 transition-colors ${
            isLoading ? 'animate-spin text-amber-400' : ''
          }`}
          title="Recargar página (F5)"
        >
          <RotateCw className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onGoHome}
          className="p-1.5 rounded-md hover:bg-[#1f2532] text-slate-300 hover:text-amber-400 transition-colors"
          title="Página de inicio Fenixy"
        >
          <Home className="w-4 h-4" />
        </button>
      </div>

      {/* Address & Search Bar */}
      <form
        onSubmit={handleSubmit}
        className={`flex-1 flex items-center bg-[#090b0e] border rounded-full px-3 py-1 transition-all ${
          isFocused
            ? 'border-amber-500/80 ring-2 ring-amber-500/20 shadow-lg shadow-amber-500/5'
            : 'border-[#242b38] hover:border-[#333d4f]'
        }`}
      >
        {/* Search Engine Picker Button */}
        <div className="relative shrink-0 mr-1.5">
          <button
            type="button"
            onClick={() => setShowEngineMenu(!showEngineMenu)}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20"
            title={`Motor de búsqueda: ${selectedEngine.name}`}
          >
            <span>{selectedEngine.icon}</span>
            <ChevronDown className="w-2.5 h-2.5 text-amber-400/80" />
          </button>

          {showEngineMenu && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#181d26] border border-[#2b3342] rounded-lg shadow-2xl py-1 z-50 text-xs">
              <div className="px-3 py-1 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Motor predeterminado
              </div>
              {SEARCH_ENGINES.map((engine) => (
                <button
                  key={engine.id}
                  type="button"
                  onClick={() => {
                    setSelectedEngine(engine);
                    setShowEngineMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#232a38] text-left ${
                    selectedEngine.id === engine.id ? 'text-amber-400 font-semibold' : 'text-slate-200'
                  }`}
                >
                  <span>{engine.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">[{engine.icon}]</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SSL Security Padlock */}
        <div className="shrink-0 mr-2 flex items-center text-emerald-400" title="Conexión segura y cifrada">
          <Lock className="w-3.5 h-3.5" />
        </div>

        {/* Input Text Box */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Escribe una URL o busca en Google, YouTube, DuckDuckGo..."
          className="flex-1 bg-transparent border-none outline-none text-xs text-slate-100 placeholder-slate-500 font-mono selection:bg-amber-500/30 selection:text-white"
        />

        {/* Action icons inside Omnibox */}
        <div className="flex items-center gap-1 shrink-0 ml-2">
          {/* Star Bookmark */}
          <button
            type="button"
            onClick={onToggleBookmark}
            className={`p-1 rounded hover:bg-slate-800 transition-colors ${
              isBookmarked ? 'text-amber-400 fill-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
            title={isBookmarked ? 'Guardado en marcadores' : 'Añadir a marcadores'}
          >
            <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>

          {/* Fenixy Ad & Tracker Shield */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowShieldDetails(!showShieldDetails)}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-900/40 transition-colors"
              title={`Fenixy Shield: ${blockedCount} rastreadores y anuncios bloqueados`}
            >
              <ShieldCheck className="w-3 h-3 text-red-400" />
              <span className="font-mono">{blockedCount}</span>
            </button>

            {showShieldDetails && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-[#181d26] border border-[#2b3342] rounded-lg shadow-2xl p-3 z-50 text-xs">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-700/60">
                  <Shield className="w-4 h-4 text-red-400" />
                  <span className="font-bold text-slate-100">Fenixy Shield Turbo</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                  Bloqueo activo de scripts pesados, minería oculta y publicidad invasiva para ahorrar hasta un 65% de batería y CPU.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[10px] bg-[#0f1217] p-2 rounded border border-slate-800 font-mono">
                  <div>
                    <span className="text-slate-500 block">Bloqueados:</span>
                    <span className="text-red-400 font-bold">{blockedCount} elementos</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Ahorro datos:</span>
                    <span className="text-emerald-400 font-bold">~14.2 MB</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Toolbar Action Buttons */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Gemini AI Copilot */}
        <button
          type="button"
          onClick={onToggleCopilot}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white hover:brightness-110 shadow-sm transition-all"
          title="Fenixy Copilot AI (Asistente Gemini ultraveloz)"
        >
          <Sparkles className="w-3.5 h-3.5 fill-white" />
          <span className="hidden md:inline">Copilot AI</span>
        </button>

        {/* Quick Purge RAM */}
        <button
          type="button"
          onClick={onPurgeRam}
          className="p-1.5 rounded-md hover:bg-[#1f2532] text-amber-400 hover:text-amber-300 transition-colors"
          title="Liberar memoria RAM ahora"
        >
          <Zap className="w-4 h-4" />
        </button>

        {/* Menu (3 dots) */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="p-1.5 rounded-md hover:bg-[#1f2532] text-slate-300 hover:text-white transition-colors"
          title="Ajustes de Fenixy y opciones de rendimiento"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
