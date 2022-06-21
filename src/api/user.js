import axios from "@/utils/request.js";

export function login(username,password){
    return axios.post('/admin/login',{
        username,
        password
    })
}