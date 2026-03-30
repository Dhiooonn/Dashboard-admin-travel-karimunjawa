<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Crown } from "lucide-vue-next";

defineProps<{
  stats: {
    total: number;
    active: number;
    vip: number;
  };
}>();
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3">
    <!-- Total Customers -->
    <Card class="relative overflow-hidden rounded-2xl bg-[#5C5CFF]">
      <!-- Decorative Background -->
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"
      ></div>
      <Users
        class="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 transform -rotate-12 pointer-events-none"
      />

      <CardHeader
        class="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium text-white/90">
          Total Customers
        </CardTitle>
      </CardHeader>
      <CardContent class="relative z-10">
        <div class="text-3xl font-bold text-white">{{ stats.total }}</div>
      </CardContent>
    </Card>

    <!-- Active Customers -->
    <Card class="relative overflow-hidden rounded-2xl bg-emerald-500">
      <!-- Decorative Background -->
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"
      ></div>
      <UserCheck
        class="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 transform rotate-12 pointer-events-none"
      />

      <CardHeader
        class="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium text-white/90">
          Active
        </CardTitle>
      </CardHeader>
      <CardContent class="relative z-10">
        <div class="text-3xl font-bold text-white">{{ stats.active }}</div>
      </CardContent>
    </Card>

    <!-- VIP Customers -->
    <Card class="relative overflow-hidden rounded-2xl bg-amber-500">
      <!-- Decorative Background -->
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"
      ></div>
      <Crown
        class="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 transform rotate-[20deg] pointer-events-none"
      />

      <CardHeader
        class="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium text-white/90"> VIP </CardTitle>
      </CardHeader>
      <CardContent class="relative z-10">
        <div class="text-3xl font-bold text-white">{{ stats.vip }}</div>
      </CardContent>
    </Card>
  </div>
</template>
