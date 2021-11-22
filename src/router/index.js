import Vue from "vue";
import VueRouter from "vue-router";

import isMobile from "@/utils/isMobile";
import MobileLanding from "@/views/mobile/Landing.vue";

const mobile = isMobile();

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    beforeEnter: (to, from, next) => {
      if (mobile) {
        next("/m");
        return;
      }

      next();
    },
  },
  {
    path: "/ending",
    name: "Ending",
    component: () =>
      import(/* webpackChunkName: "Ending" */ "../views/About.vue"),
    beforeEnter: (to, from, next) => {
      if (mobile === false) {
        next("/m/ending");
        return;
      }

      next();
    },
  },
  {
    path: "/m",
    name: "MobileLanding",
    component: MobileLanding,
    beforeEnter: (to, from, next) => {
      if (mobile === false) {
        next("/");
        return;
      }

      next();
    },
  },
  {
    path: "/m/ending",
    name: "MobileEnding",
    component: () =>
      import(
        /* webpackChunkName: "mobileEnding" */ "../views/mobile/Ending.vue"
      ),
    beforeEnter: (to, from, next) => {
      if (mobile === false) {
        next("/ending");
        return;
      }

      next();
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

Vue.use(VueRouter);
export default router;
