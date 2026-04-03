'use client';

import { Product } from '@/lib/types';
import { useCart } from '@/lib/CartContext';
import { Leaf, Recycle, Plus, Check } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1, isSubscribing);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-48 w-full bg-stone-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-green-700 flex items-center shadow-sm">
          <Leaf className="w-3 h-3 mr-1" />
          Score: {product.sustainabilityScore}/100
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-stone-800 mb-1">{product.name}</h3>
        <p className="text-sm text-stone-500 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center text-xs text-blue-600 mb-4 bg-blue-50 p-2 rounded-lg">
          <Recycle className="w-4 h-4 mr-1" />
          Saves {product.plasticSaved}g of plastic
        </div>

        <div className="mt-auto">
          <div className="flex items-end justify-between mb-4">
            <span className="text-2xl font-black text-stone-900">${product.price.toFixed(2)}</span>
            {product.isSubscriptionEligible && isSubscribing && (
              <span className="text-sm font-medium text-green-600">
                ${(product.price * 0.9).toFixed(2)} with sub
              </span>
            )}
          </div>

          {product.isSubscriptionEligible && (
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id={`subscribe-${product.id}`}
                checked={isSubscribing}
                onChange={(e) => setIsSubscribing(e.target.checked)}
                className="w-4 h-4 text-green-600 bg-stone-100 border-stone-300 rounded focus:ring-green-500"
                suppressHydrationWarning
              />
              <label htmlFor={`subscribe-${product.id}`} className="ml-2 text-sm font-medium text-stone-700">
                Subscribe & Save 10%
              </label>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center transition-colors ${
              added
                ? 'bg-green-100 text-green-800'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
            suppressHydrationWarning
          >
            {added ? (
              <>
                <Check className="w-5 h-5 mr-2" /> Added to Cart
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" /> {isSubscribing ? 'Subscribe Now' : 'Add to Cart'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
