<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import {
  LayoutDashboard,
  Calendar,
  Users,
  MapPin,
  CreditCard,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";

//
const props = defineProps<{
  collapsed: boolean;
}>();

const emit = defineEmits(["update:collapsed"]);

const toggleSidebar = () => {
  emit("update:collapsed", !props.collapsed);
};

const route = useRoute();
const router = useRouter();

// Menu Data
const mainMenus = [
  { name: "Dashboard", route: "/", icon: LayoutDashboard },
  { name: "Bookings", route: "/bookings", icon: Calendar, badge: 12 },
  { name: "Customers", route: "/customers", icon: Users },
  { name: "Destinations", route: "/destinations", icon: MapPin },
  { name: "Payments", route: "/payments", icon: CreditCard },
  { name: "Analytics", route: "/analytics", icon: BarChart3 },
];

const systemMenus = [
  { name: "Settings", route: "/settings", icon: Settings },
  { name: "Help & Support", route: "/support", icon: HelpCircle },
];
</script>

<template>
  <aside
    :class="[
      'fixed top-0 left-0 bg-white border-r h-screen flex flex-col transition-all duration-300 z-40',
      props.collapsed ? 'w-20' : 'w-64',
    ]"
  >
    <!-- header -->
    <div class="p-4 border-b flex items-center justify-between">
      <div v-if="!props.collapsed">
        <h1 class="text-xl font-bold">Karimunjawa</h1>
        <p class="text-xs text-gray-400">Travel Admin</p>
      </div>

      <button
        @click="toggleSidebar"
        class="p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <component
          :is="props.collapsed ? ChevronRight : ChevronLeft"
          class="w-4 h-4"
        />
      </button>
    </div>

    <!-- content -->
    <div class="flex-1 overflow-y-auto p-4 space-y-6">
      <!-- Main Menu -->
      <nav class="space-y-1">
        <div
          v-for="menu in mainMenus"
          :key="menu.name"
          @click="router.push(menu.route)"
          :title="props.collapsed ? menu.name : ''"
          :class="[
            'flex items-center px-3 py-2 rounded-lg cursor-pointer transition',
            props.collapsed ? 'justify-center' : 'justify-between',
            route.path === menu.route
              ? 'bg-indigo-500 text-white'
              : 'hover:bg-gray-100',
          ]"
        >
          <div
            :class="[
              'flex items-center gap-3',
              props.collapsed && 'justify-center',
            ]"
          >
            <component :is="menu.icon" class="w-4 h-4" />
            <span v-if="!props.collapsed">{{ menu.name }}</span>
          </div>

          <span
            v-if="menu.badge && !props.collapsed"
            class="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full"
          >
            {{ menu.badge }}
          </span>
        </div>
      </nav>

      <!-- System Section -->
      <div v-if="!props.collapsed" class="text-xs text-gray-400 uppercase">
        System
      </div>

      <nav class="space-y-1">
        <div
          v-for="menu in systemMenus"
          :key="menu.name"
          @click="router.push(menu.route)"
          :title="props.collapsed ? menu.name : ''"
          :class="[
            'flex items-center px-3 py-2 rounded-lg cursor-pointer transition',
            props.collapsed ? 'justify-center' : 'gap-3',
            route.path === menu.route
              ? 'bg-indigo-500 text-white'
              : 'hover:bg-gray-100',
          ]"
        >
          <component :is="menu.icon" class="w-4 h-4" />
          <span v-if="!props.collapsed">{{ menu.name }}</span>
        </div>
      </nav>
    </div>

    <!-- Profile -->
    <div class="border-t p-4 flex items-center justify-center">
      <div class="w-8 h-8 bg-gray-300 rounded-full"></div>

      <div v-if="!props.collapsed" class="ml-3">
        <p class="text-sm font-medium">Admin User</p>
        <p class="text-xs text-gray-400">admin@karimunjawa.com</p>
      </div>
    </div>
  </aside>
</template>
