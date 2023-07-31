<template>
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 70vh">
        <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

        <ol-tile-layer ref="osmLayer" title="OSM base layer">
            <ol-source-osm />
        </ol-tile-layer>

        <ol-vector-layer ref="dronesLayer" title="Drones">
            <ol-source-vector>
                <ol-interaction-draw v-if="drawEnable" :type="drawType" @drawend="drawend" @drawstart="drawstart">
                    <ol-style>
                        <ol-style-stroke color="blue" :width="2"></ol-style-stroke>
                        <ol-style-fill color="rgba(255, 255, 0, 0.4)"></ol-style-fill>
                    </ol-style>
                </ol-interaction-draw>
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
        <ol-mouseposition-control v-if="mousepositioncontrol" position="bottom" />
        <ol-fullscreen-control v-if="fullscreencontrol" />
        <ol-scaleline-control v-if="scalelinecontrol" />
        <ol-rotate-control v-if="rotatecontrol" />
        <ol-zoom-control v-if="zoomcontrol" />
        <ol-zoomslider-control v-if="zoomslidercontrol" />
        <ol-zoomtoextent-control v-if="zoomtoextentcontrol" :extent="[23.906, 42.812, 46.934, 34.597]"
            tipLabel="Fit to Turkey" />

        <ol-swipe-control ref="swipeControl" v-if="showSwipeControl && layerList.length > 0" :layerList="layerList" />

        <ol-layerswitcher-control v-if="showLayerSwitcherControl && layerList.length > 0" />

        <ol-layerswitcherimage-control v-if="showLayerSwitcherImageControl && layerList.length > 0" />

        <ol-printdialog-control v-if="showPrintDialogControl" />

        <ol-toggle-control v-if="showToggleControl" :html="'log'"
            :onToggle="($event) => console.log('ol-toggle-control: onToggle', $event)" />
    </ol-map>
    <div class="mx-4 mt-2">
        <div class=" flex flex-col">
            <div>
                <div class="mr-8 inline">
                    <input type="checkbox" id="checkbox1" v-model="drawEnable" />
                    <label for="checkbox1">Draw Enable</label>
                </div>
                <select id="type" v-model="drawType">
                    <option value="Point">Point</option>
                    <option value="LineString">LineString</option>
                    <option value="Polygon">Polygon</option>
                    <option value="Circle">Circle</option>
                </select>
            </div>
            <div class="mr-8 inline">
                <input type="checkbox" id="checkbox2" v-model="fullscreencontrol" />
                <label for="checkbox2">fullscreen control</label>
            </div>
            <div class="mr-8 inline">
                <input type="checkbox" id="checkbox3" v-model="mousepositioncontrol" />
                <label for="checkbox3">mouse position control</label>
            </div>
            <div class="mr-8 inline">
                <input type="checkbox" id="scaleline" v-model="scalelinecontrol" />
                <label for="scaleline">ol-scaleline-control</label>
            </div>
            <div class="mr-8 inline">
                <input type="checkbox" id="rotatecontrol" v-model="rotatecontrol" />
                <label for="rotatecontrol">ol-rotate-control</label>
            </div>
            <div class="mr-8 inline">
                <input type="checkbox" id="zoom" v-model="zoomcontrol" />
                <label for="zoom">ol-zoom-control</label>
            </div>
            <div class="mr-8 inline">
                <input type="checkbox" id="zoomtoextent" v-model="zoomtoextentcontrol" />
                <label for="zoomtoextent">ol-zoomtoextent-control</label>
            </div>
            <div class="mr-8 inline">
                <input type="checkbox" id="zoomslider" v-model="zoomslidercontrol" />
                <label for="zoomslider">ol-zoomslider-control</label>
            </div>
            <div class="mr-8 inline">
                <input type="checkbox" id="swipecontrol" v-model="showSwipeControl" />
                <label for="swipecontrol">ol-swipe-control</label>
            </div>
            <div class="mr-8 inline">
                <input type="checkbox" id="layerswitchercontrol" v-model="showLayerSwitcherControl" />
                <label for="layerswitchercontrol">ol-layerswitcher-control</label>
            </div>
            <div class="mr-8 inline">
                <input type="checkbox" id="layerswitcherimagecontrol" v-model="showLayerSwitcherImageControl" />
                <label for="layerswitcherimagecontrol">ol-layerswitcherimage-control</label>
            </div>
            <div class="mr-8 inline">
                <input type="checkbox" id="printdialogcontrol" v-model="showPrintDialogControl" />
                <label for="printdialogcontrol">ol-printdialog-control</label>
            </div>
            <div class="mr-8 inline">
                <input type="checkbox" id="togglecontrol" v-model="showToggleControl" />
                <label for="togglecontrol">ol-toggle-control</label>
            </div>
        </div>
    </div>



    <!-- <div>
        {{ data }}
    </div> -->
</template>
  
<script setup>
import { ref, inject,onMounted } from "vue";
import axios from 'axios';
const center = ref([116.547539, 40.450996]);
const projection = ref("EPSG:4326");
const zoom = ref(1);
const rotation = ref(0);
const radius = ref(2);
const layerList = ref([]);
const osmLayer = ref(null);
const dronesLayer = ref(null)
const strokeWidth = ref(10);
const strokeColor = ref("red");
const fillColor = ref("white");
const coordinates = ref([]);
const data = ref([]);
const drawEnable = ref(false);
const modifyEnabled = ref(false)
const drawType = ref("Polygon");
const fullscreencontrol = ref(true)
const mousepositioncontrol = ref(true)
const scalelinecontrol = ref(false)
const showSwipeControl = ref(false)
const rotatecontrol = ref(false)
const zoomcontrol = ref(false)
const zoomtoextentcontrol = ref(false)
const zoomslidercontrol = ref(false)
const showLayerSwitcherControl = ref(false)
const showPrintDialogControl = ref(false)
const showToggleControl = ref(false)
const showLayerSwitcherImageControl = ref(false)
setInterval(getData, 5000);

function getData() {
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


const drawstart = (event) => {
    console.log(event);
};

const drawend = (event) => {
    console.log(event);
};

onMounted(() => {
  layerList.value.push(osmLayer.value.tileLayer);
  layerList.value.push(dronesLayer.value.vectorLayer);
  console.log(layerList.value);
});
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