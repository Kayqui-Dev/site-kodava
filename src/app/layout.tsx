import type { Metadata } from 'next';
import { Geist, Geist_Mono, Fraunces } from 'next/font/google';
import './globals.css';
import ThreeBackground from '@/components/ThreeBackground';
import SmoothScroll from '@/components/SmoothScroll';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

const fraunces = Fraunces({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Kodava Solutions | Websites Premium & Softwares de Elite',
  description:
    'Desenvolvemos websites de altíssimo padrão visual e performance, além de aplicativos, SaaS, automações inteligentes e inteligência artificial sob medida para o seu negócio.',
  keywords: 'Kodava Solutions, Websites Premium, Desenvolvimento de Software, Aplicativos, SaaS, Automação, Inteligência Artificial',
  authors: [{ name: 'Kodava Solutions' }],
  openGraph: {
    title: 'Kodava Solutions | Websites Premium & Softwares de Elite',
    description: 'Desenvolvemos websites de altíssimo padrão, aplicativos, SaaS, automações e IA customizada.',
    type: 'website',
    url: 'https://kodavasolutions.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} scroll-smooth`}>
      <body className="bg-bg text-gray-100 min-h-screen flex flex-col antialiased selection:bg-brand-primary selection:text-bg">
        <SmoothScroll>
          <ThreeBackground />
          <div className="relative z-10 w-full flex-grow">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
