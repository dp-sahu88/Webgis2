import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMap = defineStore('mapStore', () => {
  const map = ref({})  
  const view = ref({})
  const selectedLayer = ref({})
  return { map, view , selectedLayer}
})
