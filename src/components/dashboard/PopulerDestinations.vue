<script setup lang="ts">
import dashboardData from "@/data/dashboard.json";

const data = dashboardData.popularDestinations;

const series = data.data;

const chartOptions = {
  chart: { type: "donut" },
  labels: data.labels,
  legend: { position: "bottom" },
  colors: ["#06B6D4", "#8B5CF6", "#F59E0B", "#10B981", "#EC4899"],
};
</script>

<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm space-y-6">
    <div>
      <h2 class="text-lg font-semibold">Popular Destinations</h2>
      <p class="text-sm text-gray-400">Most booked packages this month</p>
    </div>

    <apexchart
      type="donut"
      height="300"
      :options="chartOptions"
      :series="series"
    />

    <div class="space-y-2">
      <div
        v-for="(label, index) in data.labels"
        :key="label"
        class="flex justify-between text-sm"
      >
        <span>{{ label }}</span>
        <span class="font-semibold"> {{ data.data[index] }} bookings </span>
      </div>
    </div>
  </div>
</template>
