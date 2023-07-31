<template>
    <div id="cesiumContainer" ref="CesiumContainer"></div>
</template>
<script setup>
import { Viewer, HeightReference, Cartesian3, JulianDate, ShadowMode, Terrain, Color, Math, Transforms, HeadingPitchRoll} from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { ref, onMounted } from 'vue'
const CesiumContainer = ref(null)
let viewer = null
onMounted(() => {
    viewer = new Viewer('cesiumContainer', {
        infoBox: false,
        selectionIndicator: false,
        shadows: true,
        terrainShadows: ShadowMode.ENABLED,
        shouldAnimate: true,
        terrain: Terrain.fromWorldTerrain(),
    });

    const location = {
        longitude: -1.31968,
        latitude: 0.698874,
        height: 74.14210186070714,
        date: 2457522.154792,
    }

    const heading = Math.toRadians(45.0);
const pitch = Math.toRadians(15.0);
const roll = Math.toRadians(0.0);
const position = Cartesian3.fromRadians(
        location.longitude,
        location.latitude,
        location.height 
)
const orientation = Transforms.headingPitchRollQuaternion(
  position,
  new HeadingPitchRoll(heading, pitch, roll)
);
    const drone = viewer.entities.add({
        name: "drone",
        orientation:orientation,
        position:position,
        model: {
            uri: "/drone/source/drone.glb",
            scale:1.1,
            // heightReference: HeightReference.CLAMP_TO_GROUND,
        }
        //     height: 20.0,
        //   ellipsoid: {
        //     radii: new Cartesian3(15.0, 15.0, 15.0),
        //     material: Color.BLUE.withAlpha(0.5),
        //     slicePartitions: 24,
        //     stackPartitions: 36,
        //     shadows: ShadowMode.ENABLED,
        //   },
    });
    viewer.clock.currentTime = new JulianDate(location.date);
    viewer.clock.multiplier = 1.0;
    drone.show = true;
    console.log(drone);
    viewer.trackedEntity = drone;
})
</script>
<style scoped></style>