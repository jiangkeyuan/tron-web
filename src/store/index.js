import { createStore } from "vuex";
import language from "./modules/language";
import menuList from "./modules/menu.js";
import userInfo from "./modules/userInfo.js";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    language,
    menuList,
    userInfo
  },
});
