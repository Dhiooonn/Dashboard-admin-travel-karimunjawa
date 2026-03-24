<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Star, Clock, Users } from 'lucide-vue-next';

const props = defineProps<{
  open: boolean;
  destination: any;
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
}>();
</script>

<template>
  <Dialog :open="props.open" @update:open="emit('update:open', $event)">
    <DialogContent v-if="destination" class="sm:max-w-xl p-0 overflow-hidden">
      <!-- Header Image -->
      <div class="relative h-56 w-full bg-gray-100">
        <img :src="destination.image" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div class="absolute bottom-4 left-6 text-white text-shadow">
          <h2 class="text-2xl font-bold mb-1">{{ destination.title }}</h2>
          <div class="flex items-center gap-3 text-sm opacity-90">
            <span class="flex items-center"><Star class="w-3.5 h-3.5 mr-1 fill-yellow-400 text-yellow-400"/> {{ destination.rating }}</span>
            <span class="flex items-center"><Clock class="w-3.5 h-3.5 mr-1"/> {{ destination.duration }}</span>
            <span class="flex items-center"><Users class="w-3.5 h-3.5 mr-1"/> Max {{ destination.maxGuests }}</span>
          </div>
        </div>
      </div>

      <div class="p-6 space-y-4 text-sm">
        <div>
          <h3 class="font-semibold text-gray-900 mb-1">Description</h3>
          <p class="text-gray-500 leading-relaxed">{{ destination.description }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p class="text-gray-500 text-xs uppercase tracking-wider">Category</p>
            <p class="font-medium text-gray-900 mt-0.5">{{ destination.category }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-xs uppercase tracking-wider">Total Bookings</p>
            <p class="font-medium text-gray-900 mt-0.5">{{ destination.bookings }} times</p>
          </div>
          <div>
            <p class="text-gray-500 text-xs uppercase tracking-wider">Price per pax</p>
            <p class="font-bold text-lg text-[#5C5CFF] mt-0.5">${{ destination.price }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-xs uppercase tracking-wider">Status</p>
            <p class="font-medium text-gray-900 mt-0.5 capitalize">{{ destination.status }}</p>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
