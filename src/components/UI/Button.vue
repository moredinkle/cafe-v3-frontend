<template>
    <button class="flex justify-center items-center gap-1 p-2 rounded-md">
      <slot></slot>
      <span class="text-center" v-if="textButton">{{ textButton }}</span>
    </button>
</template>

<script setup lang="ts">
defineProps({
  textButton: String
})
</script>
