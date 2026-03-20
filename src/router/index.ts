import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Bookings from "@/pages/Bookings.vue";
import AppLayout from "@/layouts/AppLayout.vue";

const routes: Array<RouteRecordRaw> = [
  // Root redirect
  {
    path: "/",
    redirect: "/login",
  },
  // Login route
  {
    path: "/login",
    component: Login,
  },
  // Dashboard route
  {
    path: "/dashboard",
    component: AppLayout,
    children: [
      {
        path: "/dashboard",
        component: Dashboard,
        meta: {
          title: "Dashboard Overview",
          subtitle: "Monitor your business performance at a glance",
        },
      },
    ],
  },
  // Bookings route
  {
    path: "/bookings",
    component: AppLayout,
    children: [
      {
        path: "",
        component: Bookings,
        meta: {
          title: "Manage Bookings",
          subtitle: "View and manage all your bookings in one place",
        },
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
