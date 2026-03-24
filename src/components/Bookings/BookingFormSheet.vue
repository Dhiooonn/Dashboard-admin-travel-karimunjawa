<script setup lang="ts">
import { ref, watch } from "vue";

// Components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const props = defineProps<{
  open: boolean;
  initialData?: any;
  isEditing?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
  (e: "submit", data: any): void;
}>();

const formData = ref({
  id: "",
  customerName: "",
  customerEmail: "",
  destination: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
  amount: 0,
  status: "pending",
});

watch(
  () => props.open,
  (newVal) => {
    if (newVal && props.initialData) {
      formData.value = { ...props.initialData };
    } else if (newVal && !props.isEditing) {
      formData.value = {
        id: "",
        customerName: "",
        customerEmail: "",
        destination: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
        amount: 0,
        status: "pending",
      };
    }
  },
);

function handleSubmit() {
  emit("submit", { ...formData.value });
}
</script>

<template>
  <Sheet :open="props.open" @update:open="emit('update:open', $event)">
    <SheetContent class="overflow-y-auto w-full sm:max-w-md">
      <SheetHeader>
        <SheetTitle>{{
          isEditing ? "Edit Booking" : "Add New Booking"
        }}</SheetTitle>
        <SheetDescription>
          {{
            isEditing
              ? "Update the booking details."
              : "Create a new booking entry. Click save when you're done."
          }}
        </SheetDescription>
      </SheetHeader>

      <div class="grid gap-4 py-4">
        <!-- Customer Name -->
        <div class="grid gap-2">
          <Label>Customer Name</Label>
          <Input v-model="formData.customerName" placeholder="e.g. John Doe" />
        </div>

        <!-- Email -->
        <div class="grid gap-2">
          <Label>Email</Label>
          <Input
            v-model="formData.customerEmail"
            type="email"
            placeholder="john@example.com"
          />
        </div>

        <!-- Destination -->
        <div class="grid gap-2">
          <Label>Destination</Label>
          <Input v-model="formData.destination" placeholder="Resort Name" />
        </div>

        <!-- CheckIn -->
        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label>Check-in</Label>
            <Input type="date" v-model="formData.checkIn" />
          </div>

          <!-- CheckOut -->
          <div class="grid gap-2">
            <Label>Check-out</Label>
            <Input type="date" v-model="formData.checkOut" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <!-- Guest -->
          <div class="grid gap-2">
            <Label>Guests</Label>
            <Input type="number" v-model="formData.guests" min="1" />
          </div>

          <!-- Amount -->
          <div class="grid gap-2">
            <Label>Amount ($)</Label>
            <Input type="number" v-model="formData.amount" min="0" />
          </div>

          <!-- Status -->
        </div>
        <div class="grid gap-2">
          <Label>Status</Label>
          <select
            v-model="formData.status"
            class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <SheetFooter class="mt-4">
        <Button @click="handleSubmit" class="w-full">
          {{ isEditing ? "Update Booking" : "Save Booking" }}
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
