import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import BottomNav from '@/components/BottomNav';

export const metadata = {
  title: { default: 'EBSU Buy & Sell', template: '%s | EBSU Buy & Sell' },
  description: 'Buy, sell, find services and jobs in the EBSU community marketplace.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ebsu-buy-sell.vercel.app'),
  openGraph: { siteName: 'EBSU Buy & Sell', type: 'website', locale: 'en_NG' },
  twitter: { card: 'summary_large_image' },
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className="min-h-screen flex flex-col bg-gray-100">
          <Navbar />
          <main className="flex-grow pb-16 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
        </body>
      </html>
    </ClerkProvider>
  );
}