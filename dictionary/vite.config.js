import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/search": {
        target: "https://www.google.com",
        changeOrigin: true,
      },
      "/api": {
        target: "http://itgirlschool.justmakeit.ru",
        changeOrigin: true,
      },
    },
  },
});
