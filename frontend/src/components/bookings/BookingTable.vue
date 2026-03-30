<script setup lang="ts">
import { ref, computed } from "vue";

// Components
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

// Icons
import {
  Search,
  Filter,
  Eye,
  Pencil,
  Download,
  Plus,
  MapPin,
  Users,
  Trash2,
} from "lucide-vue-next";

// Utils
import { formatCurrency, formatDate, formatStatus } from "@/lib/utils";

// Props
const props = defineProps<{
  bookings: any[];
}>();

const emit = defineEmits<{
  (e: "add"): void;
  (e: "view", booking: any): void;
  (e: "edit", booking: any): void;
  (e: "delete", booking: any): void;
}>();

// Filter & Search State
const searchQuery = ref("");
const statusFilter = ref("All Status");

const filteredBookings = computed(() => {
  let filtered = props.bookings;

  // Apply status filter
  if (statusFilter.value !== "All Status") {
    filtered = filtered.filter(
      (b) => b.status.toLowerCase() === statusFilter.value.toLowerCase(),
    );
  }

  // Apply search query
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    filtered = filtered.filter((b) => {
      return (
        b.id.toLowerCase().includes(q) ||
        b.customer.name.toLowerCase().includes(q) ||
        b.customer.email.toLowerCase().includes(q) ||
        b.destination.toLowerCase().includes(q)
      );
    });
  }

  return filtered;
});

// Warna badge
function statusBadgeVariant(status: string) {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-green-50 text-green-600 border border-green-200 hover:bg-green-100";
    case "pending":
      return "bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100";
    case "completed":
      return "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100";
    default:
      return "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100";
  }
}

// Warna dot
function statusDotColor(status: string) {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-green-500";
    case "pending":
      return "bg-orange-400";
    case "completed":
      return "bg-blue-500";
    default:
      return "bg-gray-400";
  }
}
</script>

<template>
  <Card class="rounded-2xl border-0 bg-white">
    <!-- Header -->
    <CardHeader
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 pb-4 gap-4 sm:gap-0"
    >
      <div class="space-y-1">
        <CardTitle class="text-xl font-bold text-gray-900"
          >All Bookings</CardTitle
        >
        <CardDescription class="text-gray-500 text-sm">
          Manage and track all customer reservations
        </CardDescription>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <!-- Download -->
        <Button
          variant="outline"
          size="icon"
          class="h-10 w-10 sm:h-9 sm:w-9 border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 shrink-0"
        >
          <Download class="w-4 h-4" />
        </Button>

        <!-- New Booking -->
        <Button
          @click="emit('add')"
          class="bg-[#5C5CFF] hover:bg-indigo-600 text-white shadow-sm h-10 px-4 rounded-lg font-medium w-full sm:w-auto"
        >
          <Plus class="w-4 h-4 mr-2" /> New Booking
        </Button>
      </div>
    </CardHeader>

    <div class="px-6 space-y-4">
      <!-- Search & Filter -->
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

        <!-- Filter -->
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
            <DropdownMenuItem @click="statusFilter = 'Confirmed'"
              >Confirmed</DropdownMenuItem
            >
            <DropdownMenuItem @click="statusFilter = 'Pending'"
              >Pending</DropdownMenuItem
            >
            <DropdownMenuItem @click="statusFilter = 'Completed'"
              >Completed</DropdownMenuItem
            >
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Table -->
    <CardContent class="p-0 mt-6">
      <Table>
        <TableHeader>
          <TableRow
            class="hover:bg-transparent border-t border-b border-gray-100 bg-white"
          >
            <!-- Booking ID -->
            <TableHead
              class="text-xs font-bold text-gray-500/80 uppercase tracking-widest h-12 pl-6 w-[120px]"
              >BOOKING ID</TableHead
            >

            <!-- Customer -->
            <TableHead
              class="text-xs font-bold text-gray-500/80 uppercase tracking-widest h-12 w-[220px]"
              >CUSTOMER</TableHead
            >

            <!-- Destination -->
            <TableHead
              class="text-xs font-bold text-gray-500/80 uppercase tracking-widest h-12 w-[200px]"
              >DESTINATION</TableHead
            >

            <!-- Dates -->
            <TableHead
              class="text-xs font-bold text-gray-500/80 uppercase tracking-widest h-12 w-[160px]"
              >DATES</TableHead
            >

            <!-- Guest -->
            <TableHead
              class="text-xs font-bold text-gray-500/80 uppercase tracking-widest h-12 w-[100px]"
              >GUESTS</TableHead
            >

            <!-- Amount -->
            <TableHead
              class="text-xs font-bold text-gray-500/80 uppercase tracking-widest h-12 w-[120px]"
              >AMOUNT</TableHead
            >

            <!-- Status -->
            <TableHead
              class="text-xs font-bold text-gray-500/80 uppercase tracking-widest h-12 w-[120px]"
              >STATUS</TableHead
            >

            <!-- Actions -->
            <TableHead
              class="text-xs font-bold text-gray-500/80 uppercase tracking-widest h-12 text-center pr-6 w-[100px]"
              >ACTIONS</TableHead
            >
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow
            v-for="item in filteredBookings"
            :key="item.id"
            class="group hover:bg-gray-50/50 border-b border-gray-100 transition-colors bg-white hover:cursor-pointer"
          >
            <!-- ID -->
            <TableCell class="pl-6 align-middle py-4">
              <div class="flex items-center gap-2">
                <span
                  :class="[
                    'w-1.5 h-1.5 rounded-full',
                    statusDotColor(item.status),
                  ]"
                ></span>
                <span class="text-[#5C5CFF] font-bold text-sm">{{
                  item.id
                }}</span>
              </div>
            </TableCell>

            <!-- Customer-->
            <TableCell class="align-middle py-4">
              <div class="flex items-center gap-3">
                <Avatar class="h-10 w-10 border border-gray-100">
                  <AvatarImage
                    :src="item.customer.avatar"
                    :alt="item.customer.name"
                  />
                  <AvatarFallback>{{
                    item.customer.name.charAt(0)
                  }}</AvatarFallback>
                </Avatar>
                <div class="flex flex-col justify-center">
                  <span class="font-bold text-gray-900 text-sm leading-tight">{{
                    item.customer.name
                  }}</span>
                  <span class="text-sm text-gray-500 mt-0.5">{{
                    item.customer.email
                  }}</span>
                </div>
              </div>
            </TableCell>

            <!-- Destinations -->
            <TableCell class="align-middle py-4">
              <div class="flex items-start gap-2 max-w-[180px]">
                <MapPin class="w-3.5 h-3.5 text-[#5C5CFF] shrink-0 mt-0.5" />
                <span class="text-sm font-semibold text-gray-600 leading-tight">
                  {{ item.destination }}
                </span>
              </div>
            </TableCell>

            <!-- Dates -->
            <TableCell class="align-middle py-4">
              <div class="flex flex-col space-y-1 text-sm">
                <span class="text-gray-900 font-medium whitespace-nowrap">
                  Check-in: <br />
                  <span class="font-bold">{{ formatDate(item.checkIn) }}</span>
                </span>
                <span
                  class="text-gray-400 font-medium whitespace-nowrap text-xs"
                >
                  Check-out:<br />
                  {{ formatDate(item.checkOut) }}
                </span>
              </div>
            </TableCell>

            <!-- Guest -->
            <TableCell class="align-middle py-4">
              <div class="flex items-center gap-1.5 text-gray-600">
                <Users class="w-4 h-4 text-gray-400" />
                <span class="font-bold text-sm">{{ item.guests }}</span>
              </div>
            </TableCell>

            <!-- Amount -->
            <TableCell class="align-middle py-4">
              <span class="font-black text-gray-900 text-base">
                {{ formatCurrency(item.amount) }}
              </span>
            </TableCell>

            <!-- Status -->
            <TableCell class="align-middle py-4">
              <Badge
                :class="statusBadgeVariant(item.status)"
                class="rounded-full px-3 py-1 text-xs font-bold shadow-none"
                variant="outline"
              >
                {{ formatStatus(item.status) }}
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
    </CardContent>
  </Card>
</template>
