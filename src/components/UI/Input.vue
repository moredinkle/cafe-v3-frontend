<template>
  <div :class="flexDirectionClasses">
    <div :class="labelColClass">
        <label class="text-sm text-opacity-30">{{ label }}</label>
    </div>
    <div :class="inputColClass">
        <input
          class="w-full border focus:ring-2 focus:outline-none focus:ring-blue-600 px-2 py-1 rounded-md shadow-sm dark:bg-slate-800"
          v-bind="$attrs"
          v-model="model" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const model = defineModel();
const props = defineProps({
  label: String,
  inputColSpan: {
    type: Number,
    default: 12,
  },
});

const flexDirectionClasses = computed(() => {
  return props.inputColSpan == 12 ? "flex flex-col gap-1" : "grid grid-cols-12 gap-2 items-center";
});

const labelColClass = computed(() => {
  return props.inputColSpan >= 12 ? 'w-full' : `col-span-${12 - props.inputColSpan}`;
});

const inputColClass = computed(() => {
  return props.inputColSpan >= 12 ? 'w-full' : `col-span-${props.inputColSpan}`;
});
</script>
