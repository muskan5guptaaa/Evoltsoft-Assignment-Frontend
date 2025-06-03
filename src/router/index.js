import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Chargers from '../pages/Chargers.vue'
import MapView from '../pages/MapView.vue'
import CreateCharger from '../pages/CreateCharger.vue';
import SignUp from '../pages/Signup.vue';

import ChargerList from '../pages/ChargerList.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/map', component: MapView },
    { path: '/create', component: CreateCharger },
      { path: '/show', component: ChargerList },
      {path: '/signup', component: SignUp },


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Optional: Auth guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/' && !token) {
    next('/')
  } else {
    next()
  }
})

export default router
