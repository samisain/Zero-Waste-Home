import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { CartProvider } from '@/lib/CartContext';
import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'ZeroWaste Home',
  description: 'Sustainability and plastic-free household alternatives.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900 flex flex-col" suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
