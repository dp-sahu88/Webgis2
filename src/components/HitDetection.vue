<template>
    <div v-if="info != ''" class="h-fit overflow-auto absolute top-[30vh] right-0 bg-black/40 text-white w-fit max-w-[85vw] max-h-[50vh] min-w-[10vw] min-h-[10vh]" style="resize: both;">
        <!-- {{ info }} -->
        <table class="table-auto my-2">
            <tr v-for="(value, key) in info" :key="key" class="hover:bg-slate-700/60">
                <td class="text-blue-100 font-bold pl-2" :title="key">{{ key }}</td>
                <td :title="value" class="max-w-[30ch] truncate italic pr-2"> {{ value }}</td>
            </tr>
        </table>
    </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { watch, ref } from 'vue'
import { useMap } from "../stores/Map";
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from "ol/layer/Vector";
import { Style, Stroke } from "ol/style"
const props = defineProps(['pixel'])
const info = ref('');
const mapStore = useMap()
const { map, selectedLayerObj, selectedLayer } = storeToRefs(mapStore)
const highlightStyle = new Style({
    stroke: new Stroke({
        color: 'rgba(255, 0, 0, 0.7)',
        width: 2,
    }),
});

let featureOverlay;

let highlight;
const displayFeatureInfo = function () {
    const pixel = props.pixel
    if (featureOverlay == undefined) {
        featureOverlay = new VectorLayer({
            source: new VectorSource(),
            map: map.value,
            style: highlightStyle,
        });
    }

    info.value = ''
    let vectorLayer = selectedLayerObj.value
    if (selectedLayer.value == '') {
        return;
    }
    vectorLayer.getFeatures(pixel).then(function (features) {
        const feature = features.length ? features[0] : undefined;
        let properties = feature?.values_ || ''
        let {geometry, ...rest} = properties
        info.value = JSON.stringify(rest) == '{}'? '':rest
        if (feature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (feature) {
                featureOverlay.getSource().addFeature(feature);
            }
            highlight = feature;
        }
    });
};

watch(() => { return props.pixel }, () => {
    displayFeatureInfo()
}, { deep: true })
</script>
<style scoped>
    ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(0, 136, 255);
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #4e94f5;
}
</style>