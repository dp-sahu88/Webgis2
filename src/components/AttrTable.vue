<template>
    <table>
            <Row v-for="feature in data" :row-data="feature" :order="attrs"/>
    </table>
</template>
<script setup>
import {GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format";
import { onMounted, ref } from "vue";
import axios from "axios";
import Row from "./AttrTable/Row.vue";
const props = defineProps(['table'])
const table = props.table
const attrs= ref([])
const data = ref([])
function getData(){
    axios(table.source).then(response=>{
        data.value = resolveSource(response, table)
         attrs.value = data.value[0].getKeys()
    })
}
onMounted(()=>{
    getData()
})

function resolveSource(response, elememt){
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
            res = new KML().readFeatures(response.data,{
                extractStyles: true
              })
    }
    return res
}

</script>