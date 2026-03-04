import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RWP Store | Premium Tech E-commerce',
  description: 'Experience the next level of premium technology shopping with RWP Store.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-primary selection:text-white`} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 pt-20 md:pt-32 pb-24 md:pb-12">
            {children}
          </main>
          <Footer />
          <BottomNav />
          <Cart />
        </div>
      </body>
    </html>
  );
}
