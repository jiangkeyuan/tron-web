const buyerMenuList = [
  {
    id: 1,
    title: "管理面板",
    route: "/buyer/dashboard",
    img: "Folder",
    isActive:true,
  },
  {
    id: 2,
    title: "租用记录",
    route: "/buyer/sale-record",
    img: "Notebook",
    isActive:false,
  },
  {
    id: 3,
    title: "充值",
    route: "/buyer/recharge",
    img: "WalletFilled",
    isActive:false,
  },
  {
    id: 4,
    title: "手工租赁",
    route: "/buyer/manual-lease",
    img: "OfficeBuilding",
    isActive:false,
  },
  {
    id: 5,
    title: "API密钥",
    route: "/buyer/api-key",
    img: "Lock",
    isActive:false,
  },
  {
    id: 6,
    title: "使用帮助",
    route: "/buyer/help",
    img: "QuestionFilled",
    isActive:false,
  },
];
const sellerMenuList = [
    {
        id: 1,
        title: "管理面板",
        route: "/seller/dashboard",
        img: "Folder",
        isActive:true,
      },
      {
        id: 2,
        title: "出售订单",
        route: "/seller/order",
        img: "Notebook",
        isActive:false,
      },
      {
        id: 3,
        title: "出售设置",
        route: "/seller/auto-sell",
        img: "WalletFilled",
        isActive:false,
      },
      {
        id: 4,
        title: "授权操作明细",
        route: "/seller/auth-operation",
        img: "OfficeBuilding",
        isActive:false,
      },
      {
        id: 5,
        title: "使用帮助",
        route: "/seller/help",
        img: "QuestionFilled",
        isActive:false,
      },
];


export default {
  state: {
    menuType: 0, //0 是卖家 1是买家
  },
  getters: {
    menuList: () => {
      const fullPath = window.location.pathname;
      const isBuyer = fullPath.indexOf('buyer/');
      console.log('isBuyer',isBuyer);
      if(isBuyer != -1){
        return buyerMenuList.map(v=>{
            return {
                ...v,
                isActive:v.route === fullPath
            }
        })
      }else{
        return sellerMenuList.map(v=>{
            return {
                ...v,
                isActive:v.route === fullPath
            }
        })
      }
    },
  },
  mutations: {
    changeMenuType:(state,t)=>{
        state.menuType = t;
    }
  },
};
