import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Nayab Gemstone - Premium Certified Gemstones & Jewelry',
    template: '%s | Nayab Gemstone'
  },
  description: 'Discover the world\'s finest certified gemstones at Nayab Gemstone. Premium diamonds, rubies, sapphires, emeralds from renowned sources. Expert certification, worldwide shipping, 30-day returns.',
  keywords: [
    'gemstones',
    'certified diamonds',
    'precious stones',
    'rubies',
    'sapphires',
    'emeralds',
    'jewelry',
    'gemstone collection',
    'authentic gemstones',
    'premium jewelry'
  ],
  authors: [{ name: 'Nayab Gemstone' }],
  creator: 'Nayab Gemstone',
  publisher: 'Nayab Gemstone',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nayabgemstone.com',
    siteName: 'Nayab Gemstone',
    title: 'Nayab Gemstone - Premium Certified Gemstones & Jewelry',
    description: 'Discover the world\'s finest certified gemstones. Premium diamonds, rubies, sapphires, emeralds with expert certification.',
    images: [
      {
        url: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg',
        width: 1200,
        height: 630,
        alt: 'Nayab Gemstone Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nayab Gemstone - Premium Certified Gemstones',
    description: 'Discover the world\'s finest certified gemstones with expert certification and worldwide shipping.',
    images: ['https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://nayabgemstone.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster position="top-right" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}