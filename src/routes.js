import VueRouter from "vue-router";
import BreedsList from "./components/BreedsList.vue";
import NotFound from "./components/NotFound.vue";
import BreedDetails from "./components/BreedDetails.vue";

let basePath = "/";
if (process.env.NODE_ENV === "production") {
  basePath = "/Vue-FindAdogBreed/";
}

const router = new VueRouter({
  mode: "history",
  base: "/Vue-FindAdogBreed/",
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
      name: "search",
      path: "/breeds/search/",
      component: BreedsList,
    },
    {
      name: "breedName",
      path: "/breeds/:breedName",
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

    { name: "notFound", path: "/:notFound(.*)*", component: NotFound },
  ],
});

export default router;
