<script setup lang="ts">
import Navbar from './components/UI/Navbar.vue';
</script>

<template>
  <Navbar></Navbar>
  <div class="container mx-auto px-8 sm:px-12 lg:px-24 xl:px-32 py-8 text-black dark:text-white bg-slate-100 dark:bg-slate-800">
    <RouterView />
  </div>
  <Alert class="mx-5"/>
</template>
