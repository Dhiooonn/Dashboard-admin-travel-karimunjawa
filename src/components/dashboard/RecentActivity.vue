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

import { CheckCircle, CreditCard, XCircle, Star, Clock } from "lucide-vue-next";

const activities = dashboardData.recentActivity;

const iconMap: Record<string, any> = {
  booking: CheckCircle,
  payment: CreditCard,
  cancel: XCircle,
  review: Star,
  pending: Clock,
};

const colorMap: Record<string, string> = {
  booking: "text-green-500",
  payment: "text-blue-500",
  cancel: "text-red-500",
  review: "text-yellow-500",
  pending: "text-orange-500",
};
</script>

<template>
  <Card class="rounded-2xl">
    <CardHeader class="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest system updates</CardDescription>
      </div>

      <Button variant="ghost" size="sm"> View All </Button>
    </CardHeader>

    <CardContent class="space-y-4">
      <div v-for="item in activities" :key="item.title" class="flex gap-3">
        <component
          :is="iconMap[item.type]"
          class="w-5 h-5 mt-1"
          :class="colorMap[item.type]"
        />

        <div>
          <p class="font-medium text-sm">
            {{ item.title }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ item.description }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ item.time }}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
