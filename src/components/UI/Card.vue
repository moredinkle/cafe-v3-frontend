<template>
    <div class="box-border border-2 shadow-lg rounded-lg flex flex-col gap-3 py-2 px-4 text-black dark:text-white">
      <div>
        <SectionHeader :title="title" :subtitle="subtitle" :text-size="headerSize">
          <template #headerIcon>
            <slot name="headerIcon"></slot>
          </template>
          <template #headerMain>
            <slot name="headerMain"></slot>
          </template>
          <template #headerActions>
            <slot name="headerActions"></slot>
          </template>
        </SectionHeader>
        <div v-if="dividers" class="border-b border-slate-700 dark:border-slate-200 border-opacity-20 mb-3"></div>
      </div>
      
      <slot name="default"></slot>
      
      <!-- footer -->
      <div>
        <div v-if="dividers" class="border-b border-slate-700 dark:border-slate-200 border-opacity-20 mb-3"></div>
        <slot name="footer"></slot>
        <div class="flex gap-2 justify-end">
          <slot name="footerAdditionalButtons"></slot>
          <Button v-if="cancelButtonText" @click="emit('cancelClicked')" class="bg-red-600 text-white text-xs" :text-button="cancelButtonText"></Button>
          <Button v-if="confirmButtonText" @click="emit('confirmClicked')" class="bg-green-600 text-white text-xs" :text-button="confirmButtonText"></Button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from './Button.vue';
import SectionHeader from "./SectionHeader.vue";

const emit = defineEmits(['cancelClicked', 'confirmClicked']);

const props = defineProps({
  title: String,
  subtitle: String,
  confirmButtonText: String,
  cancelButtonText: String,
  headerSize: String,
  dividers: {
    type: Boolean,
    default: false
  }
});

</script>
