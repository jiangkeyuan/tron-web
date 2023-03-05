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
            'home-left-menu-li',
          ]"
          v-for="item in store.getters.menuList"
          :key="item.router"
        >
          <el-icon class="home-left-menu-li-icon">
            <component :is="item.img"></component>
          </el-icon>
          <span class="home-left-menu-li-title">{{ item.title }}</span>
        </router-link>
      </ul>
      <div class="home-left-button" @click="changMenuType">
        <el-icon class="home-left-button-icon">
          <ShoppingCart />
        </el-icon>
        <span class="home-left-button-text"> 切换{{ title(1) }}</span>
      </div>
    </div>
    <div class="home-right">
      <div class="home-right-wrapper">
        <div class="home-right-wrapper-header">
          <span class="home-right-wrapper-header-l"> {{ title(0) }} / </span>
          <span class="home-right-wrapper-header-r">
            {{ rightTitle }}
          </span>
        </div>

        <div class="home-wrapper-user">
          <GlobalIzation></GlobalIzation>

          <el-dropdown class="el-dropdown-link" trigger="click">
            <div class="home-wrapper-user">
              <DefaultAvatar
                class="home-wrapper-user-avatar"
                width="36"
                height="36"
              ></DefaultAvatar>
              <div class="home-wrapper-user-no">
                <span class="home-wrapper-user-no-name">
                  554125225@qq.com
                  <el-icon class="home-left-button-icon">
                    <ArrowDown />
                  </el-icon>
                </span>
                <span class="home-wrapper-user-no-amount"
                  >余额：53.436533 TRX</span
                >
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <div class="home-wrapper-user-item">
                    <el-icon color="rgb(47, 76, 159)">
                      <Setting />
                    </el-icon>
                    <span>修改密码</span>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item class="home-wrapper-user-item">
                  <div class="home-wrapper-user-item">
                    <el-icon color="rgb(47, 76, 159)">
                      <WalletFilled />
                    </el-icon>
                    资金账变
                  </div>
                </el-dropdown-item>
                <el-dropdown-item class="home-wrapper-user-item">
                  <div class="home-wrapper-user-item">
                    <el-icon color="rgb(47, 76, 159)">
                      <Postcard />
                    </el-icon>
                    用户信息
                  </div>
                </el-dropdown-item>
                <el-dropdown-item class="home-wrapper-user-item">
                  <div class="home-wrapper-user-item">
                    <el-icon color="rgb(47, 76, 159)">
                      <Star />
                    </el-icon>
                    我的推荐
                  </div>
                </el-dropdown-item>
                <el-dropdown-item class="home-wrapper-user-item">
                  <div class="home-wrapper-user-item">
                    <el-icon color="rgb(47, 76, 159)">
                      <Switch />
                    </el-icon>
                    切换{{ rightTitle }}
                  </div>
                </el-dropdown-item>
                <el-dropdown-item class="home-wrapper-user-item">
                  <div class="home-wrapper-user-item">
                    <el-icon color="rgb(47, 76, 159)">
                      <SwitchButton />
                    </el-icon>
                    退出登录
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <router-view></router-view>

      <!-- <router-view v-slot="{ Component }">
                <Transition name="slide-up">
                    <component :is="Component" />
                </Transition>
            </router-view> -->
    </div>
  </div>
</template>
<script setup>
import Logo from "@/components/logo.vue";
import GlobalIzation from "@/components/GlobalIzation.vue";
import DefaultAvatar from "@/icons/default-avatar.svg?component";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();

const rightTitle = computed(() => {
  let title = "";
  store.getters.menuList.map((v) => {
    if (v.isActive) {
      title = v.title;
    }
  });
  return title;
});

const menuType = computed(() => {
  return store.state.menuList.menuType;
});

const title = (t) => {
  return menuType.value === t ? "卖家版" : "买家版";
};

const changMenuType = () => {
  if (menuType.value === 0) {
    //切换买家版本
    // router.push('/xxxx');
    store.commit("changeMenuType", 1);
  } else {
    router.push("/buyer/dashboard");
    store.commit("changeMenuType", 0);
  }
};
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
  content: "";
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
  width: 100vw;
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
