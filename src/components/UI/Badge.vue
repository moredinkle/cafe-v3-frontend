<template>
  <div class="px-2 py-0.5 rounded-md w-fit">
    <div class="flex justify-center items-center tracking-wide">
      <slot></slot>
      <span class="text-xs font-light text-opacity-30">{{ badgeText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  badgeText: String
});
</script>
