import service from "../request";
export const getOrderCenter = (params) => {
  return service.post("/admin/orderCenter", params);
};

export const exportOrder = (params) => {
    return service({
        url:"/admin/order/export",
        params,
        responseType: 'blob'
    });
};
