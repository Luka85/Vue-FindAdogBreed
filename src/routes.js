import VueRouter from "vue-router";
import BreedsList from "./components/BreedsList.vue";
import NotFound from "./components/NotFound.vue";

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

    { name: "notFound", path: "/:notFound(.*)*", component: NotFound },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
