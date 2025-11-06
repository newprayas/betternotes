# Better Notes - A Modern Note-Taking Application

A Next.js application powered by Sanity CMS for content management.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Sanity CLI installed (`npm install -g @sanity/cli`)

### 1. Clone and Install
```bash
git clone <repository-url>
cd betternotes
npm install
```

### 2. Configure Environment
Create a `.env.local` file:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Run Development Servers

**Option A: Easy Start (macOS)**
```bash
./run-dev.sh
```

**Option B: Manual Start**
Open two terminals:

Terminal 1 (Next.js app):
```bash
npm run dev
```
Opens at: http://localhost:3000

Terminal 2 (Sanity Studio):
```bash
npm run studio
```
Opens at: http://localhost:3333

## 📁 Project Structure

```
betternotes/
├── app/                    # Next.js App Router pages
│   ├── notes/             # Notes listing and detail pages
│   ├── checkout/          # Checkout page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/           # Header, Footer components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
│   └── sanity/           # Sanity client and schema
├── types/                # TypeScript type definitions
├── sanity.config.ts      # Sanity Studio configuration
├── run-dev.sh           # Development runner script
└── DEVELOPMENT_GUIDE.md # Detailed setup instructions
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 with App Router
- **UI**: React 19 with Tailwind CSS
- **CMS**: Sanity.io for content management
- **Language**: TypeScript

## 📚 Key Features

- **Content Management**: Full-featured CMS with Sanity Studio
- **Note System**: Create, edit, and organize notes
- **E-commerce Integration**: Purchase notes with discount codes
- **Responsive Design**: Works on all devices
- **Type Safety**: Full TypeScript implementation

## 🔧 Development

### Adding New Content Types
1. Edit `lib/sanity/schema.ts` to add new schemas
2. Restart Sanity Studio (`npm run studio`)
3. New types will appear in the Studio

### Fetching Data
```typescript
import { client } from '@/lib/sanity/client'

const notes = await client.fetch('*[_type == "note"]')
```

### Building for Production
```bash
npm run build
npm start
```

## 📖 Documentation

- [Development Guide](./DEVELOPMENT_GUIDE.md) - Detailed setup and development instructions
- [Troubleshooting Guide](./TROUBLESHOOTING_SANITY_STUDIO.md) - Common issues and solutions
- [Content Management Guide](./CONTENT_MANAGEMENT_GUIDE.md) - Using Sanity Studio
- [Deployment Instructions](./DEPLOYMENT_INSTRUCTIONS.md) - Deploying to production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
