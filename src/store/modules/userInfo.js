import { getUserInfo } from "@/utils/axios/home/index.js";
import router from "@/router/index.js";
import ManagerComponents from "@/page/manager/index.vue";
export default {
  state: {
    userInfo: {}, // userInfo 的初始化
  },
  actions: {
    async getUserInfoAction(context, products) {
      return new Promise(async (resolve, reject) => {
        const data = await getUserInfo();
        if (data.code === 12000) {
          const userInfo = data.data;
          context.commit("setRoles", userInfo.roles);
          context.commit("setUserInfo", userInfo);
          resolve(data.data);
        }
      });
    },
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
};
