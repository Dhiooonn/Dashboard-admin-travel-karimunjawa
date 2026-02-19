<script setup lang="ts">
defineProps<{
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: any;
  subtitle?: string;
  color: string;
}>();

const colorMap: Record<string, string> = {
  indigo: "bg-indigo-500 text-white",
  blue: "bg-blue-500 text-white",
  purple: "bg-purple-500 text-white",
  green: "bg-green-500 text-white",
};
</script>

<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm">
    <!-- Top Row -->
    <div class="flex items-start justify-between mb-4">
      <!-- Icon -->
      <div
        :class="['p-3 rounded-xl', colorMap[color] || 'bg-gray-500 text-white']"
      >
        <component :is="icon" class="w-5 h-5" />
      </div>

      <!-- Change Badge -->
      <div
        :class="[
          'text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1',
          positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600',
        ]"
      >
        {{ change }}
      </div>
    </div>

    <!-- Content -->
    <p class="text-sm text-gray-500 mb-1">
      {{ title }}
    </p>

    <h2 class="text-3xl font-bold text-gray-800">
      {{ value }}
    </h2>

    <p class="text-xs text-gray-400 mt-1">
      {{ subtitle }}
    </p>
  </div>
</template>
