'use client';

import { useCart } from '@/lib/cart-context';

const PromotionalOffers = () => {
  const { itemCount } = useCart();

  // Define discount tiers
  const discountTiers = [
    { minItems: 3, discount: 50 },
    { minItems: 5, discount: 100 },
    { minItems: 8, discount: 150 },
    { minItems: 10, discount: 200 }
  ];

  // Determine which message to show based on cart count
  const getDiscountMessage = () => {
    if (itemCount === 0) return null;
    
    if (itemCount === 1) {
      return {
        message: "You are so close to a discount!",
        subMessage: "Add 2 more notes and Get 50 tk discount!",
        nextTier: 3,
        needed: 2
      };
    }
    
    if (itemCount === 2) {
      return {
        message: "You are so close to a discount!",
        subMessage: "Add 1 more note and Get 50 tk discount!",
        nextTier: 3,
        needed: 1
      };
    }
    
    if (itemCount === 3 || itemCount === 4) {
      return {
        message: "Great choice!",
        subMessage: `You've unlocked a discount by buying ${itemCount} Notes!${itemCount === 3
          ? " 💯 Add 2 more notes = 5 notes and Get 100 tk discount!"
          : " 💯 Add 1 more note = 5 notes and Get 100 tk discount!"}`,
        nextTier: 5,
        needed: itemCount === 3 ? 2 : 1,
        currentDiscount: 50
      };
    }
    
    if (itemCount === 5 || itemCount === 6 || itemCount === 7) {
      return {
        message: "Awesome!",
        subMessage: `You've unlocked a bigger discount by buying ${itemCount} Notes!${itemCount === 5
          ? " 💯 Add 3 more notes = 8 notes and Get 150 tk discount!"
          : itemCount === 6
            ? " 💯 Add 2 more notes = 8 notes and Get 150 tk discount!"
            : " 💯 Add 1 more note = 8 notes and Get 150 tk discount!"}`,
        nextTier: 8,
        needed: itemCount === 5 ? 3 : itemCount === 6 ? 2 : 1,
        currentDiscount: 100
      };
    }
    
    if (itemCount === 8 || itemCount === 9) {
      return {
        message: "Fantastic!",
        subMessage: `You've unlocked an amazing discount by buying ${itemCount} Notes!${itemCount === 8
          ? " 💯 Add 2 more notes = 10 notes and Get 200 tk discount!"
          : " 💯 Add 1 more note = 10 notes and Get 200 tk discount!"}`,
        nextTier: 10,
        needed: itemCount === 8 ? 2 : 1,
        currentDiscount: 150
      };
    }
    
    if (itemCount >= 10) {
      return {
        message: "Incredible!",
        subMessage: `You've unlocked our maximum discount by buying ${itemCount} Notes! You're getting 200 tk off your order!`,
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
        <h2 className="text-xl font-bold text-black mb-3 text-center">🎉 Special Offers 🎉</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 max-w-4xl mx-auto">
          {discountTiers.map((tier, index) => {
            const isActive = itemCount >= tier.minItems;
            
            return (
              <div
                key={index}
                className={`rounded-md p-2 transition-all duration-300 border ${
                  isActive
                    ? 'bg-yellow-50 text-gray-900 border-yellow-300'
                    : 'bg-gray-50 text-gray-600 border-gray-200'
                }`}
              >
                <div className="text-center">
                  <div className={`font-semibold text-sm ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                    Buy {tier.minItems} notes
                  </div>
                  <div className={`text-sm font-bold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                    Get {tier.discount} tk off
                  </div>
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
          <div className={`text-sm whitespace-pre-line ${
            discountMessage.currentDiscount ? 'text-green-700' : 'text-blue-700'
          }`}>
            {discountMessage.subMessage && discountMessage.subMessage.includes('Get') ? (
              <>
                {discountMessage.subMessage.split('Get')[0]}
                <span className="font-bold">Get{discountMessage.subMessage.split('Get')[1]}</span>
              </>
            ) : (
              discountMessage.subMessage
            )}
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