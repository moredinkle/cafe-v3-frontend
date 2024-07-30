<template>
  <div>
    <SectionHeader text-size="large" :title="menu.formattedDate" :subtitle="menu.status"> </SectionHeader>
    <Tabs :items="links" class="mb-4"></Tabs>
    <MenuItems :menu-items="menu.menuItems"/>
  </div>
</template>

<script setup lang="ts">
import { Mapper } from "@/utils/mapper";
import type { Link, Menu } from "@/utils/types";
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const menu = reactive({} as Menu);
const links = [
  { text: "Menú", value: "menu" },
  { text: "Resumen", value: "resumen" },
] as Link[];

async function getMenuData() {
  const response = await axios.get(`${backendUrl}/menus/${route.params.menuId}?complete=true`);
  Object.assign(menu, Mapper.toMenu(response.data.data));
}

onMounted(getMenuData);
</script>
