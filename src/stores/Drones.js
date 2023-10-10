import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDrones = defineStore('Drones', () => {
  const droneLoctionHistory = ref({})
  const droneNames = ref([])
  const dronesNewData = ref([])
  const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);
  const updateData = (newData) => {
    dronesNewData.value = newData
    newData.forEach(element => {
      if (!droneLoctionHistory.value.hasOwnProperty(element.name)) {
        droneLoctionHistory.value[element.name] = {
          locationHistory: [],
          strockColor: `#${randomColor()}`
        }
        droneNames.value.push(element.name)
      }
      let prev_length = droneLoctionHistory.value[element.name].locationHistory.length
      let newCord = [element.longitude, element.latitude]
      if (prev_length == 0) {
        droneLoctionHistory.value[element.name].locationHistory.push(newCord)
      } else if (
        droneLoctionHistory.value[element.name].locationHistory[prev_length - 1][0] != newCord[0] ||
        droneLoctionHistory.value[element.name].locationHistory[prev_length - 1][1] != newCord[1]) {
        droneLoctionHistory.value[element.name].locationHistory.push(newCord)
      }
    });
  }
  return { droneLoctionHistory, droneNames, dronesNewData, updateData }
})
