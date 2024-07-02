<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings font-mono">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
    <div class="flex flex-row gap-1">
      <div class="p-3 text-lg text-slate-100 font-sans font-bold bg-blue-700 bg-opacity-80 rounded-lg">1</div>
      <div class="p-3 text-lg text-slate-100 font-sans font-bold bg-red-700 bg-opacity-60 rounded-lg">2</div>
      <div class="p-3 text-lg text-slate-100 font-sans font-bold bg-yellow-700 bg-opacity-60 rounded-lg">3</div>
    </div>
  </div>
</template>

