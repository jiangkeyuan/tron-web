import { getUserInfo } from "@/utils/axios/home/index.js";
export default {
  state: {
    userInfo: {}, // userInfo 的初始化
  },
  actions: {
    async getUserInfoAction(context) {
      const data = await getUserInfo();
      console.log(data);
      context.commit("setUserInfo", data.data);
    },
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
};
