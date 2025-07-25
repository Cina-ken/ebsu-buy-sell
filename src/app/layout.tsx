// src/app/layout.tsx
import './globals.css';
import  Navbar  from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'EBSU Buy & Sell',
  description: 'A vibrant marketplace.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}