import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tanstackRouter(),
    tanstackStart(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  tanstackStart: {
    server: { entry: "src/server.ts" },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
