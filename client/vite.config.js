import vue from "@vitejs/plugin-vue2";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import path from "path";

import { defineConfig } from "vite";

export default defineConfig({
  base: "/vite-deploy-demo/",
  plugins: [vue(), pluginRewriteAll()],

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
