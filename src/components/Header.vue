<template>
    <header class="h-[4rem] w-[100%] absolute z-50">
        <nav class="bg-gradient-to-r from-slate-900 to-blue-500 flex flex-row justify-end">
            <img src="../assets/icons/Edall-logo.png" class="h-14 absolute flex-none left-10 top-3">
            <Navigation/>
        </nav>
    </header>
    <div class="absolute z-30 top-[4rem] mx-8 max-h-[85vh] overflow-auto">
        <div v-for="table in tables">
            <AttrTable :table="table" :name="table.source" @close-table="tableStore.removeTable" />
        </div>
    </div>
</template>
<script setup>
import AttrTable from './AttrTable.vue';
import { storeToRefs } from 'pinia';
import { useTables } from '../stores/Tables';
import Navigation from './Navigation.vue';
const tableStore = useTables()
const {tables } = storeToRefs(tableStore)
</script>

<style scoped>
::-webkit-scrollbar {
    width: 0;
    height: 0;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(0, 136, 255);
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #4e94f5;
}
</style>