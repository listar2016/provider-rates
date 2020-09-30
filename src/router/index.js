import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Providers from '@/views/Providers'
import NewProvider from '@/views/NewProvider'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    compone: Home
  },
  {
    path: '/providers',
    name: 'providers',
    component: Providers
  },
  {
    path: '/providers/new',
    name: 'newProvider',
    component: NewProvider
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
