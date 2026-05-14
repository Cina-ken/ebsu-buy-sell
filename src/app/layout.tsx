import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import BottomNav from '@/components/BottomNav';

export const metadata = {
  title: 'EBSU Buy & Sell',
  description: 'A vibrant marketplace for the EBSU community.',
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