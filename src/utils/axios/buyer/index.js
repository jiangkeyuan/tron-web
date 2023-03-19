import service from "../request";

export const getRentals = async (url) => {
  return await service.get(url);
};

export const manaulBuy = async (url, params) => {
  return await service.post(url, params);
};

export const getApiList = async (url) => {
  return await service.get(url);
};
