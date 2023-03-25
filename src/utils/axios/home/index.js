import service from "../request";
export const getFinishedOrders = (params) => {
  return service({
    url: '/tron/finished/orders',
    params
  });
};
export const getManualOrders = (params) => {
    return service({
      url: '/auth/manual/orders',
      params
    });
  };
  export const sellManualOrders = (params) => {
    return service({
      url: '/auth/manual/sell',
      params
    });
  };  