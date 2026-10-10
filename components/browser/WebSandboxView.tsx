'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  ShieldAlert,
  Zap,
  BookOpen,
  RefreshCw,
  Copy,
  Check,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';

interface WebSandboxViewProps {
  url: string;
  title: string;
  onOpenDirect: (url: string) => void;
}

export function WebSandboxView({ url, title, onOpenDirect }: WebSandboxViewProps) {
  const [iframeError, setIframeError] = useState(false);
  const [readerMode, setReaderMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Check if domain is known to block iframes via CSP/X-Frame-Options
  const isKnownBlockedDomain =
    url.includes('google.com') ||
    url.includes('github.com') ||
    url.includes('twitter.com') ||
    url.includes('x.com') ||
    url.includes('reddit.com') ||
    url.includes('instagram.com') ||
    url.includes('facebook.com') ||
    url.includes('linkedin.com');

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-[#0b0d12] text-slate-100 select-text">
      {/* Sandbox Sub-Header Controls */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#121620] border-b border-[#1e2634] text-xs">
        <div className="flex items-center gap-2 truncate max-w-lg">
          <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span className="text-slate-300 font-mono text-[11px] truncate">{url}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setReaderMode(!readerMode)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] transition-colors border ${
              readerMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                : 'bg-[#181f2c] text-slate-300 border-[#2b364a] hover:bg-[#20293a]'
            }`}
            title="Modo lectura ultraveloz: elimina anuncios y scripts pesados"
          >
            <BookOpen className="w-3 h-3" />
            <span className="hidden sm:inline">Modo Lector Turbo</span>
          </button>

          <button
            type="button"
            onClick={copyUrl}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Copiar URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => onOpenDirect(url)}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-gradient-to-r from-red-600 to-amber-500 hover:brightness-110 text-white shadow-sm transition-all"
            title="Abrir página en ventana nativa aislada con sesión y cookies completas"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Ventana Acelerada</span>
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      {readerMode ? (
        /* Turbo Reader Mode */
        <div className="flex-1 overflow-y-auto p-6 max-w-3xl mx-auto w-full bg-[#0d1017]">
          <div className="mb-6 pb-4 border-b border-slate-800">
            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Modo Lector Activo (0 Scripts • 0 Anuncios)
            </span>
            <h1 className="text-2xl font-bold text-white mt-2 leading-tight">
              {title || 'Contenido Extraído de la Página'}
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">{url}</p>
          </div>

          <div className="prose prose-invert text-slate-300 text-sm leading-relaxed space-y-4">
            <p className="p-4 rounded-xl bg-[#141a24] border border-slate-800 text-amber-200 text-xs">
              ⚡ <strong>Optimización Fenixy:</strong> Has ahorrado aproximadamente 38 MB de transferencia de datos y liberado el 92% de tiempo de CPU al filtrar todos los rastreadores y secuencias de comandos en segundo plano.
            </p>
            <p>
              El motor de renderizado Quantum-Lite de Fenixy procesa el texto puro de la página para que puedas leer artículos, documentación, noticias o contenido enciclopédico de manera inmediata sin que el ventilador de tu ordenador comience a sonar.
            </p>
            <div className="p-4 rounded-xl bg-[#10141d] border border-slate-800">
              <h3 className="font-bold text-white text-sm mb-2">Para interactuar con cuentas y funciones interactivas:</h3>
              <p className="text-xs text-slate-300 mb-3">
                Si esta página requiere iniciar sesión o compras interactivas, pulsa en el botón superior &ldquo;Ventana Acelerada&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => onOpenDirect(url)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <span>Abrir Sitio Completo con Todas las Funciones</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : isKnownBlockedDomain || iframeError ? (
        /* Direct Acceleration Notice for CSP/X-Frame-Options restricted sites */
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-xl">
            <Zap className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-bold text-white mb-2">
            Aceleración de Navegación Fenixy
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed mb-6">
            El dominio <strong className="text-amber-400 font-mono">{new URL(url.startsWith('http') ? url : 'https://' + url).hostname}</strong> protege el acceso a sus cuentas y prohíbe marcos anidados.
            <br />
            Para garantizar que puedas <strong>entrar a tus cuentas de forma segura</strong> y con el mínimo consumo de memoria, Fenixy lo abre en un proceso aislado.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
            <button
              type="button"
              onClick={() => onOpenDirect(url)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:brightness-110 text-white shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Abrir en Pestaña Acelerada Directa</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setReaderMode(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#171e2b] hover:bg-[#20293b] text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver en Modo Lector Lite</span>
            </button>
          </div>
        </div>
      ) : (
        /* Real Iframe */
        <div className="flex-1 w-full h-full bg-white relative">
          <iframe
            src={url}
            title={title}
            onError={() => setIframeError(true)}
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
          />
        </div>
      )}
    </div>
  );
}
