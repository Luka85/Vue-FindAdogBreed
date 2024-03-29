import VueRouter from "vue-router";
import BreedsList from "@components/BreedsList.vue";
import NotFound from "@components/NotFound.vue";
import BreedDetails from "@components/BreedDetails.vue";
import UserAuth from "@components/UserAuth.vue";

import { useStore } from "@/store";

const isProduction = process.env.NODE_ENV === "production";

const router = new VueRouter({
  // mode: "history",
  mode: "hash",
  base: isProduction ? "/Vue-FindAdogBreed/" : "/",
  routes: [
    {
      name: "redirect",
      path: "/",
      component: UserAuth,
      redirect: "/auth",
    },

    {
      name: "breeds",
      path: "/breeds/",
      component: BreedsList,
      meta: { requiredAuth: true },
    },
    {
      name: "search",
      path: "/breeds/search/",
      component: BreedsList,
      meta: { requiredAuth: true },
    },
    {
      name: "breedName",
      path: "/breeds/:breedName/",
      component: BreedsList,
      props: true,
      meta: { requiredAuth: true },

      children: [
        {
          name: "details",
          path: "details",
          component: BreedDetails,
          meta: { requiredAuth: true },
        },
      ],
    },
    {
      name: "auth",
      path: "/auth",
      component: UserAuth,
    },
    {
      name: "notFound",
      path: "/:notFound(.*)*",
      component: NotFound,
      meta: { requiredAuth: true },
    },
  ],
});
router.beforeEach((to, from, next) => {
  const store = useStore();
  console.log(store);
  const isAuthenticated = store.isAuthenticated;
  console.log(isAuthenticated);
  if (to.meta.requiredAuth && !isAuthenticated) {
    console.log(to, isAuthenticated);
    next({ name: "auth" });
  } else if (isAuthenticated) {
    console.log(isAuthenticated);
    next();
  } else {
    next();
  }
});

export default router;
