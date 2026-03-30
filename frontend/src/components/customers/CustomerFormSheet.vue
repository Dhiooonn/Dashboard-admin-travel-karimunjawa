<script setup lang="ts">
import { ref, watch } from 'vue';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const props = defineProps<{
  open: boolean;
  initialData?: any;
  isEditing?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'submit', data: any): void;
}>();

const formData = ref({
  id: '',
  name: '',
  email: '',
  phone: '',
  location: '',
  bookings: 0,
  totalSpent: 0,
  status: 'active',
  joined: '',
  avatar: ''
});

watch(() => props.open, (newVal) => {
  if (newVal && props.initialData) {
    formData.value = { ...props.initialData };
  } else if (newVal && !props.isEditing) {
    formData.value = {
      id: '', name: '', email: '', phone: '', location: '', bookings: 0, totalSpent: 0, status: 'active', joined: new Date().toISOString().split('T')[0], avatar: ''
    };
  }
});

function handleSubmit() {
  emit('submit', { ...formData.value });
}
</script>

<template>
  <Sheet :open="props.open" @update:open="emit('update:open', $event)">
    <SheetContent class="overflow-y-auto w-full sm:max-w-md">
      <SheetHeader>
        <SheetTitle>{{ isEditing ? 'Edit Customer' : 'Add New Customer' }}</SheetTitle>
        <SheetDescription>
          {{ isEditing ? 'Update the customer profile details.' : 'Create a new customer profile. Click save when you\'re done.' }}
        </SheetDescription>
      </SheetHeader>
      
      <div class="grid gap-4 py-4">
        <!-- Name -->
        <div class="grid gap-2">
          <Label>Customer Name</Label>
          <Input v-model="formData.name" placeholder="e.g. Jane Doe" />
        </div>

        <!-- Email -->
        <div class="grid gap-2">
          <Label>Email</Label>
          <Input v-model="formData.email" type="email" placeholder="jane@example.com" />
        </div>

        <!-- Phone -->
        <div class="grid gap-2">
          <Label>Phone Number</Label>
          <Input v-model="formData.phone" placeholder="+1 234 567 8900" />
        </div>

        <!-- Location -->
        <div class="grid gap-2">
          <Label>Location</Label>
          <Input v-model="formData.location" placeholder="e.g. New York, USA" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <!-- Bookings -->
          <div class="grid gap-2">
            <Label>Total Bookings</Label>
            <Input type="number" v-model="formData.bookings" min="0" />
          </div>

          <!-- Spent -->
          <div class="grid gap-2">
            <Label>Total Spent ($)</Label>
            <Input type="number" v-model="formData.totalSpent" min="0" />
          </div>
        </div>

        <div class="grid gap-2">
          <Label>Status</Label>
          <select v-model="formData.status" class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <option value="active">Active</option>
            <option value="vip">VIP</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      <SheetFooter class="mt-4">
        <Button @click="handleSubmit" class="w-full">
          {{ isEditing ? 'Update Customer' : 'Save Customer' }}
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
