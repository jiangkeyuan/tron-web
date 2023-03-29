import service from "../request";
export const usersRegister = (params) => {
  return service.post("/auth/register", params);
};

export const generateVerifyCode = (routeValue) => {
  return service.post(`/auth/captcha/${routeValue}`, {});
};

export const userActivave = (activateCode) => {
  return service.get(`/auth/activate?activateCode=${activateCode}`);
};

export const userLogin = (params) => {
  return service.post("/auth/login", params);
};

export const changePassWordRequest = (params) => {
  return service.patch("/users/changePwd", params);
};

export const tronNonce = (params) => {
  return service.post("/auth/tron_nonce", params);
};

export const sendEmails = async (params) => {
  return await service.post("/auth/sendEmail", params);
};

export const setemailVerify = async (params) => {
  return await service.post("/auth/setemailverify", params);
};
