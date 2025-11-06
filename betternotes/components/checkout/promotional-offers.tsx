'use client';

import { useCart } from '@/lib/cart-context';

const PromotionalOffers = () => {
  const { itemCount } = useCart();

  // Define discount tiers
  const discountTiers = [
    { minItems: 2, discount: 50 },
    { minItems: 4, discount: 150 },
    { minItems: 6, discount: 200 },
    { minItems: 8, discount: 250 }
  ];

  // Determine which message to show based on cart count
  const getDiscountMessage = () => {
    if (itemCount === 0) return null;
    
    if (itemCount === 1) {
      return {
        message: "You are so close to a discount!",
        subMessage: "Add 1 more note and Get 50 tk discount!",
        nextTier: 2,
        needed: 1
      };
    }
    
    if (itemCount === 2 || itemCount === 3) {
      return {
        message: "Great choice!",
        subMessage: `You've unlocked a discount by buying ${itemCount} Notes!${itemCount === 2
          ? " 💯 Add 2 more notes = 4 notes and Get 150 tk discount!"
          : " 💯 Add 1 more note = 4 notes and Get 150 tk discount!"}`,
        nextTier: 4,
        needed: itemCount === 2 ? 2 : 1,
        currentDiscount: 50
      };
    }
    
    if (itemCount === 4 || itemCount === 5) {
      return {
        message: "Awesome!",
        subMessage: `You've unlocked a bigger discount by buying ${itemCount} Notes!${itemCount === 4
          ? " 💯 Add 2 more notes = 6 notes and Get 200 tk discount!"
          : " 💯 Add 1 more note = 6 notes and Get 200 tk discount!"}`,
        nextTier: 6,
        needed: itemCount === 4 ? 2 : 1,
        currentDiscount: 150
      };
    }
    
    if (itemCount === 6 || itemCount === 7) {
      return {
        message: "Fantastic!",
        subMessage: `You've unlocked an amazing discount by buying ${itemCount} Notes!${itemCount === 6
          ? " 💯 Add 2 more notes = 8 notes and Get 250 tk discount!"
          : " 💯 Add 1 more note = 8 notes and Get 250 tk discount!"}`,
        nextTier: 8,
        needed: itemCount === 6 ? 2 : 1,
        currentDiscount: 200
      };
    }
    
    if (itemCount >= 8) {
      return {
        message: "Incredible!",
        subMessage: `You've unlocked our maximum discount by buying ${itemCount} Notes! You're getting 250 tk off your order!`,
        currentDiscount: 250
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