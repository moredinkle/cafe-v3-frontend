<template>
  <p>aaa</p>
  <Button @click="newItemModalVisible = true" text-button="Añadir al menú" class="bg-green-600">
    <BriefcaseIcon class="size-5"></BriefcaseIcon>
  </Button>

  <div class="grid grid-cols-2 gap-4">
    <Card v-for="item in menuItems" :title="item.product.name" :subtitle="`Bs. ${item.price}`">
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
    </Card>
  </div>


  <Modal title="Añadir al menú" :visible="newItemModalVisible" @close="newItemModalVisible = false">
    <Card confirm-button-text="Guardar" cancel-button-text="Cancelar">
      <FormFieldWrapper label="Producto" :input-col-span="12">
        <Select :options="products" field="name" placeholder="Seleccione un producto"></Select>
      </FormFieldWrapper>
      <LiveSearchBar v-model="newItemProduct" :search-results="products" display-field="name" @start-search="searchProducts" @select-result="selectResult"></LiveSearchBar>
      <FormFieldWrapper label="Precio" :input-col-span="12">
        <Input :model-value="newItemPrice"/>
      </FormFieldWrapper>
      <FormFieldWrapper label="Stock" :input-col-span="12">
        <Input :model-value="newItemStock"/>
      </FormFieldWrapper>
    </Card>
  </Modal>
</template>

<script setup lang="ts">
import { Mapper } from "@/utils/mapper";
import type { MenuItem, Product } from "@/utils/types";
import { BriefcaseIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
import axios from "axios";
import { ref, type PropType } from "vue";
import { type Option } from "@/utils/types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const props = defineProps({
  menuItems: {
    type: Array as PropType<MenuItem[]>
  }
})

const newItemModalVisible = ref(false);
const products = ref([] as Product[]);
const newItemPrice = ref('');
const newItemStock = ref('');
const newItemProduct = ref('');
const selectedProduct = ref<Product>();

const searchProducts = async () => {
  const response = await axios.get(`${backendUrl}/products?name=${newItemProduct.value}`);
  products.value = response.data.data.map((item: any) => Mapper.toProduct(item));
};

const selectResult = async (item: Option) => {
  selectedProduct.value = item as Product;
  newItemProduct.value = selectedProduct.value.name;
};


// onMounted(getProducts);
</script>
