// Vite + TanStack Start configuration for Dr. Ajay's Dental Centre website.
//
// Plugins included:
//   - @vitejs/plugin-react      — React fast-refresh
//   - @tailwindcss/vite        — Tailwind v4 (zero-config)
//   - vite-tsconfig-paths      — @ alias resolution
//   - @tanstack/router-plugin  — file-based routing + code splitting
//   - nitro (via TanStack Start) — SSR / edge deployment
//
// Never set ssr.external or resolve.external: the Worker has no runtime module
// resolution, so the build fails. Never add compression plugins: hosting
// compresses at the edge.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart(),
    nitro(), // emits the Vercel output when built on Vercel (auto-detected)
    viteReact(),
  ],
});
