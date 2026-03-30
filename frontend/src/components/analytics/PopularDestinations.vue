<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

defineProps<{
  series: number[];
  labels: string[];
}>();

const chartOptions = {
  chart: {
    type: "donut" as const,
    fontFamily: "Inter, sans-serif",
  },
  labels: [
    "Beach Resorts",
    "Snorkeling Tours",
    "Diving Packages",
    "Island Hopping",
    "Other Packages",
  ],
  colors: ["#06b6d4", "#8b5cf6", "#f59e0b", "#10b981", "#ec4899"],
  legend: {
    position: "bottom" as const,
    fontSize: "13px",
    markers: {
      radius: 12,
    },
    itemMargin: {
      vertical: 5,
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: "75%",
        labels: {
          show: true,
          total: {
            show: true,
            label: "Total Bookings",
            fontSize: "14px",
            color: "#64748b",
            formatter: () => "1,092", // Sum of 380+245+189+158+120
          },
          value: {
            fontSize: "24px",
            fontWeight: 700,
            color: "#1e293b",
          },
        },
      },
    },
  },
  stroke: { show: false },
};
</script>

<template>
  <Card class="border-0 rounded-2xl overflow-hidden">
    <CardHeader class="border-b bg-gray-50/50 pb-4">
      <CardTitle class="text-lg">Popular Destinations</CardTitle>
      <CardDescription>Most booked packages this month</CardDescription>
    </CardHeader>
    <CardContent
      class="flex flex-col items-center justify-center pt-8 text-center"
    >
      <apexchart
        width="100%"
        height="350"
        :options="chartOptions"
        :series="series"
      />
    </CardContent>
  </Card>
</template>
