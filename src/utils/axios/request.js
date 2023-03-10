import axios from "axios";
import { ElLoading } from 'element-plus'

const service = axios.create({
  baseURL: "/",
  timeout: 30000, // 设置请求超时时间
});
let loading = "";
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理
    if (!config.headers["Content-Type"]) {
      loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      if (config.method == "post") {
        config.headers["Content-Type"] = "application/json;charset=UTF-8";
        for (var key in config.data) {
          if (config.data[key] === "") {
            delete config.data[key];
          }
        }
        config.data = JSON.stringify(config.data);
      } else {
        config.headers["Content-Type"] =
          "application/x-www-form-urlencoded;charset=UTF-8";
        config.data = JSON.stringify(config.data);
      }
    }
    const token = "token";
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    loading.close();
    // 发送失败
    console.log("1",error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log(2);
    loading.close();
    
    // dataAxios 是 axios 返回数据中的 data
    // loadingInstance.close();
    const dataAxios = response.data;
    // 这个状态码是和后端约定的
    return dataAxios;
  },
  (error) => {
    ElMessage.error(error.message)
    loading.close();
    return Promise.reject(error);
  }
);

export default service;
