<template>
  <header class="flex justify-between items-center gap-2 px-1 mb-2">
    <div class="flex justify-start items-center gap-2">
      <slot name="headerIcon"></slot>
      <div>
        <span class="block text-2xl font-semibold">{{ title }}</span>
        <span class="block text-sm text-opacity-30">{{ subtitle }}</span>
      </div>
    </div>
    <slot name="headerActions"></slot>
  </header>
</template>

<script setup lang="ts">

const props = defineProps({
  title: String,
  subtitle: String,
});
</script>
