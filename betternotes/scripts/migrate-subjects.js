import { createClient } from '@sanity/client'

// Initialize the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 't1y8nndf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-04-01',
  token: process.env.SANITY_API_TOKEN, // You'll need to provide this
})

// Define the initial subjects
const initialSubjects = [
  { name: 'Anatomy', value: 'anatomy' },
  { name: 'Physiology', value: 'physiology' },
  { name: 'Biochemistry', value: 'biochemistry' },
  { name: 'Pathology', value: 'pathology' },
  { name: 'Pharmacology', value: 'pharmacology' },
  { name: 'Microbiology', value: 'microbiology' },
  { name: 'Forensic Medicine', value: 'forensic-medicine' },
  { name: 'Community Medicine', value: 'community-medicine' },
  { name: 'ENT', value: 'ent' },
  { name: 'Ophthalmology', value: 'ophthalmology' },
  { name: 'Medicine', value: 'medicine' },
  { name: 'Surgery', value: 'surgery' },
  { name: 'Obstetrics & Gynecology', value: 'obgyn' },
  { name: 'Pediatrics', value: 'pediatrics' },
  { name: 'Orthopedics', value: 'orthopedics' },
  { name: 'Dermatology', value: 'dermatology' },
  { name: 'Psychiatry', value: 'psychiatry' },
  { name: 'Radiology', value: 'radiology' },
  { name: 'Anesthesiology', value: 'anesthesiology' },
]

async function migrateSubjects() {
  console.log('Starting subject migration...')
  
  try {
    // Step 1: Create subject documents
    console.log('Creating subject documents...')
    const createdSubjects = []
    
    for (const subject of initialSubjects) {
      // Check if subject already exists
      const existing = await client.fetch(
        `*[_type == "subject" && value.current == $value][0]`,
        { value: subject.value }
      )
      
      if (!existing) {
        const newSubject = await client.create({
          _type: 'subject',
          name: subject.name,
          value: {
            _type: 'slug',
            current: subject.value,
          },
        })
        createdSubjects.push(newSubject)
        console.log(`Created subject: ${subject.name}`)
      } else {
        createdSubjects.push(existing)
        console.log(`Subject already exists: ${subject.name}`)
      }
    }
    
    // Step 2: Update notes to use references
    console.log('\nUpdating notes to use subject references...')
    const notes = await client.fetch(`*[_type == "note" && defined(subject)]`)
    
    for (const note of notes) {
      const subjectValue = typeof note.subject === 'string' ? note.subject : note.subject?.value
      
      if (subjectValue) {
        // Find the corresponding subject document
        const subjectDoc = createdSubjects.find(
          s => s.value.current === subjectValue
        )
        
        if (subjectDoc) {
          await client.patch(note._id)
            .set({
              subject: {
                _type: 'reference',
                _ref: subjectDoc._id,
              }
            })
            .commit()
          
          console.log(`Updated note "${note.title}" to reference subject "${subjectDoc.name}"`)
        }
      }
    }
    
    console.log('\nMigration completed successfully!')
    
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

// Run the migration
migrateSubjects()