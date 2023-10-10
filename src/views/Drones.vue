<template>
    <div class="h-[100vh]">
        <ol-map ref="mapRef" :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" class="pt-[4rem] h-[100vh]">
            <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />
            <ol-tile-layer ref="osmLayer" title="OSM base layer">
                <ol-source-osm />
            </ol-tile-layer>

            <ol-overlay :position="[item.longitude, item.latitude]" v-for="item in dronesNewData" :key="item">
                <div class="pl-4">
                    <div class="bg-yellow-300 text-slate-700 text-xs hover:text-sm hover:text-black shadow-lg">
                        <div class="hover:font-bold">
                            Name:{{ item.name }}
                        </div>
                        <div class="hover:font-bold">
                            Speed:{{ item.speed }}
                        </div>
                        <div class="hover:font-bold">
                            Alt:{{ item.height }}
                        </div>
                    </div>
                </div>

            </ol-overlay>
            <ol-overlay :position="[item.longitude, item.latitude]" v-for="item in dronesNewData" :key="item">
                <div class="h-2 w-2 rounded-full bg-red-500 pointer-events-none">

                </div>
            </ol-overlay>

            <ol-vector-layer>
                <ol-source-vector>
                    <ol-feature v-for="droneName in droneNames" :key="droneName">
                        <ol-geom-line-string :coordinates="droneLoctionHistory[droneName].locationHistory" :key="droneName">
                        </ol-geom-line-string>
                        <ol-style>
                            <ol-style-stroke :color="droneLoctionHistory[droneName].strockColor"
                                :width="strokeWidth"></ol-style-stroke>
                        </ol-style>
                    </ol-feature>
                </ol-source-vector>
            </ol-vector-layer>
        </ol-map>
    </div>
</template>
<script setup>
import axios from 'axios';
import { getToken } from '../utils/auth/auth';
import { onMounted, ref, computed } from 'vue';
import { useDrones } from '../stores/Drones';
import { storeToRefs } from 'pinia';
const droneStore = useDrones()
const { droneLoctionHistory, droneNames, dronesNewData } = storeToRefs(droneStore)
const center = ref([0, 0]);
const projection = ref("EPSG:4326");
const zoom = ref(1.1);
const mapRef = ref(null)
const rotation = ref(0);
const view = ref(null);
const strokeColor = "#ffffff"
const strokeWidth = 1.5
const zoomLevel = computed(() => view.value?.getZoom() || 0)
onMounted(() => {
    getData()
    setInterval(() => { getData() }, 1000);
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
            dronesNewData.value = res
            droneStore.updateData(res)
        })
}
</script>

<style scoped></style>