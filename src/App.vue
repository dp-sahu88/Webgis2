<script setup>
import {  RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Notifications from './components/Notification/Notifications.vue';
</script>

<template>
  <Header></Header>
  <Notifications/>
  <RouterView />
</template>

<style scoped>

</style>
