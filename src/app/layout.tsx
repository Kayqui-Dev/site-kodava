import type { Metadata } from 'next';
import { Fraunces, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const fraunces = Fraunces({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kodava Solutions | Sistemas de Inteligência Artificial Sob Medida',
  description:
    'Desenvolvimento de inteligência artificial proprietária e sob medida. Criamos agentes autônomos, prompt engineering avançado e automação inteligente de processos para o seu negócio.',
  keywords: 'Kodava Solutions, Inteligência Artificial Customizada, Agentes de IA, Automação, Next.js, Framer Motion',
  authors: [{ name: 'Kodava Solutions' }],
  openGraph: {
    title: 'Kodava Solutions | Sistemas de Inteligência Artificial Sob Medida',
    description: 'Desenvolvimento de inteligência artificial proprietária, agentes autônomos e automação.',
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
    <html lang="pt-BR" className={`${fraunces.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="bg-bg text-gray-100 min-h-screen flex flex-col antialiased selection:bg-brand-blue selection:text-bg">
        <Header />
        {children}
      </body>
    </html>
  );
}
