<script setup lang="ts">
import dashboardData from "@/data/dashboard.json";
import StatCard from "@/components/dashboard/StatCard.vue";

import { DollarSign, Calendar, Users, TrendingUp } from "lucide-vue-next";
import RevenueOverview from "@/components/dashboard/RevenueOverview.vue";
import QuickActions from "@/components/dashboard/QuickActions.vue";
import BookingStatistics from "@/components/dashboard/BookingStatistics.vue";
import PopulerDestinations from "@/components/dashboard/PopulerDestinations.vue";
import Bookingcalender from "@/components/dashboard/Bookingcalender.vue";
import RecentActivity from "@/components/dashboard/RecentActivity.vue";

// Mapping icon name ke component
const iconMap: Record<string, any> = {
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
};
</script>

<template>
  <div class="space-y-6">
    <section>
      <div class="bg-indigo-500 text-white p-6 rounded-xl flex flex-col gap-1">
        <h1 class="text-2xl font-bold">Welcome back, Admin 👋</h1>
        <p class="text-base text-[#E0E7FF]">
          Inilah yang terjadi dengan bisnis perjalanan Anda hari ini.
        </p>
      </div>
    </section>

    <section class="grid grid-cols-4 gap-6">
      <StatCard
        v-for="stat in dashboardData.stats"
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
        :change="stat.change"
        :positive="stat.positive"
        :icon="iconMap[stat.icon]"
        :subtitle="stat.subtitle"
        :color="stat.color"
      />
    </section>

    <section class="grid grid-cols-3 gap-6 items-start">
      <RevenueOverview class="col-span-2" />
      <QuickActions />
    </section>

    <section class="grid grid-cols-2 gap-6">
      <BookingStatistics />
      <PopulerDestinations />
    </section>

    <section class="grid grid-cols-3 gap-6 items-start">
      <Bookingcalender class="col-span-2" />
      <RecentActivity />
    </section>
  </div>
</template>
