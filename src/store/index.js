import { defineStore } from 'pinia'

export const mainStore = defineStore('main',{
    state:()=>{
        return{
            // 用户信息
            userInfo: localStorage.getItem('userInfo') || {}
        }
    },
    getters:{},
    actions:{
        // 记录用户信息
        getUserInfo(userInfo){
            this.userInfo = userInfo
            localStorage.setItem("userInfo",this.userInfo)
        }
    }
})

