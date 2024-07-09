<template>
  <div>
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>

    <Button
      class="bg-green-700 hover:bg-green-900 text-slate-200"
      text-button="A ver que pasa"
      @click="alertaVisible = !alertaVisible">
      <BeakerIcon class="text-slate-100 w-5 h-5"></BeakerIcon>
    </Button>
    <Button class="bg-teal-700" text-button="Modal" @click="modalVisible = !modalVisible">
      <BeakerIcon class="text-slate-100 w-5 h-5"></BeakerIcon>
    </Button>
    <Card
      title="Titulo prueba"
      subtitle="Veremos como sale po"
      dividers
      confirm-button-text="Aceptar"
      cancel-button-text="Cancelar">
      <template #headerActions>
        <Button class="bg-yellow-500">Amarillo</Button>
      </template>
      <Input v-model="prueba" label="Texto prueba asd" placeholder="Aquisitos jefe"></Input>
      <div>{{ prueba }}</div>
      <Checkbox label="Checkea po loco" v-model="checkboxDummy"></Checkbox>
      {{ checkboxDummy }}
    </Card>

    <Modal :visible="modalVisible" @close="modalVisible = false" title="Probemos po" subtitle="subtitulo" blocked>
      <template #headerIcon>
        <BeakerIcon class="text-slate-100 w-7 h-7"></BeakerIcon>
      </template>
      <Table :headers="headers" :items="items" :fields="fields" actions>
        <template #actionsContent>
          <Button class="py-0 px-1">
            <CalculatorIcon class="w-4 h-4"></CalculatorIcon>
          </Button>
          <Button class="bg-transparent text-blue-500 py-0 px-1">Editar</Button>
        </template>
      </Table>
      <FormFieldWrapper label="Seleccione pe loco">
        <Select :options="items" field="b" v-model="pruebaSelect"></Select>
      </FormFieldWrapper>
      {{ pruebaSelect }}
      <FormFieldWrapper label="Texto prueba" :input-col-span="6">
        <Input v-model="prueba" placeholder="Aquisitos jefe"></Input>
      </FormFieldWrapper>
    </Modal>

    <Alert
      alert-text="Prueba alerta"
      class="right-4 bg-green-600"
      :visible="alertaVisible"
      @close="alertaVisible = false"></Alert>
  </div>
</template>



<script setup lang="ts">
import Button from "./UI/Button.vue";
import Card from "./UI/Card.vue";
import Input from "./UI/Input.vue";
import Alert from "./UI/Alert.vue";
import Modal from "./UI/Modal.vue";
import Table from "./UI/Table.vue";
import Select from "./UI/Select.vue";
import Checkbox from "./UI/Checkbox.vue";
import FormFieldWrapper from "./UI/FormFieldWrapper.vue";
import { BeakerIcon, CalculatorIcon } from "@heroicons/vue/24/outline";
import { reactive, ref } from "vue";
defineProps({
  msg: String,
});

const prueba = ref();
const pruebaSelect = ref();
const alertaVisible = ref(false);
const modalVisible = ref(false);
const checkboxDummy = ref(false);
const headers = ref(['columna 1', 'columna 2', 'columna 3', 'columna 4']);
const fields = ref(['a', 'b', 'c', 'd']);
const options = ['ocpion 1', 'ocpion 1', 'ocpion 1', 'ocpion 1'];
const items = reactive([
  {
    a: 'AAA',
    b: 'BBB',
    c: 12,
    d: 'Texto'
  },
  {
    a: 'AAA',
    b: 'BBB',
    c: 12,
    d: 'Texto2'
  },
  {
    a: 'AAA',
    b: 'BBB',
    c: 12,
    d: 'Text3'
  },
  {
    a: 'AAA',
    b: 'BBB',
    c: 12,
    d: 'Texto4'
  },
])

</script>
