<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Clock, RotateCcw, CheckCircle } from "lucide-vue-next";

defineProps<{
  stats: {
    revenue: number;
    pendingAmount: number;
    refundedAmount: number;
    completedCount: number;
  };
}>();

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
</script>

<template>
  <div class="grid gap-4 grid-cols-2 lg:grid-cols-4">
    <!-- Total Revenue -->
    <Card class="relative overflow-hidden rounded-2xl border-0 bg-emerald-500 shadow-md">
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
      <DollarSign class="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 transform rotate-12 pointer-events-none" />
      
      <CardHeader class="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium text-white/90">
          Total Revenue
        </CardTitle>
      </CardHeader>
      <CardContent class="relative z-10">
        <div class="text-3xl font-bold text-white">{{ formatCurrency(stats.revenue) }}</div>
        <p class="text-xs text-white/80 mt-1 font-medium">+12.5% from last month</p>
      </CardContent>
    </Card>

    <!-- Pending -->
    <Card class="relative overflow-hidden rounded-2xl border-0 bg-amber-500 shadow-md">
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
      <Clock class="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 transform -rotate-12 pointer-events-none" />
      
      <CardHeader class="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium text-white/90">
          Pending
        </CardTitle>
      </CardHeader>
      <CardContent class="relative z-10">
        <div class="text-3xl font-bold text-white">{{ formatCurrency(stats.pendingAmount) }}</div>
        <p class="text-xs text-white/80 mt-1 font-medium">Awaiting processing</p>
      </CardContent>
    </Card>

    <!-- Refunded -->
    <Card class="relative overflow-hidden rounded-2xl border-0 bg-[#5C5CFF] shadow-md">
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
      <RotateCcw class="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 transform rotate-[20deg] pointer-events-none" />
      
      <CardHeader class="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium text-white/90">
          Refunded
        </CardTitle>
      </CardHeader>
      <CardContent class="relative z-10">
        <div class="text-3xl font-bold text-white">{{ formatCurrency(stats.refundedAmount) }}</div>
        <p class="text-xs text-white/80 mt-1 font-medium">Processed refunds</p>
      </CardContent>
    </Card>

    <!-- Completed -->
    <Card class="relative overflow-hidden rounded-2xl border-0 bg-blue-500 shadow-md">
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
      <CheckCircle class="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 transform rotate-12 pointer-events-none" />
      
      <CardHeader class="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium text-white/90">
          Completed
        </CardTitle>
      </CardHeader>
      <CardContent class="relative z-10">
        <div class="flex items-center text-3xl font-bold text-white">
          {{ stats.completedCount }}
        </div>
        <p class="text-xs text-white/80 mt-1 font-medium">Successful payments</p>
      </CardContent>
    </Card>
  </div>
</template>
