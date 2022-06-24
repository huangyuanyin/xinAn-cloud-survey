import axios from "axios";
import { ElMessage } from 'element-plus'
// import { useCookies } from '@vueuse/integrations/useCookies'
import { getToken } from "./auth";

const service = axios.create({
    // baseURL:"http://ceshi13.dishait.cn/"
    // baseURL:"http://10.20.84.55:8000/",
    baseURL: "http://10.20.86.27:8000",
    // baseURL: '/api',
    timeout: 12000, // 请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 往header头中自动添加token
    const token = getToken()
    if (token) {
        config.headers["token"] = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code == "1001") {
        ElMessage({
            message: response.data.msg || "请求失败",
            type: 'error',
            duration: 1000,
        })
        return Promise.reject(response)
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    ElMessage({
        message: error.data.msg || "请求失败",
        type: 'error',
        duration: 1000,
    })
    return Promise.reject(error)
})

export default service