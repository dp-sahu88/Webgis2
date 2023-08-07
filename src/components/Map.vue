<template>
    <ol-map ref="mapRef" :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 70vh" class="">
        <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

        <ol-tile-layer ref="osmLayer" title="OSM base layer">
            <ol-source-osm />
        </ol-tile-layer>

        <ol-vector-layer ref="dronesLayer" title="Drones">
            <ol-source-vector :features="data">
                <ol-interaction-draw v-if="drawEnable" :type="drawType" @drawend="drawend" @drawstart="drawstart">
                    <ol-style>
                        <ol-style-stroke color="blue" :width="2"></ol-style-stroke>
                        <ol-style-fill color="rgba(255, 255, 0, 0.4)"></ol-style-fill>
                    </ol-style>
                </ol-interaction-draw>
            </ol-source-vector>
        </ol-vector-layer>
        <ol-vector-layer ref="nonRefreshDataLayer" title="staticData">
            <ol-source-vector :features="nonRefreshData">
                <ol-interaction-draw v-if="drawEnable" :type="drawType" @drawend="drawend" @drawstart="drawstart">
                    <ol-style>
                        <ol-style-stroke color="blue" :width="2"></ol-style-stroke>
                        <ol-style-fill color="rgba(255, 255, 0, 0.4)"></ol-style-fill>
                    </ol-style>
                </ol-interaction-draw>
            </ol-source-vector>
        </ol-vector-layer>

        <ol-interaction-dragrotatezoom />
        <ol-mouseposition-control v-if="mousepositioncontrol" position="bottom" />
        <ol-fullscreen-control v-if="fullscreencontrol"/>
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
    <div class="mx-4 mt-2">
        <div class=" flex flex-row flex-wrap gap-4" id="map-control">
            <div class=" h-[3rem] flex flex-row  rounded-lg" :class="drawEnable?'bg-blue-600':'bg-blue-400'">
                <input type="checkbox" id="checkbox1" v-model="drawEnable" />
                <label class="capitalize text-white p-[.75rem]"  for="checkbox1">
                    Draw {{ drawEnable?'Disable':'Enable' }}
                </label>
                <select id="type" v-model="drawType" class="h-[3rem] rounded-lg border-solid border-2 border-slate-600 text-slate-100"  :class="drawEnable?'bg-blue-500':'bg-blue-400'">
                    <option value="Point">Point</option>
                    <option value="LineString">LineString</option>
                    <option value="Polygon">Polygon</option>
                    <option value="Circle">Circle</option>
                </select>
            </div>
            <input type="checkbox" id="checkbox2" v-model="fullscreencontrol" />
            <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] " :class="fullscreencontrol?'bg-blue-600':'bg-blue-400'" for="checkbox2">
                fullscreen control
             </label>

             <input type="checkbox" id="checkbox3" v-model="mousepositioncontrol" />
             <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] " :class="mousepositioncontrol?'bg-blue-600':'bg-blue-400'" for="checkbox3">
                    mouse position
            </label>
            
            <input type="checkbox" id="scaleline" v-model="scalelinecontrol" />
            <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] " :class="scalelinecontrol?'bg-blue-600':'bg-blue-400'" for="scaleline">            
                scaleline-control
            </label>
    
            <input type="checkbox" id="rotatecontrol" v-model="rotatecontrol" />
            <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] " :class="rotatecontrol?'bg-blue-600':'bg-blue-400'" for="rotatecontrol">
                rotate-control
            </label>

                <input type="checkbox" id="zoomtoextent" v-model="zoomtoextentcontrol" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] " :class="zoomtoextentcontrol?'bg-blue-600':'bg-blue-400'" for="zoomtoextent">zoom to extent</label>
            
            
                <input type="checkbox" id="zoomslider" v-model="zoomslidercontrol" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] " :class="zoomslidercontrol?'bg-blue-600':'bg-blue-400'" for="zoomslider">zoomslider</label>
            
            
                <input type="checkbox" id="swipecontrol" v-model="showSwipeControl" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] " :class="showSwipeControl?'bg-blue-600':'bg-blue-400'" for="swipecontrol">swipe control</label>
            
            
                <input type="checkbox" id="layerswitchercontrol" v-model="showLayerSwitcherControl" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] " :class="showLayerSwitcherControl?'bg-blue-600':'bg-blue-400'" for="layerswitchercontrol">layerswitcher</label>
            
            
                <input type="checkbox" id="layerswitcherimagecontrol" v-model="showLayerSwitcherImageControl" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] " :class="showLayerSwitcherImageControl?'bg-blue-600':'bg-blue-400'" for="layerswitcherimagecontrol">layerswitcher image</label>
            
            
                <input type="checkbox" id="printdialogcontrol" v-model="showPrintDialogControl" />
                <label class="capitalize min-w-[17vw] text-white h-[3rem] flex flex-row rounded-lg p-[.75rem] " :class="showPrintDialogControl?'bg-blue-600':'bg-blue-400'" for="printdialogcontrol">printdialog-control</label>

        </div>
    </div>
    <!-- <div>
        {{ data }}
    </div> -->
</template>
  
<script setup>
import { ref, onMounted, watch } from "vue";
import {GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format";
import { Vector as VectorSource } from "ol/source";
import {Vector as VectorLayer} from "ol/layer";
import DragAndDrop from 'ol/interaction/DragAndDrop.js';
import flyTo from '../utils/ol/FlyTo2D.js'
import { useLayerSources } from "../stores/SourceList";
import axios from "axios";
const center = ref([116.547539, 40.450996]);
const projection = ref("EPSG:4326");
const zoom = ref(1);
const map = ref(null)
const mapRef = ref(null)
const rotation = ref(0);
const layerList = ref([]);
const osmLayer = ref(null);
const dronesLayer = ref(null)
const data = ref([]);
const drawEnable = ref(false);
const modifyEnabled = ref(false)
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
const nonRefreshData = ref([])
const nonRefreshDataLayer = ref(null)
let dragAndDropInteraction;


// refresh data in 5 sec
setInterval(getData, 5000);

//get data from external sources

function getData() {
    data.value = []
    layerSources.sourceList.forEach(element => {
        let source = element.source
        if(element.refresh || !element.loaded)
         axios(source)
        .then((response) => {
            let newData = new GeoJSON().readFeatures(response.data)
            
            if(element.refresh){
                data.value = [...data.value, ...newData]
            }
            else{
                nonRefreshData.value= [...nonRefreshData.value, ...newData]
            }
            let loc = newData[0].getGeometry().getExtent().slice(0,2)
            if (element.loaded == false){
                let view = map.value.getView()
                console.log(loc);
                setTimeout(flyTo(loc, view ,()=>{}),5000)
                element.loaded=true
            }
        }).catch((reason)=>{console.warn(reason)});
    });
   
}
getData();

// function flyTo(location, done) {
//   let view = map.value.getView()
//   const duration = 2000;
//   const zoom = view.getZoom();
//   let parts = 2;
//   let called = false;
//   function callback(complete) {
//     --parts;
//     if (called) {
//       return;
//     }
//     if (parts === 0 || !complete) {
//       called = true;
//       done(complete);
//     }
//   }
//   view.animate(
//     {
//       center: location,
//       duration: duration,
//     },
//     callback
//   );
//   view.animate(
//     {
//       zoom: zoom - 1,
//       duration: duration / 2,
//     },
//     {
//       zoom: zoom,
//       duration: duration / 2,
//     },
//     callback
//   );
// }

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
      // use constructed format to set options
      new KML({extractStyles: true}),
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

const resetMap = ()=> {
    data.value = []
    nonRefreshData.value = []
}

const drawstart = (event) => {
    console.log(event);
};

const drawend = (event) => {
    console.log(event);
};

onMounted(() => {
    map.value= mapRef.value.map
    layerList.value.push(osmLayer.value.tileLayer);
    layerList.value.push(dronesLayer.value.vectorLayer);
    layerList.value.push(nonRefreshDataLayer.value.vectorLayer);
    setInteraction();
});

watch(layerSources.sourceList, ()=>{resetMap()})
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

</style>