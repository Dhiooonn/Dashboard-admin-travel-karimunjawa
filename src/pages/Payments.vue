<script setup lang="ts">
import { ref, computed } from "vue";
import data from "@/data/payments.json";

import PaymentStats from "@/components/Payments/PaymentStats.vue";
import PaymentTable from "@/components/Payments/PaymentTable.vue";

const transactions = ref([...data.payments]);

const stats = computed(() => {
  const revenue = transactions.value.filter(t => t.status === 'Completed').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingAmount = transactions.value.filter(t => t.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);
  const refundedAmount = transactions.value.filter(t => t.status === 'Refunded').reduce((acc, curr) => acc + curr.amount, 0);
  const completedCount = transactions.value.filter(t => t.status === 'Completed').length;

  return {
    revenue,
    pendingAmount,
    refundedAmount,
    completedCount
  };
});

function handleExport() {
  alert("Exporting report...");
}
</script>

<template>
  <div class="space-y-6">
    <PaymentStats :stats="stats" />
    <PaymentTable :transactions="transactions" @export="handleExport" />
  </div>
</template>
