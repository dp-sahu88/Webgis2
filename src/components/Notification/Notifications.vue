<template>
    <div class="absolute top-[4.5rem] right-[4ch] z-50">
        <Notification v-for="notification in notifications" :notification="notification" :key="notification.id" />
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Notification from './Notification.vue';
import { useNotification } from '../../stores/Notification'
const notificationStore = useNotification()
const { notifications } = storeToRefs(notificationStore)
</script>

<style scoped></style>