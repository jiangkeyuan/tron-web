import { ElMessage } from "element-plus";
import axios from "axios";
import router from "@/router/index";

const service = axios.create({
  baseURL: "/",
  timeout: 30000, // 设置请求超时时间
});

if (process.env.NODE_ENV === "development") {
  service.defaults.baseURL = "http://api.ziliaoguanjia.cn/";
  //   service.defaults.baseURL = "http://192.168.1.131:8080/";
  // service.defaults.baseURL = "http://192.168.1.47:8080/";
  //   service.defaults.baseURL = "http://192.168.1.163:8080/";
} else {
  service.defaults.baseURL = "http://api.ziliaoguanjia.cn/";
}

let loading = "";
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token") && !config.headers["Authorization"]) {
      config.headers["Authorization"] = localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    // loading.close();
    // 发送失败
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const dataAxios = response.data;
    // loading.close();
    // 这个状态码是和后端约定的
    if (dataAxios.code === 14006 && response.config.url !== "/users/info") {
      //掉登
      ElMessage.error("请重新登陆");
      localStorage.setItem("token", "");
      router.push("/auth/login");
    }
    return dataAxios;
  },
  (error) => {
    ElMessage.error(error.message);
    // loading.close();
    return Promise.reject(error);
  }
);

export default service;
