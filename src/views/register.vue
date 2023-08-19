<template>
    <div class="h-[100vh] w-[100vw] pt-[4rem] bg-black">
        <AnimatedBG/>
        <div
            class="m-auto relative z-10 w-fit top-10 py-2 px-6 bg-slate-300/50 backdrop-blur-sm rounded-md border focus-within:bg-slate-300/60">
            <h1 class="text-4xl font-bold text-center my-6 text-white">Sign up</h1>
            <form @submit.prevent="register" class="flex flex-col ">
                <div class="form-group mb-4">
                    <label for="inputName" class="block text-white ">Name</label>
                    <input type="text" class="rounded-full px-2 mt-1 py-1 md:w-[40ch] bg-blue-100 border-b-2" id="inputName"
                        placeholder="Deadpool" v-model="name" required>
                </div>
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
                <div class="form-group mb-4">
                    <label for="inputPassword2" class="block text-white ">Confirm password</label>
                    <input type="password" class="rounded-full px-2 mt-1 py-1  md:w-[40ch] bg-blue-100 border-b-2"
                        id="inputPassword2" placeholder="Confirm password" v-model="c_password" required>
                </div>
                <button type="submit"
                    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-3 ">Sign up</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import AnimatedBG from '../components/background/AnimatedBG.vue';
const name = ref('');
const email = ref('')
const password = ref('')
const c_password = ref('')
const register = () => {
    let data = new FormData();
    let url = import.meta.env.VITE_API_URL + '/register';
    data.append('name', name.value);
    data.append('email', email.value);
    data.append('password', password.value);
    data.append('c_password', c_password.value);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: {
            'Accept':'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
}
</script>
<style scoped>
</style>