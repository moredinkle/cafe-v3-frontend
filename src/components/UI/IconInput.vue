<template>
    <div>
      <div class="flex">
        <span :class="iconClass">
          <slot></slot>
        </span>
        <input :class="inputClass" v-bind="$attrs" v-model="model" />
      </div>
      <span v-if="error" class="text-red-500 text-xs block font-semibold mx-1">{{ errorMessage }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from "vue";
  
  const model = defineModel();
  const props = defineProps({
    error: Boolean,
    errorMessage: {
      type: String,
      default: 'Campo inválido'
    },
  });
  
  const inputClass = computed(() => {
    return props.error
      ? "w-full border-2 px-2 py-1 shadow-sm dark:bg-slate-800 rounded-md rounded-s-none border-s-0 border-red-600 focus:ring-red-600"
      : "w-full border px-2 py-1 shadow-sm dark:bg-slate-800 rounded-md rounded-s-none border-s-0 focus:ring-blue-600";
  });
  const iconClass = computed(() => {
    return props.error
      ? "inline-flex items-center px-3 text-gray-900 bg-gray-200 border-2 rounded-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 border-red-600 focus:ring-red-600"
      : "inline-flex items-center px-3 text-gray-900 bg-gray-200 border rounded-e-0 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-white focus:ring-blue-600";
  });
  </script>
  