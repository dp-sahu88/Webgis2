import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDrones = defineStore('Drones', () => {
  const drones = ref({})
  const dronesData = ref([])
  const addDrone = (newDrone) => {
    
  }

  const updateDrones = (data) =>{
    console.log(data);
  }

  return { dronesData, drones, addDrone, addDrone }
})
