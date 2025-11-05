// Note types
export interface Note {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: {
    asset: {
      _ref: string;
      _type: string;
    };
  }[];
  academicYear: string;
  subject: string;
  examType: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// Discount code types
export interface DiscountCode {
  _id: string;
  code: string;
  discountPercentage: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  usageLimit?: number;
  usedCount: number;
}

// Cart types
export interface CartItem {
  note: Note;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  discountCode?: string;
  discountAmount?: number;
  finalTotal: number;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Filter types
export interface NoteFilters {
  academicYear?: string;
  subject?: string;
  examType?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  search?: string;
}

// Contact information
export interface ContactInfo {
  telegram: string;
  email?: string;
  phone?: string;
}

// Site configuration
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    telegram: string;
    email?: string;
  };
}