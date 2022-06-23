import axios from "@/utils/request.js";

// export function login(username,password){
//     return axios.post('/admin/login',{
//         username,
//         password
//     })
// }

export function login(username, password) {
    return axios.post('/user/login/', {
        username,
        password
    })
}