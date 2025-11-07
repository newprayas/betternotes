# Scripts for Managing Content in Sanity Studio

## add-all-subjects.js

This script adds all the medical subjects to your Sanity Studio. It will create the following subjects if they don't already exist:

- Pharmacology
- Forensic Medicine
- Community Medicine
- Microbiology
- Pathology
- Surgery
- Eye (Ophthalmology)
- ENT (Otolaryngology)
- Medicine (Includes Pediatrics, Dermatology, Psychiatry)
- Gynecology (GYNE)
- Obstetrics (OBS)
- Special Lectures/Prep
- Ward Notes

## add-notes.js

This script adds all the medical notes to your Sanity Studio. It will create 39 notes across different subjects and academic years:

### 3rd Year Notes:
- Pharmacology notes (TERM 1, TERM 2, Full PROF VIVA, Autonomic concept)
- Forensic Medicine notes (Full PROF WRITTEN, Full PROF VIVA, Toxicology)
- 3rd Year Bundle (Pharma + Forensic)

### 4th Year Notes:
- Community Medicine notes (Full PROF WRITTEN, Full PROF VIVA)
- Microbiology notes (TERM 1, TERM 2, Full PROF VIVA)
- Pathology notes (TERM 1, TERM 2, Full PROF VIVA)
- 4th Year Bundle (Commed + Micro + Patho)

### 5th Year Notes:
- Special Lecture notes (Masud sir's, Jashim sir's)
- Surgery notes (Full PROF WRITTEN, Full PROF VIVA)
- Eye notes (Full PROF WRITTEN)
- ENT notes (Full PROF WRITTEN)
- Eye-ENT notes (Full PROF VIVA)
- Medicine notes (Paper 1, Paper 2, Full PROF VIVA)
- Gynecology notes (Written, Full PROF VIVA)
- Obstetrics notes (Written, Full PROF VIVA)
- Ward Notes (EYE, ENT, Pedi, Pediatric surgery, Neurosurgery, Orthopedics, Combined)
- 5th Year Bundle (Everything)

## How to Run

### Option 1: Using the shell scripts (recommended)

1. Set your Sanity API token as an environment variable:
   ```bash
   export SANITY_API_TOKEN=your_token_here
   ```

2. Run the subjects script:
   ```bash
   ./scripts/add-subjects.sh
   ```

3. Run the notes script:
   ```bash
   ./scripts/add-notes.sh
   ```

### Option 2: Running the JavaScript files directly

1. Set your Sanity API token as an environment variable:
   ```bash
   export SANITY_API_TOKEN=your_token_here
   ```

2. Run the subjects script:
   ```bash
   node scripts/add-all-subjects.js
   ```

3. Run the notes script:
   ```bash
   node scripts/add-notes.js
   ```

## Getting Your Sanity API Token

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to the API tab
4. Click "Add new token"
5. Give it a name (e.g., "Content Management")
6. Select the permissions you need (at least "Write" for documents)
7. Copy the token and use it as shown above

## What the Scripts Do

### add-all-subjects.js:
- Checks if each subject already exists in Sanity Studio
- Creates new subjects only if they don't exist
- Skips subjects that are already in the system
- Provides a summary of how many subjects were created vs. skipped

### add-notes.js:
- Fetches all subjects to create proper references
- Creates notes with proper titles, slugs, prices, and page numbers
- Links each note to the correct subject
- Handles special cases like bundles and combined subjects
- Provides a summary of how many notes were created vs. skipped