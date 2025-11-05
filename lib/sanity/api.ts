import { client } from './client';
import { Note, DiscountCode, NoteFilters } from '@/types';

// Get all notes with optional filtering
export async function getNotes(filters?: NoteFilters): Promise<Note[]> {
  let query = `*[_type == "note"`;
  
  if (filters) {
    const conditions = [];
    
    if (filters.academicYear) {
      conditions.push(`academicYear == "${filters.academicYear}"`);
    }
    
    if (filters.subject) {
      conditions.push(`subject == "${filters.subject}"`);
    }
    
    if (filters.priceRange) {
      conditions.push(`price >= ${filters.priceRange.min} && price <= ${filters.priceRange.max}`);
    }
    
    if (filters.search) {
      conditions.push(`title match "${filters.search}*" || description match "${filters.search}*"`);
    }
    
    if (conditions.length > 0) {
      query += ` && ${conditions.join(' && ')}`;
    }
  }
  
  query += `] | order(createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    price,
    originalPrice,
    coverImage,
    images[]{
      _key,
      _type,
      asset->{
        _id,
        _type,
        url,
        metadata
      }
    },
    academicYear,
    subject,
    tags,
    featured,
    createdAt,
    updatedAt
  }`;
  
  return await client.fetch(query);
}

// Get featured notes
export async function getFeaturedNotes(): Promise<Note[]> {
  const query = `*[_type == "note" && featured == true] | order(createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    price,
    originalPrice,
    coverImage,
    images[]{
      _key,
      _type,
      asset->{
        _id,
        _type,
        url,
        metadata
      }
    },
    academicYear,
    subject,
    tags,
    featured,
    createdAt,
    updatedAt
  }[0...6]`;
  
  return await client.fetch(query);
}

// Get a single note by slug
export async function getNoteBySlug(slug: string): Promise<Note | null> {
  const query = `*[_type == "note" && slug.current == "${slug}"][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    price,
    originalPrice,
    coverImage,
    images[]{
      _key,
      _type,
      asset->{
        _id,
        _type,
        url,
        metadata
      }
    },
    academicYear,
    subject,
    tags,
    featured,
    createdAt,
    updatedAt
  }`;
  
  return await client.fetch(query);
}

// Get all discount codes
export async function getDiscountCodes(): Promise<DiscountCode[]> {
  const query = `*[_type == "discountCode" && isActive == true && validFrom <= now() && validUntil >= now()] | order(validUntil desc) {
    _id,
    code,
    discountPercentage,
    validFrom,
    validUntil,
    isActive,
    usageLimit,
    usedCount
  }`;
  
  return await client.fetch(query);
}

// Validate a discount code
export async function validateDiscountCode(code: string): Promise<DiscountCode | null> {
  const query = `*[_type == "discountCode" && code == "${code}" && isActive == true && validFrom <= now() && validUntil >= now() && (usageLimit == null || usedCount < usageLimit)][0] {
    _id,
    code,
    discountPercentage,
    validFrom,
    validUntil,
    isActive,
    usageLimit,
    usedCount
  }`;
  
  return await client.fetch(query);
}

// Get all unique academic years
export async function getAcademicYears(): Promise<string[]> {
  const query = `*[_type == "note"] | distinct(academicYear)`;
  return await client.fetch(query);
}

// Get all unique subjects
export async function getSubjects(): Promise<string[]> {
  const query = `*[_type == "note"] | distinct(subject)`;
  return await client.fetch(query);
}
