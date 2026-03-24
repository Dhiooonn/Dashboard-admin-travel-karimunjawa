<script setup lang="ts">
import { ref, computed } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DestinationCard from "./DestinationCard.vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Search, Filter, Plus } from "lucide-vue-next";

const props = defineProps<{
  destinations: any[];
}>();

const emit = defineEmits<{
  (e: "add"): void;
  (e: "view", item: any): void;
  (e: "edit", item: any): void;
  (e: "delete", item: any): void;
}>();

const searchQuery = ref("");
const categoryFilter = ref("All Categories");

const filteredDestinations = computed(() => {
  let filtered = props.destinations;

  if (categoryFilter.value !== "All Categories") {
    filtered = filtered.filter(
      (d) => d.category.toLowerCase() === categoryFilter.value.toLowerCase(),
    );
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    filtered = filtered.filter((d) => {
      return (
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      );
    });
  }

  return filtered;
});
</script>

<template>
  <div class="space-y-6">
    <!-- Header & Controls Box -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div class="space-y-1">
          <h2 class="text-xl font-bold text-gray-900">All Destinations</h2>
          <p class="text-gray-500 text-sm">
            Manage travel destinations and tour packages
          </p>
        </div>

        <Button
          @click="emit('add')"
          class="bg-[#5C5CFF] hover:bg-indigo-600 text-white shadow-sm h-10 px-5 rounded-xl font-medium w-full sm:w-auto transition-all"
        >
          <Plus class="w-4 h-4 mr-2" /> Add Destination
        </Button>
      </div>

      <!-- Search & Filter -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
        <div class="w-full">
          <div class="relative w-full sm:max-w-[400px]">
            <Search
              class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            />
            <Input
              v-model="searchQuery"
              placeholder="Search destinations..."
              class="pl-10 h-10 border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus-visible:ring-1 focus-visible:ring-[#5C5CFF] text-sm placeholder:text-gray-400 transition-colors shadow-none"
            />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="outline"
              class="h-10 px-5 border-gray-200 rounded-xl text-gray-700 font-medium whitespace-nowrap shadow-sm hover:bg-gray-50 flex items-center justify-center gap-2 w-full sm:w-auto min-w-[160px] bg-white transition-all"
            >
              <Filter class="w-4 h-4 text-gray-500" />
              {{ categoryFilter }}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-48 rounded-xl shadow-lg border-gray-100">
            <DropdownMenuItem @click="categoryFilter = 'All Categories'" class="rounded-lg cursor-pointer my-1">All Categories</DropdownMenuItem>
            <DropdownMenuItem @click="categoryFilter = 'Resort'" class="rounded-lg cursor-pointer my-1">Resort</DropdownMenuItem>
            <DropdownMenuItem @click="categoryFilter = 'Activity'" class="rounded-lg cursor-pointer my-1">Activity</DropdownMenuItem>
            <DropdownMenuItem @click="categoryFilter = 'Tour'" class="rounded-lg cursor-pointer my-1">Tour</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <DestinationCard
        v-for="item in filteredDestinations"
        :key="item.id"
        :item="item"
        @view="emit('view', item)"
        @edit="emit('edit', item)"
        @delete="emit('delete', item)"
      />
    </div>
  </div>
</template>
