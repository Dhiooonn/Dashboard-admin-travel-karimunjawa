<script setup lang="ts">
import dashboardData from "@/data/dashboard.json";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  <Card class="rounded-2xl">
    <CardHeader class="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Booking Calendar</CardTitle>
        <CardDescription>{{ data.month }}</CardDescription>
      </div>

      <div class="flex gap-2">
        <Button variant="ghost" size="icon">‹</Button>
        <Button variant="ghost" size="icon">›</Button>
      </div>
    </CardHeader>

    <CardContent class="space-y-6">
      <!-- Calendar Grid -->
      <div class="grid grid-cols-7 gap-3 text-center text-sm">
        <div
          v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
          :key="day"
          class="text-muted-foreground"
        >
          {{ day }}
        </div>

        <div
          v-for="day in days"
          :key="day"
          class="relative rounded-xl border p-4 hover:border-primary transition"
          :class="{
            'bg-primary text-white': day === data.highlighted,
          }"
        >
          {{ day }}

          <span
            v-if="data.events[day]"
            :class="[
              'absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full',
              eventColors[data.events[day]],
            ]"
          />
        </div>
      </div>

      <Separator />

      <!-- Legend -->
      <div class="grid grid-cols-3 gap-4">
        <Badge class="bg-green-100 text-green-600 justify-center py-2">
          High 12+
        </Badge>
        <Badge class="bg-yellow-100 text-yellow-600 justify-center py-2">
          Medium 5–11
        </Badge>
        <Badge class="bg-blue-100 text-blue-600 justify-center py-2">
          Low 1–4
        </Badge>
      </div>
    </CardContent>
  </Card>
</template>
