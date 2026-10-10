'use client';

import React from 'react';
import { Bookmark, BrowserAppType } from './types';
import {
  Youtube,
  MessageSquare,
  Sparkles,
  Mail,
  Globe,
  BookOpen,
  Github,
  Gauge,
  Plus,
} from 'lucide-react';

interface BookmarksBarProps {
  bookmarks: Bookmark[];
  onOpenBookmark: (bookmark: Bookmark) => void;
  onAddBookmark: () => void;
}

export function BookmarksBar({
  bookmarks,
  onOpenBookmark,
  onAddBookmark,
}: BookmarksBarProps) {
  const getBookmarkIcon = (bookmark: Bookmark) => {
    switch (bookmark.appType) {
      case 'youtube':
        return <Youtube className="w-3.5 h-3.5 text-red-500 shrink-0" />;
      case 'chatgpt':
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'gemini':
        return <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'gmail':
        return <Mail className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
      default:
        if (bookmark.title.toLowerCase().includes('github')) {
          return <Github className="w-3.5 h-3.5 text-slate-300 shrink-0" />;
        }
        if (bookmark.title.toLowerCase().includes('wiki')) {
          return <BookOpen className="w-3.5 h-3.5 text-sky-300 shrink-0" />;
        }
        if (bookmark.title.toLowerCase().includes('speed')) {
          return <Gauge className="w-3.5 h-3.5 text-amber-300 shrink-0" />;
        }
        return <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
    }
  };

  return (
    <div className="flex items-center gap-1 px-3 py-1 bg-[#0d0f14] border-b border-[#1b2029] text-xs text-slate-400 overflow-x-auto no-scrollbar">
      {bookmarks.map((bookmark) => (
        <button
          key={bookmark.id}
          type="button"
          onClick={() => onOpenBookmark(bookmark)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-[#1a1f29] hover:text-slate-100 transition-colors shrink-0 group border border-transparent hover:border-[#272f3d]"
          title={`Abrir ${bookmark.title} en Fenixy`}
        >
          {getBookmarkIcon(bookmark)}
          <span className="text-[11px] font-medium tracking-tight group-hover:text-amber-300 transition-colors">
            {bookmark.title}
          </span>
        </button>
      ))}

      <button
        type="button"
        onClick={onAddBookmark}
        className="p-1 rounded hover:bg-[#1a1f29] text-slate-500 hover:text-slate-300 transition-colors ml-1"
        title="Añadir marcador rápido"
      >
        <Plus className="w-3 h-3" />
      </button>

      {/* Low-RAM indicator in bookmarks bar */}
      <div className="ml-auto flex items-center gap-2 text-[10px] text-slate-500 shrink-0 pl-2">
        <span className="flex items-center gap-1 text-emerald-400/90 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Motor Quantum-Lite v3.2 Activo
        </span>
      </div>
    </div>
  );
}
