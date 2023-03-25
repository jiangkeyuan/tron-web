import service from "../request";
export const getFinishedOrders = (params) => {
  return service({
    url: '/tron/finished/orders',
    params
  });
};

