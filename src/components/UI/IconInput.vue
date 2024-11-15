<template>
    <div>
      <div :class="['flex w-full rounded-md', errorClass]">
        <span class="inline-flex items-center px-3 text-gray-900 bg-gray-200 border rounded-e-0 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400">
          <slot></slot>
        </span>
        <input class="w-full border px-2 py-1 shadow-sm dark:bg-slate-800 rounded-md rounded-s-none" v-bind="$attrs" v-model="model" />
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
  const errorClass = computed(() => {
    return props.error ? "border-2 border-red-600 focus:ring-red-600" : "";
  });
  </script>
  