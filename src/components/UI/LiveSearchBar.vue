<template>
  <div>
    <IconInput v-model="searchValue" class="w-full" placeholder="Buscar...">
      <MagnifyingGlassIcon class="size-4"></MagnifyingGlassIcon>
    </IconInput>
    <ul class="border-2" v-if="showResults">
      <li
        @click="selectResult(item)"
        class="hover:bg-blue-300 dark:hover:bg-blue-700"
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
const emit = defineEmits(["startSearch", "selectResult"]);

const selectResult = (item: Option) => {
  emit("selectResult", item);
  showResults.value = false;
};

const debouncedSearch = debounce(() => {
  emit("startSearch", searchValue.value);
  showResults.value = true;
}, 2000);

watch(searchValue, () => {
  debouncedSearch();
});
</script>
