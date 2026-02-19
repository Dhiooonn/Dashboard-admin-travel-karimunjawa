<script setup lang="ts">
import { Shield, FileText, HelpCircle } from "lucide-vue-next";
</script>

<template>
  <footer class="border-t bg-background px-6 py-4">
    <div
      class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground"
    >
      <!-- Left -->
      <div>© 2026 Karimunjawa Travel. All rights reserved.</div>

      <!-- Right -->
      <div class="flex items-center gap-6">
        <div
          class="flex items-center gap-2 hover:text-foreground cursor-pointer"
        >
          <Shield class="w-4 h-4" />
          Privacy Policy
        </div>

        <div
          class="flex items-center gap-2 hover:text-foreground cursor-pointer"
        >
          <FileText class="w-4 h-4" />
          Terms of Service
        </div>

        <div
          class="flex items-center gap-2 hover:text-foreground cursor-pointer"
        >
          <HelpCircle class="w-4 h-4" />
          Support
        </div>
      </div>
    </div>
  </footer>
</template>
