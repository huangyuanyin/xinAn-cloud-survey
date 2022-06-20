<template>
    <div>
        {{store.userInfo}}
    </div>
</template>

<script lang="ts" setup>
import { mainStore } from "@/store/index.js"

const store = mainStore()

</script>
