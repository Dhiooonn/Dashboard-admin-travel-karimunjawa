<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";

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
    bg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    title: "Confirmed",
    key: "confirmed",
    icon: CheckCircle,
    bg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Pending",
    key: "pending",
    icon: Clock,
    bg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Completed",
    key: "completed",
    icon: Calendar,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
    <Card v-for="item in items" :key="item.title" class="rounded-2xl shadow-sm">
      <CardContent class="p-6">
        <!-- Icon -->
        <div
          :class="[
            'w-12 h-12 flex items-center justify-center rounded-xl mb-4',
            item.bg,
          ]"
        >
          <component :is="item.icon" class="w-5 h-5" :class="item.iconColor" />
        </div>

        <!-- Text -->
        <p class="text-sm text-muted-foreground mb-1">
          {{ item.title }}
        </p>

        <h2 class="text-3xl font-semibold">
          {{ stats[item.key as keyof typeof stats] }}
        </h2>
      </CardContent>
    </Card>
  </div>
</template>
