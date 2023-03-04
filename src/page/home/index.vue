<template>
    <h1>{{ $t('hello')}}</h1>

    <div class="card">
        <button type="button" @click="count++">count is {{ count }}</button>
        <button type="button" @click="()=> setlang('en-US')">英文</button>
        <button type="button" @click="()=> setlang('zh-CN')">中文</button>
        <p>
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
        </p>
    </div>
    <p>
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
        starter
    </p>
    <p>
        Install
        <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
        in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<script setup>
import { test } from "@/utils/axios/home/index.js";
const { appContext } = getCurrentInstance();
const count = ref(0);
const setlang = (lang)=>{
    const { appContext } = getCurrentInstance();
    appContext.config.globalProperties.$mitt.emit('changeLang',lang);
}
onMounted(() => { });
</script>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
