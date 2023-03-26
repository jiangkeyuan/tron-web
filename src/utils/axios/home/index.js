import service from "../request";
export const getFinishedOrders = (params) => {
  return service({
    url: "/buyer/finished/orders",
    params,
  });
};
export const getManualOrders = (params) => {
  return service({
    url: "/auth/manual/orders",
    params,
  });
};
export const sellManualOrders = (params) => {
  return service({
    url: "/auth/manual/sell",
    params,
  });
};

export const getUserInfo = async () => {
  return await service.get("/users/info");
};
