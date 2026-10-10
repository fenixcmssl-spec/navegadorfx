'use client';

import React, { useState } from 'react';
import {
  X,
  Sliders,
  Zap,
  ShieldCheck,
  Laptop,
  Download,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Flame,
  Globe,
  Monitor,
} from 'lucide-react';
import { FenixyLogo } from './FenixyLogo';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurgeRam: () => void;
}

export function SettingsModal({ isOpen, onClose, onPurgeRam }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'performance' | 'accounts' | 'install' | 'about'>('performance');
  const [hibernateMinutes, setHibernateMinutes] = useState('3');
  const [aggressiveBlocker, setAggressiveBlocker] = useState(true);
  const [lowFpsMode, setLowFpsMode] = useState(false);
  const [clearedNotice, setClearedNotice] = useState(false);

  if (!isOpen) return null;

  const handleClearCache = () => {
    onPurgeRam();
    setClearedNotice(true);
    setTimeout(() => setClearedNotice(false), 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-text">
      <div className="w-full max-w-2xl bg-[#11151f] border border-[#232b3b] rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#141926] border-b border-[#21293a]">
          <div className="flex items-center gap-3">
            <FenixyLogo size="sm" withGlow />
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Ajustes de Fenixy Browser
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-950 text-amber-300 border border-red-500/30">
                  Quantum-Lite v3.2
                </span>
              </h2>
              <span className="text-xs text-slate-400">
                Optimización para máxima velocidad y bajo consumo en ordenadores antiguos
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Nav Tabs */}
        <div className="flex items-center gap-1 px-5 pt-3 bg-[#0d1017] border-b border-[#1b2230] text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('performance')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition-colors font-semibold border-b-2 ${
              activeTab === 'performance'
                ? 'border-amber-400 text-amber-300 bg-[#161c27]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Rendimiento & RAM</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('accounts')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition-colors font-semibold border-b-2 ${
              activeTab === 'accounts'
                ? 'border-amber-400 text-amber-300 bg-[#161c27]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cuentas & Servicios</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('install')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition-colors font-semibold border-b-2 ${
              activeTab === 'install'
                ? 'border-amber-400 text-amber-300 bg-[#161c27]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Instalar en PC Antiguo</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition-colors font-semibold border-b-2 ${
              activeTab === 'about'
                ? 'border-amber-400 text-amber-300 bg-[#161c27]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>Acerca de Fenixy</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 text-xs text-slate-300 space-y-4">
          {clearedNotice && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Memoria caché purgada con éxito. Se han liberado recursos del procesador.</span>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-4">
              {/* Tab Hibernation */}
              <div className="p-4 bg-[#141926] border border-[#232b3c] rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Hibernación Inteligente de Pestañas
                  </h4>
                  <p className="text-slate-400 text-xs mt-1">
                    Suspende pestañas inactivas en segundo plano liberando hasta 95% de su memoria RAM.
                  </p>
                </div>
                <select
                  value={hibernateMinutes}
                  onChange={(e) => setHibernateMinutes(e.target.value)}
                  className="bg-[#0b0e14] border border-[#2c364c] text-amber-300 rounded-lg px-3 py-1.5 text-xs outline-none font-semibold cursor-pointer"
                >
                  <option value="1">Tras 1 minuto</option>
                  <option value="3">Tras 3 minutos (Recomendado)</option>
                  <option value="5">Tras 5 minutos</option>
                  <option value="0">Desactivada</option>
                </select>
              </div>

              {/* Aggressive Blocker */}
              <div className="p-4 bg-[#141926] border border-[#232b3c] rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-red-400" />
                    Fenixy Shield - Bloqueo Agresivo de Anuncios y Scripts
                  </h4>
                  <p className="text-slate-400 text-xs mt-1">
                    Impide que sitios web carguen vídeos automáticos, mineros o rastreadores pesados.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAggressiveBlocker(!aggressiveBlocker)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    aggressiveBlocker ? 'bg-gradient-to-r from-red-600 to-amber-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      aggressiveBlocker ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Low FPS Mode */}
              <div className="p-4 bg-[#141926] border border-[#232b3c] rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Monitor className="w-4 h-4 text-sky-400" />
                    Modo Gráfico de Ultra-Ahorro para Gráficas Antiguas (Intel HD / VGA)
                  </h4>
                  <p className="text-slate-400 text-xs mt-1">
                    Reduce efectos gráficos translúcidos y limita el renderizado a 30 FPS para evitar calentamiento.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLowFpsMode(!lowFpsMode)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    lowFpsMode ? 'bg-amber-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      lowFpsMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Manual Cache Cleaner */}
              <div className="p-4 bg-[#141926] border border-[#232b3c] rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Trash2 className="w-4 h-4 text-rose-400" />
                    Liberar Caché y Memoria RAM Residual
                  </h4>
                  <p className="text-slate-400 text-xs mt-1">
                    Purga las tablas de renderizado y el recolector de basura de JavaScript.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClearCache}
                  className="px-3.5 py-1.5 rounded-lg bg-red-600/30 hover:bg-red-600/50 text-red-300 border border-red-500/40 font-bold transition-all"
                >
                  Limpiar Ahora
                </button>
              </div>
            </div>
          )}

          {activeTab === 'accounts' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#141926] border border-[#232b3c] rounded-xl">
                <h4 className="font-bold text-white text-sm mb-1">
                  Acceso a tus Cuentas (Google, YouTube, OpenAI, Gmail)
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs">
                  Fenixy está optimizado para que puedas entrar a tus cuentas oficiales sin que las empresas sospechen ni bloqueen el acceso. Utiliza User-Agent de alta fidelidad y cookies aisladas.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <div className="p-3 bg-[#0d1017] rounded-xl border border-slate-800">
                    <div className="font-bold text-slate-100 flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Cuenta Google (YouTube & Gmail)
                    </div>
                    <p className="text-[11px] text-slate-400 mb-2">
                      Inicio de sesión oficial con OAuth / SSL seguro.
                    </p>
                    <a
                      href="https://accounts.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>Abrir portal Google</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="p-3 bg-[#0d1017] rounded-xl border border-slate-800">
                    <div className="font-bold text-slate-100 flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Cuenta OpenAI (ChatGPT)
                    </div>
                    <p className="text-[11px] text-slate-400 mb-2">
                      Soporte de planes Free, Plus y Team.
                    </p>
                    <a
                      href="https://chatgpt.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>Abrir portal OpenAI</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'install' && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-red-950/40 via-[#141926] to-[#141926] border border-red-500/30 rounded-xl">
                <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-amber-400" />
                  ¿Cómo usar Fenixy en tu ordenador antiguo como navegador principal?
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs">
                  Para no tener que abrir Google Chrome (que consume más de 1.5 GB de RAM), puedes anclar Fenixy directamente a tu escritorio o barra de tareas:
                </p>

                <div className="space-y-2.5 mt-3 text-xs">
                  <div className="p-2.5 bg-[#0d1017] rounded-lg border border-slate-800 flex items-start gap-2">
                    <span className="font-bold text-amber-400 shrink-0">Paso 1:</span>
                    <span>
                      En tu navegador actual, abre el menú (o los tres puntos superiores) y pulsa en <strong>&ldquo;Instalar aplicación&rdquo;</strong> o <strong>&ldquo;Crear acceso directo&rdquo;</strong> con la casilla <strong>&ldquo;Abrir como ventana&rdquo;</strong> marcada.
                    </span>
                  </div>

                  <div className="p-2.5 bg-[#0d1017] rounded-lg border border-slate-800 flex items-start gap-2">
                    <span className="font-bold text-amber-400 shrink-0">Paso 2:</span>
                    <span>
                      Aparecerá el icono del Fénix rojo y amarillo en tu Escritorio y Barra de tareas. Al hacer clic, se iniciará como un programa nativo independiente sin consumir los recursos pesados de Chrome.
                    </span>
                  </div>

                  <div className="p-2.5 bg-[#0d1017] rounded-lg border border-slate-800 flex items-start gap-2">
                    <span className="font-bold text-amber-400 shrink-0">Paso 3:</span>
                    <span>
                      ¡Listo! Tendrás YouTube, ChatGPT, Gemini y Gmail funcionando al 100% de velocidad con fluidez extrema en ordenadores de incluso 2GB o 4GB de RAM.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="flex flex-col items-center text-center p-4 space-y-3">
              <FenixyLogo size="lg" withGlow />
              <h3 className="font-black text-lg text-white">
                Fenixy Browser Quantum-Lite
              </h3>
              <p className="text-xs text-slate-400 max-w-md">
                Inspirado en el mítico ave Fénix que renace del fuego. Diseñado específicamente para que tu ordenador antiguo vuelva a volar a toda velocidad.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-amber-300 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/30">
                <span>Versión: 3.2.0-LITE</span>
                <span>•</span>
                <span>Favicon & Logo Oficial Rojo Intenso y Amarillo</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#141926] border-t border-[#21293a] text-xs">
          <span className="text-slate-400">
            Fenixy • Motor de renderizado ultraveloz
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold hover:brightness-110 transition-all shadow-md"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
