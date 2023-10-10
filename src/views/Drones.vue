<template>
    <div class="h-[100vh]">
        <ol-map ref="mapRef" :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" class="pt-[4rem] h-[100vh]">
            <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />
            <ol-tile-layer ref="osmLayer" title="OSM base layer">
                <ol-source-osm />
            </ol-tile-layer>

            <ol-overlay :position="[ item.latitude,item.longitude+ zoom/100]" v-for="item in dronesData" :key="item">
                <div class="overlay-content">
                    {{ item.speed }}
                </div>
            </ol-overlay>
            <ol-overlay :position="[ item.latitude,item.longitude]" v-for="item in dronesData" :key="item">
                <div class="h-1 w-1 rounded-full bg-red-500">
                    
                </div>
            </ol-overlay>
        </ol-map>
    </div>
</template>
<script setup>
import axios from 'axios';
import { getToken } from '../utils/auth/auth';
import { onMounted, ref } from 'vue';
import { useDrones } from '../stores/Drones';
import { storeToRefs } from 'pinia';
const droneStore = useDrones()
const { drones, dronesData } = storeToRefs(droneStore)
const center = ref([116.547539, 40.450996]);
const projection = ref("EPSG:4326");
const zoom = ref(1.1);
const mapRef = ref(null)
const rotation = ref(0);
const view = ref(null);

onMounted(() => {
    getData()
    setInterval(()=>{console.log(view.value.getZoom()); getData()}, 1000);
})
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
                let date = ele?.properties?.last_update_date
                let time = ele?.properties?.last_update_time
                let speed = ele?.properties?.speed
                let name = ele?.properties?.name
                return {
                    longitude: longitude,
                    latitude: latitude,
                    height: height,
                    date: date,
                    time: time,
                    speed: speed,
                    name: name
                }
            })
            dronesData.value = res
        })
}
</script>

<style scoped>
.overlay-content {
    background: #efefef;
    box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
    padding: 10px 20px;
    font-size: 16px;
    color: black;
}
</style>