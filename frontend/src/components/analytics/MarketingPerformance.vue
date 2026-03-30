<script setup lang="ts">
import { TrendingUp } from "lucide-vue-next";
import { Card, CardContent } from "@/components/ui/card";

defineProps<{
  performance: {
    leads: string;
    growth: string;
    status: string;
    description: string;
  };
}>();
</script>

<template>
  <Card
    class="lg:col-span-2 border-0 rounded-2xl bg-indigo-600 text-white relative overflow-hidden group"
  >
    <div
      class="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none transition-transform duration-700 group-hover:scale-110"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"
    ></div>

    <CardContent
      class="p-10 relative z-10 flex flex-col md:flex-row items-center gap-10"
    >
      <div class="flex-1 space-y-5 text-center md:text-left">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/10"
        >
          <TrendingUp class="w-3.5 h-3.5" />
          {{ performance.status }}
        </div>
        <h2 class="text-3xl font-bold leading-tight">
          Marketing Performance is Up!
        </h2>
        <p class="text-indigo-100 text-lg">{{ performance.description }}</p>
        <div class="pt-2">
          <button
            class="px-8 py-3 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-all hover:shadow-indigo-500/20 active:scale-95"
          >
            View Detailed Report
          </button>
        </div>
      </div>
      <div
        class="md:grid grid-cols-2 gap-10 shrink-0 border-l border-white/10 pl-10 hidden"
      >
        <div class="text-center">
          <p class="text-5xl font-black tracking-tight">
            {{ performance.leads }}
          </p>
          <p
            class="text-sm font-medium text-indigo-100 mt-2 uppercase tracking-widest"
          >
            Total Leads
          </p>
        </div>
        <div class="text-center">
          <p class="text-5xl font-black tracking-tight text-emerald-300">
            {{ performance.growth }}
          </p>
          <p
            class="text-sm font-medium text-indigo-100 mt-2 uppercase tracking-widest"
          >
            Growth
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
