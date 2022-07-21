export const cheshiMenuData = [
  {
    id: "01",
    title: "测试",
    path: null,
    isDisabled: true,
    type: 1,
    children: [],
  },
  {
    id: "02",
    title: "概览",
    path: "/test/overview",
    isDisabled: false,
    children: [],
  },
  {
    id: "03",
    title: "测试管理",
    path: null,
    isDisabled: false,
    children: [
      {
        id: "0301",
        title: "测试一",
        path: "/ceshiOne",
        isDisabled: false,
        children: [],
      },
    ],
  },
];

export const POCTestMenuData = [
  {
    id: "01",
    title: "poc测试",
    path: null,
    isDisabled: true,
    type: 1,
    children: [],
  },
  {
    id: "02",
    title: "概览",
    path: "/POCTest/overview",
    isDisabled: false,
    children: [],
  },
  {
    id: "0301",
    title: "设备管理",
    path: "/POCTest/deviceManagement",
    isDisabled: false,
    children: [],
  },
  {
    id: "0302",
    title: "性能测试任务",
    path: "/POCTest/performanceTestTask",
    isDisabled: false,
    children: [],
  },
  {
    id: "0303",
    title: "测试报告",
    path: "/POCTest/templateReport",
    isDisabled: false,
    children: [],
  },
  // {
  //   id: "03",
  //   title: "性能管理",
  //   path: null,
  //   isDisabled: false,
  //   children: [
  //     {
  //       id: "0301",
  //       title: "设备管理",
  //       path: "/POCTest/deviceManagement",
  //       isDisabled: false,
  //       children: [],
  //     },
  //     {
  //       id: "0302",
  //       title: "性能测试任务",
  //       path: "/POCTest/performanceTestTask",
  //       isDisabled: false,
  //       children: [],
  //     },
  //     {
  //       id: "0303",
  //       title: "测试报告",
  //       path: "/POCTest/templateReport",
  //       isDisabled: false,
  //       children: [],
  //     },
  //   ],
  // },
];
