<template>
  <select
    v-model="selectedValue"
    v-bind="$attrs"
    class="w-full border border-black dark:border-white px-2 py-1 rounded-md shadow-sm dark:bg-slate-800">
    <option :value="null" disabled hidden>{{ placeholder }}</option>
    <option v-for="(option, index) in options" :key="index" :value="option">
      {{ option?.[field as keyof typeof option] || option }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";

type Option = string | number | object | null;

const props = defineProps({
  options: {
    type: Array as PropType<Option[]>,
    required: true,
  },
  field: String,
  placeholder: {
    type: String,
    default: 'Seleccione una opción'
  }
});
const selectedValue = ref<Option>(null);


</script>
