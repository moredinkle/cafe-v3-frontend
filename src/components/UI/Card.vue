<script setup lang="ts">
import { computed } from 'vue';
import Button from './Button.vue';
import SectionHeader from "./SectionHeader.vue";

const props = defineProps({
  title: String,
  subtitle: String,
  confirmButtonText: String,
  cancelButtonText: String,
});

</script>

<template>
    <div class="box-border border-2 shadow-lg rounded-lg flex flex-col gap-5 py-2 px-4 text-black dark:text-white">
      <div>
        <SectionHeader :title="title" :subtitle="subtitle">
          <template #headerIcon>
            <slot name="headerIcon"></slot>
          </template>
          <template #headerActions>
            <slot name="headerActions"></slot>
          </template>
        </SectionHeader>
        <div class="border-b border-slate-700 dark:border-slate-200 border-opacity-20 mb-3"></div>
      </div>
      
      <slot name="default"></slot>
      
      <!-- footer -->
      <div>
        <div class="border-b border-slate-700 dark:border-slate-200 border-opacity-20 mb-3"></div>
        <slot name="footer"></slot>
        <div class="flex gap-2 justify-end">
          <slot name="footerAdditionalButtons"></slot>
          <Button v-if="cancelButtonText" class="bg-red-600 text-white text-xs" :text-button="cancelButtonText"></Button>
          <Button v-if="confirmButtonText" class="bg-green-600 text-white text-xs" :text-button="confirmButtonText"></Button>
        </div>
      </div>
    </div>
</template>