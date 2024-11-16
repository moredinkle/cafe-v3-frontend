<template>
  <div>
    <input
      :class="[
        'w-full border focus:ring-2 focus:outline-none focus:ring-blue-600 px-2 py-1 rounded-md shadow-sm dark:bg-slate-800 custom-input',
        $attrs.disabled ? 'cursor-not-allowed text-gray-500 dark:text-gray-400' : '',
        inputClass,
      ]"
      v-bind="$attrs"
      v-model="model" />
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
  return props.error ? "border-2 border-red-600 focus:ring-red-600" : "";
});
</script>

<style scoped>
.custom-input::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
