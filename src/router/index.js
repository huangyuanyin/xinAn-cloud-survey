import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import Layout from "@/views/Layout/index.vue"; // 布局组件 不需要懒加载

const routes = [
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录页面",
    },
    component: () => import("@/views/Login/index.vue"),
  },
  {
    path: "/page",
    name: "Page",
    meta: {
      title: "测试页面",
    },
    component: () => import("@/views/page/card.vue"),
  },
  {
    path: "/",
    redirect: "/POCTest/overview",
    component: Layout,
  },
  {
    path: "/home",
    component: Layout,
    children: [
      {
        path: "/POCTest",
        name: "POCTest",
        meta: {
          title: "POC测试",
        },
        redirect: "/POCTest/overview", // 该配置是若点击选择一级菜单时，默认选中并跳转到该一级菜单下的第一个二级菜单
        component: () => import("@/views/POCTest/index.vue"),
        children: [
          {
            path: "/POCTest/overview",
            name: "Overview",
            meta: {
              title: "概览",
            },
            component: () => import("@/views/POCTest/overview/index.vue"),
          },
          {
            path: "/POCTest/deviceManagement",
            name: "DeviceManagement",
            meta: {
              title: "设备管理",
            },
            component: () =>
              import("@/views/POCTest/deviceManagement/index.vue"),
          },
          {
            path: "/POCTest/performanceTestTask",
            name: "PerformanceTestTask",
            meta: {
              title: "性能测试任务",
            },
            component: () =>
              import("@/views/POCTest/performanceTestTask/index.vue"),
          },
          {
            path: "/POCTest/taskDetail",
            name: "TaskDetail",
            meta: {
              title: "性能测试任务详情",
            },
            component: () =>
              import("@/views/POCTest/performanceTestTask/taskDetail.vue"),
          },
          {
            path: "/POCTest/templateReport",
            name: "TemplateReport",
            meta: {
              title: "测试报告",
            },
            component: () => import("@/views/POCTest/templateReport/index.vue"),
          },
          {
            path: "/POCTest/dataAnalysis",
            name: "DataAnalysis",
            meta: {
              title: "数据分析",
            },
            component: () =>
              import("@/views/POCTest/templateReport/dataAnalysis.vue"),
          },
          {
            path: "/POCTest/reportDetail",
            name: "reportDetail",
            meta: {
              title: "报告详情",
            },
            component: () =>
              import("@/views/POCTest/templateReport/reportDetail.vue"),
          },
        ],
      },
      {
        path: "/test",
        name: "Test",
        meta: {
          title: "测试",
        },
        redirect: "/test/overview", // 该配置是若点击选择一级菜单时，默认选中并跳转到该一级菜单下的第一个二级菜单
        component: () => import("@/views/test/index.vue"),
        children: [
          {
            path: "/test/overview",
            meta: {
              title: "概览",
            },
            component: () => import("@/views/test/overview.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: {
      title: "404页面",
    },
    component: () => import("@/views/exception/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
