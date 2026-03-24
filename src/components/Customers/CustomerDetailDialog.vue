<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const props = defineProps<{
  open: boolean;
  customer: any;
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
}>();
</script>

<template>
  <Dialog :open="props.open" @update:open="emit('update:open', $event)">
    <DialogContent v-if="customer" class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Customer Profile</DialogTitle>
        <DialogDescription>Full details of the customer.</DialogDescription>
      </DialogHeader>

      <div class="space-y-4 py-4 text-sm">
        <div class="flex items-center gap-4">
          <img :src="customer.avatar" class="w-16 h-16 rounded-full border border-gray-100 object-cover" />
          <div>
            <p class="font-bold text-lg text-gray-900">{{ customer.name }}</p>
            <p class="text-gray-500">Joined {{ customer.joined }}</p>
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 mt-1 uppercase tracking-wider">
              {{ customer.status }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-y-4 border-t pt-4">
          <!-- Email -->
          <div class="col-span-2">
            <p class="text-gray-500 text-xs uppercase tracking-wider">Email Address</p>
            <p class="font-medium text-gray-900 mt-0.5">{{ customer.email }}</p>
          </div>

          <!-- Phone -->
          <div>
            <p class="text-gray-500 text-xs uppercase tracking-wider">Phone Number</p>
            <p class="font-medium text-gray-900 mt-0.5">{{ customer.phone }}</p>
          </div>

          <!-- Location -->
          <div>
            <p class="text-gray-500 text-xs uppercase tracking-wider">Location</p>
            <p class="font-medium text-gray-900 mt-0.5">{{ customer.location }}</p>
          </div>

          <!-- Bookings -->
          <div>
            <p class="text-gray-500 text-xs uppercase tracking-wider">Total Bookings</p>
            <p class="font-medium text-gray-900 mt-0.5">{{ customer.bookings }} Times</p>
          </div>

          <!-- Total Spent -->
          <div>
            <p class="text-gray-500 text-xs uppercase tracking-wider">Total Value</p>
            <p class="font-bold text-lg text-green-600 mt-0.5">${{ customer.totalSpent }}</p>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
