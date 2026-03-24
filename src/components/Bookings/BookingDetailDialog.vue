<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const props = defineProps<{
  open: boolean;
  booking: any;
}>();

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();
</script>

<template>
  <Dialog :open="props.open" @update:open="emit('update:open', $event)">
    <DialogContent v-if="booking" class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Booking Details ({{ booking.id }})</DialogTitle>
        <DialogDescription
          >Full details of the customer's reservation.</DialogDescription
        >
      </DialogHeader>

      <div class="space-y-4 py-4 text-sm">
        <div class="flex items-center gap-4">
          <img
            :src="booking.customer?.avatar"
            class="w-12 h-12 rounded-full border border-gray-100"
          />
          <div>
            <p class="font-bold text-base text-gray-900">
              {{ booking.customer?.name }}
            </p>
            <p class="text-gray-500">{{ booking.customer?.email }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-y-4 border-t pt-4">
          <!-- Destination -->
          <div>
            <p class="text-gray-500">Destination</p>
            <p class="font-medium text-gray-900">{{ booking.destination }}</p>
          </div>

          <!-- Ststus -->
          <div>
            <p class="text-gray-500">Status</p>
            <p class="font-medium capitalize text-gray-900">
              {{ booking.status }}
            </p>
          </div>

          <!-- CheckIn -->
          <div>
            <p class="text-gray-500">Check-in</p>
            <p class="font-medium text-gray-900">{{ booking.checkIn }}</p>
          </div>

          <!-- CheckOut -->
          <div>
            <p class="text-gray-500">Check-out</p>
            <p class="font-medium text-gray-900">{{ booking.checkOut }}</p>
          </div>

          <!-- Guest -->
          <div>
            <p class="text-gray-500">Guests</p>
            <p class="font-medium text-gray-900">
              {{ booking.guests }} Person(s)
            </p>
          </div>

          <!-- Total Amount -->
          <div>
            <p class="text-gray-500">Total Amount</p>
            <p class="font-bold text-lg text-gray-900">${{ booking.amount }}</p>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
