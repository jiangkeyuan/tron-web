import service from "../request";

export const getRentals = async (url, params) => {
  return await service.post(url, params);
};

export const manaulBuy = async (url, params) => {
  return await service.post(url, params);
};

export const getApiList = async (url) => {
  return await service.get(url);
};

export const addApiList = async (params) => {
  return await service.post("/buyer/user/apikey/add", params);
};

export const updateApiList = async (params) => {
  return await service.post("/buyer/user/apikey/update", params);
};

export const dappRecharge = async (params) => {
  return await service.post("/buyer/user/dapp/recharge", params);
};

export const rechargesLog = async (params) => {
  return await service.post("/buyer/user/recharges", params);
};
