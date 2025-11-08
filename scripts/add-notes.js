import { createClient } from '@sanity/client'

// Initialize the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 't1y8nndf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-04-01',
  token: process.env.SANITY_API_TOKEN,
})

// Function to create a slug from a title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Function to extract price number from price string
function extractPrice(priceStr) {
  // Extract the first number found in the string
  const match = priceStr.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
}

// Function to extract page number from page string
function extractPageNumber(pageStr) {
  if (!pageStr) return null;
  // Extract the first number found in the string
  const match = pageStr.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}

// Define all the notes data
const notesData = [
  // 3rd Year Notes
  {
    year: 'third-year',
    subject: 'Pharmacology',
    notes: [
      { title: 'Pharmacology TERM 1 preparation WRITTEN note', price: '180' },
      { title: 'Pharmacology TERM 2 preparation WRITTEN note', price: '180' },
      { title: 'Pharmacology Full PROF VIVA NOTE (with answers)', price: '250' },
      { title: 'Special: Autonomic pharmacology concept note', price: '120' }
    ]
  },
  {
    year: 'third-year',
    subject: 'Forensic Medicine',
    notes: [
      { title: 'Forensic medicine Full PROF WRITTEN note', price: '160' },
      { title: 'Forensic medicine Full PROF VIVA note (with answers)', price: '160' },
      { title: 'Forensic TOXICOLOGY note', price: '120' }
    ]
  },
  {
    year: 'third-year',
    subject: 'Bundle',
    notes: [
      { title: 'WHOLE 3rd YEAR NOTES [BUNDLE] (Pharma + Forensic, Complete Written + Viva)', price: '760' }
    ]
  },
  
  // 4th Year Notes
  {
    year: 'fourth-year',
    subject: 'Community Medicine',
    notes: [
      { title: 'Community medicine Full PROF WRITTEN notes', price: '160' },
      { title: 'Community medicine Full PROF VIVA notes (with answers)', price: '160' }
    ]
  },
  {
    year: 'fourth-year',
    subject: 'Microbiology',
    notes: [
      { title: 'Microbiology TERM 1 preparation WRITTEN note', price: '180' },
      { title: 'Microbiology TERM 2 preparation WRITTEN note', price: '180' },
      { title: 'Microbiology Full PROF VIVA NOTE (with answers)', price: '250' }
    ]
  },
  {
    year: 'fourth-year',
    subject: 'Pathology',
    notes: [
      { title: 'Pathology TERM 1 preparation WRITTEN note', price: '180' },
      { title: 'Pathology TERM 2 preparation WRITTEN note', price: '180' },
      { title: 'Pathology Full PROF VIVA NOTE (with answers)', price: '250' }
    ]
  },
  {
    year: 'fourth-year',
    subject: 'Bundle',
    notes: [
      { title: 'WHOLE 4th YEAR NOTES [BUNDLE] (Commed + Micro + Patho, Complete Written + Viva)', price: '860' }
    ]
  },
  
  // 5th Year Notes
  {
    year: 'fifth-year',
    subject: 'Special Lectures/Prep',
    notes: [
      { title: "Masud sir's lecture notes (Youtube + Offline, 40+ lectures)", price: '300', pages: '150 + pages' },
      { title: "Jashim sir's MEDICINE PROF prep lectures (8 lectures)", price: '150' }
    ]
  },
  {
    year: 'fifth-year',
    subject: 'Surgery',
    notes: [
      { title: 'SURGERY Full PROF WRITTEN notes', price: '200', pages: '150 + pages' },
      { title: 'SURGERY Full PROF VIVA notes (WITH answers)', price: '300', pages: '250 + pages' }
    ]
  },
  {
    year: 'fifth-year',
    subject: 'Eye (Ophthalmology)',
    notes: [
      { title: 'EYE Full PROF WRITTEN note', price: '150', pages: '100 + pages' }
    ]
  },
  {
    year: 'fifth-year',
    subject: 'ENT (Otolaryngology)',
    notes: [
      { title: 'ENT Full PROF WRITTEN note', price: '150', pages: '100 + pages' }
    ]
  },
  {
    year: 'fifth-year',
    subject: 'Eye-ENT',
    notes: [
      { title: 'EYE-ENT Full PROF VIVA note (WITH answers)', price: '250', pages: '200 + pages' }
    ]
  },
  {
    year: 'fifth-year',
    subject: 'Medicine (Includes Pediatrics, Dermatology, Psychiatry)',
    notes: [
      { title: 'Medicine Paper 1 WRITTEN note', price: '200', pages: '150 + pages' },
      { title: 'Medicine Paper 2 WRITTEN note', price: '200', pages: '150 + pages' },
      { title: 'Medicine Full PROF VIVA NOTE (with answers, Includes Pedi, Derma, Psych)', price: '350', pages: '200 + pages' }
    ]
  },
  {
    year: 'fifth-year',
    subject: 'Gynecology (GYNE)',
    notes: [
      { title: 'GYNE Written WRITTEN note', price: '150', pages: '100 + pages' },
      { title: 'GYNE Full PROF VIVA NOTE (with answers)', price: '200', pages: '200 + pages' }
    ]
  },
  {
    year: 'fifth-year',
    subject: 'Obstetrics (OBS)',
    notes: [
      { title: 'OBS Written WRITTEN note', price: '150', pages: '100 + pages' },
      { title: 'OBS Full PROF VIVA NOTE (with answers)', price: '200', pages: '200 + pages' }
    ]
  },
  {
    year: 'fifth-year',
    subject: 'Ward Notes',
    notes: [
      { title: 'EYE ward notes', price: '70', pages: '40+ pages' },
      { title: 'ENT ward notes', price: '160', pages: '70+ pages' },
      { title: 'Pedi ward notes', price: '200', pages: '120+ pages' },
      { title: 'Pediatric surgery ward notes', price: '80' },
      { title: 'Neurosurgery ward notes', price: '120' },
      { title: 'Orthopedics ward notes', price: '120' },
      { title: 'Urology + Dermatology + Neonatology ward notes (combined)', price: '200' }
    ]
  },
  {
    year: 'fifth-year',
    subject: 'Bundle',
    notes: [
      { title: 'WHOLE 5TH YEAR NOTES BUNDLE (All PROF Written and Viva + Ward notes + Clinical notes)', price: '1480' }
    ]
  }
]

async function addNotes() {
  console.log('Starting to add notes to Sanity Studio...')
  
  try {
    // Step 1: Fetch all subjects to create a reference map
    console.log('Fetching subjects from Sanity...')
    const subjects = await client.fetch(`*[_type == "subject"]`)
    
    // Create a map of subject names to their references
    const subjectMap = {}
    subjects.forEach(subject => {
      subjectMap[subject.name] = {
        _type: 'reference',
        _ref: subject._id
      }
    })
    
    console.log(`Found ${subjects.length} subjects in Sanity`)
    
    // Special handling for Eye-ENT combined notes
    const eyeEntSubject = subjectMap['Eye (Ophthalmology)'] || subjectMap['ENT (Otolaryngology)']
    
    let createdCount = 0
    let skippedCount = 0
    
    // Step 2: Process each note
    for (const yearData of notesData) {
      for (const subjectData of yearData.notes) {
        const noteTitle = subjectData.title
        const notePrice = extractPrice(subjectData.price)
        const pageNumber = subjectData.pages ? extractPageNumber(subjectData.pages) : null
        
        // Determine the subject reference
        let subjectRef = null
        if (subjectData.subject === 'Bundle') {
          // For bundles, don't assign a subject
          subjectRef = null
        } else if (yearData.subject === 'Eye-ENT') {
          // For Eye-ENT combined, use Eye subject
          subjectRef = subjectMap['Eye (Ophthalmology)']
        } else {
          subjectRef = subjectMap[yearData.subject]
        }
        
        // Check if note already exists
        const existing = await client.fetch(
          `*[_type == "note" && title == $title][0]`,
          { title: noteTitle }
        )
        
        if (!existing) {
          // Create the note document
          const noteDoc = {
            _type: 'note',
            title: noteTitle,
            slug: {
              _type: 'slug',
              current: createSlug(noteTitle),
            },
            price: notePrice,
            academicYear: yearData.year,
            ...(subjectRef && { subject: subjectRef }),
            ...(pageNumber && { pageNumber }),
            tags: [yearData.year.replace('-', ' '), yearData.subject.toLowerCase()],
            featured: false,
          }
          
          const newNote = await client.create(noteDoc)
          createdCount++
          console.log(`✅ Created note: ${noteTitle}`)
        } else {
          skippedCount++
          console.log(`⏭️  Note already exists: ${noteTitle}`)
        }
      }
    }
    
    console.log('\n=== Summary ===')
    console.log(`✅ Created: ${createdCount} new notes`)
    console.log(`⏭️  Skipped: ${skippedCount} existing notes`)
    console.log('All notes have been processed successfully!')
    
  } catch (error) {
    console.error('❌ Error adding notes:', error)
    process.exit(1)
  }
}

// Run the script
addNotes()