import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNotification = defineStore('Notification', () => {
  const notifications = ref([
    // {
    //   id: 1, //timestamp
    //   title: 'Notification Title',
    //   content: 'This is a notification content', 
    //   type: 'error', // info, warn, error,success
    //   closable: true //true or false
    // }
])

const pushNotification = (notification) => {
  notification.id = Date.now()
  notifications.value.push(notification)
}

const closeNotification = (id) => {
  notifications.value = notifications.value.filter(notification => notification.id!== id)
}
  return { notifications, pushNotification , closeNotification }
})
