import axios from "axios";
import { ElMessage } from 'element-plus'
// import { useCookies } from '@vueuse/integrations/useCookies'
import { getToken } from "./auth";

const service = axios.create({
    // baseURL:"http://ceshi13.dishait.cn/"
    baseURL:"http://10.20.84.55:8000/",
    // baseURL:'/api',
    // baseURL:process.env.VUE_API_BASE_URL,
    timeout: 12000, // 请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use(function(config){
    // 在发送请求之前做些什么
    // 往header头中自动添加token
    const token = getToken()
    if(token){
        config.headers["token"] = token
    }
    return config;
},function(error){
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response){
    // 对响应数据做点什么
    return response.data.data;
},function(error){
    // 对响应错误做点什么
    // ElMessage({
    //     message: error.response.data.msg || "请求失败",
    //     type: 'warning',
    //     duration:3000000000000,
    //     appendTo: document.getElementById("app")
    // })
    return Promise.reject(error)
})

export default service