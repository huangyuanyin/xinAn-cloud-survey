import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from "@/views/Layout/index.vue"; // 布局组件 不需要懒加载

const routes = [
  {
    path: '/',
    name:"",
    redirect:"/home",
    component: Layout
  },
  {
    path: '/login',
    name:"Login",
    meta:{
      title:"登录页面"
    },
    component: import("@/views/Login/index.vue")
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '/POCTest',
        name:"POCTest",
        meta: {
          title: "POC测试"
        },
        component: import("@/views/POCTest/index.vue")
      },
      {
        path: '/deviceManagement',
        name:"DeviceManagement",
        meta: {
          title: "设备管理"
        },
        component: () => import("@/views/POCTest/deviceManagement/index.vue")
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta:{
      title:"404页面"
    },
    component: () => import("@/views/exception/404.vue")
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router