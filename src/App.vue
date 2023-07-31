<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="h-[4rem]">
      <nav class="flex flex-row justify-end bg-blue-300">
          <RouterLink to="/" class="my-[1.2rem] text-lg mr-10 font-bold hover:underline  hover:underline-offset-4" >2D</RouterLink>
          <RouterLink to="/3d" class="my-[1.2rem] text-lg mr-10 font-bold hover:underline  hover:underline-offset-4" >3D</RouterLink>
      </nav>
  </header>
  <RouterView />
</template>

<style scoped>

</style>
