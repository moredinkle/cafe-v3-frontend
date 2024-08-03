<template>
  <Tabs :items="links" class="mb-4"></Tabs>
  <MenusView />
  <ProductsView />
  <!-- <HelloWorld msg="You did it!" /> -->
</template>

<script setup lang="ts">
// import { onMounted, ref } from "vue";
// import axios from "axios";
import { type Link } from "@/utils/types";
// import { Mapper } from "@/utils/mapper";
// import router from "@/router";
// const backendUrl = import.meta.env.VITE_BACKEND_URL;

const links = [
  { text: "Menús", value: "menus" },
  { text: "Productos", value: "productos" },
] as Link[];

</script>
