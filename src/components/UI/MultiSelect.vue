<template>
  <Select
    class="w-full"
    :options="options"
    :field="field"
    :error="error"
    :error-message="errorMessage"
    :placeholder-text="placeholderText"
    v-model="selectModel"
    @change-selected="handleSelectedChange"></Select>
    <div class="flex flex-wrap gap-1 my-2">
        <Badge
          v-for="(item,index) in selectedItems"
          :key="index"
          class="bg-transparent border border-black dark:border-white"
          :badge-text="item?.[field as keyof typeof item] || (item as string) ">
          <button class="transition-transform duration-300 transform hover:scale-125" @click="removeFromSelected(index)">
            <XMarkIcon class="size-4 mr-1"></XMarkIcon>
          </button>
</Badge>
    </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

type Option = string | number | object | null;

const props = defineProps({
  selectedItems: {
    type: Array as PropType<Option[]>,
    required: true
  },
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

const selectModel = ref<Option>('');
// const selectedItems = ref<Option[]>([]);
const emit = defineEmits(['pushItem', 'removeItem']);

const handleSelectedChange = (selected: Option) => {
  if(props.selectedItems.includes(selectModel.value)){
    return;
  }
  const cleanedValue = typeof selectModel.value === 'object' ? {...selectModel.value} : selectModel.value
  emit('pushItem', cleanedValue);
  selectModel.value = '';
};

const removeFromSelected = (index: number) => {
  emit('removeItem', index);
  if(props.selectedItems.length === 0) {
    selectModel.value = '';
  }
};
</script>
