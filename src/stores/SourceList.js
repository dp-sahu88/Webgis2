import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLayerSources = defineStore('layerSources', () => {
  const sourceList = ref([])
  // const doubleCount = computed(() => count.value * 2)
  function add(source) {
    sourceList.value.push(source)
  }
  function remove(source){
    sourceList.value = sourceList.value.filter(ele=>ele.source != source)
  }
  return { sourceList, remove, add }
})
