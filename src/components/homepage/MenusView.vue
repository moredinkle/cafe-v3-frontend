<template>
    <div class="flex items-center gap-2 my-4">
      <Input placeholder="A ver" type="date"></Input>
      <Button text-button="Crear nuevo menú" class="bg-green-800 py-1.5"></Button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-8">
      <Card
        class="transition-transform duration-300 transform hover:scale-110 dark:hover:bg-slate-700 hover:bg-slate-200"
        header-size="small"
        @click="goToMenu(menu)"
        v-for="menu in menus"
        :key="menu.id"
        >
        <template #headerMain>
          <div>
            <p class="block text-2xl font-semibold tracking-wider">{{ menu.date.toLocaleDateString() }}</p>
            <Badge :badge-text="menu.status" :class="[statusBadgeColor(menu), 'block']"></Badge>
          </div>
        </template>
      </Card>
    </div>
    <!-- <HelloWorld msg="You did it!" /> -->
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from "vue";
  import axios from "axios";
  import { type Menu } from "@/utils/types";
  import { Mapper } from "@/utils/mapper";
  import router from "@/router";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const menus = ref<Menu[]>([]);

  const statusBadgeColor = (menu: Menu) => {
    if(menu.status.toLowerCase() === "activo") {
      return 'bg-green-600'
    }
    else if(menu.status.toLowerCase() === "inactivo") {
      return 'bg-gray-600'
    }
    else if(menu.status.toLowerCase() === "terminado") {
      return 'bg-red-600'
    }
    return '';
  }
  
  async function getMenus() {
    try {
      const response = await axios.get(`${backendUrl}/menus`);
      menus.value = response.data.data.map((menu: any) => Mapper.toMenu(menu));
    } catch (err) {
      console.log(err);
    }
  }
  
  function goToMenu(menu: Menu) {
    router.push(`/menus/${menu.id}`)
  }
  
  onMounted(async () => {
    await getMenus();
  });
  </script>
  