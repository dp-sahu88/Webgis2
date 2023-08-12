<template>
    <tr>
        <td @click="flyTo(loc, view, flyComplete)" class=" border-x-[1px] border-slate-300 max-w-[30ch] h-4 ">{{ rowData.getGeometry().getType() }} <img src="../../assets/icons/target.png" class="h-5 float-right mx-2" alt=""></td>
        <td v-for="attr in attrs" :title="rowData.get(attr)" class=" text-center border-x-[1px] truncate max-w-[40ch] border-slate-300" v-html="rowData.get(attr)">
        </td>
    </tr>
</template>

<script setup>
import { ref } from 'vue';
import flyTo from '../../utils/ol/FlyTo2D'
import { useMap } from '../../stores/Map'
import { storeToRefs } from 'pinia';
const mapStore = useMap()
const { view } = storeToRefs(mapStore)
const props = defineProps(['rowData', 'order'])
const exclude = ["geometry"]
const attrs = ref([])
attrs.value = props.order.filter((element) => !exclude.includes(element));
let loc = props.rowData.getGeometry().flatCoordinates
let flyComplete = () => {

    view.value.animate({
        zoom: 19,
        center:loc,
        duration: 450
    })
}
</script>
