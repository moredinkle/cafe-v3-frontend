<template>
  <div class="relative overflow-x-auto shadow-lg rounded-lg">
    <table class="w-full text-sm text-left table-auto">
      <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
        <tr>
          <th v-if="indexColumn" class="p-1 font-semibold text-center">#</th>
          <th class="p-3 font-semibold" v-for="header in headers">
            {{ header }}
          </th>
          <th class="p-3 font-semibold w-fit whitespace-nowrap" v-if="customColumnHeader">{{ customColumnHeader }}</th>
          <th class="p-3 font-semibold" v-if="actions">acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
        v-for="(item, index) in items"
        :key="index"
        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
          <td v-if="indexColumn" class="text-center font-extralight">{{ index+1 }}</td>
          <td class="py-2 px-3" v-for="field in fields" :key="field">
            {{ resolveField(item, field) }}
          </td>
          <td v-if="customColumnHeader" class="py-2 px-3 w-fit whitespace-nowrap">
            <slot name="customColumn" :item="item"></slot>
          </td>
          <td v-if="actions" class="py-2 px-3 flex justify-start items-center">
            <slot name="actionsContent" :item="item"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  headers: {
    type: Array as PropType<string[]>,
    required: true,
  },
  fields: {
    type: Array as PropType<string[]>,
    required: true,
  },
  items: {
    type: Array as PropType<Object[]>,
    required: true,
  },
  indexColumn: Boolean,
  actions: Boolean,
  customColumnHeader: String
});

const resolveField = (item: Record<string, any>, field: string): any => {
  return field.split('.').reduce((acc, key) => acc?.[key], item);
};
</script>
