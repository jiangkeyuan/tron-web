import service from "../request";
export const getFinishedOrders = () => {
  return service({
    url: "/index/finished/orders",
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

export const getWitness = async (address) => {
    return await service.get(`/index/witness/${address}`)
}

export const getStakes = async () => {
    return await service.get(`/index/stakes`)
}
