<script setup lang="ts">
import Button from "./UI/Button.vue";
import Card from "./UI/Card.vue";
import { BeakerIcon } from "@heroicons/vue/24/outline";
defineProps({
  msg: String,
});
</script>

<template>
  <div>
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
    <Button class="bg-green-700 hover:bg-green-900 text-slate-200" text-button="A ver que pasa">
      <BeakerIcon class="text-slate-200 w-5 h-5"></BeakerIcon>
    </Button>
    <Card
      title="Titulo prueba"
      subtitle="Veremos como sale po"
      confirm-button-text="Aceptar"
      cancel-button-text="Cancelar"
      class="bg-slate-100 text-black">
      <div>Hola</div>
    </Card>
  </div>
</template>
