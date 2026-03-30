<script setup lang="ts">
import { ref, computed } from "vue";
import { useAppToast } from "@/composables/useAppToast";
import data from "@/data/bookings.json";
import BookingStats from "@/components/bookings/BookingStats.vue";
import BookingTable from "@/components/bookings/BookingTable.vue";

// UI Components
import BookingFormSheet from "@/components/bookings/BookingFormSheet.vue";
import BookingDetailDialog from "@/components/bookings/BookingDetailDialog.vue";
import BookingDeleteAlert from "@/components/bookings/BookingDeleteAlert.vue";

// Single Source of Truth for Data
const bookings = ref([...data.bookings]);
const { successToast, errorToast } = useAppToast();

// View Models for Stats
const stats = computed(() => {
  return {
    total: bookings.value.length,
    confirmed: bookings.value.filter((b) => b.status === "confirmed").length,
    pending: bookings.value.filter((b) => b.status === "pending").length,
    completed: bookings.value.filter((b) => b.status === "completed").length,
  };
});

// Modals State Management
const showFormSheet = ref(false);
const showViewDialog = ref(false);
const showDeleteConfirm = ref(false);

const isEditing = ref(false);
const selectedBooking = ref<any>(null);
const activeFormData = ref<any>(null);

// ACTION HANDLERS
function handleAdd() {
  selectedBooking.value = null;
  isEditing.value = false;
  activeFormData.value = {
    id: `BK${String(bookings.value.length + 1).padStart(3, "0")}`,
    customerName: "",
    customerEmail: "",
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    amount: 0,
    status: "pending",
  };
  showFormSheet.value = true;
}

function handleEdit(booking: any) {
  selectedBooking.value = booking;
  isEditing.value = true;
  activeFormData.value = {
    id: booking.id,
    customerName: booking.customer.name,
    customerEmail: booking.customer.email,
    destination: booking.destination,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    guests: booking.guests,
    amount: booking.amount,
    status: booking.status,
  };
  showFormSheet.value = true;
}

function handleFormSubmit(formData: any) {
  if (isEditing.value) {
    // Update existing
    const index = bookings.value.findIndex((b) => b.id === formData.id);
    if (index !== -1) {
      bookings.value[index] = {
        ...bookings.value[index],
        customer: {
          ...bookings.value[index].customer,
          name: formData.customerName,
          email: formData.customerEmail,
        },
        destination: formData.destination,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        amount: formData.amount,
        status: formData.status,
      };
      successToast("Success", "Booking updated successfully.");
    }
  } else {
    // Insert new
    bookings.value.unshift({
      id: formData.id,
      customer: {
        name: formData.customerName,
        email: formData.customerEmail,
        avatar: `https://i.pravatar.cc/100?u=${formData.id}`,
      },
      destination: formData.destination,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests,
      amount: formData.amount,
      status: formData.status,
    });
    successToast("Success", "Booking added successfully.");
  }
  showFormSheet.value = false;
}

function handleView(booking: any) {
  selectedBooking.value = booking;
  showViewDialog.value = true;
}

function handleDelete(booking: any) {
  selectedBooking.value = booking;
  showDeleteConfirm.value = true;
}

function confirmDelete() {
  if (selectedBooking.value) {
    bookings.value = bookings.value.filter(
      (b) => b.id !== selectedBooking.value.id,
    );
    errorToast("Deleted", "Booking deleted successfully.");
  }
  showDeleteConfirm.value = false;
  selectedBooking.value = null;
}
</script>

<template>
  <div class="space-y-6">
    <!-- UI Component: Stats View -->
    <BookingStats :stats="stats" />

    <!-- UI Component: Data Table -->
    <BookingTable
      :bookings="bookings"
      @add="handleAdd"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <!-- UI Component: Forms & Modals -->
    <BookingFormSheet
      v-model:open="showFormSheet"
      :initial-data="activeFormData"
      :is-editing="isEditing"
      @submit="handleFormSubmit"
    />

    <BookingDetailDialog
      v-model:open="showViewDialog"
      :booking="selectedBooking"
    />

    <BookingDeleteAlert
      v-model:open="showDeleteConfirm"
      :booking="selectedBooking"
      @confirm="confirmDelete"
    />
  </div>
</template>
