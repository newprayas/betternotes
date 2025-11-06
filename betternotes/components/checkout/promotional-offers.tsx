'use client';

import { useCart } from '@/lib/cart-context';
import { Gift, Star, Zap } from 'lucide-react';

const PromotionalOffers = () => {
  const { itemCount } = useCart();

  // Define discount tiers
  const discountTiers = [
    { minItems: 3, discount: 50, icon: Gift },
    { minItems: 5, discount: 100, icon: Star },
    { minItems: 8, discount: 150, icon: Zap },
    { minItems: 10, discount: 200, icon: Star }
  ];

  // Determine which message to show based on cart count
  const getDiscountMessage = () => {
    if (itemCount === 0) return null;
    
    if (itemCount === 1) {
      return {
        message: "You are close to a discount!",
        subMessage: "Add 2 more notes and Get 50 tk discount!",
        nextTier: 3,
        needed: 2
      };
    }
    
    if (itemCount === 2) {
      return {
        message: "You are close to a discount!",
        subMessage: "Add 1 more note and Get 50 tk discount!",
        nextTier: 3,
        needed: 1
      };
    }
    
    if (itemCount === 3 || itemCount === 4) {
      return {
        message: "Great choice! You've unlocked a discount by buying 3 Notes!",
        subMessage: itemCount === 3
          ? "💯 Add 2 more notes = 5 notes and Get 100 tk discount!"
          : "💯 Add 1 more note = 5 notes and Get 100 tk discount!",
        nextTier: 5,
        needed: itemCount === 3 ? 2 : 1,
        currentDiscount: 50
      };
    }
    
    if (itemCount === 5 || itemCount === 6 || itemCount === 7) {
      return {
        message: "Awesome! You've unlocked a bigger discount!",
        subMessage: itemCount === 5
          ? "💯 Add 3 more notes = 8 notes and Get 150 tk discount!"
          : itemCount === 6
            ? "💯 Add 2 more notes = 8 notes and Get 150 tk discount!"
            : "💯 Add 1 more note = 8 notes and Get 150 tk discount!",
        nextTier: 8,
        needed: itemCount === 5 ? 3 : itemCount === 6 ? 2 : 1,
        currentDiscount: 100
      };
    }
    
    if (itemCount === 8 || itemCount === 9) {
      return {
        message: "Fantastic! You've unlocked an amazing discount!",
        subMessage: itemCount === 8
          ? "💯 Add 2 more notes = 10 notes and Get 200 tk discount!"
          : "💯 Add 1 more note = 10 notes and Get 200 tk discount!",
        nextTier: 10,
        needed: itemCount === 8 ? 2 : 1,
        currentDiscount: 150
      };
    }
    
    if (itemCount >= 10) {
      return {
        message: "Incredible! You've unlocked our maximum discount!",
        subMessage: "You're getting 200 tk off your order!",
        currentDiscount: 200
      };
    }
    
    return null;
  };

  const discountMessage = getDiscountMessage();

  return (
    <div className="mb-6">
      {/* Promotional Offers */}
      <div className="bg-white border-2 border-black rounded-lg p-6 mb-4 shadow-sm">
        <h2 className="text-xl font-bold text-black mb-4 text-center">🎉 Special Offers 🎉</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {discountTiers.map((tier, index) => {
            const Icon = tier.icon;
            const isActive = itemCount >= tier.minItems;
            
            return (
              <div
                key={index}
                className={`relative rounded-lg p-3 transition-all duration-300 border-2 ${
                  isActive
                    ? 'bg-black text-white border-black'
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center">
                  <Icon className={`w-6 h-6 mb-2 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  <div className="text-center">
                    <div className={`font-bold text-sm ${isActive ? 'text-white' : 'text-gray-800'}`}>
                      Buy {tier.minItems}+ notes
                    </div>
                    <div className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-700'}`}>
                      Get {tier.discount} tk off
                    </div>
                  </div>
                  {isActive && (
                    <div className="mt-2 bg-green-500 text-white text-xs rounded-full px-2 py-1">
                      ✓ Active
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Discount Message */}
      {discountMessage && (
        <div className={`rounded-lg p-4 text-center ${
          discountMessage.currentDiscount
            ? 'bg-green-100 border-2 border-green-500'
            : 'bg-blue-100 border-2 border-blue-500'
        }`}>
          <div className={`font-bold text-lg mb-1 ${
            discountMessage.currentDiscount ? 'text-green-800' : 'text-blue-800'
          }`}>
            {discountMessage.message}
          </div>
          <div className={`text-sm ${
            discountMessage.currentDiscount ? 'text-green-700' : 'text-blue-700'
          }`}>
            {discountMessage.subMessage}
          </div>
          {discountMessage.currentDiscount && (
            <div className="mt-2 text-lg font-bold text-green-800">
              🎉 You're saving {discountMessage.currentDiscount} tk! 🎉
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromotionalOffers;