export type BrowserAppType =
  | 'newtab'
  | 'youtube'
  | 'chatgpt'
  | 'gemini'
  | 'gmail'
  | 'web'
  | 'settings';

export interface BrowserTab {
  id: string;
  title: string;
  url: string;
  appType: BrowserAppType;
  favicon?: string;
  isLoading: boolean;
  isHibernated: boolean; // Memory saving mode
  ramUsageMB: number;
  lastActive: number;
  canGoBack: boolean;
  canGoForward: boolean;
  history: string[];
  historyIndex: number;
  customData?: any;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  appType: BrowserAppType;
  iconName?: string;
  color?: string;
}

export interface SearchEngine {
  id: string;
  name: string;
  searchUrl: string;
  icon: string;
}

export interface SystemPerformance {
  fenixyRamMB: number;
  chromeEstimatedRamMB: number;
  ramSavedPercent: number;
  cpuLoadPercent: number;
  blockedAdsCount: number;
  blockedTrackersCount: number;
  bandwidthSavedMB: number;
  activeTabsCount: number;
  hibernatedTabsCount: number;
}
