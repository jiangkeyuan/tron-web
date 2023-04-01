import service from "../request";
export const getFinishedOrders = () => {
  return service({
    url: "/index/normal/finished/orders",
  });
};
export const getManualOrders = (data) => {
  return service({
    url: "/index/manual/orders",
    method: "POST",
    data,
  });
};
export const sellManualOrders = (data) => {
  return service({
    url: "/index/manual/sell",
    method: "POST",
    data,
  });
};

export const getUserInfo = async () => {
  return await service.get("/users/info");
};

export const logout = async () => {
  return await service.get("/users/logout");
};

export const getWitness = async (address) => {
  return await service.get(`/index/witness/${address}`);
};

export const getStakes = async () => {
  return await service.get(`/index/stakes`);
};

export const getQuickFinishedOrders = async () => {
  return await service.get(`/index/quick/finished/orders`);
};
export const getQuickOrders = async (address) => {
  return await service.get(`/index/quick/orders/${address}`);
};
