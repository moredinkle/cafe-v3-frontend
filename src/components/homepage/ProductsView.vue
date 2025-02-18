<template>
  <div class="my-4">
    <span>
      <Button text-button="Crear nuevo producto" @click="openCreateForm" class="ml-auto bg-green-600 py-1.5 px-4"></Button>
    </span>
    <div class="my-4 grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
      <IconInput v-model="searchParam" class="w-full col-span-2" placeholder="Buscar...">
        <MagnifyingGlassIcon class="size-4"></MagnifyingGlassIcon>
      </IconInput>
      <div class="flex w-full gap-2 order-3 md:order-2">
        <Button text-button="Buscar" @click="searchProducts" class="bg-blue-600 py-1.5 w-full h-fit">
          <MagnifyingGlassIcon class="size-4"></MagnifyingGlassIcon>
        </Button>
        <Button text-button="Limpiar" @click="clearSearchBar" class="bg-gray-600 py-1.5 w-full h-fit">
          <BackspaceIcon class="size-4"></BackspaceIcon>
        </Button>
      </div>
      <div class="col-span-2 xl:col-span-1 order-2 md:order-3">
        <MultiSelect
          :options="categorias"
          placeholder-text="Categorias"
          :selected-items="filterParam"
          @push-item="pushToFilterArray"
          @remove-item="removeFromFilterArray">
        </MultiSelect>
      </div>
    </div>
  </div>

  <Table :items="products" :fields="['name', 'basePrice', 'category']" :headers="['Nombre', 'Precio base', 'Categoria']" actions index-column>
    <template #actionsContent="{ item }">
      <Button class="py-0 px-1">
        <PencilIcon
          class="size-5 text-blue-600 dark:text-blue-400"
          @click="productToEditForm(item as Product)"></PencilIcon>
      </Button>
      <Button class="py-0 px-1">
        <TrashIcon class="size-5 text-blue-600 dark:text-blue-400" @click="openDeleteModal(item as Product)">
        </TrashIcon>
      </Button>
    </template>
  </Table>

  <Modal
    :title="`Seguro que desea eliminar ${productToDelete.name}?`"
    :visible="deleteProductModal"
    :close-button="false"
    @close="deleteProductModal = false"
  >
    <div class="flex gap-1 justify-center mt-8">
      <Button text-button="Cancelar" @click="deleteProductModal = false" class="bg-red-600"></Button>
      <Button text-button="Confirmar" @click="deleteProduct" class="bg-green-600"></Button>
    </div>



  </Modal>

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
      <FormFieldWrapper label="Precio base">
        <Input v-model="productForm.basePrice" type="number":error="basePriceError" :error-message="basePriceErrorMessage" />
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
  basePrice: null as number | null,
  id: "",
});
const productFormModalVisible = ref(false);
const deleteProductModal = ref(false);
const productToDelete = ref<Product>({} as Product);
const categorias = Object.values(ProductCategories);
const nameError = ref(false);
const nameErrorMessage = ref("");
const categoryError = ref(false);
const categoryErrorMessage = ref("");
const basePriceError = ref(false);
const basePriceErrorMessage = ref("");
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

const pushToFilterArray = (item: Option) => {
  filterParam.value.push(item);
};

const removeFromFilterArray = (index: number) => {
  filterParam.value.splice(index,1);
};

const clearSearchBar = () => {
  filterParam.value = [];
  searchParam.value = "";
};

const productToEditForm = (product: Product) => {
  productForm.name = product.name;
  productForm.category = product.category;
  productForm.basePrice = product.basePrice;
  productForm.id = product.id;
  productFormModalVisible.value = true;
};

const openCreateForm = () => {
  cleanForm();
  productFormModalVisible.value = true;
};

const cleanForm = () => {
  productForm.name = "";
  productForm.category = "";
  productForm.basePrice = null;
  productForm.id = "";

  categoryError.value = false;
  categoryErrorMessage.value = "";
  nameError.value = false;
  nameErrorMessage.value = "";
  basePriceError.value = false;
  basePriceErrorMessage.value = "";
};

const validateForm = () => {
  categoryError.value = false;
  nameError.value = false;
  basePriceError.value = false;

  if (!productForm.name) {
    categoryError.value = true;
    categoryErrorMessage.value = "Debe seleccionar una categoria";
  }
  if (!productForm.category) {
    nameError.value = true;
    nameErrorMessage.value = "Campo obligatorio";
  }
  if (!productForm.basePrice) {
    basePriceError.value = true;
    basePriceErrorMessage.value = "Campo obligatorio";
  }

  if (nameError.value || categoryError.value || basePriceError.value) {
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

const openDeleteModal = async (product: Product) => {
  deleteProductModal.value = true;
  productToDelete.value = product;
};

const deleteProduct = async () => {
  try {
    const reqUrl = `${backendUrl}/products/${productToDelete.value.id}`;
    const response = await axios.delete(reqUrl);
    deleteProductModal.value = false;
    productToDelete.value = {} as Product;
    alert.showAlert("Producto eliminado", "success", "bg-green-600");
    await getProducts();
  } 
  catch (err: any) {
    if (err.response?.status >= 400) {
      alert.showAlert(err.response.data.message || (err as string), "error", "bg-red-600");
      deleteProductModal.value = false;
      productToDelete.value = {} as Product;
    }
  }
};

const saveProduct = async () => {
  try {
    if (!validateForm()) {
      return;
    }

    const body = {
      name: productForm.name,
      basePrice: productForm.basePrice,
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
