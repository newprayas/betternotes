'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { usePathname } from 'next/navigation';

const CartBottomBar = () => {
  const { itemCount } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const pathname = usePathname();

  // Control visibility based on cart items
  useEffect(() => {
    if (itemCount > 0) {
      setShouldRender(true);
      // Small delay before starting the slide-in animation
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
      // Wait for animation to complete before removing from DOM
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [itemCount]);

  // Hide the cart bottom bar on checkout page
  if (pathname === '/checkout' || !shouldRender) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transform transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container flex justify-center py-4">
        <div className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full shadow-lg text-center">
          <p className="text-sm md:text-base">
            🎉 Please add ALL the Notes you want 🎉
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartBottomBar;