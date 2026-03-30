<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const props = defineProps<{
  series: any[];
  categories: string[];
}>();

const chartOptions = {
  chart: {
    type: "bar" as const,
    toolbar: { show: false },
    fontFamily: "Inter, sans-serif",
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: "55%",
    },
  },
  dataLabels: { enabled: false },
  colors: ["#6366f1"],
  xaxis: {
    categories: props.categories,
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  grid: {
    borderColor: "#f1f5f9",
    strokeDashArray: 4,
  },
};
</script>

<template>
  <Card class="border-0 rounded-2xl overflow-hidden">
    <CardHeader class="border-b bg-gray-50/50 pb-4">
      <CardTitle class="text-lg">Weekly Visitors</CardTitle>
      <CardDescription>User traffic patterns this week</CardDescription>
    </CardHeader>
    <CardContent class="pt-6">
      <apexchart height="320" :options="chartOptions" :series="series" />
    </CardContent>
  </Card>
</template>
