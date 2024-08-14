<template>
  <div>
    <select
      v-model="selectedValue"
      v-bind="$attrs"
      :class="inputClass"
      @change="emitChange">
      <option :value="''" disabled>{{ placeholderText }}</option>
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option?.[field as keyof typeof option] || option }}
      </option>
    </select>
    <span v-if="error" class="text-red-500 text-xs block font-semibold mx-1">{{ errorMessage }}</span>
  </div>
</template>
<!-- !!! v-model debe iniciar como string vacio '' para poder ver el placeholder -->

<script setup lang="ts">
import { computed, type PropType } from "vue";
import { type Option } from "@/utils/types";


const props = defineProps({
  options: {
    type: Array as PropType<Option[]>,
    required: true,
  },
  field: String,
  placeholderText: {
    type: String,
    default: "Seleccione una opción",
  },
  error: Boolean,
  errorMessage: {
    type: String,
    default: "Campo inválido",
  },
});

const inputClass = computed(() => {
  return props.error
    ? "w-full border-2 px-2 py-1 rounded-md shadow-sm dark:bg-slate-800 border-red-600 focus:ring-red-600"
    : "w-full border border-black dark:border-white px-2 py-1 rounded-md shadow-sm dark:bg-slate-800";
});

const selectedValue = defineModel();

const emit = defineEmits(["changeSelected"]);
const emitChange = () => {
  emit("changeSelected", selectedValue);
};
</script>
