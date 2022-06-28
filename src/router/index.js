import { createRouter, createWebHashHistory } from 'vue-router'

import login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import NotFound from "@/views/exception/404.vue";
import POCTest from "@/views/POCTest/index.vue" // POC测试
import DeviceManagement from "@/views/POCTest/deviceManagement/index.vue" // 设备管理
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
        path: '/POCTest',
        component: POCTest,
        meta: {
          title: "POC测试"
        }
      },
      {
        path: '/deviceManagement',
        component: DeviceManagement,
        meta: {
          title: "设备管理"
        }
      }
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