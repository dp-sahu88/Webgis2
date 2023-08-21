<template>
    <div v-for="notification in notifications" class="absolute top-[4.5rem] right-[4ch] z-50">
        <Notification :notification="notification" />
    </div>
</template>

<script setup>
    import { storeToRefs } from 'pinia';
    import Notification from './Notification.vue';
    import {useNotification} from '../../stores/Notification'
    const notificationStore = useNotification()
    const {notifications} = storeToRefs(notificationStore)
</script>

<style scoped>
</style>