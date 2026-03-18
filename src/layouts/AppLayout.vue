<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// Components
import AppSidebar from "@/components/layout/sidebar.vue";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

const isMobileOrTablet = () => window.innerWidth < 1024;
const isCollapsed = ref(isMobileOrTablet());

const handleResize = () => {
  if (isMobileOrTablet() && !isCollapsed.value) {
    isCollapsed.value = true;
  } else if (!isMobileOrTablet() && isCollapsed.value) {
    isCollapsed.value = false;
  }
};

onMounted(() => window.addEventListener("resize", handleResize));
onUnmounted(() => window.removeEventListener("resize", handleResize));
</script>

<template>
  <div class="relative min-h-screen bg-gray-50">
    <!-- Mobile Overlay Backdrop -->
    <div
      v-if="!isCollapsed"
      @click="isCollapsed = true"
      class="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity cursor-pointer"
    ></div>

    <!-- Sidebar -->
    <AppSidebar
      :collapsed="isCollapsed"
      @update:collapsed="isCollapsed = $event"
    />

    <!-- Main Content -->
    <div
      :class="[
        'min-h-screen flex flex-col transition-all duration-300',
        isCollapsed ? 'md:ml-20' : 'md:ml-64',
      ]"
    >
      <Header @toggle-sidebar="isCollapsed = !isCollapsed" />
      <main class="flex-1 p-4 md:p-6 w-full max-w-full overflow-x-hidden">
        <router-view />
      </main>

      <Footer />
    </div>
  </div>
</template>
