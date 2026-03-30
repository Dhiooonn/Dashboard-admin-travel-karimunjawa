<script setup lang="ts">
import { ref, computed } from "vue";

// Toast
import { useAppToast } from "@/composables/useAppToast";

// Data
import data from "@/data/customers.json";

// Components
import CustomerStats from "@/components/customers/CustomerStats.vue";
import CustomerTable from "@/components/customers/CustomerTable.vue";
import CustomerFormSheet from "@/components/customers/CustomerFormSheet.vue";
import CustomerDetailDialog from "@/components/customers/CustomerDetailDialog.vue";
import CustomerDeleteAlert from "@/components/customers/CustomerDeleteAlert.vue";

// State  
const customers = ref([...data.customers]);
const { successToast, errorToast } = useAppToast();

// Computed
const stats = computed(() => {
  return {
    total: customers.value.length,
    active: customers.value.filter((c) => c.status === "active").length,
    vip: customers.value.filter((c) => c.status === "vip").length,
  };
});

// Modal States
const showFormSheet = ref(false);
const showViewDialog = ref(false);
const showDeleteConfirm = ref(false);

const isEditing = ref(false);
const selectedCustomer = ref<any>(null);
const activeFormData = ref<any>(null);

// Methods
function handleAdd() {
  selectedCustomer.value = null;
  isEditing.value = false;
  activeFormData.value = {
    id: customers.value.length + 1,
    name: "",
    email: "",
    phone: "",
    location: "",
    bookings: 0,
    totalSpent: 0,
    status: "active",
    joined: new Date().toISOString().split("T")[0],
    avatar: `https://i.pravatar.cc/150?img=${customers.value.length + 1}`,
  };
  showFormSheet.value = true;
}

function handleEdit(customer: any) {
  selectedCustomer.value = customer;
  isEditing.value = true;
  activeFormData.value = { ...customer };
  showFormSheet.value = true;
}

function handleFormSubmit(formData: any) {
  if (isEditing.value) {
    const index = customers.value.findIndex((c) => c.id === formData.id);
    if (index !== -1) {
      customers.value[index] = { ...formData };
      successToast("Success", "Customer updated successfully.");
    }
  } else {
    formData.avatar = `https://i.pravatar.cc/150?u=${formData.email}`;
    customers.value.unshift({ ...formData });
    successToast("Success", "Customer added successfully.");
  }
  showFormSheet.value = false;
}

function handleView(customer: any) {
  selectedCustomer.value = customer;
  showViewDialog.value = true;
}

function handleDelete(customer: any) {
  selectedCustomer.value = customer;
  showDeleteConfirm.value = true;
}

function confirmDelete() {
  if (selectedCustomer.value) {
    customers.value = customers.value.filter(
      (c) => c.id !== selectedCustomer.value.id,
    );
    errorToast("Deleted", "Customer deleted successfully.");
  }
  showDeleteConfirm.value = false;
  selectedCustomer.value = null;
}
</script>

<template>
  <div class="space-y-6">
    <CustomerStats :stats="stats" />

    <CustomerTable
      :customers="customers"
      @add="handleAdd"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <CustomerFormSheet
      v-model:open="showFormSheet"
      :initial-data="activeFormData"
      :is-editing="isEditing"
      @submit="handleFormSubmit"
    />

    <CustomerDetailDialog
      v-model:open="showViewDialog"
      :customer="selectedCustomer"
    />

    <CustomerDeleteAlert
      v-model:open="showDeleteConfirm"
      :customer="selectedCustomer"
      @confirm="confirmDelete"
    />
  </div>
</template>
