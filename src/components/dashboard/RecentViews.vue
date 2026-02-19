<script setup lang="ts">
import dashboardData from "@/data/dashboard.json"

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { Star, Clock } from "lucide-vue-next"

const reviews = dashboardData.recentReviews
</script>

<template>
  <Card class="rounded-2xl">
    <CardHeader class="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Recent Reviews</CardTitle>
        <CardDescription>Latest customer feedback</CardDescription>
      </div>

      <div class="flex items-center gap-1">
        <Star class="w-4 h-4 text-yellow-500 fill-yellow-500" />
        <span class="text-lg font-semibold">
          {{ reviews.averageRating }}
        </span>
        <span class="text-xs text-muted-foreground">
          Average rating
        </span>
      </div>
    </CardHeader>

    <CardContent class="space-y-4">

      <div
        v-for="item in reviews.items"
        :key="item.name"
        class="p-4 rounded-xl border hover:bg-muted/40 transition"
      >
        <div class="flex justify-between items-start">
          <div class="flex gap-3">
            <Avatar>
              <AvatarFallback>
                {{ item.name.charAt(0) }}
              </AvatarFallback>
            </Avatar>

            <div>
              <p class="font-medium text-sm">
                {{ item.name }}
              </p>
              <p class="text-xs text-primary">
                {{ item.package }}
              </p>
            </div>
          </div>

          <div class="flex gap-1">
            <Star
              v-for="i in 5"
              :key="i"
              class="w-4 h-4"
              :class="i <= item.rating
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-muted-foreground'"
            />
          </div>
        </div>

        <p class="text-sm text-muted-foreground mt-2">
          {{ item.review }}
        </p>

        <div class="flex items-center gap-1 text-xs text-muted-foreground mt-2">
          <Clock class="w-3 h-3" />
          {{ item.time }}
        </div>
      </div>

      <Button variant="secondary" class="w-full">
        View All Reviews
      </Button>

    </CardContent>
  </Card>
</template>