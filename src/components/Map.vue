<template>
    <ol-map ref="mapRef" :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" class="pt-[4rem] h-[100vh]">
        <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />
        <ol-tile-layer ref="osmLayer" title="OSM base layer">
            <ol-source-osm />
            <ol-interaction-draw v-if="drawEnable" :type="drawType" @drawend="drawend" @drawstart="drawstart">
                <ol-style>
                    <ol-style-stroke color="blue" :width="2"></ol-style-stroke>
                    <ol-style-fill color="rgba(255, 255, 0, 0.4)"></ol-style-fill>
                </ol-style>
            </ol-interaction-draw>
        </ol-tile-layer>
        <ol-interaction-dragrotatezoom />
        <ol-mouseposition-control v-if="mousepositioncontrol" position="bottom" />
        <ol-fullscreen-control v-if="fullscreencontrol" />
        <ol-scaleline-control v-if="scalelinecontrol" />
        <ol-rotate-control v-if="rotatecontrol" />
        <ol-zoomslider-control v-if="zoomslidercontrol" />
        <ol-zoomtoextent-control v-if="zoomtoextentcontrol" :extent="[23.906, 42.812, 46.934, 34.597]"
            tipLabel="Fit to Turkey" />

        <ol-swipe-control ref="swipeControl" v-if="showSwipeControl && layerList.length > 0" :layerList="layerList" />

        <ol-layerswitcher-control v-if="showLayerSwitcherControl && layerList.length > 0" />

        <ol-layerswitcherimage-control v-if="showLayerSwitcherImageControl && layerList.length > 0" />

        <ol-printdialog-control v-if="showPrintDialogControl" />
    </ol-map>

    <div @click="control=!control" class="absolute bottom-6 left-6 h-8 w-8 bg-blue-700 rounded-md">
        <img src="../assets/tool.png" class="h-6 w-6 m-1 absolute" >
        <Transition name="rotate">
            <img v-if="control" src="../assets/tool.png" class="h-6 w-6 m-1 absolute rotate-90" >
        </Transition>
    </div>
    <Transition name="slideup">
        <div v-if="control" class="mx-4 mt-2 absolute bottom-4 left-10 bg-slate-100/40 backdrop-blur-sm rounded-lg lg:w-[40vw] p-6" >
            <div class=" flex flex-row flex-wrap gap-4" id="map-control">
                <div class=" h-[3rem] flex flex-row  rounded-lg" :class="drawEnable ? 'bg-blue-600' : 'bg-blue-400'">
                    <input type="checkbox" id="checkbox1" v-model="drawEnable" />
                    <label class="capitalize text-white p-[.75rem]" for="checkbox1">
                        Draw {{ drawEnable ? 'Disable' : 'Enable' }}
                    </label>
                    <select id="type" v-model="drawType"
                        class="h-[3rem] rounded-lg border-solid border-2 border-slate-600 text-slate-100"
                        :class="drawEnable ? 'bg-blue-500' : 'bg-blue-400'">
                        <option value="Point">Point</option>
                        <option value="LineString">LineString</option>
                        <option value="Polygon">Polygon</option>
                        <option value="Circle">Circle</option>
                    </select>
                </div>
                <input type="checkbox" id="checkbox2" v-model="fullscreencontrol" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] "
                    :class="fullscreencontrol ? 'bg-blue-600' : 'bg-blue-400'" for="checkbox2">
                    fullscreen control
                </label>

                <input type="checkbox" id="checkbox3" v-model="mousepositioncontrol" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] "
                    :class="mousepositioncontrol ? 'bg-blue-600' : 'bg-blue-400'" for="checkbox3">
                    mouse position
                </label>

                <input type="checkbox" id="scaleline" v-model="scalelinecontrol" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] "
                    :class="scalelinecontrol ? 'bg-blue-600' : 'bg-blue-400'" for="scaleline">
                    scaleline-control
                </label>

                <input type="checkbox" id="rotatecontrol" v-model="rotatecontrol" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] "
                    :class="rotatecontrol ? 'bg-blue-600' : 'bg-blue-400'" for="rotatecontrol">
                    rotate-control
                </label>

                <input type="checkbox" id="zoomtoextent" v-model="zoomtoextentcontrol" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] "
                    :class="zoomtoextentcontrol ? 'bg-blue-600' : 'bg-blue-400'" for="zoomtoextent">zoom to extent</label>


                <input type="checkbox" id="zoomslider" v-model="zoomslidercontrol" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] "
                    :class="zoomslidercontrol ? 'bg-blue-600' : 'bg-blue-400'" for="zoomslider">zoomslider</label>


                <input type="checkbox" id="swipecontrol" v-model="showSwipeControl" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] "
                    :class="showSwipeControl ? 'bg-blue-600' : 'bg-blue-400'" for="swipecontrol">swipe control</label>


                <input type="checkbox" id="layerswitchercontrol" v-model="showLayerSwitcherControl" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] "
                    :class="showLayerSwitcherControl ? 'bg-blue-600' : 'bg-blue-400'"
                    for="layerswitchercontrol">layerswitcher</label>


                <input type="checkbox" id="layerswitcherimagecontrol" v-model="showLayerSwitcherImageControl" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] "
                    :class="showLayerSwitcherImageControl ? 'bg-blue-600' : 'bg-blue-400'"
                    for="layerswitcherimagecontrol">layerswitcher image</label>


                <input type="checkbox" id="printdialogcontrol" v-model="showPrintDialogControl" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] "
                    :class="showPrintDialogControl ? 'bg-blue-600' : 'bg-blue-400'"
                    for="printdialogcontrol">printdialog-control</label>
            </div>
        </div>
    </Transition>
</template>
  
<script setup>
import { ref, onMounted, watch } from "vue";
import { GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import DragAndDrop from 'ol/interaction/DragAndDrop.js';
import flyTo from '../utils/ol/FlyTo2D.js'
import resolveSource from '../utils/ol/ResolveSourceType'
import { useLayerSources } from "../stores/SourceList";
import { storeToRefs } from "pinia";

const center = ref([116.547539, 40.450996]);
const projection = ref("EPSG:4326");
const zoom = ref(1);
const map = ref(null)
const mapRef = ref(null)
const rotation = ref(0);
const control = ref(false)
const layerList = ref([]);
const osmLayer = ref(null);
const allLayers = ref({});
const drawEnable = ref(false);
const drawType = ref("Polygon");
const fullscreencontrol = ref(true)
const mousepositioncontrol = ref(true)
const scalelinecontrol = ref(false)
const showSwipeControl = ref(false)
const rotatecontrol = ref(false)
const zoomtoextentcontrol = ref(false)
const zoomslidercontrol = ref(false)
const showLayerSwitcherControl = ref(false)
const showPrintDialogControl = ref(false)
const showLayerSwitcherImageControl = ref(false)
const layerSources = useLayerSources()
const { recentlyRemoved } = storeToRefs(layerSources)
let dragAndDropInteraction;

// refresh data in 5 sec
setInterval(getData, 5000);

//get data from external sources
function getData() {
    layerSources.sourceList.forEach(element => {
        if (element.refresh || !element.loaded) {
            let newLayer = resolveSource(element)
            map.value.getLayers().forEach(layer => {
                if (layer?.get('name') && layer?.get('name') == newLayer.name) {
                    map.value.removeLayer(layer)
                }
            });
            map.value.addLayer(newLayer.layer)
            element.layername = newLayer.name
            layerList.value.push(newLayer.layer)
            allLayers.value[newLayer.name] = newLayer.layer
            if (element.loaded == false) {
                let loc = element.focusOn.value
                let view = map.value.getView()
                flyTo(element.focusOn.value, view, () => { })
                element.loaded = true
            }
        }
    });
}

// set interaction to get the data by drag and drop action
function setInteraction() {
    if (dragAndDropInteraction) {
        map.value.removeInteraction(dragAndDropInteraction);
    }
    dragAndDropInteraction = new DragAndDrop({
        formatConstructors: [
            GPX,
            GeoJSON,
            IGC,
            new KML({ extractStyles: true }),
            TopoJSON,
        ],
    });
    dragAndDropInteraction.on('addfeatures', function (event) {
        const vectorSource = new VectorSource({
            features: event.features,
        });
        map.value.addLayer(
            new VectorLayer({
                source: vectorSource,
            })
        );
        map.value.getView().fit(vectorSource.getExtent());
    });
    map.value.addInteraction(dragAndDropInteraction);
}

const drawstart = (event) => {
    console.log(event);
};

const drawend = (event) => {
    console.log(event);
};

onMounted(() => {
    map.value = mapRef.value.map
    getData();
    layerList.value.push(osmLayer.value.tileLayer);
    setInteraction();
});

watch(recentlyRemoved, (newValue, oldValue) => {
    let layername = newValue
    map.value.getLayers().forEach(layer => {
        if (layer?.get('name') && layer?.get('name') == layername) {
            map.value.removeLayer(layer)
        }
    });
    layerList.value = layerList.value.filter(layer => layer.get('name') != layername)
    delete allLayers[layername]
})
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

#map-control input {
    display: none;
}

.slideup-enter-active,
.slideup-leave-active {
  transition: all 0.5s ease;
}

.slideup-enter-from,
.slideup-leave-to {
  left: 50%;
    opacity: 0;
}


.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.5s ease;
}

.rotate-enter-from,
.rotate-leave-to {
    rotate: -90deg;
}
</style>