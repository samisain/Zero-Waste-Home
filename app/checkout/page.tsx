'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/CartContext';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cell: '',
    address: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && cart.length === 0 && !isSuccess) {
      router.push('/cart');
    }
  }, [mounted, cart.length, isSuccess, router]);

  if (!mounted) return null;

  if (cart.length === 0 && !isSuccess) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for checkout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-6">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-black text-stone-900 mb-4">Order Confirmed!</h1>
        <p className="text-lg text-stone-600 mb-8">
          Thank you for your purchase, <span className="font-bold">{formData.name}</span>. Your sustainable products are on their way to <span className="font-bold">{formData.address}</span>.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-stone-900 mb-8">Checkout</h1>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
        <h2 className="text-xl font-bold text-stone-900 mb-6">Shipping Information</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              placeholder="Jane Doe"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label htmlFor="cell" className="block text-sm font-medium text-stone-700 mb-1">Cell Number</label>
              <input
                type="tel"
                id="cell"
                name="cell"
                required
                value={formData.cell}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-stone-700 mb-1">Shipping Address</label>
            <textarea
              id="address"
              name="address"
              required
              rows={3}
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
              placeholder="123 Eco Street, Green City, Earth 12345"
            ></textarea>
          </div>
          
          <div className="border-t border-stone-200 pt-6 mt-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-stone-900">Total to Pay:</span>
              <span className="text-2xl font-black text-green-600">${cartTotal.toFixed(2)}</span>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-4 font-bold rounded-xl transition-colors flex items-center justify-center ${
                isSubmitting 
                  ? 'bg-stone-400 text-white cursor-not-allowed' 
                  : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Complete Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
