const buyerMenuList = [
  {
    id: 1,
    title: "管理面板",
    route: "/console/buyer/dashboard",
    img: "Folder",
    isActive: true,
  },
  {
    id: 2,
    title: "租用记录",
    route: "/console/buyer/sale-record",
    img: "Notebook",
    isActive: false,
  },
  {
    id: 3,
    title: "充值",
    route: "/console/buyer/recharge",
    img: "WalletFilled",
    isActive: false,
  },
  {
    id: 4,
    title: "手工租赁",
    route: "/console/buyer/manual-lease",
    img: "OfficeBuilding",
    isActive: false,
  },
  {
    id: 5,
    title: "API密钥",
    route: "/console/buyer/api-key",
    img: "Lock",
    isActive: false,
  },
  {
    id: 6,
    title: "使用帮助",
    route: "/console/buyer/help",
    img: "QuestionFilled",
    isActive: false,
  },
];
const sellerMenuList = [
  {
    id: 1,
    title: "管理面板",
    route: "/console/seller/dashboard",
    img: "Folder",
    isActive: true,
  },
  {
    id: 2,
    title: "出售订单",
    route: "/console/seller/order",
    img: "Notebook",
    isActive: false,
  },
  {
    id: 3,
    title: "出售设置",
    route: "/console/seller/auto-sell",
    img: "WalletFilled",
    isActive: false,
  },
  {
    id: 4,
    title: "授权操作明细",
    route: "/console/seller/auth-operation",
    img: "OfficeBuilding",
    isActive: false,
  },
  {
    id: 5,
    title: "使用帮助",
    route: "/console/seller/help",
    img: "QuestionFilled",
    isActive: false,
  },
];

export default {
  state: {
    menuType: localStorage.getItem("menuType") || 1, //0 是卖家 1是买家
  },
  getters: {
    menuList: (state) => {
      const fullPath = window.location.hash;
      console.log(state);
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
    },
  },
  mutations: {
    changeMenuType: (state, t) => {
      localStorage.setItem("menuType", t);
      state.menuType = t;
    },
  },
};
