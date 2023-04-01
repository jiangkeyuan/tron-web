import { getUserInfo } from "@/utils/axios/home/index.js";
import router from "@/router/index.js";
import ManagerComponents from "@/page/manager/index.vue";
export default {
  state: {
    userInfo: {}, // userInfo 的初始化
  },
  actions: {
    async getUserInfoAction(context) {
      const data = await getUserInfo();
      context.commit("setUserInfo", data.data);
    },
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
};
