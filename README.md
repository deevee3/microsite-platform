# HVAC Repair Microsite Platform

A scalable, JSON-driven microsite platform for HVAC repair services. Each microsite is dynamically generated with location-specific content, optimized for lead conversion and local SEO.

## Tech Stack

**Framework & Language:**
- Next.js 15+ (App Router, Static Site Generation)
- TypeScript 5+ (Strict Mode)
- React 19

**Styling & UI:**
- TailwindCSS 4
- shadcn/ui components (Radix UI primitives)
- Lucide React icons
- Custom color theming per microsite

**Data & Validation:**
- JSON-based content storage (`src/data/microsites.json`)
- Zod schemas for runtime validation
- TypeScript interfaces for type safety

**Forms:**
- React Hook Form
- Zod validation
- Honeypot spam protection

**Deployment:**
- Cloudflare Pages with automatic CI/CD
- Static Site Generation (SSG)
- Global CDN distribution

**Testing:**
- Vitest (unit tests)
- Playwright (E2E tests)
- ESLint & TypeScript checks

## Project Structure

```
microsite-platform/
├── src/
│   ├── app/
│   │   ├── [domain]/page.tsx       # Dynamic microsite page
│   │   ├── layout.tsx              # Root layout
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components
│   │   ├── Hero.tsx                # Hero section with gradient backgrounds
│   │   ├── ServiceHighlights.tsx   # Feature cards with hover effects
│   │   ├── LeadForm.tsx            # Contact form with validation
│   │   ├── Testimonials.tsx        # Customer testimonial cards
│   │   ├── FAQ.tsx                 # Interactive accordion FAQ
│   │   └── Footer.tsx              # Footer with contact info
│   ├── data/
│   │   └── microsites.json         # All microsite content
│   ├── lib/
│   │   ├── data-client.ts          # Data fetching utilities
│   │   ├── types.ts                # TypeScript types
│   │   ├── validations.ts          # Zod schemas
│   │   ├── utils.ts                # Utility functions
│   │   └── color.ts                # Color manipulation helpers
│   └── functions/
│       └── api/
│           └── submit-lead.ts      # Cloudflare Pages Function for form submissions
├── tests/
│   ├── e2e/                        # Playwright E2E tests
│   └── unit/                       # Vitest unit tests
└── public/                         # Static assets
```

## UI Design Patterns

### Modern, Conversion-Focused Design
All components feature:
- **Gradient backgrounds** with animated blur effects
- **Hover animations** and smooth transitions
- **Accent color theming** that adapts per microsite
- **Trust indicators** (ratings, badges, certifications)
- **Mobile-first responsive** design
- **Accessibility** (ARIA labels, semantic HTML)

### Component Features

**Hero:**
- Dual-column layout with animated gradients
- Trust badges (5-star ratings, Licensed & Insured)
- Prominent CTA buttons with hover effects
- 24/7 availability badge
- Glassmorphism info card

**ServiceHighlights:**
- 3-column responsive grid
- Icon-based feature cards
- Hover lift animations
- Bottom accent line on hover
- Decorative background elements

**Testimonials:**
- Quote icon and 5-star ratings
- Avatar circles with initials
- Hover shadow effects
- Responsive 2-column grid

**FAQ:**
- Interactive accordion (click to expand)
- Smooth height transitions
- Chevron rotation animation
- First item open by default

**LeadForm:**
- Dark theme with glassmorphism
- Inline validation errors
- Success/error states
- Honeypot spam protection

**Footer:**
- 3-column informational layout
- Contact details with icons
- Quick navigation links
- Copyright and legal links

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/hvacrepair-cincinnati-oh.com](http://localhost:3000/hvacrepair-cincinnati-oh.com) to view a microsite.

### Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory.

### Testing

```bash
# Unit tests
npm run test:unit

# E2E tests
npm run test:e2e

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Adding New Microsites

1. Add a new entry to `src/data/microsites.json`
2. Configure domain, city, accent color, and content
3. Commit and push to GitHub
4. Cloudflare Pages automatically deploys the new microsite

Example:
```json
{
  "id": 5,
  "domain": "hvacrepair-columbus-oh.com",
  "city": "Columbus",
  "state": "OH",
  "accent_color": "#dc2626",
  "hero_headline": "Emergency HVAC Repair in Columbus",
  ...
}
```

## Deployment

This project deploys automatically to Cloudflare Pages via GitHub integration:

1. Push to `main` branch
2. Cloudflare builds and deploys
3. Each domain gets its own custom subdomain/domain
4. SSL certificates auto-provision within 24 hours

## Environment Variables

Set in Cloudflare Pages dashboard:
- `RESEND_API_KEY` - For email delivery via Resend API

## Performance

- Sub-2 second load times on 3G
- 90+ Lighthouse scores
- Optimized images and fonts
- Zero runtime dependencies (fully static)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Cloudflare Pages](https://pages.cloudflare.com)
