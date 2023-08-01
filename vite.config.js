import vue from "@vitejs/plugin-vue2";
import pluginRewriteAll from "vite-plugin-rewrite-all";

import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [vue(), pluginRewriteAll()],
});
