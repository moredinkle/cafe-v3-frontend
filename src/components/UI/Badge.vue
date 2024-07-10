<template>
    <span class="flex justify-center items-center gap-0.5 py-1 px-2 tracking-wide rounded-md w-fit">
      <slot></slot>
      <span class="text-xs font-semibold text-opacity-30">{{ badgeText }}</span>
    </span>
</template>

<script setup lang="ts">
defineProps({
    badgeText: String
})
</script>
