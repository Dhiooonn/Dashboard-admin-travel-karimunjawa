<script setup lang="ts">
import { ref, computed } from "vue";
import { useAppToast } from "@/composables/useAppToast";
import data from "@/data/destinations.json";

import DestinationStats from "@/components/Destinations/DestinationStats.vue";
import DestinationGrid from "@/components/Destinations/DestinationGrid.vue";
import DestinationFormSheet from "@/components/Destinations/DestinationFormSheet.vue";
import DestinationDetailDialog from "@/components/Destinations/DestinationDetailDialog.vue";
import DestinationDeleteAlert from "@/components/Destinations/DestinationDeleteAlert.vue";

const destinations = ref([...data.destinations]);
const { successToast, errorToast } = useAppToast();

const stats = computed(() => {
  return {
    total: destinations.value.length,
    active: destinations.value.filter((d) => d.status === "active").length,
    totalBookings: destinations.value.reduce(
      (acc, curr) => acc + curr.bookings,
      0,
    ),
    avgRating:
      Number(
        (
          destinations.value.reduce((acc, curr) => acc + curr.rating, 0) /
          destinations.value.length
        ).toFixed(1),
      ) || 0,
  };
});

// Modal States
const showFormSheet = ref(false);
const showViewDialog = ref(false);
const showDeleteConfirm = ref(false);

const isEditing = ref(false);
const selectedDestination = ref<any>(null);
const activeFormData = ref<any>(null);

function handleAdd() {
  selectedDestination.value = null;
  isEditing.value = false;
  activeFormData.value = {
    id: `DST00${destinations.value.length + 1}`,
    title: "",
    description: "",
    category: "Resort",
    rating: 5.0,
    duration: "",
    maxGuests: 10,
    price: 0,
    bookings: 0,
    image: `https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
    status: "active",
  };
  showFormSheet.value = true;
}

function handleEdit(destination: any) {
  selectedDestination.value = destination;
  isEditing.value = true;
  activeFormData.value = { ...destination };
  showFormSheet.value = true;
}

function handleFormSubmit(formData: any) {
  if (isEditing.value) {
    const index = destinations.value.findIndex((d) => d.id === formData.id);
    if (index !== -1) {
      destinations.value[index] = { ...formData };
      successToast("Success", "Destination updated successfully.");
    }
  } else {
    destinations.value.unshift({ ...formData });
    successToast("Success", "Destination added successfully.");
  }
  showFormSheet.value = false;
}

function handleView(destination: any) {
  selectedDestination.value = destination;
  showViewDialog.value = true;
}

function handleDelete(destination: any) {
  selectedDestination.value = destination;
  showDeleteConfirm.value = true;
}

function confirmDelete() {
  if (selectedDestination.value) {
    destinations.value = destinations.value.filter(
      (d) => d.id !== selectedDestination.value.id,
    );
    errorToast("Deleted", "Destination deleted successfully.");
  }
  showDeleteConfirm.value = false;
  selectedDestination.value = null;
}
</script>

<template>
  <div class="space-y-6">
    <DestinationStats :stats="stats" />

    <DestinationGrid
      :destinations="destinations"
      @add="handleAdd"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <DestinationFormSheet
      v-model:open="showFormSheet"
      :initial-data="activeFormData"
      :is-editing="isEditing"
      @submit="handleFormSubmit"
    />

    <DestinationDetailDialog
      v-model:open="showViewDialog"
      :destination="selectedDestination"
    />

    <DestinationDeleteAlert
      v-model:open="showDeleteConfirm"
      :destination="selectedDestination"
      @confirm="confirmDelete"
    />
  </div>
</template>
