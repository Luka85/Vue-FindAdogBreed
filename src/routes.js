import VueRouter from "vue-router";
import BreedsList from "./components/BreedsList.vue";

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    {
      name: "redirect",
      path: "/",
      component: BreedsList,
      redirect: "/breeds/",
    },
    {
      name: "breeds",
      path: "/breeds/",
      component: BreedsList,
    },
    {
      name: "breedName",
      path: "/breeds/:breedName",
      component: BreedsList,
      props: true,
    },

    {
      name: "search",
      path: "/search/",
      component: BreedsList,
    },

    { path: "/:notFound(.*)", component: BreedsList, redirect: "/breeds/" },
  ],
  scrollBehavior(to, from, savedPosition) {
    // console.log("to:", to, "from:", from, "savedPos:", savedPosition);
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
// router.beforeEach(function (to, from, next) {
//   console.log("beforeEach");
//   console.log(to, from);
//   next((vm) => console.log(vm));
//   // if (from.name === "search" && to.from === "breeds") {
//   //   next({ name: "breeds" });
//   // } else {
//   //   next();
//   // }
// });

export default router;
