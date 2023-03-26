import service from "../request";
export const getFinishedOrders = (params) => {
  return service({
    url: "/tron/finished/orders",
    params,
  });
};
export const getManualOrders = (params) => {
  return service({
    url: "/index/manual/orders",
    params,
  });
};
export const sellManualOrders = (data) => {
  return service({
    url: "/index/manual/sell",
    method: 'POST',
    data,
  });
};

export const getUserInfo = async () => {
  return await service.get("/users/info");
};
