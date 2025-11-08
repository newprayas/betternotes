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

  // Hide the cart bottom bar completely - moved to header
  return null;
};

export default CartBottomBar;