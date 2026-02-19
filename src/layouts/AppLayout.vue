<script setup lang="ts">
import { ref } from "vue";
import AppSidebar from "@/components/layout/sidebar.vue";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

const isCollapsed = ref(false);
</script>

<template>
  <!-- Sidebar -->
  <AppSidebar
    :collapsed="isCollapsed"
    @update:collapsed="isCollapsed = $event"
  />

  <!-- Main Content -->
  <div
    :class="[
      'min-h-screen transition-all duration-300 p-6 bg-gray-50',
      isCollapsed ? 'ml-20' : 'ml-64',
    ]"
  >
    <Header />
    <main class="p-6">
      <router-view />
    </main>

    <Footer />
  </div>
</template>
