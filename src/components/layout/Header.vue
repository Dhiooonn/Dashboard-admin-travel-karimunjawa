<script setup lang="ts">
import { useRoute } from "vue-router";
import { Search, Bell, Plus } from "lucide-vue-next";

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
</script>

<template>
  <header class="sticky top-0 z-30 bg-background border-b">
    <div class="flex items-center justify-between px-6 py-4">
      <!-- LEFT -->
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">
          {{ route.meta.title }}
        </h1>
        <p class="text-sm text-muted-foreground">
          {{ route.meta.subtitle }}
        </p>
      </div>

      <!-- RIGHT -->
      <div class="flex items-center gap-4">
        <!-- Search -->
        <div class="relative w-72">
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

        <!-- New Button -->
        <Button class="gap-2">
          <Plus class="w-4 h-4" />
          New
        </Button>

        <!-- Profile -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="p-0">
              <Avatar class="h-9 w-9">
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
