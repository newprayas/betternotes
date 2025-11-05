'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  Send, 
  Check,
  X,
  Copy
} from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useCart } from '@/lib/cart-context';
import { validateDiscountCode } from '@/lib/sanity/api';

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, applyDiscountCode, removeDiscountCode } = useCart();
  const [discountCodeInput, setDiscountCodeInput] = useState('');
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const [discountError, setDiscountError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const handleApplyDiscountCode = async () => {
    if (!discountCodeInput.trim()) return;
    
    setIsApplyingDiscount(true);
    setDiscountError('');
    
    try {
      // In a real app, we would validate the discount code with Sanity
      // For now, we'll simulate a discount code validation
      if (discountCodeInput.toLowerCase() === 'student10') {
        applyDiscountCode(discountCodeInput, 10);
        setDiscountCodeInput('');
      } else if (discountCodeInput.toLowerCase() === 'welcome20') {
        applyDiscountCode(discountCodeInput, 20);
        setDiscountCodeInput('');
      } else {
        setDiscountError('Invalid discount code');
      }
    } catch (error) {
      setDiscountError('Failed to apply discount code');
    } finally {
      setIsApplyingDiscount(false);
    }
  };

  const handleRemoveDiscountCode = () => {
    removeDiscountCode();
  };

  const handlePlaceOrder = () => {
    // In a real app, this would process the order
    setOrderPlaced(true);
    clearCart();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  const telegramUsername = '@betternotes';
  const orderMessage = `Hi! I'd like to purchase the following notes:\n\n${cart.items.map(item => `${item.note.title} (x${item.quantity}) - ₹${item.note.price * item.quantity}`).join('\n')}\n\nTotal: ₹${cart.finalTotal}`;

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-black mb-4">Order Placed Successfully!</h1>
              
              <p className="text-gray-700 mb-6">
                Thank you for your order! Please contact us on Telegram to complete your purchase and receive your notes.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Next Steps:</h2>
                <ol className="text-left space-y-2">
                  <li>1. Contact us on Telegram with your order details</li>
                  <li>2. Complete the payment through your preferred method</li>
                  <li>3. Receive your notes via Telegram or email</li>
                </ol>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="font-semibold mb-2">Telegram Contact:</p>
                <div className="flex items-center justify-center">
                  <Send className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="text-lg">{telegramUsername}</span>
                  <button
                    onClick={() => copyToClipboard(telegramUsername)}
                    className="ml-2 p-1 rounded hover:bg-gray-200 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copiedToClipboard ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://t.me/${telegramUsername.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Contact on Telegram
                </a>
                <Link href="/" className="btn-outline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container">
          <div className="mb-6">
            <Link href="/notes" className="flex items-center text-gray-600 hover:text-black transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>

          {cart.items.length === 0 ? (
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-gray-400" />
              </div>
              
              <h1 className="text-2xl font-bold text-black mb-4">Your Cart is Empty</h1>
              
              <p className="text-gray-700 mb-6">
                Looks like you haven't added any notes to your cart yet.
              </p>
              
              <Link href="/notes" className="btn-primary">
                Browse Notes
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h1 className="text-xl font-bold text-black mb-6">Shopping Cart</h1>
                  
                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <div key={item.note._id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                          <Image
                            src="/placeholder.svg"
                            alt={item.note.title}
                            width={80}
                            height={80}
                            className="rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="font-semibold text-black mb-1">{item.note.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.note.subject.replace('-', ' ')}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item.note._id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              
                              <span className="w-12 text-center">{item.quantity}</span>
                              
                              <button
                                onClick={() => updateQuantity(item.note._id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-semibold">₹{item.note.price * item.quantity}</p>
                              <p className="text-sm text-gray-500">₹{item.note.price} each</p>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.note._id)}
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                  <h2 className="text-xl font-bold text-black mb-6">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₹{cart.total}</span>
                    </div>
                    
                    {cart.discountCode && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Discount ({cart.discountCode})</span>
                        <span className="font-semibold text-green-600">-₹{cart.discountAmount}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-lg font-bold">₹{cart.finalTotal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Discount Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountCodeInput}
                        onChange={(e) => setDiscountCodeInput(e.target.value)}
                        placeholder="Enter code"
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      {cart.discountCode ? (
                        <button
                          onClick={handleRemoveDiscountCode}
                          className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={handleApplyDiscountCode}
                          disabled={isApplyingDiscount || !discountCodeInput.trim()}
                          className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isApplyingDiscount ? 'Applying...' : 'Apply'}
                        </button>
                      )}
                    </div>
                    {discountError && (
                      <p className="mt-1 text-sm text-red-600">{discountError}</p>
                    )}
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full btn-primary text-lg py-3"
                  >
                    Place Order
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By placing this order, you agree to contact us on Telegram to complete your purchase.
                  </p>
                </div>

                {/* Contact Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">How to Complete Your Order</h3>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Click "Place Order" to confirm your selection</li>
                    <li>2. Contact us on Telegram at {telegramUsername}</li>
                    <li>3. Share your order details and complete payment</li>
                    <li>4. Receive your notes instantly</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}