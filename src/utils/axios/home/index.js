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

export const getUserInfo = async (params) => {
  return await service.get("/users/info",params);
};

export const logout = async ({}) => {
  return await service.post("/users/logout", {});
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

export const buyManualOrders = async (data) => {
    return await service({
        url: '/index/manual/buy',
        method: 'POST',
        data
    });
};

export const buyDappOrders = async (data) => {
    return await service({
        url: '/index/dapp/buy',
        method: 'POST',
        data
    });
};


export const getPlatformRechargeAddress = async (data) => {
    return await service.get('/index/platformRechargeAddress')
};

export const getPlatformDappAddress = async () => {
    return await service.get('/index/platformDappAddress')
};

export const getPlatformTransferAddress = async () => {
    return await service.get('/index/platformTransferAddress')
};

export const getPlatformPrice = async () => {
    return await service.get('/index/platformPrice')
};

export const hasSufficientTrx = async (data) => {
    return await service({
        url: '/index/dapp/hasSufficientTrx',
        method: 'post',
        data
    })
};
