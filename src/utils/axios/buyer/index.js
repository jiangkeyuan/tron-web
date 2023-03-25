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
