<template>
  <div>
    <IconInput v-model="searchValue" class="w-full" placeholder="Buscar...">
      <MagnifyingGlassIcon class="size-4"></MagnifyingGlassIcon>
    </IconInput>
    <ul class="border-l border-r border-b rounded-b-lg px-1 -my-1" v-if="showResults || loading">
      <li v-if="loading" class="animate-pulse flex justify-center pt-2">
        <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      </li>
      <li
        @click="selectResult(item)"
        class="hover:bg-blue-300 dark:hover:bg-blue-700 my-1"
        v-for="item in searchResults"
        :key="typeof item === 'object' ? item?.['id' as keyof typeof item] : item">
        {{ item?.[displayField as keyof typeof item] || item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { debounce } from "lodash";
import { ref, watch, type PropType } from "vue";
import { type Option } from "@/utils/types";

const props = defineProps({
  searchResults: {
    type: Array as PropType<Option[]>,
    required: true,
  },
  displayField: String,
});

const searchValue = defineModel();
const showResults = ref(false);
const resultSelected = ref(false);
const loading = ref(false);
const emit = defineEmits(["startSearch", "selectResult", "clearResults"]);

const selectResult = (item: Option) => {
  emit("selectResult", item);
  showResults.value = false;
  loading.value = false;
  resultSelected.value = true;
};

const debouncedSearch = debounce(() => {
  emit("startSearch", searchValue.value);
  showResults.value = true;
}, 2000);

watch(searchValue, () => {
  if(!resultSelected.value) {
    emit("clearResults");
    loading.value = true;
    debouncedSearch();
  }
  else {
    resultSelected.value = false;
  }
});
watch( () => props.searchResults, (newResults) => {
    if (newResults.length > 0) {
      loading.value = false;
    }
  }
);
</script>
