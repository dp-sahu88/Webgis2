<template>
    <div class="mt-1">
        <div class="bg-white/60 text-black min-w-[8rem] pr-1 rounded-t-md inline">
            <div class="h-6 px-1 bg-red-700 rounded-tl-md text-center text-slate-300 hover:text-white inline w-fit"
                @click="$emit('closeTable', table)">Close</div>
            <div class="h-6 px-1 bg-slate-800 w-fit rounded-tr-md inline text-slate-300 hover:text-white "
                @click="() => { minimized = !minimized }">{{ minimized ? 'Maximize' : 'Minimize' }}</div>
            {{ name.slice(0, 15) }}
        </div>
    </div>
    <table v-if="!minimized"
        class="rounded-tr-md rounded-b-md bg-slate-100/50 backdrop-blur-sm hover:drop-shadow-sm hover:backdrop-blur-md ">
        <tbody class=" flex flex-col overflow-y-scroll h-fit max-h-[50vh] p-3">
            <Row v-for="feature in data" :row-data="feature" :order="attrs" />
        </tbody>
    </table>
</template>
<script setup>
import { GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format";
import { onMounted, ref } from "vue";
import axios from "axios";
import Row from "./AttrTable/Row.vue";
const props = defineProps(['table', 'name'])
defineEmits(['closeTable'])
const table = props.table
const attrs = ref([])
const minimized = ref(false)
const data = ref([])
function getData() {
    axios(table.source).then(response => {
        data.value = resolveSource(response, table)
        attrs.value = data.value[0].getKeys()
    })
}
onMounted(() => {
    getData()
})

function resolveSource(response, elememt) {
    // if (200 > response.status || response.status >= 300){
    //     return {error: response.statusText}
    // }
    let res = {}
    let type = elememt.type
    switch (type) {
        case 'GeoJSON':
            res = new GeoJSON().readFeatures(response.data)
            break;
        case 'TopoJSON':
            res = new TopoJSON().readFeatures(response.data)
            break
        case 'GPX':
            res = new GPX().readFeatures(response.data)
            break
        case 'IGC':
            res = new IGC().readFeatures(response.data)
            break
        case 'KML':
            res = new KML().readFeatures(response.data, {
                extractStyles: true
            })
    }
    return res
}

</script>


<style scoped>
::-webkit-scrollbar {
    width: 10px;
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