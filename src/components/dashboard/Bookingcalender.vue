<script setup lang="ts">
// data dummy
import dashboardData from "@/data/dashboard.json";

// ui components
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const data = dashboardData.bookingCalendar;

const days = Array.from({ length: data.days }, (_, i) => i + 1);

const eventColors: Record<string, string> = {
  high: "bg-green-500",
  medium: "bg-yellow-500",
  low: "bg-blue-500",
};
</script>

<template>
  <Card class="rounded-2xl overflow-hidden bg-white shadow-sm">
    <!-- Header Section with a subtle background -->
    <CardHeader
      class="flex flex-row flex-wrap items-center justify-between gap-4 pb-4 bg-gray-50/50 border-b border-gray-100"
    >
      <div class="space-y-1 mt-2">
        <CardTitle class="text-lg font-semibold text-gray-900 tracking-tight"
          >Booking Calendar</CardTitle
        >
        <CardDescription class="text-sm font-medium text-primary/80">{{
          data.month
        }}</CardDescription>
      </div>

      <div
        class="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-0.5 shadow-sm"
      >
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8 rounded-md hover:bg-gray-100 text-gray-600"
        >
          <span class="text-lg leading-none mb-1">‹</span>
        </Button>
        <div class="w-[1px] h-4 bg-gray-200"></div>
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8 rounded-md hover:bg-gray-100 text-gray-600"
        >
          <span class="text-lg leading-none mb-1">›</span>
        </Button>
      </div>
    </CardHeader>

    <CardContent class="p-6 space-y-6">
      <!-- Calendar Grid -->
      <div
        class="grid grid-cols-7 gap-y-4 gap-x-1 sm:gap-x-2 text-center text-sm"
      >
        <!-- Day Labels -->
        <div
          v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
          :key="day"
          class="text-[11px] font-semibold uppercase tracking-wider text-gray-400 pb-2"
        >
          {{ day }}
        </div>

        <!-- Date Cells -->
        <div
          v-for="day in days"
          :key="day"
          class="relative flex flex-col items-center justify-center p-1 sm:p-2 rounded-xl border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer min-h-[48px] sm:min-h-[56px] group"
          :class="{
            'bg-primary text-white border-primary shadow-md shadow-primary/20 hover:bg-primary hover:border-primary font-semibold':
              day === data.highlighted,
            'text-gray-700': day !== data.highlighted,
          }"
        >
          <span class="z-10">{{ day }}</span>

          <!-- Event Indicator -->
          <Transition name="fade">
            <span
              v-if="data.events[day]"
              :class="[
                'absolute bottom-1.5 w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-150',
                eventColors[data.events[day]],
                day === data.highlighted ? 'ring-2 ring-white/50' : '',
              ]"
            />
          </Transition>
        </div>
      </div>

      <Separator class="bg-gray-100" />

      <!-- Legend -->
      <div
        class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-2"
      >
        <div class="flex items-center gap-2.5 group cursor-help">
          <span
            class="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/20 group-hover:scale-110 transition-transform"
          ></span>
          <span
            class="text-[11px] font-medium text-gray-500 uppercase tracking-wider group-hover:text-gray-900 transition-colors"
            >High (12+)</span
          >
        </div>
        <div class="flex items-center gap-2.5 group cursor-help">
          <span
            class="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/20 group-hover:scale-110 transition-transform"
          ></span>
          <span
            class="text-[11px] font-medium text-gray-500 uppercase tracking-wider group-hover:text-gray-900 transition-colors"
            >Medium (5–11)</span
          >
        </div>
        <div class="flex items-center gap-2.5 group cursor-help">
          <span
            class="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/20 group-hover:scale-110 transition-transform"
          ></span>
          <span
            class="text-[11px] font-medium text-gray-500 uppercase tracking-wider group-hover:text-gray-900 transition-colors"
            >Low (1–4)</span
          >
        </div>
      </div>
    </CardContent>
  </Card>
</template>
