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
      import(/* webpackChunkName: "Landing" */ "../views/desktop/Landing.vue"),
    beforeEnter: (to, from, next) => {
      const { InvitationKey = "" } = to.query;

      if (InvitationKey === "") {
        next({ name: "Error" });
        return;
      }

      sessionStorage.clear();

      if (mobile) {
        next({ name: "MobileLanding", query: to.query });
        return;
      }

      next();
    },
  },
  {
    path: "/question",
    name: "Question",
    component: () =>
      import(/* webpackChunkName: "Question" */ "../views/About.vue"),
    beforeEnter: (to, from, next) => {
      const isLeaving = sessionStorage.getItem("leaving") === "true";

      const { InvitationKey = "" } = to.query;

      if (InvitationKey === "" || isLeaving) {
        next({ name: "Error" });
        return;
      }

      if (mobile) {
        next({ name: "MobileQuestion", query: to.query });
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
      if (mobile) {
        next({ name: "MobileEnding", query: to.query });
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
      const { InvitationKey = "" } = to.query;

      if (InvitationKey === "") {
        next({ name: "Error" });
        return;
      }

      sessionStorage.clear();

      if (mobile === false) {
        next({ name: "Landing", query: to.query });
        return;
      }

      next();
    },
  },
  {
    path: "/m/question",
    name: "MobileQuestion",
    component: () =>
      import(
        /* webpackChunkName: "mobileQuestion" */ "../views/mobile/Question.vue"
      ),
    beforeEnter: (to, from, next) => {
      const isLeaving = sessionStorage.getItem("leaving") === "true";
      const { InvitationKey = "" } = to.query;

      if (InvitationKey === "" || isLeaving) {
        next({ name: "Error" });
        return;
      }

      if (mobile === false) {
        next({ name: "Question", query: to.query });
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
        next({ name: "Ending", query: to.query });
        return;
      }

      next();
    },
  },
  {
    path: "/error",
    name: "Error",
    component: () =>
      import(/* webpackChunkName: "Error" */ "../views/Error.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

Vue.use(VueRouter);
export default router;
