import { i18n } from "@/i18n/index.js";

const buyerMenuList = [
  {
    id: 1,
    title: "managementDashboard",
    route: "/console/buyer/dashboard",
    img: "Folder",
    isActive: true,
  },
  {
    id: 2,
    title: "rentalRecords",
    route: "/console/buyer/sale-record",
    img: "Notebook",
    isActive: false,
  },
  {
    id: 3,
    title: "recharge",
    route: "/console/buyer/recharge",
    img: "WalletFilled",
    isActive: false,
  },
  {
    id: 4,
    title: "manualLease",
    route: "/console/buyer/manual-lease",
    img: "OfficeBuilding",
    isActive: false,
  },
  {
    id: 5,
    title: "apiKey",
    route: "/console/buyer/api-key",
    img: "Lock",
    isActive: false,
  },
  {
    id: 6,
    title: "help",
    route: "/console/buyer/help",
    img: "QuestionFilled",
    isActive: false,
  },
];
const sellerMenuList = [
  {
    id: 1,
    title: "managementDashboard",
    route: "/console/seller/dashboard",
    img: "Folder",
    isActive: true,
  },
  {
    id: 2,
    title: "salesOrder",
    route: "/console/seller/order",
    img: "Notebook",
    isActive: false,
  },
  {
    id: 3,
    title: "saleSettings",
    route: "/console/seller/auto-sell",
    img: "WalletFilled",
    isActive: false,
  },
  {
    id: 4,
    title: "authOperation",
    route: "/console/seller/auth-operation",
    img: "OfficeBuilding",
    isActive: false,
  },
  {
    id: 5,
    title: "help",
    route: "/console/seller/help",
    img: "QuestionFilled",
    isActive: false,
  },
];

export default {
  state: {
    menuType: localStorage.getItem("menuType") || 0, //0 是卖家 1是买家
  },
  getters: {
    menuList: (state) => {
      const rolesStr = localStorage.getItem("roles");
      let roles = "";
      if (rolesStr == "undefined" || !rolesStr) {
        roles = "";
      } else {
        roles = JSON.parse(rolesStr);
      }
      if (roles == "ADMIN") {
        return [];
      } else {
        const fullPath = window.location.hash;
        const isBuyer = fullPath.indexOf("buyer/");
        if (state.menuType == 0) {
          return buyerMenuList.map((v) => {
            return {
              ...v,
              isActive: v.route === fullPath.replace("#", ""),
            };
          });
        } else {
          return sellerMenuList.map((v) => {
            return {
              ...v,
              isActive: v.route === fullPath.replace("#", ""),
            };
          });
        }
      }
    },
  },
  mutations: {
    changeMenuType: (state, t) => {
      localStorage.setItem("menuType", t);
      state.menuType = t;
    },
  },
};
