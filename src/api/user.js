import axios from "@/utils/request.js";

export function login(username,password){
    return axios.post('/user/login',{
        username,
        password
    })
}