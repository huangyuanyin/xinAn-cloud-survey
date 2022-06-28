<template>
    <div>
        <router-view :key="key"></router-view>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    setup() {
        const route = useRoute()
        const key = computed(()=>{
            return route.path
        })
        return {
            route,
            key
        }
    },
})
</script>
