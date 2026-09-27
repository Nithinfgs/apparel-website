# Garment Sourcing & Apparel Manufacturing Brand Website & Interactive Design Studio

A modern, high-performance public marketing website, interactive 3D/canvas garment design studio, and client lead-intake platform built for modern apparel sourcing and garment manufacturing enterprises.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Motion (Framer Motion), Lucide Icons, and Zod.

---

## Key Highlights & Features

- **Interactive Garment Design Lab (`/design`)**:
  - Live garment customizer supporting hoodies, heavyweight t-shirts, oversized crewnecks, and loopback joggers.
  - Interactive fabric weight selection (220 GSM up to 500 GSM), wash treatments (acid wash, vintage fade, enzyme wash, silicone softener), and custom Pantone shade picking.
  - Multi-placement artwork customizer (chest, back, left sleeve, right sleeve) and size-breakdown matrix generator.
  - Direct integration into the Request for Quote (RFQ) pipeline.

- **Product Catalogue & Material Index (`/products`, `/products/[category]`)**:
  - Structured catalog spanning heavyweight fleece, luxury single jersey, loopback terry, custom knitwear, and technical outerwear.
  - Fabric specifications: yarn count, knitting gauge, GSM, composition, and low MOQ thresholds (from 50 units).

- **Scroll-Driven Production Journey (`/how-we-work`)**:
  - Interactive roadmap walking clients through each stage of garment manufacturing: yarn spinning, knitting/weaving, dyeing & lab dip approvals, pattern making, proto & PP sampling, bulk cutting & sewing, inline quality audits, and global logistics.

- **Quality & Compliance Standards (`/quality`)**:
  - Detailed breakdown of factory standards: AQL 2.5 / 4.0 inspection gates, 4-point fabric roll inspection, colorfastness to washing/light, and dimensional stability/shrinkage tolerances.

- **Automated Lead Intake & RFQ System (`/contact`, modal forms)**:
  - Strongly typed, multi-step quote and inquiry intake system validated with Zod schemas (`src/lib/validation/public-enquiry.ts`).
  - Pluggable lead store (`src/lib/public/enquiry-intake.ts`) ready for webhook forwarding or direct API integration with the internal operations ERP dashboard.

- **Creative Visual Design & Kinetic UI**:
  - Dark aesthetic with dynamic ambient lighting.
  - Custom fluid cursor with magnetic button attraction and kinetic text animations.
  - Responsive fabric weave visual canvas art.

---

## Tech Stack

- **Framework**: Next.js 16.3.5 (App Router) + React 19.2.8 + TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`) + Custom Design Tokens
- **Animations**: `motion` (Framer Motion v13) + CSS transforms
- **Icons**: Lucide React
- **Validation**: Zod v4 schemas

---

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

---

## Verification & Testing

```bash
# Run lead intake and validation tests
npm test

# Run TypeScript strict type verification
npx tsc --noEmit

# Run ESLint validation
npm run lint

# Build production bundle
npm run build
```

---

## Repository Structure

```
src/
  app/
    page.tsx                # Cinematic landing page with fabric showcase & interactive story
    about/                  # Company background, sourcing network & values
    how-we-work/            # Scroll-driven step-by-step manufacturing process
    products/               # Product category catalog & material index
    products/[category]/    # Category detail pages
    design/                 # Interactive 3D/Canvas Garment Design Lab & Quote Builder
    quality/                # Quality assurance, testing labs & AQL standards
    blog/                   # Editorial & industry insights
    blog/[slug]/            # Article pages
    contact/                # Public quote request & lead intake form
    actions.ts              # Server Actions for public enquiry handling
    layout.tsx              # Root shell with custom cursor, global header & footer
  components/
    site/
      design-lab/           # Garment 2D/3D customizer, color picker & size breakdown
      fabric-art.tsx        # Interactive fabric weave canvas simulation
      garment-svg.tsx       # Dynamic vector garment silhouettes
      how-we-work-journey.tsx # Interactive step-by-step manufacturing roadmap
      quote-form.tsx        # Multi-step RFQ submission modal
      magnetic-button.tsx   # Magnetic cursor interactive button
      reveal.tsx            # Kinetic scroll-triggered animation components
      header.tsx            # Sticky navigation bar with mobile drawer
      footer.tsx            # Site footer & contact links
  lib/
    public/                 # Public in-memory lead store & intake handlers
    site/                   # Static data for products, process, blog & design lab
    validation/             # Zod validation schemas for RFQs and sample requests
  types/
    lead.ts                 # Type definitions for public leads, quotes & design configs
tests/                      # Automated unit tests for lead intake and validation
```
