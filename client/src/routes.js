import VueRouter from "vue-router";
import BreedsList from "@components/BreedsList.vue";
import NotFound from "@components/NotFound.vue";
import BreedDetails from "@components/BreedDetails.vue";
import UserAuth from "@components/UserAuth.vue";

import { useStore } from "@/store";

const isProduction = process.env.NODE_ENV === "production";

const router = new VueRouter({
  mode: "history",
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
      meta: { requiresAuth: true },
    },
    {
      name: "search",
      path: "/breeds/search/",
      component: BreedsList,
      meta: { requiresAuth: true },
    },
    {
      name: "breedName",
      path: "/breeds/:breedName/",
      component: BreedsList,
      props: true,
      meta: { requiresAuth: true },

      children: [
        {
          name: "details",
          path: "details",
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      name: "auth",
      path: "/auth",
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
    { name: "notFound", path: "/:notFound(.*)*", component: NotFound },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.path !== "/auth/" && to.meta.requiredAuth) {
    console.log(myStore);
    console.log(to);
    console.log("not authorized");
    next("/auth");
    return;
  } else if (to.path === "/auth" && !to.meta.requiredAuth) {
    console.log(to.meta);
    console.log("succesufly authorized");
    next();
  } else {
    next();
  }
});

export default router;
