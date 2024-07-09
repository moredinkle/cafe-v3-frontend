<template>
  <textarea
    class="form-textarea w-full border rounded-md shadow-sm dark:bg-slate-800 focus:ring-2 focus:ring-blue-600 px-2 py-1"
    v-bind="$attrs"
    v-model="model"></textarea>
</template>

<script setup lang="ts">
const model = defineModel();
</script>
