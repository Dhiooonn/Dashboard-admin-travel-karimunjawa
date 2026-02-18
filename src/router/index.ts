import { createRouter, createWebHistory } from "vue-router"
import Login from "@/pages/Login.vue"
// import Dashboard from "@/pages/Dashboard.vue"

const routes = [
  { path: "/login", component: Login },
  // { path: "/", component: Dashboard },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})