import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Using a placeholder URL. For production, you should deploy your site and replace this.
const siteUrl = 'https://memento-mori-calendar.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Memento Mori: Your Life in Weeks Calendar',
    template: '%s | Memento Mori Calendar',
  },
  description: 'Visualize your life in weeks with our interactive Memento Mori calendar. A powerful stoic tool for reflection, motivation, and a visceral reminder of your most precious resource: time.',
  keywords: ['memento mori', 'life calendar', 'weeks of my life', 'stoicism', 'stoic calendar', 'life visualization', 'motivation tool', 'productivity app', 'time management', 'time cost calculator'],
  
  openGraph: {
    title: 'Memento Mori: Your Life in Weeks Calendar',
    description: 'Visualize your life in weeks. A powerful reminder of your most precious resource.',
    url: siteUrl,
    siteName: 'Memento Mori Calendar',
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary',
    title: 'Memento Mori: Your Life in Weeks Calendar',
    description: 'Visualize your life in weeks. A powerful reminder of your most precious resource.',
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
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Memento Mori Calendar',
    operatingSystem: 'WEB',
    applicationCategory: 'BrowserApplication',
    description: 'A web application to visualize your life in weeks, inspired by the stoic concept of Memento Mori.',
    url: siteUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    }
  };

  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HZVT3P0H5H"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-HZVT3P0H5H');
          `}
        </Script>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
