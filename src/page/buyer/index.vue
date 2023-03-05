<template>
    <div class="home">
        <div class="home-left">
            <router-link to="/" class="home-left-logo">
                <Logo></Logo>
            </router-link>
            <ul class="home-left-menu">
                <router-link :to="item.route"  :class="[{'home-left-menu-li-active':item.isActive},'home-left-menu-li']" v-for="item in store.getters.menuList" :key="item.router">
                    <el-icon class="home-left-menu-li-icon">
                        <component :is="item.img"></component>
                    </el-icon>
                    <span class="home-left-menu-li-title">{{ item.title }}</span>
                </router-link>
            </ul>
           
        </div>
        <div class="home-right">
            <router-view v-slot="{ Component }">
                <Transition name="slide-up">
                    <component :is="Component" />
                </Transition>
            </router-view>
        </div>
    </div>

</template>
<script setup>
import Logo from "@/components/logo.vue";
const store = useStore();
const toPath = ()=>{

}
</script>
<style scoped>
.home-left-menu-li-active{
    color:#294aa5 !important;
    background-color: #294aa51a;
}
.home-left-menu-li-active:after{
    right: -15px!important;
    width: 3px!important;
    border-radius: 3px 0 0 3px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: block;
    width: 2px;
    content: "";
    background-color: #294aa5;
}
.home-right{
    width: calc(100vw - 256px);
    background: #f0f2f5;
    z-index: 1;
}
.home-left-menu-li-icon{
    font-size: 16px;
}
.home-left-menu{
    width:100%;
    box-sizing: border-box;
    padding-left: 16px;
}
.home-left-menu-li{
    width:100%;
    position: relative;
    box-sizing: border-box;
    padding: 14px 24px;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    color: #707582;
}
.home-left-menu-li-title{
    margin-left: 10px;
}
.home{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.home-left{
    width: 240px;
    height: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    z-index: 10;
    /* justify-content: center; */
}
.home-left-logo{
    height: 70px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #294aa5;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
}

.slide-up-leave-to {
  display: none;
}
</style>