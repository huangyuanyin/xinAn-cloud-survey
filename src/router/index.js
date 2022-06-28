import { createRouter, createWebHashHistory } from 'vue-router'

import login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import NotFound from "@/views/exception/404.vue";
import PerformanceManagement from "@/views/performanceManagement/index.vue" // 性能管理

const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/home',
        component: Layout,
        children: [
            {
                path: '/performanceManagement',
                component: PerformanceManagement
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router