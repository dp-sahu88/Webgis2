import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLayerSources = defineStore('layerSources', () => {
  const sourceList = ref([{source:'./drones.geojson',refresh:true, loaded:true, type: 'GeoJSON'}])
  const refreshFlag = ref(false)
  // const doubleCount = computed(() => count.value * 2)
  function add(newSource) {
    let exist = sourceList.value.filter(ele=> ele.source== newSource.source)
    if (exist.length == 0){
      sourceList.value.push(newSource)
    }
  }
  function remove(source){
    sourceList.value = sourceList.value.filter(ele=>ele.source != source)
    resetSourcelist()
  }
  function resetSourcelist(){
    sourceList.value.forEach(ele=>ele.loaded=false)
    refreshFlag.value = !refreshFlag.value
  }
  return { sourceList, remove, add }
})
