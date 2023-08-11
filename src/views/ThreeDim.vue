<template>
  <div id="cesiumContainer" ref="CesiumContainer" class="h-[100vh] ph-[4rem]"></div>
</template>
<script setup>
import { Viewer, Cartesian3, Color, GeoJsonDataSource } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
const CesiumContainer = ref(null)
const drones = ref([])
let viewer = null
let india
let odisha
let naguar
onMounted(() => {
  getData();
  viewer = new Viewer('cesiumContainer');
  viewer.animation.container.style.visibility = 'hidden';
  viewer.timeline.container.style.visibility = 'hidden';
  viewer.bottomContainer.style.visibility = 'hidden'
  // viewer.forceResize();
})
setInterval(getData, 5000);
function viewerSetup() {
  viewer.entities.removeAll();
  drones.value.forEach(droneLocation => {
    let drone = viewer.entities.add({
      name: droneLocation.name,
      // height: 20.0,
      //   ellipsoid: {
      //     radii: new Cartesian3(15.0, 15.0, 15.0),
      //     material: Color.BLUE.withAlpha(0.5),
      //     slicePartitions: 24,
      //     stackPartitions: 36,
      //   },
      model: {
        uri: '/Cesium_Air.glb'
      }
    });
    let point = viewer.entities.add({
      name: droneLocation.name + "_point_",
      point: { pixelSize: 10, color: Color.RED }
    });
    let position = Cartesian3.fromDegrees(
      droneLocation.longitude,
      droneLocation.latitude,
      droneLocation.height
    )
    point.position = position,
    point.show = true;
    drone.position = position,
    drone.show = true;
    // viewer.trackedEntity = drone
  });
}

function getData() {
  axios
    .get('http://192.168.1.9:8000/api/drone-positions')
    .then((response) => {
      let res = response.data.features.map(ele => {
        let coordinates = ele.geometry.coordinates
        let longitude = coordinates[0]
        let latitude = coordinates[1]
        let height = coordinates[2] || 0
        let date = ele?.properties?.last_update
        let name = ele?.properties?.name
        return {
          longitude: longitude,
          latitude: latitude,
          height: height,
          date: date,
          name: name
        }
      })
      drones.value = res
    })
}

watch(drones, (newVal, oldVal) => { viewerSetup() })

</script>
<style scoped></style>