import service from "../request";
export const usersRegister = (params) => {
  return service.post("/auth/register", params);
};

export const generateVerifyCode = (routeValue) => {
  return service.post(`/auth/captcha/${routeValue}`, {});
};

export const userActivave = (activateCode) => {
  return service.post(`/auth/activate?activateCode=${activateCode}`);
};

export const userLogin = (params) => {
  return service.post("/auth/login", params);
};

export const changePassWordRequest = (params) => {
  return service.patch("/users/changePwd", params);
};