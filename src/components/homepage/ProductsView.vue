<template>
  <Button
    text-button="Crear nuevo producto"
    @click="newProductModalVisible = true"
    class="bg-green-800 py-1.5"></Button>

  <Table :items="products" :fields="['name', 'category']" :headers="['Nombre', 'Categoria']" actions index-column>
    <template #actionsContent>
      <Button class="py-0 px-1">
        <PencilIcon class="size-5 text-blue-600 dark:text-blue-400"></PencilIcon>
      </Button>
      <Button class="py-0 px-1">
        <TrashIcon class="size-5 text-blue-600 dark:text-blue-400"></TrashIcon>
      </Button>
    </template>
  </Table>

  <Modal title="Crear producto" :visible="newProductModalVisible" @close="newProductModalVisible = false">
    <Card
      confirm-button-text="Guardar"
      cancel-button-text="Cancelar"
      @cancel-clicked="newProductModalVisible = false"
      @confirm-clicked="saveProduct">
      <FormFieldWrapper label="Nombre">
        <Input v-model="newProductName" :error="nameError" :error-message="nameErrorMessage" />
      </FormFieldWrapper>
      <FormFieldWrapper label="Categoria" class="mb-4">
        <Select
          :options="categorias"
          placeholder="Seleccione una categoria"
          v-model="newProductCategory"
          :error="categoryError"
          :error-message="categoryErrorMessage"></Select>
      </FormFieldWrapper>
    </Card>
  </Modal>

  <!-- <HelloWorld msg="You did it!" /> -->
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import axios from "axios";
import { type Product } from "@/utils/types";
import { Mapper } from "@/utils/mapper";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const alert = inject('alert') as any;
const emit = defineEmits(["close"]);

const products = ref<Product[]>([]);
const newProductModalVisible = ref(false);
const newProductName = ref("");
const newProductCategory = ref("");
const categorias = ["Dulce", "Salado", "Bebida"];
const nameError = ref(false);
const nameErrorMessage = ref("");
const categoryError = ref(false);
const categoryErrorMessage = ref("");

const getProducts = async () => {
  try {
    const response = await axios.get(`${backendUrl}/products`);
    products.value = response.data.data.map((product: any) => Mapper.toProduct(product));
  } catch (err) {
    console.log(err);
  }
};

const cleanForm = () => {
  newProductCategory.value = "";
  newProductName.value = "";
  categoryError.value = false;
  categoryErrorMessage.value = "";
  nameError.value = false;
  nameErrorMessage.value = "";
};

const saveProduct = async () => {
  try {
    categoryError.value = false;
    nameError.value = false;
    
    if (!newProductCategory.value) {
      categoryError.value = true;
      categoryErrorMessage.value = "Debe seleccionar una categoria";
    }
    if (!newProductName.value) {
      nameError.value = true;
      nameErrorMessage.value = "Campo obligatorio";
    }

    if(nameError.value || categoryError.value){
      return;
    }
    const body = {
      name: newProductName.value,
      category: newProductCategory.value.toUpperCase(),
    };
    const response = await axios.post(`${backendUrl}/products`, body);
    newProductModalVisible.value = false;
    alert.showAlert("Producto creado con exito", "success", "bg-green-600");
    await getProducts();
    cleanForm();
  }
  catch (err: any) {
    if (err.response?.status >= 400) {
      alert.showAlert(err.response.data.message || err as string, "error", "bg-red-600");
    }
  }
};

onMounted(getProducts);
</script>
