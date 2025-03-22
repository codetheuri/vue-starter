import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About.vue";
import Food from "@/views/Food.vue";
import { useAuthStore } from "@/store/authStore";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/about",
    component: About,
    meta: { requiresAuth: true }
  },
  {
    path: "/food",
    component: Food,
    meta: { requiresAuth: true }
  },

  {
    path: "/login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/home",
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/props",
    component: () => import("@/views/Props.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/emit",
    component: () => import("@/views/Emit.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/computed",
    component: () => import("@/views/Shop.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/watch",
    component: () => import("@/views/Temp.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/mount",
    component: () => import("@/views/Mount.vue"),
    alias: "/mm",
    meta: { requiresAuth: true }
  },
  {
    path: "/users/:id",
    component: () => import("@/views/Users.vue"),

    meta: { requiresAuth: true },
    children: [
      {
        path: "profile",
        // component: () => import("@/views/Profile.vue"),
      },
      {
        path: "settings",
        component: () => import("@/views/UserSettings.vue"),
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/NotFound.vue")

  },
  {
    path: "/banners",
    component: () => import("@/views/banners/Banners.vue"),
    meta: { requiresAuth: true },
    // children: [{
    //   path: "add",
    //   component: () => import("@/views/banners/AddBanner.vue")
    // },]
  },
  {
    path:"/banners/add",
    component: () => import("@/views/banners/AddBanner.vue"),
    meta: { requiresAuth: true },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  }
  else {
    next();
  }
});
export default router;
