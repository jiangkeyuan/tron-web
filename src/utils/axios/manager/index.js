import service from "../request";
export const getManagerList = (params) => {
  return service.post("/admin/setting/find", params);
};

export const addManagerList = (params) => {
  return service.post("/admin/setting", params);
};

export const changeManagerList = (params) => {
  return service.patch("/admin/setting", params);
};

export const deleteManagerList = (params) => {
  return service.post("/admin/setting", params);
};
