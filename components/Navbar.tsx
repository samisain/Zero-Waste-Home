'use client';

import Link from 'next/link';
import { ShoppingCart, Leaf } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { motion } from 'motion/react';

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-green-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              animate={{ 
                rotate: [0, 15, -10, 0],
                y: [0, -3, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                ease: "easeInOut" 
              }}
              whileHover={{ scale: 1.1 }}
            >
              <Leaf className="h-6 w-6 text-green-300" />
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-bold text-xl tracking-tight"
            >
              ZeroWaste Home
            </motion.span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 hover:bg-green-700 rounded-full transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-green-500 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
