<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, Box } from "lucide-vue-next";

defineProps<{
  stats: {
    total: number;
    confirmed: number;
    pending: number;
    completed: number;
  };
}>();

const items = [
  {
    title: "Total Bookings",
    key: "total",
    icon: Box,
    bg: "bg-[#5C5CFF]",
  },
  {
    title: "Confirmed",
    key: "confirmed",
    icon: CheckCircle,
    bg: "bg-emerald-500",
  },
  {
    title: "Pending",
    key: "pending",
    icon: Clock,
    bg: "bg-amber-500",
  },
  {
    title: "Completed",
    key: "completed",
    icon: Calendar,
    bg: "bg-blue-500",
  },
];
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card 
      v-for="item in items" 
      :key="item.title" 
      class="relative overflow-hidden rounded-2xl border-0 shadow-md"
      :class="item.bg"
    >
      <!-- Decorative Background -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
      
      <!-- Watermark Icon -->
      <component 
        :is="item.icon" 
        class="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 transform rotate-12 pointer-events-none" 
      />

      <CardHeader class="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium text-white/90">
          {{ item.title }}
        </CardTitle>
      </CardHeader>
      
      <CardContent class="relative z-10">
        <div class="text-3xl font-bold text-white">
          {{ stats[item.key as keyof typeof stats] }}
        </div>
      </CardContent>
    </Card>
  </div>
</template>
