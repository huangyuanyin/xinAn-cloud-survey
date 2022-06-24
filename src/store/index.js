import { defineStore } from 'pinia'
// import appModule from './modules/app/index'

export const mainStore = defineStore('main', {
    state: () => {
        return {
            userInfo: {}, // 用户信息
            isCollapse: false // 菜单状态
        }
    },
    getters: {
    },
    actions: {
        // 存储用户信息
        getUserInfo(userInfo) {
            if (localStorage.getItem('userInfo')) {
                return this.userInfo = localStorage.getItem('userInfo')
            }
            this.userInfo = userInfo
            localStorage.setItem("userInfo", this.userInfo)
        },
        // 退出登录清空信息
        clearInfo() {
            localStorage.removeItem("userInfo")
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

