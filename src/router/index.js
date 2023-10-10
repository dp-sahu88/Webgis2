import { createRouter, createWebHistory } from 'vue-router'
import TwoDim from '../views/TwoDim.vue'
import ThreeDim from '../views/ThreeDim.vue'
import Login from '../views/login.vue';
import Drones from '../views/Drones.vue'
import Register from '../views/register.vue';
import Error from '../views/error.vue';
import { isLogedin } from '../utils/auth/auth';

const router = createRouter({
  mode: "history",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '2d',
      meta: {
        requiresAuth: true
      },
      component: TwoDim
    }, {
      path: '/3d',
      name: '3d',
      meta: {
        requiresAuth: true
      },
      component: ThreeDim
    }, {
      path: '/drones',
      name: 'DroneTracker',
      meta: {
        requiresAuth: true
      },
      component: Drones
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/error/:ecode',
      name: 'error',
      component: Error
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error/404',
    }
    // ,
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  // If the user is not logged in, redirect to /login
  const isLoggedIn = isLogedin();
  if (to.meta.requiresAuth === true && !isLoggedIn) {
    console.log(isLoggedIn);
    return next({ path: "/login" });
  }
  next();
});

export default router
