import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fenixy Browser - Navegador Web Superligero & Ultrarrápido',
  description: 'Navegador web superligero de máxima velocidad optimizado para ordenadores de bajos recursos de memoria y CPU, con soporte para YouTube, ChatGPT, Gemini, Gmail y aceleración de renderizado.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Fenixy Browser - Navegador Web Superligero & Ultrarrápido',
    description: 'Navegador web superligero de máxima velocidad optimizado para ordenadores con poca memoria RAM.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fenixy Browser - Navegador Web Superligero & Ultrarrápido',
    description: 'Navegador web superligero con consumo mínimo de RAM y máxima fluidez.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark h-full">
      <body className="h-full min-h-screen bg-[#0a0c10] text-slate-100 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
