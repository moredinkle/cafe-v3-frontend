<template>
  <div :class="wrapperClass">
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
  alignItems: {
    type: String,
    default: 'center',
    validator: (value: string) => ['start', 'center', 'end'].includes(value),
  },
  justifyContent: {
    type: String,
    default: 'center',
    validator: (value: string) => ['start', 'center', 'end'].includes(value),
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
enum alignClasses {
  start = 'items-start ',
  center = 'items-center ',
  end = 'items-end '
}
enum justifyClasses {
  start = 'justify-start ',
  center = 'justify-center ',
  end = 'justify-end '
}

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
const wrapperClass = computed(() => {
  if(props.inputColSpan === 12) {
    return '';
  }
  let res = 'flex gap-2 my-2 ';
  res += isValidAlignClass(props.alignItems) ? alignClasses[props.alignItems] : alignClasses.center
  res += isValidJustifyClass(props.justifyContent) ? justifyClasses[props.justifyContent] : justifyClasses.center
  return res;
});

function isValidColSpan(value: number): value is keyof typeof colSpanClasses {
  return [3, 4, 6, 8, 9].includes(value);
}
function isValidAlignClass(value: string): value is keyof typeof alignClasses {
  return ['start', 'center', 'end'].includes(value);
}
function isValidJustifyClass(value: string): value is keyof typeof alignClasses {
  return ['start', 'center', 'end'].includes(value);
}
</script>
