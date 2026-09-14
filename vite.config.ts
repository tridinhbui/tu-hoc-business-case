import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

// BC_STATE_DIR lets the end-to-end suite run against its own local D1/KV/R2 state
// (fixture data) without touching the development state that holds the real curriculum.
const stateDir = process.env.BC_STATE_DIR;

export default defineConfig({
  plugins: [react(), cloudflare({ persistState: stateDir ? { path: stateDir } : true })],
});
