import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMap = defineStore('mapStore', () => {
  const map = ref({})  
  const view = ref({})
  const selectedLayer = ref('')
  function addToSelectedLayer(layername){
      if (layername == undefined){
        return
      }
      selectedLayer.value = layername
  }
  return { map, view , selectedLayer, addToSelectedLayer}
})
