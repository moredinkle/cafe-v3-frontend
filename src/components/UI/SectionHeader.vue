<template>
  <header class="flex justify-between items-center gap-2 px-1 mb-2">
    <div class="flex justify-start items-center gap-2">
      <slot name="headerIcon"></slot>
      <div>
        <span :class="titleClass">{{ title }}</span>
        <span :class="subtitleClass">{{ subtitle }}</span>
      </div>
    </div>
    <slot name="headerActions"></slot>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';


enum titleClassEnum {
  small = 'block text-xl font-semibold tracking-wide',
  medium = 'block text-2xl font-semibold tracking-wide',
  large = 'block text-2xl font-semibold tracking-wide'
};

enum subtitleClassEnum {
  small = 'block text-opacity-30 text-xs ',
  medium = 'block text-opacity-30 text-sm ',
  large = 'block text-opacity-30 text-sm '
};

const props = defineProps({
  title: String,
  subtitle: String,
  textSize: {
    type: String,
    default: 'medium',
    validator: (value: string) => ['small', 'medium', 'large'].includes(value),
  },
});

const titleClass = computed(() => {
  if (isValidTitleClass(props.textSize)) {
    return titleClassEnum[props.textSize];
  }
  return "";
});
const subtitleClass = computed(() => {
  if (isValidTitleClass(props.textSize)) {
    return subtitleClassEnum[props.textSize];
  }
  return "";
});

function isValidTitleClass(value: string): value is keyof typeof titleClassEnum {
  return ['small', 'medium', 'large'].includes(value);
}
</script>
