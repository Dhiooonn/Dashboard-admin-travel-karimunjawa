<script setup lang="ts">
import dashboardData from "@/data/dashboard.json";
import cardPattern from "@/assets/patterns/card-pattern.svg";

const summary = dashboardData.bookingStatistics.summary;
const chart = dashboardData.bookingStatistics.chart;

const series = [
  { name: "Confirmed", data: chart.confirmed },
  { name: "Pending", data: chart.pending },
  { name: "Cancelled", data: chart.cancelled },
];

const chartOptions = {
  chart: { type: "bar", toolbar: { show: false } },
  plotOptions: {
    bar: { columnWidth: "45%", borderRadius: 6 },
  },
  dataLabels: { enabled: false },
  xaxis: { categories: chart.labels },
  colors: ["#10B981", "#F59E0B", "#EF4444"],
  legend: { position: "bottom" },
};
</script>

<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm space-y-6">
    <div>
      <h2 class="text-lg font-semibold">Booking Statistics</h2>
      <p class="text-sm text-gray-400">Overview of booking status</p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        v-for="item in summary"
        :key="item.label"
        class="relative overflow-hidden p-4 rounded-xl"
        :class="{
          'bg-green-500': item.color === 'green',
          'bg-yellow-500': item.color === 'yellow',
          'bg-red-500': item.color === 'red',
        }"
      >
        <!-- Background Pattern (Flipped horizontally for visual variety) -->
        <img 
          :src="cardPattern" 
          alt="" 
          class="absolute inset-0 w-full h-full object-cover pointer-events-none transform -scale-x-100"
        />

        <div class="relative z-10 flex flex-col gap-1">
          <p class="text-[11px] lg:text-sm font-medium text-white opacity-90">{{ item.label }}</p>
          <h3 class="text-xl lg:text-2xl font-bold text-white">{{ item.value }}</h3>
          <p class="text-[10px] lg:text-xs text-white opacity-80">{{ item.subtitle }}</p>
        </div>
      </div>
    </div>

    <apexchart
      type="bar"
      height="280"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
