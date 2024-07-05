<template>
  <div v-if="visible" class="flex justify-between items-start fixed bottom-4 text-white rounded-lg shadow-lg xs:w-full md:w-72">
    <div class="flex gap-2 items-center p-4">
      <component :is="iconComponent" class="h-5 w-5" />
      <span class="font-medium">{{ alertText }}</span>
    </div>
      <button class="relative top-2 right-2">
        <XMarkIcon class="h-4 w-4" @click="emit('close')"></XMarkIcon>
      </button>
  </div>
</template>


<script setup lang="ts">
import { ExclamationTriangleIcon, InformationCircleIcon, CheckCircleIcon, XMarkIcon, ExclamationCircleIcon } from "@heroicons/vue/24/outline";
import { computed, onMounted, watch } from "vue";
const emit = defineEmits(['close'])

const props = defineProps({
  alertText: String,
  visible: Boolean,
  timeout: {
    type: Number,
    default: 5000
  },
  icon: {
    type: String as () => "error" | "warning" | "success" | "info",
    default: "success",
    validator: (value: string) => ["error", "warning", "success", "info"].includes(value),
  },
});

const iconComponent = computed(() => {
  switch (props.icon) {
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
  setTimeout(() => {
    console.log('ahora')
    emit('close');
  }, props.timeout);
};

watch(() => props.visible, (newValue) => {
  if (newValue) {
    hideAlert();
  }
});
</script>
