<script setup lang="ts">
import { useRoute } from "vue-router";
import { Search, Bell, Plus, Menu } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const route = useRoute();
const emit = defineEmits(["toggle-sidebar"]);
</script>

<template>
  <header class="sticky top-0 z-30 bg-white border-b border-gray-100">
    <div
      class="flex items-center justify-between px-3 py-3 md:px-6 md:py-4 gap-2"
    >
      <!-- LEFT -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Mobile Sidebar Toggle -->
        <Button
          variant="ghost"
          size="icon"
          class="md:hidden shrink-0 h-9 w-9"
          @click="emit('toggle-sidebar')"
        >
          <Menu class="w-5 h-5 text-gray-700" />
        </Button>

        <div class="min-w-0">
          <h1
            class="text-base sm:text-lg lg:text-2xl font-bold tracking-tight truncate leading-tight"
          >
            {{ route.meta.title }}
          </h1>
          <p class="hidden md:block text-sm text-muted-foreground truncate">
            {{ route.meta.subtitle }}
          </p>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="flex items-center gap-1 sm:gap-4 shrink-0">
        <!-- Search -->
        <div class="relative hidden sm:block w-36 lg:w-72">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          />
          <Input placeholder="Quick search..." class="pl-9" />
        </div>

        <!-- Notification -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="relative">
              <Bell class="w-4 h-4" />
              <Badge class="absolute -top-1 -right-1 px-1 text-[10px]">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" class="w-64">
            <DropdownMenuItem> New booking received </DropdownMenuItem>
            <DropdownMenuItem> Payment confirmed </DropdownMenuItem>
            <DropdownMenuItem> New 5★ review </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <!-- Profile -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="ghost"
              class="p-0 h-9 w-9 rounded-full ml-1 sm:ml-0"
            >
              <Avatar class="h-8 w-8 sm:h-9 sm:w-9">
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" class="w-48">
            <DropdownMenuItem> Profile </DropdownMenuItem>
            <DropdownMenuItem> Settings </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="text-red-500"> Logout </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>
