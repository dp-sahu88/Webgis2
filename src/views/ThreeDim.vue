<template>
<div id="cesiumContainer" ref="CesiumContainer"></div>
</template>
<script setup>
import { Viewer} from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import {ref,onMounted} from 'vue'
const CesiumContainer = ref(null)
let viewer = null
onMounted(()=>{
    viewer = new Viewer('cesiumContainer');
})
</script>
<style scoped>
</style>