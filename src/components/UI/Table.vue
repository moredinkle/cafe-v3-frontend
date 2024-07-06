<template>
  <div class="relative overflow-x-auto shadow-lg rounded-lg">
    <table class="w-full text-sm text-left">
      <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="p-3 font-semibold" v-for="header in headers">
            {{ header }}
          </th>
          <th class="p-3 font-semibold" v-if="actions">acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="index"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700">
          <td class="py-2 px-3" v-for="field in fields" :key="field">
            {{ item[field as keyof typeof item] }}
          </td>
          <td v-if="actions" class="py-2 px-3 flex justify-start items-center">
            <slot name="actionsContent"></slot>

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
  actions: Boolean
});
</script>
