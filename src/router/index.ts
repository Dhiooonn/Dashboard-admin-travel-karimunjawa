import { createRouter, createWebHistory } from "vue-router";

import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Bookings from "@/pages/Bookings.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { title } from "process";

const routes = [
  // Login route
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: AppLayout,
    children: [
      // Dashboard route
      {
        path: "",
        component: Dashboard,
        meta: {
          title: "Dashboard Overview",
          subtitle: "Monitor your business performance at a glance",
        },
      },
      // Bookings route
      {
        path: "/bookings",
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
