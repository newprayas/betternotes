# @Better Notes V2 - Detailed Implementation Plan

## Architecture Analysis

### Technology Stack Assessment

The proposed technology stack (Next.js + Sanity.io + Vercel) is **excellent** for this project:

✅ **Next.js**:
- Perfect for static-first e-commerce sites
- Built-in image optimization
- Mobile-first responsive design support
- App Router for modern React patterns
- Excellent performance on mobile networks

✅ **Sanity.io**:
- Flexible content management for notes and discount codes
- Real-time content updates
- Excellent developer experience
- Scalable for future growth

✅ **Vercel**:
- Native Next.js hosting
- Global CDN for fast mobile delivery
- Automatic deployments
- Built-in analytics

### Architecture Decision

**No architecture refactor needed** - the current tech stack is optimal for this use case. The requirements align perfectly with Next.js's strengths in static site generation and mobile-first development.

## Implementation Phases

### Phase 1: Project Setup & Foundation

#### 1.1 Initialize Next.js Project
```bash
npx create-next-app@latest better-notes-v2 --typescript --tailwind --app
cd better-notes-v2
```

#### 1.2 Install Dependencies
```bash
# Core dependencies
npm install next-sanity @sanity/image-url
npm install react-zoom-pan-pinch  # For image gallery with zoom
npm install lucide-react  # Icons

# Development dependencies
npm install -D @types/node
```

#### 1.3 Configure Tailwind CSS for Mobile-First
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',    // Black
        accent: '#FFD700',     // Yellow/Gold
        secondary: '#FF0000',   // Red
      }
    },
  },
  plugins: [],
}
```

### Phase 2: Sanity.io Configuration

#### 2.1 Initialize Sanity Project
```bash
npx @sanity/cli init
```

#### 2.2 Define Schemas

**Note Schema** (`schemas/note.ts`):
```typescript
export default {
  name: 'note',
  title: 'Note',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'academicYear',
      title: 'Academic Year',
      type: 'string',
      options: {
        list: [
          { title: '3rd Year', value: '3rd-year' },
          { title: '4th Year', value: '4th-year' },
          { title: '5th Year', value: '5th-year' }
        ]
      }
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string',
      options: {
        list: [
          { title: 'Pharmacology', value: 'pharmacology' },
          { title: 'Forensic Medicine', value: 'forensic-medicine' },
          { title: 'Pathology', value: 'pathology' },
          { title: 'Microbiology', value: 'microbiology' }
        ]
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent'
    },
    {
      name: 'sampleImages',
      title: 'Sample Images',
      type: 'array',
      of: [{ type: 'image' }]
    },
    {
      name: 'inventory',
      title: 'Inventory',
      type: 'number'
    }
  ]
}
```

**Discount Code Schema** (`schemas/discountCode.ts`):
```typescript
export default {
  name: 'discountCode',
  title: 'Discount Code',
  type: 'document',
  fields: [
    {
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'discountValue',
      title: 'Discount Value',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'isOneTimeUse',
      title: 'One Time Use',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'isUsed',
      title: 'Is Used',
      type: 'boolean',
      initialValue: false
    }
  ]
}
```

### Phase 3: Project Structure

```
src/
├── app/
│   ├── (pages)/
│   │   ├── page.tsx              # Homepage
│   │   ├── notes/
│   │   │   ├── page.tsx          # Notes catalog
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Individual note
│   │   ├── cart/
│   │   │   └── page.tsx          # Shopping cart
│   │   └── checkout/
│   │       └── page.tsx          # Checkout page
│   ├── globals.css
│   ├── layout.tsx
│   └── studio/
│       └── [[...tool]]/
│           └── page.tsx          # Sanity Studio
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── CartIcon.tsx
│   ├── ImageGallery.tsx           # Image gallery with zoom
│   ├── NoteCard.tsx
│   └── CartProvider.tsx          # Shopping cart context
├── lib/
│   ├── sanity.ts                 # Sanity client
│   ├── queries.ts                # GROQ queries
│   └── types.ts                  # TypeScript types
└── styles/
    └── globals.css
```

### Phase 4: Core Components Implementation

#### 4.1 Header Component
```typescript
// components/ui/Header.tsx
import Link from 'next/link'
import CartIcon from './CartIcon'
import { useCart } from '../CartProvider'

export default function Header() {
  const { itemCount } = useCart()
  
  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          @Better Notes
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/notes">All Notes</Link>
          <Link href="/about">About</Link>
        </nav>
        <Link href="/cart" className="relative">
          <CartIcon />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
```

#### 4.2 Shopping Cart Context
```typescript
// components/CartProvider.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface CartItem {
  id: string
  title: string
  price: number
  slug: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setItems([])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
```

#### 4.3 Image Gallery with Zoom
```typescript
// components/ImageGallery.tsx
'use client'
import { useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Image from 'next/image'

interface ImageGalleryProps {
  images: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!images.length) return null

  return (
    <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden">
      <TransformWrapper>
        <TransformComponent>
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={urlFor(images[currentIndex]).url()}
              alt={images[currentIndex].alt || 'Note sample'}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        </TransformComponent>
      </TransformWrapper>
      
      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            ←
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            →
          </button>
        </>
      )}
      
      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-yellow-500' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
```

### Phase 5: Page Implementations

#### 5.1 Homepage (`app/(pages)/page.tsx`)
```typescript
import { client } from '@/lib/sanity'
import { NOTES_QUERY } from '@/lib/queries'
import Link from 'next/link'
import Image from 'next/image'

export default async function HomePage() {
  const featuredNotes = await client.fetch(NOTES_QUERY, { limit: 4 })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Make Your Exams Easier
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            High-quality medical notes designed for exam success
          </p>
          <Link 
            href="/notes"
            className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors"
          >
            Browse All Notes
          </Link>
        </div>
      </section>

      {/* Author Introduction */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Prayas Raj Ojha</h2>
              <p className="text-gray-600">
                Medical professional creating comprehensive study materials to help students excel in their exams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredNotes.map((note) => (
              <div key={note._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Link href={`/notes/${note.slug.current}`}>
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{note.title}</h3>
                    <p className="text-yellow-600 font-bold">${note.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
```

#### 5.2 Notes Catalog (`app/(pages)/notes/page.tsx`)
```typescript
'use client'
import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'
import { NOTES_QUERY } from '@/lib/queries'
import NoteCard from '@/components/NoteCard'

export default function NotesPage() {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await client.fetch(NOTES_QUERY)
      setNotes(data)
      setFilteredNotes(data)
    }
    fetchNotes()
  }, [])

  useEffect(() => {
    let filtered = notes
    
    if (selectedYear) {
      filtered = filtered.filter(note => note.academicYear === selectedYear)
    }
    
    if (selectedSubject) {
      filtered = filtered.filter(note => note.subject === selectedSubject)
    }
    
    setFilteredNotes(filtered)
  }, [selectedYear, selectedSubject, notes])

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Notes</h1>
        
        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Years</option>
            <option value="3rd-year">3rd Year</option>
            <option value="4th-year">4th Year</option>
            <option value="5th-year">5th Year</option>
          </select>
          
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Subjects</option>
            <option value="pharmacology">Pharmacology</option>
            <option value="forensic-medicine">Forensic Medicine</option>
            <option value="pathology">Pathology</option>
            <option value="microbiology">Microbiology</option>
          </select>
        </div>
        
        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

#### 5.3 Checkout Page with Telegram Integration
```typescript
'use client'
import { useCart } from '@/components/CartProvider'
import { useState } from 'react'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, subtotal } = useCart()
  const [discountCode, setDiscountCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [telegramId] = useState('@betternotes_admin') // This would come from Sanity CMS

  const finalTotal = Math.max(0, subtotal - discount)

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.title} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Payment Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Payment Instructions</h2>
          <p className="mb-4">
            To complete your order, please contact us on Telegram with your order details:
          </p>
          
          <div className="bg-black text-white p-4 rounded-lg text-center mb-4">
            <p className="text-sm mb-2">Telegram ID:</p>
            <p className="text-xl font-bold">{telegramId}</p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm font-bold mb-2">Message to send:</p>
            <p className="text-sm bg-white p-3 rounded border">
              Hello, I'd like to purchase the following notes from @Better Notes:
              <br /><br />
              {items.map(item => `${item.title} - $${item.price} x ${item.quantity}`).join('\n')}
              <br /><br />
              Total Price: ${finalTotal.toFixed(2)}
              <br /><br />
              Please let me know the payment details. Thank you!
            </p>
          </div>
        </div>
        
        <Link 
          href={`https://t.me/${telegramId.replace('@', '')}`}
          target="_blank"
          className="block w-full bg-black text-white text-center py-4 rounded-lg font-bold hover:bg-gray-800 transition-colors"
        >
          Open Telegram to Complete Order
        </Link>
      </div>
    </div>
  )
}
```

### Phase 6: Mobile-First Design Implementation

#### 6.1 Responsive Design Strategy
- Use Tailwind's mobile-first breakpoint system
- Design for mobile screens first (320px and up)
- Enhance for tablet (768px and up) and desktop (1024px and up)
- Touch-friendly button sizes (minimum 44px)
- Thumb-friendly navigation placement

#### 6.2 Performance Optimization
- Next.js Image component for automatic optimization
- Lazy loading for images
- Minimal JavaScript bundle
- Static generation where possible
- Critical CSS inlining

### Phase 7: Deployment Configuration

#### 7.1 Vercel Setup
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

#### 7.2 Environment Variables
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
```

## Implementation Timeline

| Week | Tasks |
|-------|-------|
| Week 1 | Project setup, Sanity configuration, basic structure |
| Week 2 | Header/Footer, Homepage, Notes catalog |
| Week 3 | Individual note pages, Image gallery implementation |
| Week 4 | Shopping cart functionality, Checkout with Telegram |
| Week 5 | Mobile optimization, Performance tuning |
| Week 6 | Testing, Bug fixes, Deployment |

## Key Considerations

### Mobile-First Design
1. **Navigation**: Bottom navigation for mobile, top for desktop
2. **Images**: Optimize for mobile loading speeds
3. **Touch**: Large tap targets, gesture support
4. **Performance**: Minimize JavaScript, optimize images

### Image Gallery Requirements
- Use `react-zoom-pan-pinch` for zoom functionality
- Support touch gestures (swipe, pinch)
- Mobile-optimized UI controls
- Lazy loading for performance

### Telegram Integration
- Simple display of contact information
- Pre-formatted message template
- Direct link to Telegram chat
- No complex API integration needed

### Performance Optimization
- Static Site Generation where possible
- Image optimization with Next.js Image component
- Minimal bundle size
- Critical CSS inlining

## Conclusion

The proposed architecture and implementation plan is well-suited for the @Better Notes V2 requirements. The tech stack provides excellent mobile performance, the implementation plan covers all specified features, and the simplified Telegram integration reduces complexity while maintaining functionality.

The project is technically feasible with the chosen stack and doesn't require any architecture changes. The implementation should proceed as planned with focus on mobile-first design and performance optimization.