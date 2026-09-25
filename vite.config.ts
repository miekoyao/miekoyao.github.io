import { reactRouter } from "@react-router/dev/vite";
import svgr from 'vite-plugin-svgr';
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), svgr()],
  resolve: {
    tsconfigPaths: true,
  },
});
