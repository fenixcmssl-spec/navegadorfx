'use client';

import React, { useState, useEffect } from 'react';
import { BrowserTab, Bookmark, SystemPerformance, BrowserAppType } from './types';
import { BrowserTabs } from './BrowserTabs';
import { Omnibox } from './Omnibox';
import { BookmarksBar } from './BookmarksBar';
import { NewTabPage } from './NewTabPage';
import { YouTubeLiteView } from './YouTubeLiteView';
import { ChatGPTLiteView } from './ChatGPTLiteView';
import { GeminiLiteView } from './GeminiLiteView';
import { GmailLiteView } from './GmailLiteView';
import { WebSandboxView } from './WebSandboxView';
import { FenixySidePanel } from './FenixySidePanel';
import { SettingsModal } from './SettingsModal';
import { Zap, ShieldCheck } from 'lucide-react';

const INITIAL_TABS: BrowserTab[] = [
  {
    id: 'tab-home',
    title: 'Fenixy Inicio',
    url: 'fenixy://newtab',
    appType: 'newtab',
    isLoading: false,
    isHibernated: false,
    ramUsageMB: 12,
    lastActive: 1700000000000,
    canGoBack: false,
    canGoForward: false,
    history: ['fenixy://newtab'],
    historyIndex: 0,
  },
  {
    id: 'tab-youtube',
    title: 'YouTube Lite',
    url: 'https://youtube.com',
    appType: 'youtube',
    isLoading: false,
    isHibernated: false,
    ramUsageMB: 18,
    lastActive: 1700000000000,
    canGoBack: false,
    canGoForward: false,
    history: ['https://youtube.com'],
    historyIndex: 0,
  },
  {
    id: 'tab-gemini',
    title: 'Google Gemini',
    url: 'https://gemini.google.com',
    appType: 'gemini',
    isLoading: false,
    isHibernated: false,
    ramUsageMB: 9,
    lastActive: 1700000000000,
    canGoBack: false,
    canGoForward: false,
    history: ['https://gemini.google.com'],
    historyIndex: 0,
  },
  {
    id: 'tab-chatgpt',
    title: 'ChatGPT',
    url: 'https://chatgpt.com',
    appType: 'chatgpt',
    isLoading: false,
    isHibernated: true,
    ramUsageMB: 3,
    lastActive: 1700000000000,
    canGoBack: false,
    canGoForward: false,
    history: ['https://chatgpt.com'],
    historyIndex: 0,
  },
  {
    id: 'tab-gmail',
    title: 'Gmail Web',
    url: 'https://mail.google.com',
    appType: 'gmail',
    isLoading: false,
    isHibernated: true,
    ramUsageMB: 3,
    lastActive: 1700000000000,
    canGoBack: false,
    canGoForward: false,
    history: ['https://mail.google.com'],
    historyIndex: 0,
  },
];

const INITIAL_BOOKMARKS: Bookmark[] = [
  { id: 'bm-yt', title: 'YouTube Lite', url: 'https://youtube.com', appType: 'youtube' },
  { id: 'bm-gpt', title: 'ChatGPT', url: 'https://chatgpt.com', appType: 'chatgpt' },
  { id: 'bm-gem', title: 'Gemini AI', url: 'https://gemini.google.com', appType: 'gemini' },
  { id: 'bm-gm', title: 'Gmail', url: 'https://mail.google.com', appType: 'gmail' },
  { id: 'bm-wiki', title: 'Wikipedia', url: 'https://es.wikipedia.org', appType: 'web' },
  { id: 'bm-gh', title: 'GitHub', url: 'https://github.com', appType: 'web' },
];

export function BrowserWindow() {
  const [tabs, setTabs] = useState<BrowserTab[]>(INITIAL_TABS);
  const [activeTabId, setActiveTabId] = useState<string>('tab-home');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(INITIAL_BOOKMARKS);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [purgeToast, setPurgeToast] = useState(false);

  // Stats
  const [blockedAdsCount, setBlockedAdsCount] = useState(78);
  const [blockedTrackersCount, setBlockedTrackersCount] = useState(142);
  const [bandwidthSavedMB, setBandwidthSavedMB] = useState(34.8);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  // Calculate live RAM usage
  const totalFenixyRamMB = tabs.reduce((acc, t) => acc + (t.isHibernated ? 3 : t.ramUsageMB), 0);
  const chromeEstimatedRamMB = tabs.length * 340 + 250;
  const ramSavedPercent = Math.round(
    ((chromeEstimatedRamMB - totalFenixyRamMB) / chromeEstimatedRamMB) * 100
  );

  const performance: SystemPerformance = {
    fenixyRamMB: totalFenixyRamMB,
    chromeEstimatedRamMB,
    ramSavedPercent,
    cpuLoadPercent: 12,
    blockedAdsCount,
    blockedTrackersCount,
    bandwidthSavedMB,
    activeTabsCount: tabs.filter((t) => !t.isHibernated).length,
    hibernatedTabsCount: tabs.filter((t) => t.isHibernated).length,
  };

  const handleSelectTab = (id: string) => {
    setActiveTabId(id);
    setTabs((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, isHibernated: false, ramUsageMB: t.isHibernated ? 14 : t.ramUsageMB }
          : t
      )
    );
  };

  const handleCloseTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) {
      // Re-use single tab as new tab
      setTabs([
        {
          id: 'tab-' + Date.now(),
          title: 'Fenixy Inicio',
          url: 'fenixy://newtab',
          appType: 'newtab',
          isLoading: false,
          isHibernated: false,
          ramUsageMB: 12,
          lastActive: Date.now(),
          canGoBack: false,
          canGoForward: false,
          history: ['fenixy://newtab'],
          historyIndex: 0,
        },
      ]);
      return;
    }

    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const handleNewTab = () => {
    const newTab: BrowserTab = {
      id: 'tab-' + Date.now(),
      title: 'Fenixy Inicio',
      url: 'fenixy://newtab',
      appType: 'newtab',
      isLoading: false,
      isHibernated: false,
      ramUsageMB: 12,
      lastActive: Date.now(),
      canGoBack: false,
      canGoForward: false,
      history: ['fenixy://newtab'],
      historyIndex: 0,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleToggleHibernate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTabs((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, isHibernated: !t.isHibernated, ramUsageMB: t.isHibernated ? 14 : 3 }
          : t
      )
    );
  };

  const handleNavigate = (url: string, explicitAppType?: BrowserAppType) => {
    let appType: BrowserAppType = explicitAppType || 'web';

    if (url.includes('fenixy://newtab')) {
      appType = 'newtab';
    } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
      appType = 'youtube';
    } else if (url.includes('chatgpt.com') || url.includes('openai.com')) {
      appType = 'chatgpt';
    } else if (url.includes('gemini.google.com')) {
      appType = 'gemini';
    } else if (url.includes('mail.google.com')) {
      appType = 'gmail';
    }

    let pageTitle = 'Página Web';
    if (appType === 'newtab') pageTitle = 'Fenixy Inicio';
    else if (appType === 'youtube') pageTitle = 'YouTube Lite';
    else if (appType === 'chatgpt') pageTitle = 'ChatGPT';
    else if (appType === 'gemini') pageTitle = 'Google Gemini';
    else if (appType === 'gmail') pageTitle = 'Gmail Web';
    else {
      try {
        pageTitle = new URL(url).hostname;
      } catch {
        pageTitle = url;
      }
    }

    setTabs((prev) =>
      prev.map((t) => {
        if (t.id === activeTabId) {
          const newHistory = [...t.history.slice(0, t.historyIndex + 1), url];
          return {
            ...t,
            url,
            appType,
            title: pageTitle,
            isLoading: false,
            history: newHistory,
            historyIndex: newHistory.length - 1,
            canGoBack: newHistory.length > 1,
            canGoForward: false,
          };
        }
        return t;
      })
    );

    // Increment blocked stats
    setBlockedAdsCount((c) => c + 3);
    setBlockedTrackersCount((c) => c + 5);
  };

  const handleGoBack = () => {
    if (!activeTab.canGoBack || activeTab.historyIndex <= 0) return;
    const newIdx = activeTab.historyIndex - 1;
    const targetUrl = activeTab.history[newIdx];
    handleNavigate(targetUrl);
  };

  const handleGoForward = () => {
    if (!activeTab.canGoForward || activeTab.historyIndex >= activeTab.history.length - 1) return;
    const newIdx = activeTab.historyIndex + 1;
    const targetUrl = activeTab.history[newIdx];
    handleNavigate(targetUrl);
  };

  const handleReload = () => {
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, isLoading: true } : t))
    );
    setTimeout(() => {
      setTabs((prev) =>
        prev.map((t) => (t.id === activeTabId ? { ...t, isLoading: false } : t))
      );
    }, 600);
  };

  const handleGoHome = () => {
    handleNavigate('fenixy://newtab', 'newtab');
  };

  const handleToggleBookmark = () => {
    const isBookmarked = bookmarks.some((b) => b.url === activeTab.url);
    if (isBookmarked) {
      setBookmarks(bookmarks.filter((b) => b.url !== activeTab.url));
    } else {
      setBookmarks([
        ...bookmarks,
        {
          id: 'bm-' + Date.now(),
          title: activeTab.title,
          url: activeTab.url,
          appType: activeTab.appType,
        },
      ]);
    }
  };

  const handlePurgeRam = () => {
    // Put inactive tabs into sleep mode and clean RAM
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId
          ? { ...t, ramUsageMB: Math.max(8, t.ramUsageMB - 6) }
          : { ...t, isHibernated: true, ramUsageMB: 3 }
      )
    );
    setPurgeToast(true);
    setTimeout(() => setPurgeToast(false), 2500);
  };

  const handleOpenDirect = (url: string) => {
    // Open in native separate window without iframe restriction
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-col h-full w-full min-h-screen overflow-hidden bg-[#0a0c10] text-slate-100 font-sans">
      {/* 1. Chrome Tabs Strip */}
      <BrowserTabs
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={handleSelectTab}
        onCloseTab={handleCloseTab}
        onNewTab={handleNewTab}
        onToggleHibernate={handleToggleHibernate}
        ramUsageMB={totalFenixyRamMB}
        onOpenOptimizer={() => setIsSettingsOpen(true)}
      />

      {/* 2. Omnibox Navigation & Address Bar */}
      <Omnibox
        currentUrl={activeTab.url}
        canGoBack={activeTab.canGoBack}
        canGoForward={activeTab.canGoForward}
        isLoading={activeTab.isLoading}
        isBookmarked={bookmarks.some((b) => b.url === activeTab.url)}
        blockedCount={blockedAdsCount + blockedTrackersCount}
        onNavigate={handleNavigate}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onReload={handleReload}
        onGoHome={handleGoHome}
        onToggleBookmark={handleToggleBookmark}
        onToggleCopilot={() => setIsCopilotOpen(!isCopilotOpen)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onPurgeRam={handlePurgeRam}
      />

      {/* 3. Bookmarks Bar */}
      <BookmarksBar
        bookmarks={bookmarks}
        onOpenBookmark={(b) => handleNavigate(b.url, b.appType)}
        onAddBookmark={handleToggleBookmark}
      />

      {/* 4. Main Viewport & Side Panel Container */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Active Tab View */}
        <div className="flex-1 h-full overflow-hidden relative">
          {activeTab.appType === 'newtab' && (
            <NewTabPage
              onNavigate={handleNavigate}
              ramUsageMB={totalFenixyRamMB}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onPurgeRam={handlePurgeRam}
            />
          )}

          {activeTab.appType === 'youtube' && (
            <YouTubeLiteView onOpenDirect={handleOpenDirect} />
          )}

          {activeTab.appType === 'chatgpt' && (
            <ChatGPTLiteView onOpenDirect={handleOpenDirect} />
          )}

          {activeTab.appType === 'gemini' && (
            <GeminiLiteView onOpenDirect={handleOpenDirect} />
          )}

          {activeTab.appType === 'gmail' && (
            <GmailLiteView onOpenDirect={handleOpenDirect} />
          )}

          {activeTab.appType === 'web' && (
            <WebSandboxView
              url={activeTab.url}
              title={activeTab.title}
              onOpenDirect={handleOpenDirect}
            />
          )}
        </div>

        {/* Fenixy Copilot & Performance Side Panel */}
        <FenixySidePanel
          isOpen={isCopilotOpen}
          onClose={() => setIsCopilotOpen(false)}
          activeTab={activeTab}
          performance={performance}
          onPurgeRam={handlePurgeRam}
        />
      </div>

      {/* Purge Notification Toast */}
      {purgeToast && (
        <div className="absolute bottom-4 right-4 z-50 bg-[#161c28] border-2 border-amber-500/80 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
            <Zap className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300">
              ¡Memoria RAM Optimizada al Máximo!
            </div>
            <div className="text-[11px] text-slate-300">
              Pestañas inactivas congeladas. Consumo reducido a {totalFenixyRamMB} MB.
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onPurgeRam={handlePurgeRam}
      />
    </div>
  );
}
