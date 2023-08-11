<template>
    <tr>
        <td @click="flyTo(loc, view, flyComplete)">{{ rowData.getGeometry().getType() }} <img src="../../assets/icons/target.png" class="h-5 float-right mx-2" alt=""></td>
        <td v-for="attr in attrs" class="w-[30ch] text-center">
            {{ rowData.get(attr) }}
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
