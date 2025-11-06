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
    pageNumber,
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
    pageNumber,
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
    pageNumber,
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

// Get all unique subject-year combinations
export async function getSubjectYearCombinations(): Promise<{academicYear: string, subject: string}[]> {
  const query = `*[_type == "note"] {
    academicYear,
    subject
  } | order(academicYear asc, subject asc)`;
  
  const results = await client.fetch(query);
  
  // Get unique combinations
  const uniqueCombinations = results.reduce((acc: any[], note: any) => {
    const exists = acc.some(item =>
      item.academicYear === note.academicYear && item.subject === note.subject
    );
    if (!exists) {
      acc.push({
        academicYear: note.academicYear,
        subject: note.subject
      });
    }
    return acc;
  }, []);
  
  return uniqueCombinations;
}

// Helper function to get subject label from value
export function getSubjectLabel(subjectValue: string): string {
  const subjectLabels: Record<string, string> = {
    'anatomy': 'Anatomy',
    'physiology': 'Physiology',
    'biochemistry': 'Biochemistry',
    'pathology': 'Pathology',
    'pharmacology': 'Pharmacology',
    'microbiology': 'Microbiology',
    'forensic-medicine': 'Forensic Medicine',
    'community-medicine': 'Community Medicine',
    'ent': 'ENT',
    'ophthalmology': 'Ophthalmology',
    'medicine': 'Medicine',
    'surgery': 'Surgery',
    'obgyn': 'Obstetrics & Gynecology',
    'pediatrics': 'Pediatrics',
    'orthopedics': 'Orthopedics',
    'dermatology': 'Dermatology',
    'psychiatry': 'Psychiatry',
    'radiology': 'Radiology',
    'anesthesiology': 'Anesthesiology',
  };
  
  return subjectLabels[subjectValue] || subjectValue;
}

// Helper function to get year label from value
export function getYearLabel(yearValue: string): string {
  const yearLabels: Record<string, string> = {
    'third-year': '3rd Year MBBS',
    'fourth-year': '4th Year MBBS',
    'fifth-year': '5th Year MBBS',
  };
  
  return yearLabels[yearValue] || yearValue;
}

// Helper function to get year color scheme
export function getYearColorScheme(yearValue: string) {
  const colorSchemes: Record<string, {bg: string, border: string}> = {
    'third-year': {
      bg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
      border: 'border-blue-500'
    },
    'fourth-year': {
      bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
      border: 'border-green-500'
    },
    'fifth-year': {
      bg: 'bg-gradient-to-r from-purple-50 to-pink-50',
      border: 'border-purple-500'
    }
  };
  
  return colorSchemes[yearValue] || { bg: 'bg-gray-50', border: 'border-gray-500' };
}
