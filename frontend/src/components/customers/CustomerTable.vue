<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Filter,
  Eye,
  Pencil,
  Plus,
  MapPin,
  Trash2,
  Mail,
  Phone,
} from "lucide-vue-next";

import { formatCurrency, formatDate } from "@/lib/utils";

const props = defineProps<{
  customers: any[];
}>();

const emit = defineEmits<{
  (e: "add"): void;
  (e: "view", customer: any): void;
  (e: "edit", customer: any): void;
  (e: "delete", customer: any): void;
}>();

const searchQuery = ref("");
const statusFilter = ref("All Status");

const filteredCustomers = computed(() => {
  let filtered = props.customers;

  if (statusFilter.value !== "All Status") {
    filtered = filtered.filter(
      (c) => c.status.toLowerCase() === statusFilter.value.toLowerCase(),
    );
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    filtered = filtered.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
      );
    });
  }

  return filtered;
});

function statusBadgeVariant(status: string) {
  switch (status.toLowerCase()) {
    case "vip":
      return "bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-100";
    case "active":
      return "bg-green-50 text-green-600 border border-green-200 hover:bg-green-100";
    case "inactive":
      return "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100";
    default:
      return "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100";
  }
}
</script>

<template>
  <Card class="rounded-2xl shadow-sm border-0 bg-white">
    <CardHeader
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 pb-4 gap-4 sm:gap-0"
    >
      <div class="space-y-1">
        <CardTitle class="text-xl font-bold text-gray-900"
          >All Customers</CardTitle
        >
        <CardDescription class="text-gray-500 text-sm">
          Manage your customer database
        </CardDescription>
      </div>

      <div class="flex items-center w-full sm:w-auto">
        <Button
          @click="emit('add')"
          class="bg-[#5C5CFF] hover:bg-indigo-600 text-white shadow-sm h-10 px-4 rounded-lg font-medium w-full sm:w-auto"
        >
          <Plus class="w-4 h-4 mr-2" /> Add Customer
        </Button>
      </div>
    </CardHeader>

    <div class="px-6 space-y-4">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="w-full">
          <!-- Search -->
          <div class="relative w-full sm:flex-1">
            <Search
              class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            />
            <Input
              v-model="searchQuery"
              placeholder="Search by customer, transaction ID, or booking ID..."
              class="pl-10 h-10 border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus-visible:ring-1 focus-visible:ring-[#5C5CFF] text-sm placeholder:text-gray-400 shadow-none"
            />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="outline"
              class="h-10 px-5 border-gray-200 rounded-xl text-gray-700 font-medium whitespace-nowrap hover:bg-gray-50 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Filter class="w-4 h-4 text-gray-500" />
              {{ statusFilter }}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-40 rounded-xl">
            <DropdownMenuItem @click="statusFilter = 'All Status'"
              >All Status</DropdownMenuItem
            >
            <DropdownMenuItem @click="statusFilter = 'Active'"
              >Active</DropdownMenuItem
            >
            <DropdownMenuItem @click="statusFilter = 'Vip'"
              >VIP</DropdownMenuItem
            >
            <DropdownMenuItem @click="statusFilter = 'Inactive'"
              >Inactive</DropdownMenuItem
            >
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Table -->
    <CardContent class="p-0 mt-6">
      <div class="overflow-x-auto w-full">
        <Table>
          <TableHeader>
            <TableRow
              class="hover:bg-transparent border-t border-b border-gray-100 bg-white"
            >
              <TableHead
                class="text-xs font-bold text-gray-500/80 uppercase tracking-widest h-12 pl-6 w-[250px]"
                >CUSTOMER</TableHead
              >
              <TableHead
                class="text-xs font-bold text-gray-500/80 uppercase tracking-widest h-12 w-[220px]"
                >CONTACT</TableHead
              >
              <TableHead
                class="text-xs font-bold text-gray-500/80 uppercase tracking-widest h-12 w-[180px]"
                >LOCATION</TableHead
              >
              <TableHead
                class="text-xs font-bold text-gray-500/80 uppercase tracking-widest h-12 w-[120px]"
                >BOOKINGS</TableHead
              >
              <TableHead
                class="text-xs font-bold text-gray-500/80 uppercase tracking-widest h-12 w-[140px]"
                >TOTAL SPENT</TableHead
              >
              <TableHead
                class="text-xs font-bold text-gray-500/80 uppercase tracking-widest h-12 w-[120px]"
                >STATUS</TableHead
              >
              <TableHead
                class="text-xs font-bold text-gray-500/80 uppercase tracking-widest h-12 text-center pr-6 w-[120px]"
                >ACTIONS</TableHead
              >
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow
              v-for="item in filteredCustomers"
              :key="item.id"
              class="group hover:bg-gray-50/50 border-b border-gray-100 transition-colors bg-white hover:cursor-pointer"
            >
              <!-- Customer -->
              <TableCell class="pl-6 align-middle py-4">
                <div class="flex items-center gap-3">
                  <Avatar class="h-10 w-10 border border-gray-100">
                    <AvatarImage :src="item.avatar" :alt="item.name" />
                    <AvatarFallback>{{ item.name.charAt(0) }}</AvatarFallback>
                  </Avatar>
                  <div class="flex flex-col justify-center">
                    <span
                      class="font-bold text-gray-900 text-sm leading-tight"
                      >{{ item.name }}</span
                    >
                    <span class="text-xs text-gray-400 mt-0.5"
                      >Joined {{ item.joined }}</span
                    >
                  </div>
                </div>
              </TableCell>

              <!-- Contact -->
              <TableCell class="align-middle py-4">
                <div class="flex flex-col space-y-1.5 text-xs">
                  <span class="flex items-center text-gray-600">
                    <Mail class="w-3.5 h-3.5 mr-2 text-gray-400" />
                    {{ item.email }}
                  </span>
                  <span class="flex items-center text-gray-600">
                    <Phone class="w-3.5 h-3.5 mr-2 text-gray-400" />
                    {{ item.phone }}
                  </span>
                </div>
              </TableCell>

              <!-- Location -->
              <TableCell class="align-middle py-4">
                <div class="flex items-start gap-2 max-w-[150px]">
                  <MapPin class="w-3.5 h-3.5 text-[#5C5CFF] shrink-0 mt-0.5" />
                  <span class="text-sm font-medium text-gray-600 leading-tight">
                    {{ item.location }}
                  </span>
                </div>
              </TableCell>

              <!-- Bookings -->
              <TableCell class="align-middle py-4">
                <span class="font-bold text-sm text-gray-900">{{
                  item.bookings
                }}</span>
              </TableCell>

              <!-- Total Spent -->
              <TableCell class="align-middle py-4">
                <span class="font-black text-gray-900 text-sm">
                  ${{ item.totalSpent }}
                </span>
              </TableCell>

              <!-- Status -->
              <TableCell class="align-middle py-4">
                <Badge
                  :class="statusBadgeVariant(item.status)"
                  class="rounded-full px-3 py-1 text-xs font-bold shadow-none tracking-wide"
                  variant="outline"
                >
                  {{
                    item.status.charAt(0).toUpperCase() + item.status.slice(1)
                  }}
                </Badge>
              </TableCell>

              <!-- Actions -->
              <TableCell class="pr-6 align-middle py-4 text-center">
                <div class="flex items-center justify-center gap-2 w-full">
                  <!-- View -->
                  <Button
                    @click="emit('view', item)"
                    size="icon"
                    class="h-8 w-8 bg-[#5C5CFF]/10 hover:bg-[#5C5CFF]/20 text-[#5C5CFF] rounded-lg shadow-none"
                  >
                    <Eye class="w-4 h-4" />
                  </Button>

                  <!-- Edit -->
                  <Button
                    @click="emit('edit', item)"
                    size="icon"
                    class="h-8 w-8 bg-[#5C5CFF]/10 hover:bg-[#5C5CFF]/20 text-[#5C5CFF] rounded-lg shadow-none"
                  >
                    <Pencil class="w-4 h-4" />
                  </Button>

                  <!-- Delete -->
                  <Button
                    @click="emit('delete', item)"
                    size="icon"
                    class="h-8 w-8 bg-red-100 hover:bg-red-200 text-red-500 rounded-lg shadow-none"
                  >
                    <Trash2 class="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
</template>
