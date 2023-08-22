<template>
    <div class="h-[100vh] w-[100vw] pt-[4rem] bg-black">
        <AnimatedBG />
        <div
            class="m-auto relative z-10 w-fit top-20 py-4 px-6 bg-slate-300/50 backdrop-blur-sm rounded-md border focus-within:bg-slate-300/60">
            <h1 class="text-4xl font-bold text-center my-6 text-white">Login</h1>
            <form @submit.prevent="signin" class="flex flex-col ">
                <div class="form-group mb-4">
                    <label for="inputEmail1" class="block text-white ">Email</label>
                    <input type="email" class="rounded-full px-2 mt-1 py-1 md:w-[40ch] bg-blue-100 border-b-2"
                        id="inputEmail1" placeholder="xyz@provider.com" v-model="email" required>
                </div>
                <div class="form-group mb-4">
                    <label for="inputPassword1" class="block text-white ">Password</label>
                    <input type="password" class="rounded-full px-2 mt-1 py-1  md:w-[40ch] bg-blue-100 border-b-2"
                        id="inputPassword1" placeholder="Password" v-model="password" required>
                </div>
                <button type="submit"
                    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-3 ">Submit</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import AnimatedBG from '../components/background/AnimatedBG.vue';
import { login} from '../utils/auth/auth';

const email = ref('')
const password = ref('')

const signin = ()=>{
    login(email.value, password.value)
}
</script>
<style scoped></style>