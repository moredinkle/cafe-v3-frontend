<template>
  <div class="flex items-center w-auto">
    <input 
      type="checkbox"
      :class="['custom-checkbox w-4 h-4 rounded-sm checked:bg-blue-500 dark:checked:bg-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600']"
      v-model="model" />
    <label class="ml-2" @click="model = !model">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel();
const props = defineProps({
  label: String,
});
</script>

<style scoped>
  .custom-checkbox {
    background-color: rgb(55 65 81 / var(--tw-bg-opacity));
    border: 1px solid #75787c; /* Equivalent to border-gray-300 */
    cursor: pointer;
    appearance: none;
  }
</style>
