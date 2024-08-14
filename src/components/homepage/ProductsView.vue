<template>
  <div class="my-4">
    <div class="flex justify-between">
      <span class="font-semibold text-xl">Filtros</span>
      <Button text-button="Crear nuevo producto" @click="openCreateForm" class="bg-green-600 py-1.5 px-4"></Button>
    </div>
    <div class="my-4 flex gap-2 items-center">
      <span class="w-1/4">
        <MultiSelect
          :options="categorias"
          placeholder-text="Seleccione una categoria"
          @update:selectedItems="updateSelectedItems"></MultiSelect>
      </span>
      <span class="w-1/2">
        <IconInput v-model="searchParam" placeholder="Buscar...">
          <MagnifyingGlassIcon class="size-4"></MagnifyingGlassIcon>
        </IconInput>
      </span>
      <span class="w-1/4 flex gap-1">
        <Button text-button="Limpiar" @click="openCreateForm" class="bg-gray-600 py-1.5 w-full">
          <BackspaceIcon class="size-4"></BackspaceIcon>
        </Button>
        <Button text-button="Buscar" @click="searchProducts" class="bg-blue-600 py-1.5 w-full">
          <MagnifyingGlassIcon class="size-4"></MagnifyingGlassIcon>
        </Button>
      </span>
    </div>
  </div>

  <Table :items="products" :fields="['name', 'category']" :headers="['Nombre', 'Categoria']" actions index-column>
    <template #actionsContent="{ item }">
      <Button class="py-0 px-1">
        <PencilIcon
          class="size-5 text-blue-600 dark:text-blue-400"
          @click="productToEditForm(item as Product)"></PencilIcon>
      </Button>
      <Button class="py-0 px-1">
        <TrashIcon class="size-5 text-blue-600 dark:text-blue-400"></TrashIcon>
      </Button>
    </template>
  </Table>

  <Modal
    :title="`${productForm.id ? 'Editar' : 'Crear'} producto`"
    :visible="productFormModalVisible"
    @close="productFormModalVisible = false">
    <Card
      confirm-button-text="Guardar"
      cancel-button-text="Cancelar"
      @cancel-clicked="productFormModalVisible = false"
      @confirm-clicked="saveProduct">
      <FormFieldWrapper label="Nombre">
        <Input v-model="productForm.name" :error="nameError" :error-message="nameErrorMessage" />
      </FormFieldWrapper>
      <FormFieldWrapper label="Categoria" class="mb-4">
        <Select
          :options="categorias"
          placeholder="Seleccione una categoria"
          v-model="productForm.category"
          :error="categoryError"
          :error-message="categoryErrorMessage"></Select>
      </FormFieldWrapper>
    </Card>
  </Modal>

  <!-- <HelloWorld msg="You did it!" /> -->
</template>

<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue";
import axios from "axios";
import { ProductCategories, type Product } from "@/utils/types";
import { Mapper } from "@/utils/mapper";
import { type Option } from "@/utils/types";
import { PencilIcon, TrashIcon, MagnifyingGlassIcon, BackspaceIcon } from "@heroicons/vue/24/outline";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const alert = inject("alert") as any;
const emit = defineEmits(["close"]);

const products = ref<Product[]>([]);
const productForm = reactive({
  name: "",
  category: "",
  id: "",
});
const productFormModalVisible = ref(false);
const categorias = Object.values(ProductCategories);
const nameError = ref(false);
const nameErrorMessage = ref("");
const categoryError = ref(false);
const categoryErrorMessage = ref("");
const searchParam = ref("");
const filterParam = ref<Option[]>([]);

const getProducts = async () => {
  try {
    const response = await axios.get(`${backendUrl}/products`);
    products.value = response.data.data.map((product: any) => Mapper.toProduct(product));
  } catch (err) {
    console.log(err);
  }
};

const updateSelectedItems = (items: Option[]) => {
  filterParam.value = items;
};

const productToEditForm = (product: Product) => {
  productForm.name = product.name;
  productForm.category = product.category;
  productForm.id = product.id;
  productFormModalVisible.value = true;
  console.log(productForm);
};

const openCreateForm = () => {
  cleanForm();
  productFormModalVisible.value = true;
};

const cleanForm = () => {
  productForm.name = "";
  productForm.category = "";
  productForm.id = "";
  categoryError.value = false;
  categoryErrorMessage.value = "";
  nameError.value = false;
  nameErrorMessage.value = "";
};

const validateForm = () => {
  categoryError.value = false;
  nameError.value = false;

  if (!productForm.name) {
    categoryError.value = true;
    categoryErrorMessage.value = "Debe seleccionar una categoria";
  }
  if (!productForm.category) {
    nameError.value = true;
    nameErrorMessage.value = "Campo obligatorio";
  }

  if (nameError.value || categoryError.value) {
    return false;
  }
  return true;
};

const searchProducts = async () => {
  try {
    const params = {
      name: searchParam.value,
      categories: filterParam.value,
    };
    const response = await axios.get(`${backendUrl}/products`, { params });
    products.value = response.data.data.map((product: any) => Mapper.toProduct(product));
  } catch (err) {
    console.log(err);
  }
};

const editProduct = async (body: object) => {
  const reqUrl = `${backendUrl}/products/${productForm.id}`;
  const response = await axios.put(reqUrl, body);
};

const createProduct = async (body: object) => {
  const reqUrl = `${backendUrl}/products`;
  const response = await axios.post(reqUrl, body);
};

const saveProduct = async () => {
  try {
    if (!validateForm()) {
      return;
    }

    const body = {
      name: productForm.name,
      category: productForm.category.toUpperCase(),
    };
    let successMessage = "Producto creado con exito";

    if (productForm.id) {
      successMessage = "Producto editado con exito";
      await editProduct(body);
    } else {
      await createProduct(body);
    }

    productFormModalVisible.value = false;
    alert.showAlert(successMessage, "success", "bg-green-600");
    await getProducts(); // ? no se si se queda con el get o solo recupera el que editó, voy ver
    cleanForm();
  } catch (err: any) {
    if (err.response?.status >= 400) {
      alert.showAlert(err.response.data.message || (err as string), "error", "bg-red-600");
    }
  }
};

onMounted(getProducts);
</script>
