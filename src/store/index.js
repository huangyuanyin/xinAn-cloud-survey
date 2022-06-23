import { defineStore } from 'pinia'
// import appModule from './modules/app/index'

export const mainStore = defineStore('main', {
    state: () => {
        return {
            // 用户信息
            userInfo: localStorage.getItem('userInfo') || {},
            // 菜单状态
            isCollapse: false
        }
    },
    getters: {
    },
    actions: {
        // 存储用户信息
        getUserInfo(userInfo) {
            this.userInfo = userInfo
            localStorage.setItem("userInfo", this.userInfo)
        },
        // 改变菜单状态
        changeCollapse(val) {
            this.isCollapse = val
            return this.isCollapse
        }
    },
    modules: {
        // appModule
    }
})

