<template>
    <div class="h-[2.1rem] w-[2.1rem] bg-slate-50 mt-4 relative rounded-l-full" @click="sourceMenu = !sourceMenu">
        <img src="../assets/icons/down-chevron.png" alt="" class="h-3 m-3" :class="sourceMenu ? 'rotate-180' : ''">
        <div v-if="sourceMenu" class="absolute flex flex-col z-50 top-[2.2rem] bg-slate-600/40 backdrop-blur-sm rounded-md">
            <div v-for="source in sourceList" :value="source.source" class="text-slate-200 hover:text-white">
                <div class="flex flex-row gap-2 px-1">
                    <div @click="() => { removeSource(source.source); mapStore.removeSelectedLayer(source.layername) }"
                        class="cursor-pointer w-4"><img src="../assets/icons/delete.png" class="w-3 my-2 hover:rotate-12">
                    </div>
                    <div @click="flyTo(source.focusOn, view, () => { })" class="cursor-pointer w-4"><img
                            src="../assets/icons/target.png" class="w-3 my-2 hover:rotate-45 rounded"></div>
                    <div @click="() => {tableStore.addTable(source) }" class="cursor-pointer w-4"><img src="../assets/icons/table.png"
                            class="w-3 my-2 hover:rotate-12 rounded"></div>
                    <div :title="source.source" @click="mapStore.addToSelectedLayer(source.layername)"
                        :class="selectedLayer == source.layername ? 'font-bold text-white' : ''">{{ source.source.slice(0, 20) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="my-[1rem] flex mr-6 rounded-full shadow-lg ">
        <div @click="refresh = !refresh" class="cursor-pointer h-[2.1rem]"
            :class="refresh ? 'bg-blue-400' : 'bg-slate-400'"><img src="../assets/icons/refresh.svg" class="h-4 m-2">
        </div>
        <input type="text" class="h-[2.1rem]" v-model="newSource" placeholder=" Add new source..."
            @input="resolveSourceType" title="source can be a url or a valid file path">
        <select v-model="newSourceType">
            <option v-if="typeof (newSourceType) == 'string'" v-for="format in formats" :value="format">{{ format }}
            </option>
            <option v-else v-for="format in newSourceType" :value="format">{{ format }}</option>
        </select>
        <div @click="addSource"
            class="inline text-md bg-slate-800 hover:bg-black text-white px-4 py-1 rounded-r-full cursor-pointer h-[2.1rem]">
            ADD</div>
    </div>
    <RouterLink to="/" class="my-[1.2rem] text-white text-lg mr-10 font-bold hover:underline  hover:underline-offset-8"
        :class="$route.path == '/' ? 'underline underline-offset-8' : ''">2D
    </RouterLink>
    <RouterLink to="/3d" class="my-[1.2rem] text-white text-lg mr-10 font-bold hover:underline  hover:underline-offset-8"
        :class="$route.path == '/3d' ? 'underline underline-offset-8' : ''">3D
    </RouterLink>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { useLayerSources } from '../stores/SourceList.js'
import { useMap } from '../stores/Map';
import resolveType from '../utils/ol/ResolveFileType'
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import flyTo from '../utils/ol/FlyTo2D';
import { useTables } from '../stores/Tables';
const layerSources = useLayerSources()
const { sourceList } = storeToRefs(layerSources)
const mapStore = useMap()
const { view, selectedLayer } = storeToRefs(mapStore)
const tableStore = useTables()
const {tables } = storeToRefs(tableStore)
const newSource = ref('')
const newSourceType = ref('')
const sourceMenu = ref(false)
const formats = ['GPX', 'GeoJSON', 'TopoJSON', 'IGC', 'KML', '']
const acceptedTypes = {
    'gpx': 'GPX',
    'geojson': 'GeoJSON',
    'topojson': 'TopoJSON',
    'json': ['GeoJSON', 'TopoJSON'],
    'igc': 'IGC',
    'kml': 'KML',
    'kmz': 'KML'
}
const refresh = ref(false)
const sourceToRemove = ref("")
const addSource = () => {
    if (newSource != '') {
        if (typeof (newSourceType.value) == 'array' || typeof (newSourceType.value) == 'object') {
            alert('there are muntiple possible types exist... select one')
            return
        }
        if (newSourceType.value == '' || newSourceType.value == undefined) {
            alert('Unable to detecet the file type, please enter manually...')
            return
        }
        layerSources.add({ source: newSource.value, refresh: refresh.value, loaded: false, type: newSourceType.value })
        newSource.value = ''
        newSourceType.value = ''
        refresh.value = false
    }
}
const removeSource = (source) => {
    if (source == "") {
        return;
    }
    layerSources.remove(source)
    removeTableBySource(source)
}

const removeTableBySource = (source) => {
    tables.value = tables.value.filter(table => table.source != source)
}

const resolveSourceType = () => {
    newSourceType.value = resolveType(newSource.value, acceptedTypes)
}
watch(sourceToRemove, () => { removeSource() })

</script>
<style scoped>

</style>