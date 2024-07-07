<template>
  <input
    class="w-full border focus:ring-2 focus:outline-none focus:ring-blue-600 px-2 py-1 rounded-md shadow-sm dark:bg-slate-800"
    v-bind="$attrs"
    v-model="model" />
</template>

<script setup lang="ts">
const model = defineModel();
</script>
