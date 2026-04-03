'use client';

import { useCart } from '@/lib/CartContext';
import { Trash2, Plus, Minus, ArrowRight, Recycle, Leaf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, plasticSavedTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-6">
          <Leaf className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-stone-900 mb-4">Your cart is empty</h2>
        <p className="text-stone-500 mb-8 max-w-md mx-auto">
          Start your zero-waste journey today by adding some sustainable products to your cart.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-stone-900 mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={`${item.product.id}-${item.isSubscription}`} className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
              <div className="relative w-full sm:w-24 h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0 mb-4 sm:mb-0">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="sm:ml-6 flex-grow">
                <h3 className="text-lg font-bold text-stone-900">{item.product.name}</h3>
                {item.isSubscription ? (
                  <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-md">
                    Subscription (10% Off)
                  </span>
                ) : (
                  <span className="inline-block mt-1 px-2 py-1 bg-stone-100 text-stone-600 text-xs font-bold rounded-md">
                    One-time purchase
                  </span>
                )}
                <div className="mt-2 flex items-center text-sm text-blue-600">
                  <Recycle className="w-4 h-4 mr-1" />
                  Saves {item.product.plasticSaved * item.quantity}g plastic
                </div>
              </div>

              <div className="mt-4 sm:mt-0 flex items-center justify-between sm:flex-col sm:items-end w-full sm:w-auto">
                <div className="text-lg font-black text-stone-900 sm:mb-4">
                  ${((item.isSubscription ? item.product.price * 0.9 : item.product.price) * item.quantity).toFixed(2)}
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-stone-200 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.isSubscription, item.quantity - 1)}
                      className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-l-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium text-stone-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.isSubscription, item.quantity + 1)}
                      className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-r-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product.id, item.isSubscription)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 sticky top-24">
            <h2 className="text-xl font-bold text-stone-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t border-stone-200 pt-4 flex justify-between">
                <span className="text-lg font-bold text-stone-900">Total</span>
                <span className="text-2xl font-black text-stone-900">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout" className="w-full py-4 px-4 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors flex items-center justify-center mb-8">
              Checkout <ArrowRight className="ml-2 w-5 h-5" />
            </Link>

            {/* Plastic Savings Calculator */}
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Recycle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-blue-900">Impact Calculator</h3>
              </div>
              <p className="text-sm text-blue-800 mb-4">
                By choosing these products, you are making a real difference!
              </p>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-3xl font-black text-blue-600 mb-1">
                  {plasticSavedTotal}g
                </div>
                <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Plastic Saved
                </div>
                <div className="mt-3 pt-3 border-t border-stone-100 text-sm text-stone-600">
                  That&apos;s equivalent to keeping roughly <span className="font-bold text-stone-900">{Math.round(plasticSavedTotal / 20)}</span> plastic bottles out of the ocean.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
