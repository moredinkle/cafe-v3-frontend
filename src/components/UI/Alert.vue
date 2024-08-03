<template>
  <div v-if="visible" :class="[color, 'flex justify-between items-start fixed bottom-4 text-white rounded-lg shadow-lg xs:w-full md:w-72']">
    <div class="flex gap-2 items-center p-4">
      <component :is="iconComponent" class="h-5 w-5" />
      <span class="font-medium">{{ message }}</span>
    </div>
    <button class="relative top-2 right-2" @click="alert.alertStore.hideAlert">
      <XMarkIcon class="h-4 w-4"></XMarkIcon>
    </button>
  </div>
</template>


<script setup lang="ts">
import { ExclamationTriangleIcon, InformationCircleIcon, CheckCircleIcon, XMarkIcon, ExclamationCircleIcon } from "@heroicons/vue/24/outline";
import { computed, inject, onMounted, watch} from "vue";

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

watch(visible, (newVal, oldVal) => {
  console.log('iconComponent changed from', oldVal, 'to', newVal);
});

onMounted(() => {
  console.log('montada');
});
</script>