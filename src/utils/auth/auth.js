import axios from 'axios';
import router from '../../router';
import { useNotification } from '../../stores/Notification';

export function login(email, password) {
    const notification = useNotification()
    let url = import.meta.env.VITE_API_URL + '/login';
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: {
            'Accept': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            if (response.data.success) {
                let name = response.data.data.name || ''
                let cred = JSON.stringify(response.data.data);
                localStorage.setItem("user", cred);
                notification.pushNotification({
                    type: 'success',
                    title: 'Login',
                    content: 'Loged in as ' + name,
                    closable: true
                })
                router.push({ path: '/' })
            }
        })
        .catch((error) => {
            notification.pushNotification({
                type: 'error',
                title: 'Login',
                content: error.response.data.message,
                closable: true
            })
        });
}

export function register(name,email,password,c_password) {
    const notification = useNotification()
    let data = new FormData();
    let url = import.meta.env.VITE_API_URL + '/register';
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('c_password', c_password);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: {
            'Accept': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            if (response.data.success) {
                let cred = JSON.stringify(response.data.data);
                localStorage.setItem("user", cred);
                notification.pushNotification({
                    type: 'success',
                    title: 'Signup',
                    closable: true,
                    content: 'registration completed'
                });
                router.push({ path: '/' })
            } else {
                notification.pushNotification({
                    type: 'error',
                    title: 'Signup',
                    content: response.data.message
                });
            }
        })
        .catch((error) => {
            console.log(error);
            notification.pushNotification({
                type: 'error',
                title: 'Signup',
                content: error.response.data.message,
                closable: true
            })
        });
}

export function logout() {
    localStorage.removeItem("user");
    router.push({ path: '/login' })
}

export function getToken(){
    let userData = localStorage.getItem("user");
    let user = JSON.parse(userData)
    let token = user?.token
    return token || false
}

export function getUserName(){
    let userData = localStorage.getItem("user");
    let user = JSON.parse(userData)
    let name = user?.name
    return name || false
}

export function isLogedin(){
    let userData = localStorage.getItem("user");
    return userData ? true : false
}