import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMap = defineStore('mapStore', () => {
  const map = ref({})  
  const view = ref({})
  return { map, view }
})
