<template>
  <div v-if="visible" :class="[color, 'z-50 flex justify-between items-start fixed bottom-4 text-white rounded-lg shadow-lg xs:w-full md:w-72 lg:w-96']">
    <div class="flex gap-2 items-center p-4">
      <component :is="iconComponent" class="size-6" />
      <span class="font-medium">{{ message }}</span>
    </div>
    <button class="relative top-2 right-2" @click="hideAlert">
      <XCircleIcon class="size-5"></XCircleIcon>
    </button>
  </div>
</template>


<script setup lang="ts">
import { ExclamationTriangleIcon, InformationCircleIcon, CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/24/outline";
import { computed, inject } from "vue";

const alert = inject('alert') as any;
const visible = computed(() => alert.alertState.visible);
const message = computed(() => alert.alertState.message);
const icon = computed(() => alert.alertState.icon);
const color = computed(() => alert.alertState.color);

const iconComponent = computed(() => {
  switch (icon.value) {
    case 'success':
      return CheckCircleIcon;
    case 'warning':
      return ExclamationTriangleIcon;
    case 'error':
      return ExclamationCircleIcon;
    case 'info':
      return InformationCircleIcon;
    default:
      return CheckCircleIcon;
  }
});

const hideAlert = () => {
  alert.hideAlert();
};

</script>