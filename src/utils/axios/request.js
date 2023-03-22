import axios from "axios";

const service = axios.create({
  baseURL: "/",
  timeout: 30000, // 设置请求超时时间
});
let loading = "";
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  service.defaults.baseURL = "http://8.218.135.189:8080/";
} else {
  alert("生产环境");
}

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    return config;
  },
  (error) => {
    loading.close();
    // 发送失败
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const dataAxios = response.data;
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
