<template>
  <div class="flex justify-between">
    <span class="text-2xl font-semibold">Ventas</span>
    <Button text-button="Editar" class="bg-blue-500" @click="editSales = !editSales">
      <PencilSquareIcon class="size-4"></PencilSquareIcon>
    </Button>
  </div>

  <Table
    class="my-4"
    :items="items"
    :fields="['product.name', 'price', 'stock']"
    :headers="['Nombre', 'Precio', 'Stock']"
    index-column
    custom-column-header="Ventas">
    <template #customColumn="{ item }">
      <Input v-if="editSales" v-model="(item as MenuItem).sold" class="w-fit"></Input>
      <span v-else>{{ (item as MenuItem).previousSold }}</span>
    </template>
  </Table>
  <div class="flex justify-end" v-if="editSales">
    <Button class="bg-green-500" text-button="Guardar" @click="saveSummary">
      <ArrowUpOnSquareIcon class="size-5"></ArrowUpOnSquareIcon>
    </Button>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from "@/utils/types";
import { PencilSquareIcon, ArrowUpOnSquareIcon } from "@heroicons/vue/24/outline";
import axios from "axios";
import { inject, onMounted, ref, watch, type PropType } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const alert = inject("alert") as any;
const emit = defineEmits(["summaryUpdate"]);

const props = defineProps({
  menuItems: {
    type: Array as PropType<MenuItem[]>,
    default: [] as PropType<MenuItem[]>,
  },
});
const items = ref<MenuItem[]>([]);
const editSales = ref(false);


const saveSummary = async () => {
  try {
    const body = items.value.reduce((acc: Partial<MenuItem>[], item: MenuItem) => {
      if (item.sold !== item.previousSold) {
        acc.push({
          id: item.id,
          productId: item.productId,
          sold: (item.sold - item.previousSold),
          stock: item.stock
        });
      }
      return acc;
    }, []);
    const response = await axios.put(`${backendUrl}/menus/${route.params.menuId}/items`, body);
    alert.showAlert("Guardado con exito", "success", "bg-green-600");
    emit("summaryUpdate");
    editSales.value = false;
  } catch(err: any) {
    alert.showAlert(err.response.data.message || (err as string), "error", "bg-red-600");
  }
};

onMounted(() => {
  items.value = [...props.menuItems];
});

watch(() => props.menuItems, (newVal) => {
  items.value = [...newVal];
});
</script>
