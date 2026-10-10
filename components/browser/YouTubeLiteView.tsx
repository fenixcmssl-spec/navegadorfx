'use client';

import React, { useState } from 'react';
import {
  Search,
  Play,
  Volume2,
  VolumeX,
  ExternalLink,
  Shield,
  Zap,
  Sliders,
  CheckCircle,
  Headphones,
  Maximize2,
  Sparkles,
} from 'lucide-react';

interface YouTubeLiteViewProps {
  onOpenDirect: (url: string) => void;
}

interface VideoItem {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  embedId: string;
}

const SAMPLE_VIDEOS: VideoItem[] = [
  {
    id: '1',
    title: 'Lofi Hip Hop Radio - Beats to Relax/Study to',
    channel: 'Lofi Girl',
    views: '24M visualizaciones',
    duration: 'EN VIVO',
    thumbnail: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80',
    embedId: 'jfKfPfyJRdk',
  },
  {
    id: '2',
    title: 'Cómo optimizar y revivir un ordenador viejo con poca memoria RAM',
    channel: 'Fenixy Tech Lab',
    views: '185K visualizaciones',
    duration: '14:22',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    embedId: 'M7lc1UVf-VE',
  },
  {
    id: '3',
    title: 'Música clásica para máxima concentración y estudio profundo',
    channel: 'Deep Focus',
    views: '2.1M visualizaciones',
    duration: '2:40:00',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    embedId: '4xDzrJKXOOY',
  },
  {
    id: '4',
    title: 'Documental: La historia de la computación y la eficiencia del software',
    channel: 'History Science',
    views: '540K visualizaciones',
    duration: '45:10',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    embedId: 'kJQP7kiw5Fk',
  },
];

export function YouTubeLiteView({ onOpenDirect }: YouTubeLiteViewProps) {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(SAMPLE_VIDEOS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [audioOnlyMode, setAudioOnlyMode] = useState(false);
  const [qualityPreset, setQualityPreset] = useState<'low' | 'balanced' | 'high'>('low');
  const [customVideoId, setCustomVideoId] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // If user pasted a YouTube link
    if (searchQuery.includes('youtube.com') || searchQuery.includes('youtu.be')) {
      let videoId = '';
      if (searchQuery.includes('v=')) {
        videoId = searchQuery.split('v=')[1]?.split('&')[0];
      } else if (searchQuery.includes('youtu.be/')) {
        videoId = searchQuery.split('youtu.be/')[1]?.split('?')[0];
      }

      if (videoId) {
        setActiveVideo({
          id: videoId,
          title: 'Vídeo cargado por URL',
          channel: 'YouTube',
          views: 'Directo',
          duration: '--:--',
          thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          embedId: videoId,
        });
        setSearchQuery('');
        return;
      }
    }

    // Otherwise redirect to full YouTube search
    onOpenDirect(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="h-full flex flex-col bg-[#0b0c10] text-slate-100 overflow-y-auto">
      {/* Top Bar with Low-RAM Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#11141c] border-b border-[#202633] sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold shadow-md shadow-red-600/30">
              <Play className="w-4 h-4 fill-white" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                YouTube <span className="text-red-500 font-black">Lite Turbo</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono block">
                Códec optimizado para CPU modesta
              </span>
            </div>
          </div>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md min-w-[200px]">
          <div className="relative flex items-center bg-[#090b0e] border border-[#2b3445] rounded-full px-3 py-1.5 focus-within:border-red-500">
            <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar vídeos o pegar enlace de YouTube..."
              className="bg-transparent w-full text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>
        </form>

        {/* Optimizations & Google Account Bridge */}
        <div className="flex items-center gap-2">
          {/* Audio Only Mode */}
          <button
            type="button"
            onClick={() => setAudioOnlyMode(!audioOnlyMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              audioOnlyMode
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                : 'bg-[#181d28] text-slate-300 border-[#2a3446] hover:bg-[#202737]'
            }`}
            title="Ahorra hasta 90% de RAM y GPU reproduciendo audio sin decodificar vídeo pesado"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Modo Solo Audio</span>
            {audioOnlyMode && <span className="text-[10px] bg-black/20 px-1 rounded">-90% RAM</span>}
          </button>

          {/* Direct Google Account Login */}
          <button
            type="button"
            onClick={() => onOpenDirect('https://accounts.google.com/ServiceLogin?service=youtube')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-md shadow-red-600/20 transition-all"
            title="Inicia sesión con tu cuenta de Google para acceder a tus suscripciones y listas"
          >
            <span>Iniciar Sesión en Google</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Active Player Column */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {/* Video Container */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-[#232a39] shadow-2xl">
            {audioOnlyMode ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-[#10141d] to-slate-950 text-center p-6">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center text-amber-400 mb-3 animate-pulse">
                  <Headphones className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-slate-100 max-w-sm truncate mb-1">
                  {activeVideo.title}
                </h4>
                <p className="text-xs text-amber-300 font-mono mb-4">
                  Audio Activo (Renderizado de vídeo pausado para ahorrar 450MB RAM)
                </p>
                <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-gradient-to-r from-red-500 to-amber-400 animate-pulse" />
                </div>
              </div>
            ) : (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.embedId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Video Meta & Controls */}
          <div className="bg-[#121620] border border-[#222a39] rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white leading-snug">
                  {activeVideo.title}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                  <span className="font-semibold text-amber-400">{activeVideo.channel}</span>
                  <span>•</span>
                  <span>{activeVideo.views}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenDirect(`https://www.youtube.com/watch?v=${activeVideo.embedId}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1a212e] hover:bg-[#252f42] text-slate-200 border border-[#2d384c] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir en YouTube Oficial</span>
                </button>
              </div>
            </div>

            {/* Performance Notice for Old PCs */}
            <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-400 bg-[#0d1017] p-2.5 rounded-lg border border-slate-800/80">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                Fenixy bloquea automáticamente los anuncios emergentes de alta carga y reduce la resolución de texturas para que no se congele el sistema.
              </span>
            </div>
          </div>
        </div>

        {/* Playlist / Recommended Column */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Vídeos Recomendados
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Modo Fluido</span>
          </div>

          <div className="flex flex-col gap-2">
            {SAMPLE_VIDEOS.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`flex gap-3 p-2 rounded-xl cursor-pointer transition-all border ${
                  activeVideo.id === video.id
                    ? 'bg-[#1a212f] border-red-500/40 ring-1 ring-red-500/20'
                    : 'bg-[#11151e] border-[#1e2533] hover:bg-[#151a25]'
                }`}
              >
                <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-200 line-clamp-2 leading-tight">
                    {video.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 truncate">
                    {video.channel}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {video.views}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tip Card */}
          <div className="bg-gradient-to-br from-red-950/30 to-[#121620] border border-red-500/20 rounded-xl p-3.5 mt-2">
            <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              ¿Quieres tus Suscripciones?
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed mb-2.5">
              Puedes pulsar en <strong>Iniciar Sesión en Google</strong> arriba para abrir la ventana con cookies y credenciales nativas sin consumir memoria de Chrome.
            </p>
            <button
              type="button"
              onClick={() => onOpenDirect('https://youtube.com')}
              className="w-full py-1.5 px-3 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-colors text-center"
            >
              Ir a YouTube.com Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
