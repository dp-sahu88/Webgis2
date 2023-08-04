<template>
    <header class="h-[4rem]">
        <nav class=" bg-blue-600 flex flex-row justify-end">
           
            <div class="my-[1rem] flex mr-6 rounded-full shadow-lg ">
                <div @click="refresh = !refresh" class="rounded-l-full cursor-pointer" :class="refresh?'bg-slate-400':'bg-blue-400'"><img src="../assets/refresh.svg" class="h-4 m-2"></div>
                <input type="text" class="h-[2.1rem]" v-model="newSource" placeholder=" Add new source..." title="source can be a url or a valid file path">
                <div @click="addSource" class="inline text-md bg-black text-white px-4 py-1 rounded-r-full cursor-pointer">ADD</div>
            </div> 
            <RouterLink to="/" class="my-[1.2rem] text-white text-lg mr-10 font-bold hover:underline  hover:underline-offset-4" >2D</RouterLink>
            <RouterLink to="/3d" class="my-[1.2rem] text-white text-lg mr-10 font-bold hover:underline  hover:underline-offset-4" >3D</RouterLink>
      </nav>
     </header>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { useLayerSources} from  '@/stores/SourceList.js'
import { ref } from 'vue';
const layerSources = useLayerSources()
const newSource = ref('')
const refresh = ref(false)
const addSource = ()=>{
    if (newSource !=''){
        layerSources.add({source:newSource.value, refresh:refresh})
        newSource.value= ''
        refresh.value= false
    }
}

</script>