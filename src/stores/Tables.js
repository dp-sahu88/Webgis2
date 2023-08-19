import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTables = defineStore('Tables', () => {
  const tables = ref([])
  const addTable = (newTable) => {
    let exist = tables.value.filter(element => element.source == newTable.source)
    if (exist.length == 0) {
      tables.value.push(newTable)
    }
  }

  const removeTable = (table) => {
    tables.value = tables.value.filter(element => element != table)
  }
  return { addTable, removeTable, tables }
})
