<template>
  <ul class="flex flex-wrap -mb-px">
    <li class="me-2" v-for="item in items" :key="item.value">
      <a
        @click.prevent="selectedTabValue = item.value"
        href="#"
        :class="[defaultClass, item.value === selectedTabValue ? selectedClass : '']"
      >
        {{ item.text }}
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Link } from "@/utils/types";
import { ref, type PropType } from "vue";



const defaultClass = "font-semibold inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
const selectedClass = "text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400";

const props = defineProps({
  items: {
    type: Array as PropType<Link[]>,
    required: true,
  },
});
let selectedTabValue = ref(props.items[0].value);

</script>
