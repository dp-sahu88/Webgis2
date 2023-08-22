<template>
    <div class="text-[10rem] bg-black h-[100vh] pt-[4rem] ">
        <img :src=image :alt="ecode" class="m-auto">
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()
const ecode = route.params.ecode
const image = ref('')
onMounted(() => { 
    https://httpstatusdogs.com/img/100.jpg
    image.value = `https://httpstatusdogs.com/img/${ecode}.jpg`
 })
</script>
<style scoped></style>