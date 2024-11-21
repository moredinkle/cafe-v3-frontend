<template>
  <div>
    <SectionHeader text-size="large" :title="menu.formattedDate" :subtitle="menu.status"> </SectionHeader>
    <Tabs class="mb-4" :items="links" @tab-change="changeTab" :selected-tab="selectedTabValue"></Tabs>
    <MenuItems :menu-items="menu.menuItems" v-if="selectedTabValue === 'menu'" />
    <Resumen :menu-items="menu.menuItems" v-if="selectedTabValue === 'resumen'" />
  </div>
</template>

<script setup lang="ts">
import { Mapper } from "@/utils/mapper";
import type { Link, Menu } from "@/utils/types";
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const menu = reactive({} as Menu);
const links = [
  { text: "Menú", value: "menu" },
  { text: "Resumen", value: "resumen" },
] as Link[];
const selectedTabValue = ref(links[0].value);

const changeTab = (tabValue: string) => {
  selectedTabValue.value = tabValue;
};

async function getMenuData() {
  const response = await axios.get(`${backendUrl}/menus/${route.params.menuId}?complete=true`);
  Object.assign(menu, Mapper.toMenu(response.data.data));
}

onMounted(getMenuData);
</script>
