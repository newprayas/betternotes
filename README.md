# @Better Notes V2

A modern, mobile-first e-commerce website for selling medical notes to MBBS students. Built with Next.js 15, TypeScript, Tailwind CSS, and Sanity.io.

## Features

- 📱 Mobile-first responsive design
- 🛒 Shopping cart with local storage persistence
- 🔍 Advanced filtering by academic year, subject, and exam type
- 🖼️ Image gallery with zoom and pan functionality
- 💳 Simple checkout process with Telegram integration
- 🎨 Clean, modern UI with black, yellow/gold, and red accent colors
- ⚡ Optimized performance with Next.js App Router
- 📝 Content management with Sanity.io CMS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **CMS**: Sanity.io
- **Image Handling**: react-zoom-pan-pinch
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Sanity.io account (for content management)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd better-notes-v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then update `.env.local` with your Sanity project details:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. Set up Sanity CMS:
   ```bash
   npx @sanity/cli init
   ```
   
   Follow the prompts to connect to your Sanity project.

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
better-notes-v2/
├── app/                    # Next.js App Router pages
│   ├── checkout/           # Checkout page
│   ├── notes/             # Notes catalog and individual note pages
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout with CartProvider
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── layout/           # Header and Footer components
│   └── ui/              # Reusable UI components
├── lib/                  # Utility libraries
│   ├── cart-context.tsx   # Shopping cart state management
│   └── sanity/          # Sanity CMS configuration and API
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Content Management

The website uses Sanity.io for content management. You can:

- Add and edit notes
- Manage discount codes
- Update images and descriptions
- Set featured notes

To access the Sanity Studio, run:
```bash
npm run sanity
```

Or visit `http://localhost:3000/studio` when your development server is running.

## Deployment

### Vercel (Recommended)

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Add your environment variables in Vercel's dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js applications.

## Customization

### Colors

The color scheme is defined in `app/globals.css`:
- Primary: Black
- Accent: Yellow/Gold
- Destructive: Red

### Adding New Notes

1. Go to your Sanity Studio
2. Add a new "Note" document
3. Fill in the details and upload images
4. Publish to make it live on the website

### Telegram Integration

The checkout process is simplified to display Telegram contact information. Update the contact details in:
- `app/checkout/page.tsx`
- `components/layout/footer.tsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact us on Telegram at @betternotes.
