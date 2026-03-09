<script setup lang="ts">
// Data Dummy
import dashboardData from "@/data/dashboard.json";

// Components
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Star, Clock } from "lucide-vue-next";

const reviews = dashboardData.recentReviews;
</script>

<template>
  <Card class="rounded-2xl">
    <CardHeader class="flex flex-row items-center justify-between pb-2">
      <div class="space-y-1">
        <CardTitle>Recent Reviews</CardTitle>
        <CardDescription>Latest customer feedback</CardDescription>
      </div>

      <div class="flex flex-col items-end">
        <div
          class="flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full border border-yellow-100"
        >
          <Star class="w-4 h-4 fill-yellow-500 text-yellow-500" />
          <span class="text-sm font-bold">{{ reviews.averageRating }}</span>
        </div>
        <span
          class="text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-wider"
          >Avg Rating</span
        >
      </div>
    </CardHeader>

    <CardContent class="space-y-4 pt-4">
      <div
        v-for="item in reviews.items"
        :key="item.name"
        class="group p-4 rounded-xl border border-gray-100 bg-white hover:border-primary/30 hover:shadow-sm transition-all duration-300"
      >
        <div class="flex justify-between items-start mb-3">
          <div class="flex gap-3 items-center">
            <Avatar class="w-10 h-10 border-2 border-primary/10">
              <AvatarFallback class="bg-primary/5 text-primary font-semibold">
                {{ item.name.charAt(0) }}
              </AvatarFallback>
            </Avatar>

            <div class="space-y-1">
              <p class="font-semibold text-sm text-gray-900">
                {{ item.name }}
              </p>
              <div class="flex items-center gap-2">
                <span
                  class="text-[10px] font-medium px-2 py-0.5 rounded-md bg-primary/10 text-primary"
                >
                  {{ item.package }}
                </span>
                <div class="flex gap-0.5">
                  <Star
                    v-for="i in 5"
                    :key="i"
                    class="w-3 h-3"
                    :class="
                      i <= item.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-200 fill-gray-200'
                    "
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-gray-50 px-2 py-1 rounded-md border border-gray-100"
          >
            <Clock class="w-3 h-3" />
            <span>{{ item.time }}</span>
          </div>
        </div>

        <p class="text-sm text-gray-600 leading-relaxed italic">
          "{{ item.review }}"
        </p>
      </div>

      <Button
        variant="outline"
        class="w-full mt-2 text-primary bg-indigo-500 hover:bg-indigo-600 text-white transition-colors"
      >
        View All Reviews
      </Button>
    </CardContent>
  </Card>
</template>
