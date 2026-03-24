<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Map, Activity, Ticket } from "lucide-vue-next";

defineProps<{
  stats: {
    total: number;
    active: number;
    totalBookings: number;
    avgRating: number;
  };
}>();
</script>

<template>
  <div class="grid gap-4 grid-cols-2 lg:grid-cols-4">
    <!-- Total Destinations -->
    <Card class="relative overflow-hidden rounded-2xl border-0 bg-[#5C5CFF] shadow-md">
      <!-- Decorative Background -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
      <Map class="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 transform rotate-12 pointer-events-none" />
      
      <CardHeader class="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium text-white/90">
          Total Destinations
        </CardTitle>
      </CardHeader>
      <CardContent class="relative z-10">
        <div class="text-3xl font-bold text-white">{{ stats.total }}</div>
      </CardContent>
    </Card>

    <!-- Active Destinations -->
    <Card class="relative overflow-hidden rounded-2xl border-0 bg-emerald-500 shadow-md">
      <!-- Decorative Background -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
      <Activity class="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 transform -rotate-12 pointer-events-none" />
      
      <CardHeader class="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium text-white/90">
          Active
        </CardTitle>
      </CardHeader>
      <CardContent class="relative z-10">
        <div class="text-3xl font-bold text-white">{{ stats.active }}</div>
      </CardContent>
    </Card>

    <!-- Total Bookings -->
    <Card class="relative overflow-hidden rounded-2xl border-0 bg-blue-500 shadow-md">
      <!-- Decorative Background -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
      <Ticket class="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 transform rotate-[20deg] pointer-events-none" />
      
      <CardHeader class="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium text-white/90">
          Total Bookings
        </CardTitle>
      </CardHeader>
      <CardContent class="relative z-10">
        <div class="text-3xl font-bold text-white">{{ stats.totalBookings }}</div>
      </CardContent>
    </Card>

    <!-- Avg Rating -->
    <Card class="relative overflow-hidden rounded-2xl border-0 bg-amber-500 shadow-md">
      <!-- Decorative Background -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
      <Star class="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 transform rotate-12 pointer-events-none" />
      
      <CardHeader class="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium text-white/90">
          Avg Rating
        </CardTitle>
      </CardHeader>
      <CardContent class="relative z-10">
        <div class="flex items-center text-3xl font-bold text-white">
          {{ stats.avgRating }}
          <Star class="w-6 h-6 ml-2 fill-white text-white" />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
