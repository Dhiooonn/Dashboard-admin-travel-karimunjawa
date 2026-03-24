<script setup lang="ts">
import { ref, watch } from 'vue';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
  title: '',
  description: '',
  category: 'Resort',
  rating: 5.0,
  duration: '',
  maxGuests: 10,
  price: 0,
  bookings: 0,
  image: '',
  status: 'active'
});

watch(() => props.open, (newVal) => {
  if (newVal && props.initialData) {
    formData.value = { ...props.initialData };
  } else if (newVal && !props.isEditing) {
    formData.value = {
      id: '', title: '', description: '', category: 'Resort', rating: 5.0, duration: '', maxGuests: 10, price: 0, bookings: 0, image: '', status: 'active'
    };
  }
});

function handleSubmit() {
  emit('submit', { ...formData.value });
}

function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    // Generate an object URL for local preview immediately
    formData.value.image = URL.createObjectURL(file);
  }
}
</script>

<template>
  <Sheet :open="props.open" @update:open="emit('update:open', $event)">
    <SheetContent class="overflow-y-auto w-full sm:max-w-md">
      <SheetHeader>
        <SheetTitle>{{ isEditing ? 'Edit Destination' : 'Add New Destination' }}</SheetTitle>
        <SheetDescription>
          {{ isEditing ? 'Update package details and availability.' : 'Create a new destination package. Click save when you\'re done.' }}
        </SheetDescription>
      </SheetHeader>
      
      <div class="grid gap-4 py-4">
        <!-- Title -->
        <div class="grid gap-2">
          <Label>Title / Package Name</Label>
          <Input v-model="formData.title" placeholder="e.g. Scuba Diving Adventure" />
        </div>

        <!-- Description -->
        <div class="grid gap-2">
          <Label>Description</Label>
          <Textarea v-model="formData.description" placeholder="Brief description of the package" class="resize-none" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <!-- Category -->
          <div class="grid gap-2">
            <Label>Category</Label>
            <select v-model="formData.category" class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <option value="Resort">Resort</option>
              <option value="Activity">Activity</option>
              <option value="Tour">Tour</option>
            </select>
          </div>
          <!-- Rating -->
          <div class="grid gap-2">
            <Label>Rating</Label>
            <Input type="number" v-model="formData.rating" step="0.1" min="0" max="5" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <!-- Duration -->
          <div class="grid gap-2">
            <Label>Duration</Label>
            <Input v-model="formData.duration" placeholder="e.g. 3 Days 2 Nights" />
          </div>

          <!-- Max Guests -->
          <div class="grid gap-2">
            <Label>Max Guests</Label>
            <Input type="number" v-model="formData.maxGuests" min="1" />
          </div>
        </div>

        <div class="grid gap-2">
          <Label>Price ($)</Label>
          <Input type="number" v-model="formData.price" min="0" />
        </div>

        <!-- Cover Image Upload & URL -->
        <div class="grid gap-2">
          <div class="flex items-center justify-between">
            <Label>Cover Image</Label>
            <span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Recommended: 800 x 600px</span>
          </div>
          
          <div class="flex flex-col gap-3">
            <!-- Upload Box -->
            <div 
              class="relative flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer overflow-hidden group"
              style="min-height: 160px;"
            >
              <input 
                type="file" 
                accept="image/*" 
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                @change="handleImageUpload"
              />
              
              <template v-if="formData.image">
                <img :src="formData.image" class="absolute inset-0 w-full h-full object-cover z-0" />
                <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <span class="text-white text-sm font-medium flex items-center relative z-20 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                    Change Photo
                  </span>
                </div>
              </template>
              
              <template v-else>
                <div class="flex flex-col items-center justify-center pointer-events-none z-10 w-full h-full p-4">
                  <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-500"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  </div>
                  <p class="text-sm font-semibold text-gray-700">Click to upload image</p>
                  <p class="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                </div>
              </template>
            </div>

            <!-- Alternative URL Input -->
            <div class="flex items-center gap-2 mt-1">
              <div class="h-px bg-gray-200 flex-1"></div>
              <span class="text-xs text-gray-400 font-medium uppercase tracking-widest">Or</span>
              <div class="h-px bg-gray-200 flex-1"></div>
            </div>
            
            <Input v-model="formData.image" placeholder="Paste image URL here..." class="h-10 text-sm" />
          </div>
        </div>
      </div>
      
      <SheetFooter class="mt-4">
        <Button @click="handleSubmit" class="w-full bg-[#5C5CFF] hover:bg-indigo-600">
          {{ isEditing ? 'Update Destination' : 'Save Destination' }}
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
