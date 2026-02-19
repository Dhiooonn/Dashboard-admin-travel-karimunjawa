<script setup lang="ts">
import dashboardData from "@/data/dashboard.json";

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
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="item in summary"
        :key="item.label"
        class="p-4 rounded-xl"
        :class="{
          'bg-green-50': item.color === 'green',
          'bg-yellow-50': item.color === 'yellow',
          'bg-red-50': item.color === 'red',
        }"
      >
        <p class="text-sm font-medium">{{ item.label }}</p>
        <h3 class="text-2xl font-bold">{{ item.value }}</h3>
        <p class="text-xs text-gray-500">{{ item.subtitle }}</p>
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
