import { ElLoading } from "element-plus";
import axios from "axios";

const service = axios.create({
  baseURL: "/",
  timeout: 30000, // 设置请求超时时间
});

if (process.env.NODE_ENV === "development") {
  service.defaults.baseURL = "http://8.218.135.189:8081/";
  // service.defaults.baseURL = "http://192.168.31.80:8080/";
  // service.defaults.baseURL = "http://192.168.1.47:8080/";
} else {
  service.defaults.baseURL = "http://127.0.0.1:8081/";
}

let loading = "";
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token") && !config.headers["Authorization"]) {
      config.headers["Authorization"] = localStorage.getItem("token");
      // config.headers["interfaceVersion"] = "1.0";
    }
    // loading = ElLoading.service({
    //   lock: true,
    //   text: "Loading",
    //   body: true,
    //   spinner: "el-icon-loading",
    //   background: "rgba(0, 0, 0, 0.7)",
    // });
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
    return dataAxios;
  },
  (error) => {
    ElMessage.error(error.message);
    // loading.close();
    return Promise.reject(error);
  }
);

export default service;
