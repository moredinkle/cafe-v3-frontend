<script setup lang="ts">
defineProps({
  textButton: String
})
</script>

<template>
    <button class="flex justify-center items-center gap-2 p-2 font-bold rounded-md">
      <slot></slot>
      <span>{{ textButton }}</span>
    </button>
</template>