<script setup lang="ts">
// data dummy
import dashboardData from "@/data/dashboard.json";

// icons
import { Box, Users, MapPin, FileText } from "lucide-vue-next";

// pattern
import cardPattern from "@/assets/patterns/card-pattern.svg";

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

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        v-for="action in actions"
        :key="action.label"
        class="relative overflow-hidden rounded-xl p-6 text-white transition hover:opacity-90 active:scale-95"
        :class="{
          'bg-indigo-500': action.color === 'indigo',
          'bg-cyan-500': action.color === 'cyan',
          'bg-purple-500': action.color === 'purple',
          'bg-pink-500': action.color === 'pink',
        }"
      >
        <!-- Background Pattern Layer (Flipped vertically for variation) -->
        <img
          :src="cardPattern"
          alt=""
          class="absolute inset-0 w-full h-full object-cover pointer-events-none transform -scale-y-100 opacity-60"
        />

        <!-- Content Layer -->
        <div class="relative z-10 flex flex-col items-center gap-2">
          <component :is="iconMap[action.icon]" class="w-6 h-6" />
          <span class="font-medium">{{ action.label }}</span>
        </div>
      </button>
    </div>

    <button
      class="w-full bg-gray-100 rounded-xl py-3 text-sm hover:bg-gray-200 transition"
    >
      + More Actions
    </button>
  </div>
</template>
