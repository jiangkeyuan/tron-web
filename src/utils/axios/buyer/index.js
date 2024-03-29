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
export const delApiList = async (params) => {
  return await service.post("/buyer/user/apikey/del", params);
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

export const setEmail = async (params) => {
  return await service.post("/users/setemail", params);
};

export const bunyerIndex = async () => {
  return await service.get("/buyer/index");
};

export const bindWallets = async (params) => {
  return await service.post("/buyer/user/dapp/bind", params);
};

export const orderSubmit = async (params) => {
  return await service.post("/index/order/submit", params);
};

export const getPlatformRechargeAddress = async () => {
  return await service.get("/buyer/user/transfer/recharge/account");
};

export const getPlatformDappRechargeAddress = async () => {
  return await service.get("/buyer/user/dapp/recharge/account");
};

export const transcations = async (params) => {
  return await service.post("/users/transcations", params);
};

export const getStatistics = async () => {
  return await service.post("/admin/statistics",{});
};
export const getPlatformPrice = async () => {
  return await service.get("/index/platformPrice");
};

export const getWithdrawbalance = async (params) => {
  return await service.post("/users/withdrawbalance",params);
};

export const cancelOrder = async (params) => {
  return await service.post("/buyer/order/cancel",params);
};

export const getWithdrawList = async (params) => {
  return await service.post("/admin/withdrawCoinsPage",params);
};

export const postWithdraw = async (params) => {
  return await service.post("/admin/withdrawCoinsAuditing",params);
};








