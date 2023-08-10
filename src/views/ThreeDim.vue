<template>
    <div id="cesiumContainer" ref="CesiumContainer" class="pt-[4rem] h-[calc(100vh)]"></div>
</template>
<script setup>
import { Viewer, Cartesian3, Color,GeoJsonDataSource } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { ref, onMounted } from 'vue';
const CesiumContainer = ref(null)
let viewer = null 
let drones = null
onMounted(() => {
    viewer = new Viewer("cesiumContainer")
    viewer.animation.container.style.visibility = 'hidden';
    viewer.timeline.container.style.visibility = 'hidden';
    viewer.bottomContainer.style.visibility = 'hidden'
    viewer.forceResize();
    setData();
})
function setData (){
    if (drones != null){
        viewer.entities.remove(drones)
    }
    drones = viewer.dataSources.add(GeoJsonDataSource.load(
      "/drones.geojson",
      {
        stroke: Color.BLUE,
        fill: Color.BLUEVIOLET.withAlpha(0.5),
        strokeWidth: 3,
      }
    ))
    // console.log(viewer)
}
setInterval(setData, 5000);
</script>
<style scoped></style>