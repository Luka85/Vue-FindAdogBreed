import vue from "@vitejs/plugin-vue2";

export default {
  plugins: [vue()],
  base:
    process.env.NODE_ENV === "production" ? "/Vue-FindAdogBreed/breeds" : "/",
};
