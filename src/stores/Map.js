import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMap = defineStore('mapStore', () => {
  const map = ref({})  
  const view = ref({})
  const selectedLayer = ref('')
  const selectedLayerObj = ref({})
  function addToSelectedLayer(layername){
      if (layername == undefined){
        return
      }else if (selectedLayer.value == layername) {
        removeSelectedLayer(layername)
        return
      }
      map.value.getLayers().forEach(function (layer) {
        if (layer.get('name') != undefined && layer.get('name') === layername) {
            selectedLayerObj.value = layer
            selectedLayer.value = layername
        }
      });
  }
  function removeSelectedLayer(layername){
    if (selectedLayer.value == layername){
      selectedLayer.value = ''
      selectedLayerObj.value = {}
    }
}
  return { map, view, selectedLayer, selectedLayerObj, addToSelectedLayer , removeSelectedLayer}
})
