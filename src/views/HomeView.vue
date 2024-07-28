<template>
  <p class="font-semibold text-xl">Menús</p>
  <div class="flex items-center gap-2 my-4">
    <Input placeholder="A ver" type="date"></Input>
    <Button text-button="Crear nuevo menú" class="bg-green-800 py-1.5"></Button>
  </div>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 my-8">
    <Card
      class="transition-transform duration-300 transform hover:scale-110 dark:hover:bg-slate-700 hover:bg-slate-200"
      v-for="menu in menus"
      :key="menu.id"
      :title="menu.formattedDate"
      :subtitle="menu.status"
      header-size="small"></Card>
    <Card title="25-07-2024" subtitle="Activo" header-size="small"></Card>
    <Card title="25-07-2024" subtitle="Terminado" header-size="small"></Card>
    <Card title="25-07-2024" subtitle="Terminado" header-size="small"></Card>
  </div>
  <HelloWorld msg="You did it!" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import axios from "axios";
import { type Menu } from "@/utils/types";
import { Mapper } from "@/utils/mapper";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const menus = ref<Menu[]>([]);

async function getMenus() {
  try {
    const response = await axios.get(`${backendUrl}/menus`);
    menus.value = response.data.data.map((menu: any) => Mapper.toMenu(menu));
  } catch (err) {
    console.log(err);
  }
}

onMounted(async () => {
  await getMenus();
});
</script>
