<script setup lang="ts">
import Navbar from './components/UI/Navbar.vue';
</script>

<template>
  <Navbar></Navbar>
  <div class="container mx-auto px-16 py-4 text-black dark:text-white bg-slate-100 dark:bg-slate-800">
    <RouterView />
  </div>
</template>
