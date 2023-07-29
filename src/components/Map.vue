<template>
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 75vh">
        <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>

        <ol-vector-layer>
            <ol-source-vector>
                <ol-feature v-for="coordinate in coordinates" :key="coordinate[0]">
                    <ol-geom-point :coordinates="coordinate"></ol-geom-point>
                    <ol-style>
                        <ol-style-circle :radius="radius">
                            <ol-style-fill :color="fillColor"></ol-style-fill>
                            <ol-style-stroke :color="strokeColor" :width="strokeWidth"></ol-style-stroke>
                        </ol-style-circle>
                    </ol-style>
                </ol-feature>
            </ol-source-vector>
        </ol-vector-layer>
        <ol-interaction-dragrotatezoom />
    </ol-map>

    <div>
        {{ data }}
    </div>

</template>
  
<script setup>
import { ref } from "vue";
import axios from 'axios';
const center = ref([116.547539, 40.450996]);
const projection = ref("EPSG:4326");
const zoom = ref(1);
const rotation = ref(0);
const radius = ref(2);
const strokeWidth = ref(10);
const strokeColor = ref("red");
const fillColor = ref("white");
const coordinates = ref([]);
const data = ref([]);

setInterval(getData, 1000);

function getData (){
    axios
        .get('http://localhost:8000/api/drone-positions')
        .then((response) => {
            let res = response.data.map(ele => {
                return [ele.long, ele.lat]
            })
            data.value = res
            coordinates.value = res
        })
}
getData();
</script>
  
<style scoped>
button {
    border: 1px solid black;
    margin: 0.5rem 0;
    padding: 0.5rem;
}

button:hover,
button:focus {
    background-color: lightgray;
}
</style>