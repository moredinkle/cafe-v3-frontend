<script setup lang="ts">
import Navbar from './components/UI/Navbar.vue';
</script>

<template>
  <Navbar></Navbar>
  <div class="container mx-auto px-4 sm:px-8 lg:px-16 py-8 text-black dark:text-white bg-slate-100 dark:bg-slate-800">
    <RouterView />
  </div>
</template>
