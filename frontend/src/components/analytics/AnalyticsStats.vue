<script setup lang="ts">
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-vue-next";
import { Card, CardContent } from "@/components/ui/card";
import cardPattern from "@/assets/patterns/card-pattern.svg";

defineProps<{
  stats: Array<{
    title: string;
    value: string;
    change: string;
    trend: string;
    icon: string;
    color: string;
  }>;
}>();

const iconMap: Record<string, any> = {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
};

const bgColorMap: Record<string, string> = {
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card
      v-for="stat in stats"
      :key="stat.title"
      class="overflow-hidden border-0 rounded-2xl relative"
      :class="bgColorMap[stat.color] || 'bg-gray-600'"
    >
      <!-- Pattern Overlay -->
      <img
        :src="cardPattern"
        class="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
      />

      <!-- Watermark Icon -->
      <component
        :is="iconMap[stat.icon]"
        class="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 transform rotate-12 pointer-events-none"
      />

      <CardContent class="p-6 relative z-10">
        <div class="flex items-center justify-between">
          <div
            class="p-2 bg-white/10 rounded-xl text-white backdrop-blur-sm border border-white/20 shadow-sm"
          >
            <component :is="iconMap[stat.icon]" class="w-5 h-5" />
          </div>

          <!-- Statistik Right -->
          <div
            :class="[
              'flex items-center gap-1 text-sm font-black px-2 py-0.5 rounded-full backdrop-blur-md border border-white/20',
              stat.trend === 'up'
                ? 'bg-emerald-400/20 text-emerald-100'
                : 'bg-red-400/20 text-red-100',
            ]"
          >
            <component
              :is="stat.trend === 'up' ? ArrowUpRight : ArrowDownRight"
              class="w-5 h-5"
            />
            {{ stat.change }}
          </div>
        </div>

        <div class="mt-5">
          <h3 class="text-sm font-medium text-white/70">{{ stat.title }}</h3>
          <p class="text-3xl font-black mt-1 text-white tracking-tight">
            {{ stat.value }}
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
