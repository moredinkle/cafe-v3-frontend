<!-- Modal.vue -->
<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="closeModal()"></div>
    <div class="bg-white dark:bg-gray-800 rounded shadow-lg z-10 max-w-lg w-full p-4">
      <div class="text-start">
        <button @click="closeModal()" class="text-slate-800 dark:text-slate-100">
          <XMarkIcon class="h-5 w-5" />
        </button>
      </div>

      <SectionHeader :title="title" :subtitle="subtitle">
        <template #headerIcon>
          <slot name="headerIcon"></slot>
        </template>
        <template #headerActions>
          <slot name="headerActions"></slot>
        </template>
      </SectionHeader>

      <slot name="default"></slot>

      <footer class="flex justify-end pt-4 px-1">
        <slot name="footerContent"></slot>
        <Button class="bg-transparent text-blue-500 font-bold tracking-wider" @click="closeModal(true)">
          {{ footerButtonText.toUpperCase() }}
        </Button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";
import SectionHeader from "./SectionHeader.vue";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  blocked: Boolean,
  title: String,
  subtitle: String,
  footerButtonText: {
    type: String,
    default: "Aceptar",
  },
});

const emit = defineEmits(["close"]);

const closeModal = (force: Boolean = false) => {
  if (!props.blocked || force) {
    emit("close");
  }
};
</script>
