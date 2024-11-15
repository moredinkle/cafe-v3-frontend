<template>
  <p>aaa</p>
  <Button @click="newItemModalVisible = true" text-button="Añadir al menú" class="bg-green-600">
    <BriefcaseIcon class="size-5"></BriefcaseIcon>
  </Button>

  <div class="grid grid-cols-2 gap-4">
    <Card v-for="item in menuItems" :title="item.product.name" :subtitle="`Bs. ${item.price}`" class="p-2">
      <template #headerActions>
        <div class="flex justify-end items-center gap-2">
          <Button class="bg-transparent font-semibold rounded-3xl border-2">
            <PencilIcon class="size-5"></PencilIcon>
          </Button>
          <Button class="bg-transparent font-semibold rounded-3xl border-2">
            <TrashIcon class="size-5"></TrashIcon>
          </Button>
        </div>
      </template>
      <Badge :badge-text="`Disponibles: ${item.stock}`" class="bg-rose-700"></Badge>
      <ProgressBar :progress="(item.stock/item.originalStock)*100" :color="progressBarClass(item)" />
    </Card>
  </div>


  <Modal title="Añadir al menú" :visible="newItemModalVisible" @close="newItemModalVisible = false">
    <Card confirm-button-text="Guardar" cancel-button-text="Cancelar" @cancel-clicked="newItemModalVisible = false" @confirm-clicked="createItem">
      <FormFieldWrapper label="Producto" :input-col-span="12">
        <LiveSearchBar v-model="menuItemForm.productName" :search-results="products" display-field="name" @start-search="searchProducts" @select-result="selectResult" @clear-results="products = []"></LiveSearchBar>
      </FormFieldWrapper>
      <FormFieldWrapper label="Precio" :input-col-span="12">
        <Input v-model="menuItemForm.price"/>
      </FormFieldWrapper>
      <FormFieldWrapper label="Stock" :input-col-span="12">
        <Input v-model="menuItemForm.stock"/>
      </FormFieldWrapper>
      {{ menuItemForm.stock }}
    </Card>
  </Modal>
</template>

<script setup lang="ts">
import { Mapper } from "@/utils/mapper";
import type { MenuItem, Product } from "@/utils/types";
import { BriefcaseIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
import axios from "axios";
import { inject, reactive, ref, type PropType } from "vue";
import { type Option } from "@/utils/types";
import { useRoute } from "vue-router";
import { create } from "lodash";

const route = useRoute();
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const alert = inject("alert") as any;

const props = defineProps({
  menuItems: {
    type: Array as PropType<MenuItem[]>
  }
})

const newItemModalVisible = ref(false);
const products = ref([] as Product[]);
const selectedProduct = ref<Product>();
const menuItemForm = reactive({
  productName: "",
  price: null as number | null,
  stock: null as number | null,
  id: "",
});


const searchProducts = async () => {
  const response = await axios.get(`${backendUrl}/products?name=${menuItemForm.productName}`);
  products.value = response.data.data.map((item: any) => Mapper.toProduct(item));
};

const selectResult = async (item: Option) => {
  selectedProduct.value = item as Product;
  menuItemForm.productName = selectedProduct.value.name;
  menuItemForm.price = selectedProduct.value.basePrice;
  menuItemForm.id = selectedProduct.value.id;
};

const createItem = async () => {
  try {
    const body = {
      productId: menuItemForm.id,
      price: menuItemForm.price,
      stock: menuItemForm.stock
    };
    console.log(body);
    return;
  
    const reqUrl = `${backendUrl}/menus/${route.params.menuId}/items/`;
    const response = await axios.post(reqUrl, body);
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
    return 'bg-red-600';
  }
  else if(percentage < 50) {
    return 'bg-orange-400';
  }
  else {
    return 'bg-blue-600';
  }
};


// onMounted(getProducts);
</script>
