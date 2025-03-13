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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
 router.beforeEach((to, from , next)=>{
  const authStore = useAuthStore();
  if(to.meta.requiresAuth && !authStore.isAuthenticated){
    next("/login");
  }
  else{
    next();
  }
 });
export default router;
