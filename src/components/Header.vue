<template>
    <header class="h-[4rem] w-[100%] absolute z-50">
        <nav class="bg-gradient-to-r from-slate-900 to-blue-500 flex flex-row justify-end">
            <img src="../assets/icons/Edall-logo.png" class="h-14 absolute flex-none left-10 top-3">
            <div class="h-[2.1rem] w-[2.1rem] bg-slate-50 mt-4 relative rounded-l-full" @click="sourceMenu = !sourceMenu">
                <img src="../assets/icons/down-chevron.png" alt="" class="h-3 m-3" :class="sourceMenu ? 'rotate-180' : ''">
                <div v-if="sourceMenu"
                    class="absolute flex flex-col z-50 top-[2.2rem] bg-slate-600/40 backdrop-blur-sm rounded-md">
                    <div v-for="source in sourceList" :value="source.source" class="text-slate-200 hover:text-white">
                        <div class="flex flex-row gap-2 px-1">
                            <div @click="removeSource(source.source)" class="cursor-pointer w-4"><img
                                    src="../assets/icons/delete.png" class="w-3 my-2 hover:rotate-12"></div>
                            <div @click="flyTo(source.focusOn, view, () => { })" class="cursor-pointer w-4"><img
                                    src="../assets/icons/target.png" class="w-3 my-2 hover:rotate-45 rounded"></div>
                            <div @click="tables.push(source)" class="cursor-pointer w-4"><img
                                    src="../assets/icons/table.png" class="w-3 my-2 hover:rotate-12 rounded"></div>
                            <div :title="source.source">{{ source.source.slice(0,20) }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-[1rem] flex mr-6 rounded-full shadow-lg ">
                <div @click="refresh = !refresh" class="cursor-pointer h-[2.1rem]"
                    :class="refresh ? 'bg-blue-400' : 'bg-slate-400'"><img src="../assets/icons/refresh.svg"
                        class="h-4 m-2">
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
            <RouterLink to="/"
                class="my-[1.2rem] text-white text-lg mr-10 font-bold hover:underline  hover:underline-offset-4">2D
            </RouterLink>
            <RouterLink to="/3d"
                class="my-[1.2rem] text-white text-lg mr-10 font-bold hover:underline  hover:underline-offset-4">3D
            </RouterLink>
        </nav>
    </header>
    <div class="absolute z-50 top-[4rem] mx-8 ">
        <div v-for="table in tables">
            <AttrTable :table="table" :name="table.source" @close-table="removeTable" />
        </div>
    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { useLayerSources } from '../stores/SourceList.js'
import { useMap } from '../stores/Map';
import resolveType from '../utils/ol/ResolveFileType'
import AttrTable from './AttrTable.vue';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import flyTo from '../utils/ol/FlyTo2D';
const layerSources = useLayerSources()
const { sourceList } = storeToRefs(layerSources)
const mapStore = useMap()
const { view } = storeToRefs(mapStore)
const newSource = ref('')
const newSourceType = ref('')
const sourceMenu = ref(false)
const tables = ref([])
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
        newSourceType.value = resolveType(newSource.value, acceptedTypes)
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

const removeTable = (table) => {
    tables.value = tables.value.filter(element => element != table)
}
const removeTableBySource = (source) => {
    tables.value = tables.value.filter(table => table.source != source)
}

const resolveSourceType = () => {
    newSourceType.value = resolveType(newSource.value, acceptedTypes)
}
watch(sourceToRemove, () => { removeSource() })

</script>