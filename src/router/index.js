import { createRouter, createWebHashHistory } from 'vue-router'

import login from "@/views/Login/index.vue";
import center from "@/views/center/index.vue";
import NotFound from "@/views/exception/404.vue";

const routes = [
    {
        path:'/',
        component:login
    },
    {
        path:'/login',
        component:login
    },
    {
        path:'/center/mine',
        component:center
    },
    { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: NotFound 
    },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router