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
        firstPill: {
          text: `Add 1 more note for : `,
          discount: "❤️ 50 tk discount! ❤️"
        },
        secondPill: {
          text: `🎉 You're saving 0 tk! 🎉`
        }
      };
    }
    
    if (itemCount === 2 || itemCount === 3) {
      return {
        firstPill: {
          text: `Add ${itemCount === 2 ? 2 : 1} more notes for : `,
          discount: "❤️ 150 tk discount! ❤️"
        },
        secondPill: {
          text: `🎉 You're saving 50 tk! 🎉`
        }
      };
    }
    
    if (itemCount === 4 || itemCount === 5) {
      return {
        firstPill: {
          text: `Add ${itemCount === 4 ? 2 : 1} more notes for : `,
          discount: "❤️ 200 tk discount! ❤️"
        },
        secondPill: {
          text: `🎉 You're saving 150 tk! 🎉`
        }
      };
    }
    
    if (itemCount === 6 || itemCount === 7) {
      return {
        firstPill: {
          text: `Add ${itemCount === 6 ? 2 : 1} more notes for : `,
          discount: "❤️ 250 tk discount! ❤️"
        },
        secondPill: {
          text: `🎉 You're saving 200 tk! 🎉`
        }
      };
    }
    
    if (itemCount >= 8) {
      return {
        firstPill: {
          text: `You've unlocked maximum discount!`,
          discount: ""
        },
        secondPill: {
          text: `🎉 You're saving 250 tk! 🎉`
        }
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
        <div className="space-y-3 flex flex-col items-center">
          {/* First Green Pill */}
          <div className="inline-block bg-green-100 border-2 border-green-500 rounded-full px-6 py-3">
            <div className="font-bold text-green-800 text-center">
              {discountMessage.firstPill.text}
            </div>
            {discountMessage.firstPill.discount && (
              <div className="font-bold text-green-800 text-center mt-2">
                {discountMessage.firstPill.discount}
              </div>
            )}
          </div>
          
          {/* Second Green Pill */}
          <div className="inline-block bg-green-100 border-2 border-green-500 rounded-full px-4 py-2">
            <div className="font-bold text-green-800 text-center">
              {discountMessage.secondPill.text}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionalOffers;