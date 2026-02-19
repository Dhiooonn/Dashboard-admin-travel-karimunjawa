<script setup lang="ts">
import type { ToastViewportProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { ToastViewport } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<
  ToastViewportProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <ToastViewport
    v-bind="delegatedProps"
    :class="
      cn(
        'fixed top-4 right-4 z-[100] flex w-full max-w-[420px] flex-col gap-2',
        props.class,
      )
    "
  />
</template>
