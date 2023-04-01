<template>
  <div class="home" aria-expanded="false">
    <div class="home-left">
      <router-link to="/" class="home-left-logo">
        <Logo></Logo>
      </router-link>
      <ul class="home-left-menu">
        <router-link
          :to="item.route"
          :class="[
            { 'home-left-menu-li-active': item.isActive },
            'home-left-menu-li'
          ]"
          v-for="item in store.getters.menuList"
          :key="item.router"
        >
          <el-icon class="home-left-menu-li-icon">
            <component :is="item.img"></component>
          </el-icon>
          <span class="home-left-menu-li-title">{{ item.title }}</span>
        </router-link>

        <router-link
          v-if="showManager"
          to="/console/manager"
          :class="[
            {
              'home-left-menu-li-active':
                route.fullPath.includes('/console/manager')
            },
            'home-left-menu-li'
          ]"
        >
          <el-icon class="home-left-menu-li-icon">
            <component is="Setting"></component>
          </el-icon>
          <span class="home-left-menu-li-title">系统配置</span>
        </router-link>
      </ul>
      <div class="home-left-button" @click="changMenuType">
        <el-icon class="home-left-button-icon">
          <ShoppingCart />
        </el-icon>
        <span class="home-left-button-text"> 切换{{ title(0) }}</span>
      </div>
    </div>
    <div class="home-right">
      <DashbordTitle></DashbordTitle>
      <router-view></router-view>
    </div>
  </div>
  <div v-if="showEmailsDialog">
    <BindEmails></BindEmails>
  </div>
</template>
<script setup>
import Logo from '@/components/logo.vue'
import DashbordTitle from './dashbord-title.vue'
import { useRouter, useRoute } from 'vue-router'
import BindEmails from '../../components/bind-emails.vue'
import { signMessage, connectedWallet } from '@/utils/utils/tron.js'
import { computed } from 'vue'
const store = useStore()
const router = useRouter()
const route = useRoute()
const showEmailsDialog = ref(false)

const rightTitle = ref('')

const showManager = ref(false)

watch(route, () => {
  store.getters.menuList.map(v => {
    if (v.isActive) {
      rightTitle.value = v.title
    }
  })
})

watch(
  () => store.state.userInfo.userInfo,
  (o, n) => {
    
    noPermissionId(o.permissionId)

    const dateTime = new Date().getTime()
    const oneDay = 24 * 60 * 60 * 1000
    const localTime = localStorage.getItem('date') || 0
    if (!o.email && localTime + oneDay < dateTime) {
      showEmailsDialog.value = true
    }

    if (o.roles === 'admin') {
      showManager.value = true
    } else {
      showManager.value = false
    }

  }
)

const menuType = computed(() => {
  return store.state.menuList.menuType
})

const permissionId = computed(() => {
  return store.state.userInfo.userInfo.permissionId
})
const title = t => {
  return store.state.menuList.menuType === t ? '卖家版' : '买家版'
}

const changMenuType = () => {
  if (menuType.value === 0) {
    //切换买家版本
    router.push('/console/seller/dashboard')
    store.commit('changeMenuType', 1)
  } else {
    router.push('/console/buyer/dashboard')
    store.commit('changeMenuType', 0)
  }
}
onMounted(() => {
  if (route.fullPath.includes('/buyer/')) {
    store.commit('changeMenuType', 1)
  }
})

const noPermissionId = (permissionId) => {
    console.log('permissionId',permissionId);
  if (route.fullPath.includes('seller') && route.name != 'guide') {
    if (!permissionId) {
      router.push('/console/seller/guide')
    }
  }
}
</script>
<style scoped>
.home-wrapper-user-item {
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: black;
}

.home-wrapper-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  cursor: pointer;
}

.home-wrapper-user-no {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.home-wrapper-user-avatar {
  margin-left: 22px;
  margin-right: 12px;
}

.home-wrapper-user-no-name {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
}

.home-wrapper-user-no-amount {
  font-size: 12px;
  height: 22px;
  line-height: 22px;
  color: #294aa5;
}

.home-left-button-icon {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 3px;
}

.home-right-wrapper-header {
  font-size: 18px;
  color: #121c41;
}

.home-right-wrapper-header-l {
  color: #000000a6;
}

.home-right-wrapper {
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.home-left-button {
  width: 170px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  border: 2px solid #dfeaff;
  background: linear-gradient(#ffffff, #f4f8ff);
  border-radius: 40px;
  font-size: 16px;
  color: #294aa5;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  margin: 50px auto 0;
}

.home-left-button-icon {
  width: 16px;
  height: 16px;
  display: block;
  margin-right: 4px;
  color: #294aa5;
}

.home-left-menu-li-active {
  color: #294aa5 !important;
  background-color: #294aa51a;
}

.home-left-menu-li-active:after {
  right: -15px !important;
  width: 3px !important;
  border-radius: 3px 0 0 3px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: block;
  width: 2px;
  content: '';
  background-color: #294aa5;
}

.home-right {
  box-sizing: border-box;
  width: calc(100vw - 240px);
  background: #f0f2f5;
  z-index: 1;
  padding: 0 16px 0;
}

.home-left-menu-li-icon {
  font-size: 16px;
}

.home-left-menu {
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
}

.home-left-menu-li {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  padding: 14px 24px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  color: #707582;
}

.home-left-menu-li-title {
  margin-left: 10px;
}

.home {
  /* width: 100vw; */
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.home-left {
  width: 240px;
  height: 100%;
  background: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  z-index: 10;
  /* justify-content: center; */
}

.home-left-logo {
  height: 70px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #294aa5;
}

/* .slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
}

.slide-up-leave-to {
  display: none;
} */
</style>
