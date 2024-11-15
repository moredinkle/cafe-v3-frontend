<template>
  <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
    <div :class="['h-2 rounded-full', color]" :style="{ width: `${progress}%` }"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  progress: {
    type: Number,
    default: 80,
  },
  color: {
    type: String,
    default: 'bg-blue-600',
  },
});
</script>
