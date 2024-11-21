<template>
  <!-- TODO
    eliminar -> solo si no se vendió nada, mejor dejarlo para después
   -->
  <Button @click="toggleMenuItemForm(true)" text-button="Añadir al menú" class="bg-green-600">
    <BriefcaseIcon class="size-5"></BriefcaseIcon>
  </Button>

  <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-3 mt-3">
    <!-- TODO probar progress bar como subtitulo y el resto como contenido de la tarjeta -->
    <Card v-for="item in menuItems" class="px-2 pt-3 pb-2">
      <template #headerMain>
        <div class="flex flex-col gap-0 w-full">
          <span class="text-2xl font-semibold">{{ item.product.name }}</span>
          <ProgressBar :progress="(item.stock/item.originalStock)*100" :color="progressBarClass(item)" class="w-full" />
        </div>
      </template>
      <template #headerActions>
        <div class="flex justify-end items-center gap-2">
          <Button class="bg-transparent font-semibold rounded-md border hover:scale-125 hover:animate-pulse" @click="editItem(item)">
            <PencilIcon class="size-4"></PencilIcon>
          </Button>
          <Button class="bg-transparent font-semibold rounded-md border">
            <TrashIcon class="size-4"></TrashIcon>
          </Button>
        </div>
      </template>
      <div class="flex flex-col gap-1">
        <span class="items-center">
          <CurrencyDollarIcon class="size-5 text-slate-300 text-opacity-80 mr-1 inline-block"></CurrencyDollarIcon>
          Precio: Bs. {{ item.price }}
        </span>
        <span class="items-center">
          <ClipboardDocumentListIcon class="size-5 text-slate-300 text-opacity-80 mr-1 inline-block"></ClipboardDocumentListIcon>
          Disponibles: {{ item.stock }}
        </span>
      </div>
    </Card>
  </div>


  <Modal title="Añadir al menú" :visible="newItemModalVisible" @close="toggleMenuItemForm(false)">
    <Card confirm-button-text="Guardar" cancel-button-text="Cancelar" @cancel-clicked="toggleMenuItemForm(false)" @confirm-clicked="saveItem(editingItem)">
      <FormFieldWrapper label="Producto" :input-col-span="12">
        <LiveSearchBar v-model="menuItemForm.productName" :search-results="products" display-field="name" @start-search="searchProducts" @select-result="selectResult" @clear-results="products = []" :disabled="editingItem"></LiveSearchBar>
      </FormFieldWrapper>
      <FormFieldWrapper label="Precio" :input-col-span="12">
        <Input v-model="menuItemForm.price" :disabled="editingItem"/>
      </FormFieldWrapper>
      <FormFieldWrapper label="Stock" :input-col-span="12">
        <Input v-model="menuItemForm.stock"/>
      </FormFieldWrapper>
    </Card>
  </Modal>
</template>

<script setup lang="ts">
import { Mapper } from "@/utils/mapper";
import type { MenuItem, Product } from "@/utils/types";
import { BriefcaseIcon, PencilIcon, TrashIcon, CurrencyDollarIcon, ClipboardDocumentListIcon } from "@heroicons/vue/24/outline";
import axios from "axios";
import { inject, reactive, ref, watch, type PropType } from "vue";
import { type Option } from "@/utils/types";
import { useRoute } from "vue-router";

const route = useRoute();
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const alert = inject("alert") as any;

const props = defineProps({
  menuItems: {
    type: Array as PropType<MenuItem[]>
  }
});

const newItemModalVisible = ref(false);
const editingItem = ref(false);
const products = ref([] as Product[]);
const selectedProduct = ref<Product>();
const menuItemForm = reactive({
  productName: "",
  price: null as number | null,
  stock: null as number | null,
  originalStock: null as number | null,
  id: "",
  productId: "",
});

const editItem = (item: MenuItem) => {
  menuItemForm.id = item.id;
  menuItemForm.price = item.price;
  menuItemForm.stock = item.stock;
  menuItemForm.originalStock = item.originalStock;
  menuItemForm.productName = item.product.name;
  menuItemForm.productId = item.product.id;
  newItemModalVisible.value = true;
  editingItem.value = true;
};

const toggleMenuItemForm = (open = true) => {
  newItemModalVisible.value = open;
  editingItem.value = false;
  if(!open){
    menuItemForm.productName = '';
    menuItemForm.price = null;
    menuItemForm.stock = null;
    menuItemForm.originalStock = null;
    menuItemForm.productId = '';
  }
};

const searchProducts = async () => {
  const response = await axios.get(`${backendUrl}/products?name=${menuItemForm.productName}`);
  products.value = response.data.data.map((item: any) => Mapper.toProduct(item));
};

const selectResult = async (item: Option) => {
  selectedProduct.value = item as Product;
  menuItemForm.productName = selectedProduct.value.name;
  menuItemForm.price = selectedProduct.value.basePrice;
  menuItemForm.productId = selectedProduct.value.id;
};

const saveItem = async (edit = false) => {
  try {
    const body = {
      productId: menuItemForm.productId,
      price: Number(menuItemForm.price),
      stock: Number(menuItemForm.stock),
      originalStock: Number(menuItemForm.originalStock)
    };
    if(edit){
      const reqUrl = `${backendUrl}/menus/${route.params.menuId}/items/${menuItemForm.id}`;
      const response = await axios.put(reqUrl, body);
    } else {
      const reqUrl = `${backendUrl}/menus/${route.params.menuId}/items/`;
      const response = await axios.post(reqUrl, body);
    }
    newItemModalVisible.value = false;
    alert.showAlert("Guardado con exito", "success", "bg-green-600");
    // await getProducts(); // ? no se si se queda con el get o solo recupera el que editó, voy ver
  } catch(err: any) {
    alert.showAlert(err.response.data.message || (err as string), "error", "bg-red-600");
  }
};

const progressBarClass = (item: MenuItem) => {
  const percentage = (item.stock/item.originalStock)*100;
  if(percentage < 15) {
    return 'bg-red-700';
  }
  else if(percentage < 50) {
    return 'bg-orange-700';
  }
  else {
    return 'bg-blue-700';
  }
};


// onMounted(getProducts);
// watch(newItemModalVisible, () => {
//   editingItem.value = false;
// });
</script>
