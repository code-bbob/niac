import NiacHeader from './components/NiacHeader';
import NiacFooter from './components/NiacFooter';
import LenisScroll from './components/LenisScroll';
import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import { baseUrl } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'NIAC - Nepal International ADR Center',
    template: '%s | NIAC',
  },
  description: 'Premier dispute resolution forum serving the Asia-Pacific region with integrity, expertise, and cultural insight.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'NIAC',
    title: 'NIAC - Nepal International ADR Center',
    description: 'Premier dispute resolution forum serving the Asia-Pacific region with integrity, expertise, and cultural insight.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfairDisplay.variable} bg-white text-black`}>
        <LenisScroll />
        <NiacHeader />
        <main className="min-h-screen bg-white text-black">
          {children}
        </main>
        <NiacFooter />
      </body>
    </html>
  );
}
