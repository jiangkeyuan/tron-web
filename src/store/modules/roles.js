import { getStorage, setStorage, getBrowserLang } from "@/utils/utils/index.js";

export default {
  state: {
    roles: getStorage("roles") || "", // 项目初始化时，默认为浏览器的语言
  },
  getters: {
    roles: (state) => state.language,
  },
  mutations: {
    setRoles: (state, roles) => {
      state.roles = roles;
      setStorage("roles", roles);
    },
  },
};
