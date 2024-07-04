<script setup lang="ts">
import { computed } from 'vue';
import Button from './Button.vue';

const props = defineProps({
  title: String,
  subtitle: String,
  confirmButtonText: String,
  cancelButtonText: String,
  dark: Boolean
});

const darkSoftColor = computed(() => {
  return props.dark ? 'gray-200' : 'gray-700'
});

const darkColor = computed(() => {
  return props.dark ? 'white' : 'black'
});
</script>

<template>
    <div class="box-border border-2 shadow-lg rounded-lg flex flex-col gap-5 py-2 px-4">
      <div class="flex flex-col gap-1">
        <span :class="`text-xl text-${darkColor}`"> {{ title }} </span>
        <span :class="`text-xs text-${darkColor}`"> {{ subtitle }} </span>
        <div :class="`border-b border-${darkSoftColor} border-opacity-20 mt-1`"></div>
      </div>
      
      <slot name="default" :class="`text-${darkColor}`"></slot>
      
      <!-- footer -->
      <div>
        <div :class="`border-b border-${darkSoftColor} border-opacity-20 mb-3`"></div>
        <div class="flex gap-2 justify-end">
          <slot name="footerAdditionalButtons"></slot>
          <Button v-if="cancelButtonText" class="bg-red-600 text-white text-xs" :text-button="cancelButtonText"></Button>
          <Button v-if="confirmButtonText" class="bg-green-600 text-white text-xs" :text-button="confirmButtonText"></Button>
        </div>
      </div>
      <slot name="footer"></slot>
    </div>
</template>