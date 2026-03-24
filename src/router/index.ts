import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Bookings from "@/pages/Bookings.vue";
import Customers from "@/pages/Customers.vue";
import Destinations from "@/pages/Destinations.vue";
import Payments from "@/pages/Payments.vue";
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

  // Customers route
  {
    path: "/customers",
    component: AppLayout,
    children: [
      {
        path: "",
        component: Customers,
        meta: {
          title: "Manage Customers",
          subtitle: "View and manage all your customers in one place",
        },
      },
    ],
  },
  // Destinations route
  {
    path: "/destinations",
    component: AppLayout,
    children: [
      {
        path: "",
        component: Destinations,
        meta: {
          title: "Destinations & Packages",
          subtitle: "Manage travel destinations and tour packages",
        },
      },
    ],
  },

  // Payments route
  {
    path: "/payments",
    component: AppLayout,
    children: [
      {
        path: "",
        component: Payments,
        meta: {
          title: "Payment Transactions",
          subtitle: "Track and manage all payments",
        },
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
