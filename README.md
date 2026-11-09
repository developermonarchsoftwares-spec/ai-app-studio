# Dr. Ajay's Dental Centre — Website

A fast, fully-SSR dental clinic website for **Dr. Ajay Kumar N Sachdev, MDS (Orthodontics)** at DB Road, RS Puram, Coimbatore.

Built with **TanStack Start** (React 19, file-based routing, SSR), **Tailwind CSS v4**, and **shadcn/ui** components.

## Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (React 19 + SSR) |
| Styling | Tailwind CSS v4 (Vanilla CSS tokens) |
| UI Components | shadcn/ui (Radix UI) |
| AI Assistant | OpenAI API (gpt-4o-mini streaming) |
| Runtime | Nitro (edge-deployable) |
| Package manager | Bun |

## Getting started

```bash
bun install
bun run dev
```

The dev server starts at `http://localhost:3000`.

## Environment variables

Create a `.env.local` file in the project root:

```env
# Required for the Smile Desk AI chat assistant
OPENAI_API_KEY=sk-...
```

If `OPENAI_API_KEY` is absent, the chat assistant returns a friendly error and patients are directed to call or WhatsApp instead.

## Project structure

```
src/
  routes/
    index.tsx          # Home page
    treatments.tsx     # Treatments & prices
    doctor.tsx         # Meet the doctor
    contact.tsx        # Location & hours
    api/public/chat.ts # Streaming AI chat endpoint
  components/site/
    Layout.tsx         # Header, footer, CTA buttons, mobile bar
    ChatAssistant.tsx  # Smile Desk chat panel + floating button
    Reveal.tsx         # Scroll reveal + count-up animations
  lib/
    clinic.ts          # Single source of truth for all clinic data
  styles.css           # Design tokens (Tailwind v4 theme)
```

## Clinic data

All clinic facts (name, doctor, address, phone, treatments, hours, FAQs, etc.) live in a single file: [`src/lib/clinic.ts`](src/lib/clinic.ts). Editing that file keeps the pages and the AI assistant prompt in sync automatically.

## Deployment

Build a production bundle:

```bash
bun run build
```

The output is a Nitro-powered edge-ready server. Deploy to any platform that supports a Node.js or Cloudflare Workers runtime.
