import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  base: isProduction ? "/Vue-FindAdogBreed/" : "/",
  plugins: [vue()],

  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
    ],
  },
});
