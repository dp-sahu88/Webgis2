<template>
    <header class="h-[4rem]">
        <nav class=" bg-blue-600 flex flex-row justify-end">
            <div class="h-[2rem] my-[1rem]">
                <select class="w-6 h-[2.1rem] rounded-l-full border-2 border-red-500" v-model="sourceToRemove">
                    <option value="">---Base layer---</option>
                    <option v-for="source in layerSources.sourceList" :value="source.source"
                        class="apperance-none focus:text-red-700">
                        {{ source.source }} ⛔
                    </option>
                </select>
            </div>
            <div class="my-[1rem] flex mr-6 rounded-full shadow-lg ">
                <div @click="refresh = !refresh" class="cursor-pointer h-[2.1rem]"
                    :class="refresh ? 'bg-blue-400' : 'bg-slate-400'"><img src="../assets/refresh.svg" class="h-4 m-2">
                </div>
                <input type="text" class="h-[2.1rem]" v-model="newSource" placeholder=" Add new source..." @input="resolveSourceType"
                    title="source can be a url or a valid file path">
                <select v-model="newSourceType">
                    <option v-if="typeof(newSourceType) == 'string'" v-for="format in formats" :value="format">{{ format }}</option>
                    <option v-else v-for="format in newSourceType" :value="format">{{ format }}</option>
                </select>
                <div @click="addSource"
                    class="inline text-md bg-black text-white px-4 py-1 rounded-r-full cursor-pointer h-[2.1rem]">ADD</div>
            </div>
            <RouterLink to="/"
                class="my-[1.2rem] text-white text-lg mr-10 font-bold hover:underline  hover:underline-offset-4">2D
            </RouterLink>
            <RouterLink to="/3d"
                class="my-[1.2rem] text-white text-lg mr-10 font-bold hover:underline  hover:underline-offset-4">3D
            </RouterLink>
        </nav>
    </header>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { useLayerSources } from '@/stores/SourceList.js'
import resolveType from '../utils/ol/ResolveFileType'
import { ref, watch } from 'vue';
const layerSources = useLayerSources()
const newSource = ref('')
const newSourceType = ref('')
const formats = ['GPX', 'GeoJSON', 'TopoJSON', 'IGC', 'KML','']
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
const addSource =  () => {
    if (newSource != '') {
        newSourceType.value =  resolveType(newSource.value, acceptedTypes)
        if (typeof(newSourceType.value) == 'array' || typeof(newSourceType.value) == 'object'){
            alert('there are muntiple possible types exist... select one')
            return
        }
        if(newSourceType.value == '' || newSourceType.value == undefined ){
            alert('Unable to detecet the file type, please enter manually...')
            return
        }
        layerSources.add({ source: newSource.value, refresh: refresh.value, loaded: false, type:newSourceType.value })
        newSource.value = ''
        newSourceType.value = ''
        refresh.value = false
    }
}
const removeSource = () => {
    let source = sourceToRemove.value
    if (source == "") {
        sourceToRemove.value = ""
        return;
    }
    layerSources.remove(source)
    sourceToRemove.value = ""
}

const resolveSourceType = ()=>{
    newSourceType.value =  resolveType(newSource.value, acceptedTypes)
}
watch(sourceToRemove, () => { removeSource() })

</script>