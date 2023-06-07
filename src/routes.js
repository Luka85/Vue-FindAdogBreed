import VueRouter from "vue-router";
import BreedsList from "./components/BreedsList.vue";
import NotFound from "./components/NotFound.vue";
import BreedDetails from "./components/BreedDetails.vue";

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    {
      name: "redirect",
      path: "/",
      component: BreedsList,
      redirect: "/Vue-FindAdogBreed//breeds/",
    },
    {
      name: "breeds",
      path: "/Vue-FindAdogBreed//breeds/",
      component: BreedsList,
    },
    {
      name: "breedName",
      path: "/Vue-FindAdogBreed//breeds/:breedName",
      component: BreedsList,
      props: true,
      children: [
        {
          name: "details",
          path: "details",
          component: BreedDetails,
        },
      ],
    },

    {
      name: "search",
      path: "/Vue-FindAdogBreed/search/",
      component: BreedsList,
    },

    { name: "notFound", path: "/:notFound(.*)*", component: NotFound },
  ],
});

export default router;
