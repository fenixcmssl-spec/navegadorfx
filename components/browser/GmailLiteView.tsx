'use client';

import React, { useState } from 'react';
import {
  Mail,
  Inbox,
  Star,
  Send,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Search,
  Plus,
  ArrowLeft,
  CheckCircle,
  Clock,
  Zap,
} from 'lucide-react';

interface GmailLiteViewProps {
  onOpenDirect: (url: string) => void;
}

interface EmailItem {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
  unread: boolean;
  starred: boolean;
}

const INITIAL_EMAILS: EmailItem[] = [
  {
    id: '1',
    sender: 'Equipo de Google',
    senderEmail: 'no-reply@accounts.google.com',
    subject: 'Alerta de seguridad: Nuevo inicio de sesión detectado en Fenixy Browser',
    snippet: 'Se ha iniciado una sesión en tu cuenta de Google desde un navegador seguro de alta velocidad...',
    body: 'Hola,\n\nDetectamos un nuevo acceso a tus servicios de Google desde Fenixy Browser Quantum-Lite.\n\nFenixy utiliza cifrado estándar TLS 1.3 con aislamiento seguro de credenciales. No es necesaria ninguna acción si fuiste tú quien inició sesión.\n\nAtentamente,\nEquipo de Cuentas de Google',
    date: '10:42',
    unread: true,
    starred: true,
  },
  {
    id: '2',
    sender: 'YouTube Creators',
    senderEmail: 'updates@youtube.com',
    subject: 'Tus canales favoritos tienen nuevos vídeos disponibles hoy',
    snippet: 'Descubre las últimas publicaciones de tus creadores favoritos en calidad optimizada...',
    body: 'Hola creador,\n\nHay 8 nuevos vídeos esperándote en tus suscripciones. Disfrútalos con la fluidez de Fenixy Lite sin tirones en tu pantalla.\n\n¡Que tengas un gran día!',
    date: 'Ayer',
    unread: false,
    starred: false,
  },
  {
    id: '3',
    sender: 'Fenixy System Advisor',
    senderEmail: 'optimizer@fenixy.local',
    subject: 'Reporte: Tu ordenador antiguo ahora ahorra 1.8 GB de memoria RAM',
    snippet: 'Gracias a la hibernación de pestañas y bloqueo de 48 scripts pesados...',
    body: 'Informe de rendimiento del sistema:\n\n- Memoria RAM consumida por pestañas: 42 MB\n- Memoria que habría consumido Google Chrome: 1,840 MB\n- Ciclos de CPU ahorrados: 74%\n- Rendimiento general: Fluido y estable para multitarea.\n\n¡Sigue disfrutando de tu equipo sin necesidad de comprar uno nuevo!',
    date: '8 Oct',
    unread: false,
    starred: true,
  },
];

export function GmailLiteView({ onOpenDirect }: GmailLiteViewProps) {
  const [emails, setEmails] = useState<EmailItem[]>(INITIAL_EMAILS);
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);
  const [search, setSearch] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  const filteredEmails = emails.filter(
    (e) =>
      e.subject.toLowerCase().includes(search.toLowerCase()) ||
      e.sender.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo.trim()) return;

    const newMail: EmailItem = {
      id: Date.now().toString(),
      sender: 'Yo',
      senderEmail: 'mi.cuenta@gmail.com',
      subject: composeSubject || '(Sin asunto)',
      snippet: composeBody.slice(0, 50) + '...',
      body: composeBody,
      date: 'Ahora',
      unread: false,
      starred: false,
    };

    setEmails([newMail, ...emails]);
    setIsComposing(false);
    setComposeTo('');
    setComposeSubject('');
    setComposeBody('');
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 3000);
  };

  return (
    <div className="h-full flex flex-col bg-[#0b0e14] text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111520] border-b border-[#202838]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30">
            <Mail className="w-4 h-4 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-white">Gmail Web Lite</span>
              <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-500/30 px-1.5 py-0.2 rounded font-mono">
                Bajo Consumo
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block">
              Modo HTML ultraveloz: apenas 15 MB de RAM
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenDirect('https://mail.google.com')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20 transition-all"
            title="Abrir tu bandeja de entrada completa oficial de Google"
          >
            <span>Iniciar Sesión en Gmail Oficial</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {sentNotice && (
        <div className="bg-emerald-950/80 border-b border-emerald-500/30 px-4 py-2 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>Mensaje enviado correctamente con optimización Fenixy.</span>
        </div>
      )}

      {/* Main Mail Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-48 bg-[#0e121a] border-r border-[#1e2636] p-3 flex flex-col gap-2 shrink-0 hidden sm:flex">
          <button
            type="button"
            onClick={() => setIsComposing(true)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:brightness-110 text-white font-bold text-xs shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Redactar</span>
          </button>

          <div className="mt-3 space-y-1 text-xs">
            <button
              type="button"
              onClick={() => setSelectedEmail(null)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#18202d] text-amber-300 font-semibold"
            >
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4" />
                <span>Recibidos</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20">
                {emails.filter((e) => e.unread).length}
              </span>
            </button>

            <button
              type="button"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:bg-[#151c27] hover:text-slate-200 transition-colors"
            >
              <Star className="w-4 h-4" />
              <span>Destacados</span>
            </button>

            <button
              type="button"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:bg-[#151c27] hover:text-slate-200 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Enviados</span>
            </button>
          </div>

          <div className="mt-auto p-2.5 rounded-xl bg-[#090b10] border border-slate-800 text-[10px] text-slate-400">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
              <Zap className="w-3 h-3" />
              <span>Ahorro Máximo</span>
            </div>
            Sin renderizados pesados de fuentes o scripts de rastreo publicitario.
          </div>
        </div>

        {/* Email List or Email Viewer */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#090b10]">
          {selectedEmail ? (
            /* Email Detail View */
            <div className="flex-1 flex flex-col p-5 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedEmail(null)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a recibidos</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{selectedEmail.date}</span>
                </div>
              </div>

              <h2 className="text-base font-bold text-white mb-3">
                {selectedEmail.subject}
              </h2>

              <div className="flex items-center gap-3 mb-4 p-3 bg-[#111622] rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-rose-600/30 text-rose-300 font-bold flex items-center justify-center text-xs">
                  {selectedEmail.sender[0]}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">{selectedEmail.sender}</div>
                  <div className="text-[11px] text-slate-400">{selectedEmail.senderEmail}</div>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap flex-1 bg-[#10141d] p-4 rounded-xl border border-slate-800/80">
                {selectedEmail.body}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsComposing(true)}
                  className="px-4 py-2 rounded-lg bg-[#192231] hover:bg-[#222e42] text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
                >
                  Responder
                </button>
              </div>
            </div>
          ) : (
            /* Email List View */
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Filter / Search Bar */}
              <div className="p-3 border-b border-[#1b2230] flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar en el correo..."
                    className="w-full bg-[#111520] border border-[#232c3d] rounded-lg py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto divide-y divide-[#171d29]">
                {filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => {
                      setSelectedEmail(email);
                      setEmails(
                        emails.map((e) => (e.id === email.id ? { ...e, unread: false } : e))
                      );
                    }}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#121722] transition-colors ${
                      email.unread ? 'bg-[#101520]/80 font-bold text-white' : 'text-slate-300'
                    }`}
                  >
                    <div className="shrink-0">
                      <Star
                        className={`w-3.5 h-3.5 ${
                          email.starred ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                        }`}
                      />
                    </div>
                    <div className="w-36 truncate text-xs shrink-0">
                      {email.sender}
                    </div>
                    <div className="flex-1 truncate text-xs">
                      <span className="text-slate-100">{email.subject}</span>
                      <span className="text-slate-500 font-normal ml-2">— {email.snippet}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 shrink-0 font-mono">
                      {email.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {isComposing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#141924] border border-[#2c374c] rounded-2xl shadow-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <h3 className="font-bold text-sm text-white">Mensaje Nuevo (Modo Ligero)</h3>
              <button
                type="button"
                onClick={() => setIsComposing(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-3">
              <input
                type="email"
                placeholder="Para:"
                value={composeTo}
                onChange={(e) => setComposeTo(e.target.value)}
                required
                className="w-full bg-[#0a0d12] border border-[#2b3547] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-rose-500"
              />
              <input
                type="text"
                placeholder="Asunto:"
                value={composeSubject}
                onChange={(e) => setComposeSubject(e.target.value)}
                className="w-full bg-[#0a0d12] border border-[#2b3547] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-rose-500"
              />
              <textarea
                rows={5}
                placeholder="Escribe tu mensaje..."
                value={composeBody}
                onChange={(e) => setComposeBody(e.target.value)}
                className="w-full bg-[#0a0d12] border border-[#2b3547] rounded-lg p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-rose-500 resize-none"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsComposing(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                >
                  Descartar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
