import service from "../request";
export const getUserList = (params) => {
  return service.post("/admin/find", params);
};

export const settingRatio = (params) => {
    return service.patch("/admin/settingRatio", params);
};
  