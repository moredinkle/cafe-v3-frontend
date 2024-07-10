<template>
  <div>
    <textarea :class="inputClass" v-bind="$attrs" v-model="model"></textarea>
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
    default: "Campo inválido",
  },
});

const inputClass = computed(() => {
  return props.error
    ? "form-textarea w-full border rounded-md shadow-sm dark:bg-slate-800 focus:ring-2 focus:ring-blue-600 px-2 py-1 border-red-600 focus:ring-2 focus:outline-none focus:ring-red-600"
    : "form-textarea w-full border rounded-md shadow-sm dark:bg-slate-800 focus:ring-2 focus:ring-blue-600 px-2 py-1";
});
</script>
