# Dr. Ajay's Dental Centre — Agent & Contributor Guide

## Project conventions

- **Clinic facts** live in `src/lib/clinic.ts` and feed both the pages and the AI assistant prompt — never duplicate them.
- **Styling** is done exclusively through Tailwind v4 utility classes and the CSS custom-property tokens in `src/styles.css`. Do not add ad-hoc inline styles.
- **AI gateway** — the chat assistant calls `POST /api/public/chat` which streams from the OpenAI API server-side. The key is `OPENAI_API_KEY` in `.env.local`. Never expose this key in browser code.
- **Secrets** — store in `.env.local` (gitignored). Never commit secret values.

## File map

| File | Purpose |
|---|---|
| `src/lib/clinic.ts` | Single source of truth: name, doctor, address, treatments, hours, FAQs |
| `src/routes/index.tsx` | Home page |
| `src/routes/treatments.tsx` | Treatments & indicative prices |
| `src/routes/doctor.tsx` | Meet the doctor |
| `src/routes/contact.tsx` | Location, map, hours |
| `src/routes/api/public/chat.ts` | Streaming AI chat endpoint (OpenAI) |
| `src/components/site/Layout.tsx` | Header, footer, CTA buttons, mobile sticky bar |
| `src/components/site/ChatAssistant.tsx` | Smile Desk AI chat panel + FAB |
| `src/styles.css` | Tailwind v4 `@theme` — all design tokens |

## Dev commands

```bash
bun run dev      # start dev server
bun run build    # production build
bun run test     # run unit tests
bun run lint     # ESLint
bun run format   # Prettier
```
