'use client';

import React from 'react';
import { BrowserTab } from './types';
import { FenixyLogo } from './FenixyLogo';
import {
  X,
  Plus,
  Volume2,
  VolumeX,
  Moon,
  Sparkles,
  Youtube,
  MessageSquare,
  Mail,
  Globe,
  Gauge,
  Zap,
} from 'lucide-react';

interface BrowserTabsProps {
  tabs: BrowserTab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string, e: React.MouseEvent) => void;
  onNewTab: () => void;
  onToggleHibernate: (id: string, e: React.MouseEvent) => void;
  ramUsageMB: number;
  onOpenOptimizer: () => void;
}

export function BrowserTabs({
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTab,
  onToggleHibernate,
  ramUsageMB,
  onOpenOptimizer,
}: BrowserTabsProps) {
  const getTabIcon = (tab: BrowserTab) => {
    switch (tab.appType) {
      case 'youtube':
        return <Youtube className="w-3.5 h-3.5 text-red-500 shrink-0" />;
      case 'chatgpt':
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'gemini':
        return <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'gmail':
        return <Mail className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
      case 'newtab':
        return <FenixyLogo size="xs" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />;
    }
  };

  return (
    <div className="flex items-center bg-[#090b0e] border-b border-[#1f242d] px-2 pt-1.5 gap-1 select-none overflow-x-auto no-scrollbar">
      {/* Fenixy Mini Brand Icon */}
      <div className="flex items-center gap-1.5 px-2 py-1 mr-1">
        <FenixyLogo size="xs" withGlow />
        <span className="text-xs font-bold bg-gradient-to-r from-red-500 to-amber-300 bg-clip-text text-transparent hidden sm:inline">
          Fenixy
        </span>
      </div>

      {/* Tabs Container */}
      <div className="flex items-center gap-1 flex-1 min-w-0 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`group relative flex items-center gap-2 px-3 py-1.5 text-xs rounded-t-lg transition-all cursor-pointer max-w-[200px] min-w-[120px] border-t border-x ${
                isActive
                  ? 'bg-[#161a22] text-slate-100 border-[#2d3340] shadow-sm font-medium'
                  : 'bg-[#0f1217] text-slate-400 border-transparent hover:bg-[#13161d] hover:text-slate-200'
              }`}
              title={`${tab.title} (${tab.isHibernated ? 'Hibernada: ~3MB' : `${tab.ramUsageMB} MB RAM`})`}
            >
              {/* Active Tab Accent Line */}
              {isActive && (
                <div className="absolute top-0 left-2 right-2 h-[2px] bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 rounded-full" />
              )}

              {/* Tab Icon */}
              {getTabIcon(tab)}

              {/* Tab Title */}
              <span className="truncate flex-1 text-[11px] leading-tight">
                {tab.title}
              </span>

              {/* Hibernated / Memory Saver Indicator */}
              {tab.isHibernated ? (
                <button
                  type="button"
                  onClick={(e) => onToggleHibernate(tab.id, e)}
                  title="Pestaña hibernada para ahorrar RAM. Haz clic para activar."
                  className="px-1 py-0.5 rounded text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20"
                >
                  <Moon className="w-2.5 h-2.5 inline mr-0.5" />
                  Eco
                </button>
              ) : (
                <span className="text-[9px] font-mono text-slate-500 hidden group-hover:inline">
                  {tab.ramUsageMB}M
                </span>
              )}

              {/* Close Tab Button */}
              <button
                type="button"
                onClick={(e) => onCloseTab(tab.id, e)}
                className="opacity-60 group-hover:opacity-100 hover:bg-slate-700/50 hover:text-white p-0.5 rounded transition-colors"
                title="Cerrar pestaña (Ctrl+W)"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}

        {/* New Tab Button */}
        <button
          type="button"
          onClick={onNewTab}
          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-[#1a1f29] transition-colors shrink-0"
          title="Nueva pestaña (Ctrl+T)"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* RAM & Performance Turbo Badge */}
      <div className="flex items-center gap-2 pl-2 pr-1">
        <button
          type="button"
          onClick={onOpenOptimizer}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] bg-red-950/40 border border-red-500/30 text-amber-300 hover:bg-red-900/50 hover:border-amber-400 transition-all font-mono shadow-sm"
          title="Consumo de RAM ultra-optimizado. Haz clic para purgar memoria."
        >
          <Zap className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
          <span className="font-semibold">{ramUsageMB} MB</span>
          <span className="text-[9px] text-emerald-400 hidden lg:inline">(-85% RAM)</span>
        </button>
      </div>
    </div>
  );
}
