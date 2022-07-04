import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    isCollapse: false,
  }),
  getters: {
    getCollapse: (state) => {
      return state.isCollapse
    }
  },
  actions: {
    handleCollapse(status) {
      status == false ? this.isCollapse = false : this.isCollapse = true
      return this.isCollapse
    }
  }
})