const fs = require('fs');
const path = require('path');

// Function to create a slug from a title (for folder names)
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 100); // Limit length for file system compatibility
}

// Function to sanitize folder names (remove special characters that cause issues)
function sanitizeFolderName(name) {
  return name
    .replace(/[\/\\:*?"<>|]/g, '-') // Replace invalid file system characters with dash
    .replace(/--+/g, '-') // Replace multiple dashes with single dash
    .replace(/^-|-$/g, ''); // Remove leading/trailing dashes
}

// Define all the notes data (same as in add-notes.js)
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
];

// Base directory for all folders
const baseDirectory = '/Users/pustak/Downloads/Images to upload';

function createFolderStructure() {
  console.log('Creating folder structure...');
  
  // Create the base directory if it doesn't exist
  if (!fs.existsSync(baseDirectory)) {
    fs.mkdirSync(baseDirectory, { recursive: true });
    console.log(`Created base directory: ${baseDirectory}`);
  }
  
  let yearsCreated = 0;
  let subjectsCreated = 0;
  let noteFoldersCreated = 0;
  
  // Process each year
  for (const yearData of notesData) {
    const yearPath = path.join(baseDirectory, yearData.year);
    
    // Create year folder if it doesn't exist
    if (!fs.existsSync(yearPath)) {
      fs.mkdirSync(yearPath);
      yearsCreated++;
      console.log(`Created year folder: ${yearData.year}`);
    }
    
    // Create subject folder
    const sanitizedSubjectName = sanitizeFolderName(yearData.subject);
    const subjectPath = path.join(yearPath, sanitizedSubjectName);
    if (!fs.existsSync(subjectPath)) {
      fs.mkdirSync(subjectPath);
      subjectsCreated++;
      console.log(`Created subject folder: ${yearData.subject} -> ${sanitizedSubjectName}`);
    }
    
    // Create folders for each note
    for (const note of yearData.notes) {
      const noteFolderName = sanitizeFolderName(note.title);
      const notePath = path.join(subjectPath, noteFolderName);
      
      if (!fs.existsSync(notePath)) {
        fs.mkdirSync(notePath);
        noteFoldersCreated++;
        console.log(`Created note folder: ${note.title} -> ${noteFolderName}`);
      }
    }
  }
  
  console.log('\n=== Summary ===');
  console.log(`✅ Created: ${yearsCreated} year folders`);
  console.log(`✅ Created: ${subjectsCreated} subject folders`);
  console.log(`✅ Created: ${noteFoldersCreated} note folders`);
  console.log('Folder structure created successfully!');
}

// Run the script
createFolderStructure();