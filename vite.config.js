// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
  base: "/Shopping-cart-FronEnd-Mentor-Challenge/", // Ensures that all URLs are relative
});
