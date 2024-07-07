<template>
  <div :class="flexDirectionClasses">
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
  3: "col-span-3",
  4: "col-span-4",
  6: "col-span-6",
  8: "col-span-8",
  9: "col-span-9",
  12: "col-span-full",
};

const flexDirectionClasses = computed(() => {
  return props.inputColSpan == 12 ? "flex flex-col gap-1 my-2" : "grid grid-cols-12 gap-2 items-center my-2";
});

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
