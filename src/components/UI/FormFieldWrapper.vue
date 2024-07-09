<template>
  <div :class="`${props.inputColSpan !== 12 ? 'flex gap-2 items-center my-2' : ''}`">
    <div :class="labelColClass">
      <label class="text-sm text-opacity-30">{{ label }}</label>
    </div>
    <div :class="inputColClass">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  label: String,
  inputColSpan: {
    type: Number,
    default: 12,
    validator: (value: number) => [3, 4, 6, 8, 9].includes(value),
  },
});

const colSpanClasses = {
  3: "basis-1/4",
  4: "basis-1/3",
  6: "basis-1/2",
  8: "basis-2/3",
  9: "basis-3/4",
  12: "block",
};

const labelColSpan = computed(() => {
  return 12 - props.inputColSpan;
});
const labelColClass = computed(() => {
  if (isValidColSpan(labelColSpan.value)) {
    return colSpanClasses[labelColSpan.value];
  }
  return "";
});
const inputColClass = computed(() => {
  if (isValidColSpan(props.inputColSpan)) {
    return colSpanClasses[props.inputColSpan];
  }
  return colSpanClasses[12];
});

function isValidColSpan(value: number): value is keyof typeof colSpanClasses {
  return [3, 4, 6, 8, 9].includes(value);
}
</script>
