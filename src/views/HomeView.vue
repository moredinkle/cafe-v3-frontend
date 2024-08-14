<template>
  <Tabs :items="links" class="mb-4" @tab-change="changeTab" :selected-tab="selectedTabValue"></Tabs>
  <MenusView v-if="selectedTabValue === 'menus'" />
  <ProductsView v-if="selectedTabValue === 'productos'" />
  <!-- <HelloWorld msg="You did it!" /> -->
</template>

<script setup lang="ts">
import { type Link } from "@/utils/types";
import { ref } from "vue";

const links = [
  { text: "Menús", value: "menus" },
  { text: "Productos", value: "productos" },
] as Link[];
const selectedTabValue = ref(links[0].value);

const changeTab = (tabValue: string) => {
  selectedTabValue.value = tabValue;
};


</script>
