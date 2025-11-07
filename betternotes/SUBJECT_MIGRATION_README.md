# Subject Management Migration Guide

This document explains how to migrate from static subject list to dynamic subject management in Sanity Studio.

## What Changed

1. **New Subject Document Type**: Created a new `subject` document type with fields for name and value
2. **Updated Note Schema**: Changed from static string list to reference field
3. **Studio Structure**: Added "Subjects" to the Sanity Studio menu

## How to Run Migration

### Prerequisites

You need a Sanity API token with write permissions. Get one from:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to API tab
4. Create a new token with "Write" permissions

### Migration Steps

1. **Set environment variable**:
   ```bash
   export SANITY_API_TOKEN=your_token_here
   ```

2. **Run the migration script**:
   ```bash
   cd betternotes
   node scripts/migrate-subjects.js
   ```

The script will:
- Create subject documents for all existing subjects
- Update all notes to reference the new subject documents
- Preserve all existing data

## How to Use New Subject Management

### Adding a New Subject

1. Open Sanity Studio
2. Click on "Subjects" in the left menu
3. Click the "+ New Subject" button
4. Fill in:
   - **Subject Name**: Display name (e.g., "Neurology")
   - **Value**: Auto-generated from name (used for URLs)
   - **Description**: Optional description

### Removing a Subject

1. Go to "Subjects" in the Studio
2. Find the subject you want to remove
3. Click the three dots menu
4. Select "Delete"

**Note**: If a subject is referenced by notes, you'll need to:
1. Update those notes to use a different subject
2. Or clear the subject field from those notes
3. Then you can delete the subject

### Updating Notes

When editing a note:
- The subject field now shows a searchable dropdown
- You can select from existing subjects
- If no subject is selected, the note won't appear on the website (as per existing system)

## Benefits

- **Dynamic Management**: Add/remove subjects without code changes
- **Data Integrity**: References ensure consistency
- **Scalability**: Easy to add new subjects as needed
- **User-Friendly**: Non-technical users can manage subjects

## Troubleshooting

### Migration Fails
- Check your API token has write permissions
- Ensure you're connected to the correct dataset
- Verify the script can connect to Sanity

### Subjects Not Showing in Notes
- Make sure the migration completed successfully
- Check that subject documents were created
- Verify the note schema is using reference field

### Can't Delete Subject
- Check if any notes reference this subject
- Update or remove references first
- Then try deleting again