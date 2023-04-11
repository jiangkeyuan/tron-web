import service from "../request";
export const getUserList = (params) => {
  return service.post("/admin/find", params);
};

