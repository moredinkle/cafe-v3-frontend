<template>
  <div>
    <input :class="[inputClass, 'custom-input']" v-bind="$attrs" v-model="model" />
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
  }
});

const inputClass = computed(() => {
  return props.error
    ? "w-full border-2 border-red-600 focus:ring-2 focus:outline-none focus:ring-red-600 px-2 py-1 rounded-md shadow-sm dark:bg-slate-800"
    : "w-full border focus:ring-2 focus:outline-none focus:ring-blue-600 px-2 py-1 rounded-md shadow-sm dark:bg-slate-800";
});
</script>

<style scoped>
.custom-input::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>