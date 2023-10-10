<template>
    <div class="h-[100vh] pt-[4rem]">
        <ol-map ref="mapRef" :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" class="pt-[4rem] h-[100vh]">
            <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />
        <ol-tile-layer ref="osmLayer" title="OSM base layer">
            <ol-source-osm />
        </ol-tile-layer>
        </ol-map>
    </div>
</template>
<script setup>
    
</script>