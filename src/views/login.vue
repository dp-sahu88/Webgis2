<template>
    <div class="h-[100vh] w-[100vw] pt-[4rem] bg-black">
        <div class=" absolute overflow-hidden h-[calc(100vh-4rem)] w-[100vw]">
            <div
                class=" anim-bar h-8 w-[45vw] mt-[3rem] relative left-[-3rem] bg-gradient-to-l from-indigo-500 to-black via-blue-900 rounded-full">
            </div>
            <div
                class=" anim-bar h-12 w-[45vw] mt-[3rem] relative left-[-6rem] bg-gradient-to-l from-indigo-500 to-black via-blue-900 rounded-full">
            </div>
            <div
                class=" anim-bar h-14 w-[45vw] mt-[3rem] relative left-[-7rem] bg-gradient-to-l from-indigo-500 to-black via-blue-900 rounded-full">
            </div>
            <div
                class=" anim-bar h-10 w-[45vw] mt-[3rem] relative left-[-3rem] bg-gradient-to-l from-indigo-500 to-black via-blue-900 rounded-full">
            </div>
            <div
                class=" anim-bar h-8 w-[45vw] mt-[3rem] relative left-[-4rem] bg-gradient-to-l from-indigo-500 to-black via-blue-900 rounded-full">
            </div>
            <div
                class=" anim-bar h-10 w-[45vw] mt-[3rem] relative left-[-2rem] bg-gradient-to-l from-indigo-500 to-black via-blue-900 rounded-full">
            </div>
        </div>
        <div class="m-auto relative z-10 w-fit top-20 py-4 px-6 bg-slate-300/50 backdrop-blur-sm rounded-md border focus-within:bg-slate-300/60">
            <h1 class="text-4xl font-bold text-center my-6 text-white">Login</h1>
            <form @submit.prevent="login" class="flex flex-col ">
                <div class="form-group mb-4">
                    <label for="inputEmail1" class="block text-white ">Email</label>
                    <input type="email" class="rounded-full px-2 mt-1 py-1 md:w-[40ch] bg-blue-100 border-b-2" id="inputEmail1"
                        aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                </div>
                <div class="form-group mb-4">
                    <label for="inputPassword1" class="block text-white ">Password</label>
                    <input type="password" class="rounded-full px-2 mt-1 py-1  md:w-[40ch] bg-blue-100 border-b-2"
                        id="inputPassword1" placeholder="Password" v-model="password">
                </div>
                <button type="submit" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-3 ">Submit</button>
            </form>
        </div>
    </div>
</template>
<script setup>

</script>
<style scoped>
.anim-bar {
    animation: anim-bar 2s ease-in infinite;
}

.anim-bar:nth-child(2n+1) {
    animation-delay: 0.1s;
    animation-duration: 1.8s;
}

@keyframes anim-bar {
    0% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-10%);
    }

    50% {
        transform: translateX(-20%);
    }

    100% {
        transform: translateX(0);
    }
}</style>