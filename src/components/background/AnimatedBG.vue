<template>
            <div class="absolute flex flex-row">
            <div class=" relative overflow-hidden h-[calc(100vh-4rem)] w-[50vw]">
                <div
                    class=" anim-bar h-8 w-[45vw] mt-[3rem] relative left-[-3rem] bg-gradient-to-l from-indigo-400 hover:from-indigo-400/90   to-black via-blue-900 rounded-full">
                </div>
                <div
                    class=" anim-bar h-12 w-[45vw] mt-[3rem] relative left-[-6rem] bg-gradient-to-l from-indigo-400 hover:from-indigo-400/90   to-black via-blue-900 rounded-full">
                </div>
                <div
                    class=" anim-bar h-14 w-[45vw] mt-[3rem] relative left-[-7rem] bg-gradient-to-l from-indigo-400 hover:from-indigo-400/90   to-black via-blue-900 rounded-full">
                </div>
                <div
                    class=" anim-bar h-10 w-[45vw] mt-[3rem] relative left-[-3rem] bg-gradient-to-l from-indigo-400 hover:from-indigo-400/90   to-black via-blue-900 rounded-full">
                </div>
                <div
                    class=" anim-bar h-8 w-[45vw] mt-[3rem] relative left-[-4rem] bg-gradient-to-l from-indigo-400 hover:from-indigo-400/90   to-black via-blue-900 rounded-full">
                </div>
                <div
                    class=" anim-bar h-10 w-[45vw] mt-[3rem] relative left-[-2rem] bg-gradient-to-l from-indigo-400 hover:from-indigo-400/90   to-black via-blue-900 rounded-full">
                </div>
            </div>
            <div class=" relative overflow-hidden h-[calc(100vh-4rem)] rotate-180 w-[50vw]">
                <div
                    class=" anim-bar h-8 w-[45vw] mt-[3rem] relative left-[-3rem] bg-gradient-to-l from-indigo-400 hover:from-indigo-400/90   to-black via-blue-900 rounded-full">
                </div>
                <div
                    class=" anim-bar h-12 w-[45vw] mt-[3rem] relative left-[-6rem] bg-gradient-to-l from-indigo-400 hover:from-indigo-400/90   to-black via-blue-900 rounded-full">
                </div>
                <div
                    class=" anim-bar h-14 w-[45vw] mt-[3rem] relative left-[-7rem] bg-gradient-to-l from-indigo-400 hover:from-indigo-400/90   to-black via-blue-900 rounded-full">
                </div>
                <div
                    class=" anim-bar h-10 w-[45vw] mt-[3rem] relative left-[-3rem] bg-gradient-to-l from-indigo-400 hover:from-indigo-400/90   to-black via-blue-900 rounded-full">
                </div>
                <div
                    class=" anim-bar h-8 w-[45vw] mt-[3rem] relative left-[-4rem] bg-gradient-to-l from-indigo-400 hover:from-indigo-400/90   to-black via-blue-900 rounded-full">
                </div>
                <div
                    class=" anim-bar h-10 w-[45vw] mt-[3rem] relative left-[-2rem] bg-gradient-to-l from-indigo-400 hover:from-indigo-400/90   to-black via-blue-900 rounded-full">
                </div>
            </div>
        </div>
</template>
<script setup>
</script>
<style scoped>
.anim-bar {
    animation: anim-bar 2s ease infinite;
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
}
</style>