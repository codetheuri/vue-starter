import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About.vue";
import Food from "@/views/Food.vue";

const routes = [
  {
     path: "/", 
     component: () => import("@/views/Home.vue")
    },
  { 
    path: "/about",
     component: About 
    },
  {path: "/food",
     component: Food
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
