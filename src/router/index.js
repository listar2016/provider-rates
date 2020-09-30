import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Providers from '@/views/Providers'
import NewProvider from '@/views/NewProvider'
import Rates from '@/views/Rates'

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
    path: '/new-rovider',
    name: 'newProvider',
    component: NewProvider
  },
  {
    path: '/providers/rates/:id',
    name: 'rates',
    component: Rates,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
