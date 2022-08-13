import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home.vue')
const NotFound = () => import('../views/NotFound.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})