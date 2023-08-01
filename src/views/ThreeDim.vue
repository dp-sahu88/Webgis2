<template>
    <div id="cesiumContainer" ref="CesiumContainer"></div>
    <div>{{ drones }}</div>
</template>
<script setup>
import { Viewer, Cartesian3, Color,GeoJsonDataSource } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
const CesiumContainer = ref(null)
const drones = ref([])
let viewer = null
let india
let odisha
let naguar 
onMounted(() => {
    getData();
    viewer = new Viewer('cesiumContainer');
    // india = viewer.dataSources.add(GeoJsonDataSource.load(
    //   "/Indian_States.json",
    //   {
    //     stroke: Color.HOTPINK,
    //     fill: Color.PINK.withAlpha(0.5),
    //     strokeWidth: 3,
    //   }
    // ))
    odisha = viewer.dataSources.add(GeoJsonDataSource.load(
      "/Orissa.geojson",
      {
        stroke: Color.BLUE,
        fill: Color.BLUEVIOLET.withAlpha(0.5),
        strokeWidth: 3,
      }
    ))
    naguar = viewer.dataSources.add(GeoJsonDataSource.load(
      "/Naguar.geojson",
      {
        stroke: Color.BLUE,
        fill: Color.BLUEVIOLET.withAlpha(0.5),
        strokeWidth: 3,
      }
    ))
})
setInterval(getData, 5000);
function viewerSetup(){
    viewer.entities.removeAll();
    drones.value.forEach(droneLocation => {
        let drone = viewer.entities.add({
            name: droneLocation.name,
            // height: 20.0,
            //   ellipsoid: {
            //     radii: new Cartesian3(15.0, 15.0, 15.0),
            //     material: Color.BLUE.withAlpha(0.5),
            //     slicePartitions: 24,
            //     stackPartitions: 36,
            //   },
            model: {
                uri: '/Cesium_Air.glb'
            }
        });
        let point = viewer.entities.add({
            name: droneLocation.name+"_point_",
            point: { pixelSize: 10, color: Color.RED }
        });
        let position = Cartesian3.fromDegrees(
            droneLocation.longitude,
            droneLocation.latitude,
            droneLocation.height
        )
        point.position = position,
        point.show = true;
        drone.position = position,
        drone.show = true;
        // viewer.trackedEntity = drone
    });
}

function  getData() {
    axios
        .get('http://localhost:8000/api/drone-positions')
        .then((response) => {
            let res = response.data.map(ele => {
                return {
                    longitude: Number(ele.long),
                    latitude: Number(ele.lat),
                    height: Number(ele.alt),
                    date: ele.updated_at,
                    name: ele.name
                }
            })
            drones.value = res
        })
}

watch(drones, (newVal, oldVal)=>{viewerSetup()})

</script>
<style scoped></style>