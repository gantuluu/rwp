import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RWP Store | Modern E-commerce',
  description: 'A sleek, mobile-first e-commerce experience by RWP Store.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`} suppressHydrationWarning>
        <div className="flex justify-center min-h-screen">
          <main className="w-full max-w-[500px] bg-white min-h-screen relative pb-24 shadow-2xl shadow-black/5">
            {children}
            <Footer />
            <BottomNav />
            <Cart />
          </main>
        </div>
      </body>
    </html>
  );
}
