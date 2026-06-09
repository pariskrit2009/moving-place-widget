import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "widget-dev.porchmovinggroup.com",
    port: 5173,
    cors: true,
    proxy: {
      "/api": {
        target: "https://widget-staging.porchmovinggroup.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
