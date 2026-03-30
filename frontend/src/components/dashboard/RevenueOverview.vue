<script setup lang="ts">
// data dummy
import dashboardData from "@/data/dashboard.json";

// pattern
import cardPattern from "@/assets/patterns/card-pattern.svg";

const summary = dashboardData.revenueOverview.summary;
const chartData = dashboardData.revenueOverview.chart;

// Series (data)
const series = [
  {
    name: "Revenue",
    data: chartData.revenue,
  },
  {
    name: "Expenses",
    data: chartData.expenses,
  },
];

// Chart options
const chartOptions = {
  chart: {
    type: "area",
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#6366F1", "#F43F5E"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.05,
      stops: [0, 90, 100],
    },
  },
  xaxis: {
    categories: chartData.labels,
  },
  yaxis: {
    labels: {
      formatter: (val: number) => `$${val / 1000}k`,
    },
  },
  tooltip: {
    y: {
      formatter: (val: number) => `$${val.toLocaleString()}`,
    },
  },
  legend: {
    position: "bottom",
  },
  grid: {
    borderColor: "#E5E7EB",
    strokeDashArray: 4,
  },
};
</script>

<template>
  <div class="bg-white p-6 rounded-2xl space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-semibold">Revenue Overview</h2>
        <p class="text-sm text-gray-400">Track your income and expenses</p>
      </div>
      <select class="border rounded-lg px-3 py-1 text-sm">
        <option>Monthly</option>
        <option>Weekly</option>
      </select>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        v-for="item in summary"
        :key="item.label"
        class="relative overflow-hidden p-4 rounded-xl flex flex-col gap-2 shadow-sm"
        :class="{
          'bg-indigo-500': item.color === 'indigo',
          'bg-red-500': item.color === 'red',
          'bg-green-500': item.color === 'green',
        }"
      >
        <!-- Background Pattern Layer -->
        <img
          :src="cardPattern"
          alt=""
          class="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        <!-- Content Layer -->
        <div class="relative z-10 flex flex-col gap-2 w-full h-full">
          <p class="text-sm font-semibold text-white">{{ item.label }}</p>
          <div class="flex flex-col gap-1">
            <h3 class="text-2xl lg:text-3xl font-bold text-white">
              ${{ item.value.toLocaleString() }}
            </h3>
            <p class="text-[10px] lg:text-xs text-white opacity-90">
              {{ item.change }} from last month
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart Placeholder -->
    <apexchart
      type="area"
      height="320"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
