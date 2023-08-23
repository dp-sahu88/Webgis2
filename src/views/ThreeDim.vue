<template>
  <div id="cesiumContainer" ref="CesiumContainer" class="h-[100vh] pt-[4rem]"></div>
  <div class="absolute bottom-10 right-2" @click="toggleDraw">🖌</div>
  <div v-if="draw" class="absolute flex flex-col item-center pointer-events-none" :style="pinPosition">
    <div class="h-4 w-4 rounded-full bg-red-600 "></div>
    <div class="h-[45px] w-[2px] bg-black m-auto"></div>
  </div>
</template>
<script setup>
import { Viewer, Cartesian3, Color } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { ref, onMounted, watch, onUnmounted } from 'vue';
import axios from 'axios';
import { getToken } from '../utils/auth/auth';
import { viewerAddDrawEventListener, viewerRemoveDrawEventListener } from '../utils/cesium/Draw'
const CesiumContainer = ref(null)
const drones = ref([])
const draw = ref(false)
let viewer = null
const pinPosition = ref({ left: 0, top: 0 })
onMounted(() => {
  getData();
  viewer = new Viewer('cesiumContainer', { shouldAnimate: true });
  viewer.animation.container.style.visibility = 'hidden';
  viewer.timeline.container.style.visibility = 'hidden';
  viewer.bottomContainer.style.visibility = 'hidden'
  CesiumContainer.value.addEventListener('mousemove', updatePinPosition)
})
let intervalId = setInterval(getData, 5000);
function viewerSetup() {
  if (draw.value == true) {
    return;
  }
  viewer.entities.removeAll();
  drones.value.forEach(droneLocation => {
    let drone = viewer.entities.add({
      name: droneLocation.name,
      model: {
        uri: '/file-1592658408798.glb',
        scale: 10
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
  let url = import.meta.env.VITE_API_URL + '/drone-positions'
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: {
      'Authorization': 'Bearer ' + getToken(),
    }
  };
  axios
    .request(config)
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

const toggleDraw = function () {
  draw.value ?
    viewerRemoveDrawEventListener(viewer) :
    viewerAddDrawEventListener(viewer);
  draw.value = !draw.value
}

const updatePinPosition = (event) => {
  pinPosition.value.left = event.clientX - 8 + 'px'
  pinPosition.value.top = event.clientY + 'px'
}

watch(drones, (newVal, oldVal) => { viewerSetup() })
onUnmounted(()=>{
  clearInterval(intervalId)
})
</script>
<style scoped></style>