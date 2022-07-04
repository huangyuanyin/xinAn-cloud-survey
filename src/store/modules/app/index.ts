import { defineStore } from 'pinia'

interface BaseAppInfo {
    isCollapse: boolean
}

export const useAppStore = defineStore({
    id: 'app',
    state: () => ({
        isCollapse: {} as BaseAppInfo,
    }),
    getters: {
        getCollapse: (state) => { return state.isCollapse }
    },
    actions: {
        handleCollapse(status) {
            console.log("status", status);
            status == false ? this.isCollapse = false : this.isCollapse = true
            return this.isCollapse
        }
    }
})