import service from "../request";
export const usersRegister = (params) => {
  return service.post("/tron/users/register", params);
};

export const generateVerifyCode = (routeValue) => {
  return service.post(`/tron/users/generateVerifyCode/${routeValue}`, {});
};

export const userActivave = (activateCode) => {
  return service.post(`/tron/users/activate?activateCode=${activateCode}`);
};

export const userLogin = (params) => {
  return service.post("/tron/users/login", params);
};

export const changePassWordRequest = (params) => {
  return service.patch("/tron/users/changePwd", params);
};
