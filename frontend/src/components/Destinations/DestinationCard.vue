<script setup lang="ts">
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, Trash2, Star, Clock, Users } from "lucide-vue-next";

defineProps<{
  item: any;
}>();

const emit = defineEmits<{
  (e: "view", item: any): void;
  (e: "edit", item: any): void;
  (e: "delete", item: any): void;
}>();

function categoryVariant(category: string) {
  switch (category.toLowerCase()) {
    case "resort":
      return "text-purple-600";
    case "activity":
      return "text-cyan-600";
    case "tour":
      return "text-emerald-600";
    default:
      return "text-gray-600";
  }
}
</script>

<template>
  <Card
    class="rounded-[28px] border border-gray-100 bg-white p-2.5 flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow"
  >
    <!-- Image Area with Floating Aesthetic from UI Reference -->
    <div
      class="relative w-full h-[300px] rounded-[22px] overflow-hidden mb-4 bg-gray-100"
    >
      <img
        :src="item.image"
        loading="lazy"
        class="object-cover w-full h-full"
        alt="Destination Image"
      />

      <!-- Rating Badge (Restored) -->
      <Badge
        class="absolute top-3 left-3 bg-white text-gray-900 border-0 pointer-events-none gap-1 font-bold shadow-sm px-2.5 py-1"
      >
        <Star class="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
        {{ item.rating }}
      </Badge>

      <!-- Category Badge (Restored) -->
      <Badge
        class="absolute top-3 right-3 bg-white/90 border-0 pointer-events-none font-bold shadow-sm px-3 py-1"
        :class="categoryVariant(item.category)"
      >
        {{ item.category }}
      </Badge>
    </div>

    <!-- Content Area -->
    <div class="px-2.5 flex flex-col flex-1 pb-1">
      <h3
        class="font-extrabold text-[#111827] text-[20px] leading-tight mb-2 tracking-tight"
      >
        {{ item.title }}
      </h3>
      <p class="text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-5">
        {{ item.description }}
      </p>

      <!-- Restored Original Data Display -->
      <div
        class="flex items-center justify-between text-[13px] text-gray-600 mb-5 mt-auto"
      >
        <div class="flex items-center gap-1.5 font-medium">
          <Clock class="w-4 h-4 text-gray-400" />
          <span>{{ item.duration }}</span>
        </div>
        <div class="flex items-center gap-1.5 font-medium">
          <Users class="w-4 h-4 text-gray-400" />
          <span>Max {{ item.maxGuests }}</span>
        </div>
      </div>

      <div
        class="flex items-center justify-between pt-4 border-t border-gray-100 mb-4"
      >
        <div class="font-black text-2xl text-[#5C5CFF]">$ {{ item.price }}</div>
        <div class="text-xs font-semibold text-gray-400">
          {{ item.bookings }} bookings
        </div>
      </div>

      <!-- Restored Original Action Buttons -->
      <div class="grid grid-cols-[1fr_1fr_auto] gap-2">
        <Button
          @click="emit('view', item)"
          variant="ghost"
          class="bg-[#5C5CFF]/10 hover:bg-[#5C5CFF]/20 text-[#5C5CFF] rounded-xl h-10 font-bold"
        >
          <Eye class="w-4 h-4 mr-1.5" /> View
        </Button>
        <Button
          @click="emit('edit', item)"
          variant="ghost"
          class="bg-[#5C5CFF]/10 hover:bg-[#5C5CFF]/20 text-[#5C5CFF] rounded-xl h-10 font-bold"
        >
          <Pencil class="w-4 h-4 mr-1.5" /> Edit
        </Button>
        <Button
          @click="emit('delete', item)"
          size="icon"
          variant="ghost"
          class="bg-red-100 hover:bg-red-200 text-red-500 rounded-xl h-10 w-12 shadow-sm"
        >
          <Trash2 class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </Card>
</template>
