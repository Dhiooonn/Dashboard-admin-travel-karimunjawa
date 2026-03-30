<script setup lang="ts">
import { ref } from "vue";

// Data
import analyticsData from "@/data/analytics.json";

// Components
import AnalyticsStats from "@/components/analytics/AnalyticsStats.vue";
import RevenueOverview from "@/components/dashboard/RevenueOverview.vue";
import PopularDestinations from "@/components/analytics/PopularDestinations.vue";
import VisitorTrends from "@/components/analytics/VisitorTrends.vue";
import MarketingPerformance from "@/components/analytics/MarketingPerformance.vue";

const timeRange = ref("Last 7 Days");
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div class="flex items-center gap-2 bg-white rounded-lg p-1 shrink-0">
        <button
          v-for="range in ['Last 7 Days', '30 Days', '90 Days']"
          :key="range"
          @click="timeRange = range"
          :class="[
            'px-3 py-1.5 text-sm font-medium rounded-md transition',
            timeRange === range
              ? 'bg-indigo-500 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-900',
          ]"
        >
          {{ range }}
        </button>
      </div>
    </div>

    <!-- Quick Stats -->
    <AnalyticsStats :stats="analyticsData.overview" />

    <!-- Main Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <RevenueOverview
        class="lg:col-span-2"
        :summary="analyticsData.revenueOverview.summary"
        :series="analyticsData.revenueOverview.chart.series"
        :categories="analyticsData.revenueOverview.chart.categories"
      />

      <PopularDestinations
        :series="analyticsData.popularDestinations.series"
        :labels="analyticsData.popularDestinations.labels"
      />

      <VisitorTrends
        :series="analyticsData.visitorTrends.series"
        :categories="analyticsData.visitorTrends.categories"
      />

      <MarketingPerformance :performance="analyticsData.performance" />
    </div>
  </div>
</template>
