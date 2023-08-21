<template>
    <div class="px-3 rounded-md relative" :class="getClassStr()">
        <div v-if="notification.closable" @click="close" class="absolute right-2 top-2"> X</div>
        <div class="font-bold my-2">{{notification.title}}</div>
        <div class="">{{notification.content}}</div>
    </div>
</template>

<script setup>
    import {useNotification} from '../../stores/Notification'
    import {onMounted, ref} from 'vue'
    const notificationStore = useNotification()
    const props = defineProps(['notification'])
    const type  = ref('')
    const close = () => {
        notificationStore.closeNotification(props.notification.id);
    }
    onMounted(()=>{
        type.value = props.notification.type
        if (props.notification.closable == false) {
            setTimeout(() => {
                notificationStore.closeNotification(props.notification.id);
            }, 5000);
        }
    })
    const getBg = () =>{
        switch (type.value) {
            case 'error':
                return 'bg-red-500/40'
            case'success':
                return 'bg-green-500/40'
            case 'info':
                return 'bg-blue-500/40'
            case 'warning':
                return 'bg-yellow-500/40'
            default:
                return 'bg-gray-500/40'
        }
    }
    const getBorder = () =>{
        switch (type.value) {
            case 'error':
                return 'border-solid border-2 border-red-500'
            case'success':
                return 'border-solid border-2 border-green-500'
            case 'info':
                return 'border-solid border-2 border-blue-500'
            case 'warning':
                return 'border-solid border-2 border-yellow-500'
            default:
                return 'border-solid border-2 border-gray-500'
        }
    }
    const getColor = () =>{
        switch (type.value) {
            case 'error':
                return 'text-red-500'
            case'success':
                return 'text-green-500'
            case 'info':
                return 'text-blue-500'
            case 'warning':
                return 'text-yellow-500'
            default:
                return 'text-gray-500'
        }
    }
    const getClassStr = () =>{
        let classStr =  getBg() + ' ' + getColor() + ' ' + getBorder()
        console.log(classStr)
        return classStr
    }
</script>

<style scoped>
</style>