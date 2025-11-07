import { createClient } from '@sanity/client'

// Initialize the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 't1y8nndf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-04-01',
  token: process.env.SANITY_API_TOKEN, // You'll need to provide this
})

// Define all the subjects you want to add
const subjectsToAdd = [
  { name: 'Pharmacology', value: 'pharmacology' },
  { name: 'Forensic Medicine', value: 'forensic-medicine' },
  { name: 'Community Medicine', value: 'community-medicine' },
  { name: 'Microbiology', value: 'microbiology' },
  { name: 'Pathology', value: 'pathology' },
  { name: 'Surgery', value: 'surgery' },
  { name: 'Eye (Ophthalmology)', value: 'ophthalmology' },
  { name: 'ENT (Otolaryngology)', value: 'ent' },
  { name: 'Medicine', value: 'medicine' },
  { name: 'Gynecology (GYNE)', value: 'gynecology' },
  { name: 'Obstetrics (OBS)', value: 'obstetrics' },
  { name: 'Special Lectures/Prep', value: 'special-lectures-prep' },
  { name: 'Ward Notes', value: 'ward-notes' }
]

async function addSubjects() {
  console.log('Starting to add subjects to Sanity Studio...')
  
  try {
    let createdCount = 0
    let skippedCount = 0
    
    for (const subject of subjectsToAdd) {
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
        createdCount++
        console.log(`✅ Created subject: ${subject.name}`)
      } else {
        skippedCount++
        console.log(`⏭️  Subject already exists: ${subject.name}`)
      }
    }
    
    console.log('\n=== Summary ===')
    console.log(`✅ Created: ${createdCount} new subjects`)
    console.log(`⏭️  Skipped: ${skippedCount} existing subjects`)
    console.log('All subjects have been processed successfully!')
    
  } catch (error) {
    console.error('❌ Error adding subjects:', error)
    process.exit(1)
  }
}

// Run the script
addSubjects()