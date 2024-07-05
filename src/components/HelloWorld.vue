<script setup lang="ts">
import Button from "./UI/Button.vue";
import Card from "./UI/Card.vue";
import Input from "./UI/Input.vue";
import Alert from "./UI/Alert.vue";
import { BeakerIcon } from "@heroicons/vue/24/outline";
import { ref } from 'vue';
defineProps({
  msg: String,
});

const prueba = ref();
const alertaVisible = ref(false);
</script>

<template>
  <div>
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
    <Button class="bg-green-700 hover:bg-green-900 text-slate-200" text-button="A ver que pasa" @click="alertaVisible = !alertaVisible">
      <BeakerIcon class="text-slate-200 w-5 h-5"></BeakerIcon>
    </Button>
    <Card
      title="Titulo prueba"
      subtitle="Veremos como sale po"
      confirm-button-text="Aceptar"
      cancel-button-text="Cancelar"
      class="bg-slate-100 text-black"
    >
      <Input v-model="prueba" label="Texto prueba" placeholder="Aquisitos jefe"></Input>
      <div>{{ prueba }}</div>
    </Card>
    <Alert alert-text="Prueba alerta" class="right-4 bg-green-600" :visible="alertaVisible" @close="alertaVisible=false" :timeout="1000"></Alert>
  </div>
</template>
