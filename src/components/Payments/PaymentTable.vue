<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Search,
  Download,
  CreditCard,
  Building,
  ScanLine
} from "lucide-vue-next";

// Define props for the component
const props = defineProps<{
  transactions: any[];
}>();

const searchQuery = ref("");
const statusFilter = ref("All Status");
const methodFilter = ref("All Methods");

const emit = defineEmits<{
  (e: "export"): void;
}>();

const filteredTransactions = computed(() => {
  let filtered = props.transactions;

  if (statusFilter.value !== "All Status") {
    filtered = filtered.filter(
      (t) => t.status.toLowerCase() === statusFilter.value.toLowerCase()
    );
  }

  if (methodFilter.value !== "All Methods") {
    filtered = filtered.filter(
      (t) => t.method === methodFilter.value
    );
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    filtered = filtered.filter((t) => {
      return (
        t.customer.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.bookingId.toLowerCase().includes(q)
      );
    });
  }

  return filtered;
});

const summary = computed(() => {
  const totalAmount = filteredTransactions.value.reduce((acc, curr) => acc + curr.amount, 0);
  const totalCount = filteredTransactions.value.length;
  const average = totalCount > 0 ? totalAmount / totalCount : 0;

  return {
    totalTransactions: totalCount,
    totalAmount: totalAmount,
    averageTransaction: average
  };
});

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function statusBadgeVariant(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-50 text-green-600 border border-green-200";
    case "pending":
      return "bg-amber-50 text-amber-600 border border-amber-200";
    case "refunded":
      return "bg-gray-50 text-gray-600 border border-gray-200";
    default:
      return "bg-gray-50 text-gray-600 border border-gray-200";
  }
}

function getMethodIcon(method: string) {
  if (method === 'Credit Card') return CreditCard;
  if (method === 'Bank Transfer') return Building;
  if (method === 'PayPal') return ScanLine;
  return CreditCard;
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h2 class="text-xl font-bold text-gray-900">Payment Transactions</h2>
      
      <Button
        @click="emit('export')"
        class="bg-[#5C5CFF] hover:bg-indigo-600 text-white shadow-sm h-10 px-5 rounded-xl font-medium transition-all"
      >
        <Download class="w-4 h-4 mr-2" /> Export Report
      </Button>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row items-center gap-4">
      <div class="relative w-full sm:flex-1">
        <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          v-model="searchQuery"
          placeholder="Search by customer, transaction ID, or booking ID..."
          class="pl-10 h-10 border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus-visible:ring-1 focus-visible:ring-[#5C5CFF] text-sm placeholder:text-gray-400 shadow-none"
        />
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="outline"
              class="h-10 px-4 border-gray-200 rounded-xl text-gray-700 font-medium whitespace-nowrap shadow-sm hover:bg-gray-50 flex items-center justify-between w-full sm:w-36 bg-white"
            >
              <span>{{ statusFilter }}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-36 rounded-xl border-gray-100">
            <DropdownMenuItem @click="statusFilter = 'All Status'" class="rounded-lg cursor-pointer">All Status</DropdownMenuItem>
            <DropdownMenuItem @click="statusFilter = 'Completed'" class="rounded-lg cursor-pointer">Completed</DropdownMenuItem>
            <DropdownMenuItem @click="statusFilter = 'Pending'" class="rounded-lg cursor-pointer">Pending</DropdownMenuItem>
            <DropdownMenuItem @click="statusFilter = 'Refunded'" class="rounded-lg cursor-pointer">Refunded</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="outline"
              class="h-10 px-4 border-gray-200 rounded-xl text-gray-700 font-medium whitespace-nowrap shadow-sm hover:bg-gray-50 flex items-center justify-between w-full sm:w-36 bg-white"
            >
              <span>{{ methodFilter }}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-40 rounded-xl border-gray-100">
            <DropdownMenuItem @click="methodFilter = 'All Methods'" class="rounded-lg cursor-pointer">All Methods</DropdownMenuItem>
            <DropdownMenuItem @click="methodFilter = 'Credit Card'" class="rounded-lg cursor-pointer">Credit Card</DropdownMenuItem>
            <DropdownMenuItem @click="methodFilter = 'Bank Transfer'" class="rounded-lg cursor-pointer">Bank Transfer</DropdownMenuItem>
            <DropdownMenuItem @click="methodFilter = 'PayPal'" class="rounded-lg cursor-pointer">PayPal</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto w-full">
      <Table>
        <TableHeader>
          <TableRow class="hover:bg-transparent border-t border-b border-gray-100 bg-gray-50/50">
            <TableHead class="text-xs font-bold text-gray-500 uppercase tracking-widest h-12 pl-4">TRANSACTION ID</TableHead>
            <TableHead class="text-xs font-bold text-gray-500 uppercase tracking-widest h-12">CUSTOMER</TableHead>
            <TableHead class="text-xs font-bold text-gray-500 uppercase tracking-widest h-12">BOOKING ID</TableHead>
            <TableHead class="text-xs font-bold text-gray-500 uppercase tracking-widest h-12">AMOUNT</TableHead>
            <TableHead class="text-xs font-bold text-gray-500 uppercase tracking-widest h-12">METHOD</TableHead>
            <TableHead class="text-xs font-bold text-gray-500 uppercase tracking-widest h-12">DATE</TableHead>
            <TableHead class="text-xs font-bold text-gray-500 uppercase tracking-widest h-12 pr-4">STATUS</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow
            v-for="item in filteredTransactions"
            :key="item.id"
            class="group hover:bg-gray-50/50 border-b border-gray-100 transition-colors bg-white hover:cursor-pointer"
          >
            <TableCell class="pl-4 py-4">
              <span class="font-bold text-[#5C5CFF] text-sm">{{ item.id }}</span>
            </TableCell>
            <TableCell class="py-4">
              <span class="font-semibold text-gray-900 text-sm">{{ item.customer }}</span>
            </TableCell>
            <TableCell class="py-4">
              <span class="text-gray-500 text-sm">{{ item.bookingId }}</span>
            </TableCell>
            <TableCell class="py-4">
              <span class="font-black text-gray-900 text-sm">{{ formatCurrency(item.amount) }}</span>
            </TableCell>
            <TableCell class="py-4">
              <div class="flex items-center gap-2 text-gray-600 text-sm flex-nowrap whitespace-nowrap">
                <component :is="getMethodIcon(item.method)" class="w-4 h-4 text-gray-400" />
                {{ item.method }}
              </div>
            </TableCell>
            <TableCell class="py-4 whitespace-nowrap">
              <span class="text-gray-600 text-sm">{{ item.date }}</span>
            </TableCell>
            <TableCell class="pr-4 py-4">
              <Badge
                :class="statusBadgeVariant(item.status)"
                class="rounded-full px-3 py-1 text-xs font-bold shadow-none whitespace-nowrap"
                variant="outline"
              >
                {{ item.status }}
              </Badge>
            </TableCell>
          </TableRow>

          <TableRow v-if="filteredTransactions.length === 0">
            <TableCell colspan="7" class="h-24 text-center text-gray-500">
              No transactions found.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Summary Footer like the screenshot -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100 text-center md:text-left layout-footer">
      <div class="flex flex-col items-center md:items-start space-y-1">
        <span class="text-sm font-medium text-gray-500">Total Transactions</span>
        <span class="text-3xl font-black text-gray-900">{{ summary.totalTransactions }}</span>
      </div>
      <div class="flex flex-col items-center md:items-start space-y-1">
        <span class="text-sm font-medium text-gray-500">Total Amount</span>
        <span class="text-3xl font-black text-[#5C5CFF]">{{ formatCurrency(summary.totalAmount) }}</span>
      </div>
      <div class="flex flex-col items-center md:items-start space-y-1">
        <span class="text-sm font-medium text-gray-500">Average Transaction</span>
        <span class="text-3xl font-black text-teal-500">{{ formatCurrency(summary.averageTransaction) }}</span>
      </div>
    </div>
  </div>
</template>
