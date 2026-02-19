<script setup lang="ts">
import dashboardData from "@/data/dashboard.json";
import { Box, Users, MapPin, FileText } from "lucide-vue-next";

const actions = dashboardData.quickActions;

const iconMap: Record<string, any> = {
  Box,
  Users,
  MapPin,
  FileText,
};
</script>

<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm space-y-6 h-auto">
    <div>
      <h2 class="text-2xl font-semibold">Quick Actions</h2>
      <p class="text-sm text-gray-400">Frequently used features</p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="action in actions"
        :key="action.label"
        class="rounded-xl p-6 flex flex-col items-center gap-2 text-white transition hover:opacity-90"
        :class="{
          'bg-indigo-500': action.color === 'indigo',
          'bg-cyan-500': action.color === 'cyan',
          'bg-purple-500': action.color === 'purple',
          'bg-pink-500': action.color === 'pink',
        }"
      >
        <component :is="iconMap[action.icon]" class="w-6 h-6" />
        {{ action.label }}
      </button>
    </div>

    <button
      class="w-full bg-gray-100 rounded-xl py-3 text-sm hover:bg-gray-200 transition"
    >
      + More Actions
    </button>
  </div>
</template>
