import { createRouter, createWebHashHistory } from "vue-router";
import { getParamsNew } from "@/utils/utils/index.js";
import store from "../store/index.js";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../page/home/index.vue"),
    children: [
      {
        path: "/",
        components: {
          helper: () => import("../page/home/index/index.vue"),
          default: () => import("../page/home/index/index.vue"),
        },
      },
      {
        path: "c2c",
        components: {
          helper: () => import("../page/home/c2c/index.vue"),
          default: () => import("../page/home/c2c/index.vue"),
        },
      },
      {
        path: "b2c",
        components: {
          helper: () => import("../page/home/b2c/index.vue"),
          default: () => import("../page/home/b2c/index.vue"),
        },
      },
      {
        path: "announcement",
        components: {
          helper: () => import("../page/home/announcement/index.vue"),
          default: () => import("../page/home/announcement/index.vue"),
        },
      },
      {
        path: "announcement/detail",
        components: {
          helper: () => import("../page/home/announcement/detail.vue"),
          default: () => import("../page/home/announcement/detail.vue"),
        },
      },
      {
        path: "help/:id",
        name: "help",
        components: {
          helper: () => import("../page/home/help/index.vue"),
          default: () => import("../page/home/help/index.vue"),
        },
      },
    ],
  },
  {
    path: "/ic/:beInvitedCode",
    component: () => import("../page/login/ic.vue"),
    beforeEnter: (to, from, next) => {
      const beInvitedCode = to.params.beInvitedCode;
      sessionStorage.setItem("beInvitedCode", beInvitedCode);
      next("/auth/login?type=1");
    },
  },
  {
    path: "/auth/login",
    component: () => import("../page/login/index.vue"),
  },
  {
    path: "/open/batch",
    component: () => import("../page/batch/index.vue"),
  },
  {
    path: "/console",
    component: () => import("../page/buyer/index.vue"),
    redirect: (to, from) => {
      const redirect = getParamsNew("redirect");
      if (!redirect) {
        return { path: "/console/buyer/dashboard" };
      } else {
        return { path: redirect };
      }
    },
    children: [
      {
        path: "order",
        beforeEnter: (to, from, next) => {
          console.log(from.path);
          if (store.state?.roles?.roles?.includes("ADMIN")) {
            next();
          } else {
            next(from.path);
          }
        },
        components: {
          helper: () => import("../page/order/index.vue"),
          default: () => import("../page/order/index.vue"),
        },
      },
      {
        path: "withdraw",
        beforeEnter: (to, from, next) => {
          console.log(from.path);
          if (store.state?.roles?.roles?.includes("ADMIN")) {
            next();
          } else {
            next(from.path);
          }
        },
        components: {
          helper: () => import("../page/withdraw/index.vue"),
          default: () => import("../page/withdraw/index.vue"),
        },
      },        
      {
        path: "user",
        beforeEnter: (to, from, next) => {
          console.log(from.path);
          if (store.state?.roles?.roles?.includes("ADMIN")) {
            next();
          } else {
            next(from.path);
          }
        },
        components: {
          helper: () => import("../page/user/index.vue"),
          default: () => import("../page/user/index.vue"),
        },
      },
      {
        path: "admin",
        beforeEnter: (to, from, next) => {
          next();
          console.log(from.path);
          if (store.state?.roles?.roles?.includes("ADMIN")) {
            next();
          } else {
            next(from.path);
          }
        },
        components: {
          helper: () => import("../page/admin/index.vue"),
          default: () => import("../page/admin/index.vue"),
        },
      },
      {
        path: "manager",
        beforeEnter: (to, from, next) => {
          console.log(from.path);
          if (store.state?.roles?.roles?.includes("ADMIN")) {
            next();
          } else {
            next(from.path);
          }
        },
        components: {
          helper: () => import("../page/manager/index.vue"),
          default: () => import("../page/manager/index.vue"),
        },
      },
      {
        path: "buyer/dashboard",
        beforeEnter: (to, from, next) => {
          if (store.state.roles.roles === "ADMIN") {
            if (to.path === "/console/manager") {
              next();
            } else {
              next("/console/manager");
            }
          } else {
            next();
          }
        },
        components: {
          helper: () => import("../page/buyer/dashbord/index.vue"),
          default: () => import("../page/buyer/dashbord/index.vue"),
        },
      },
      {
        path: "buyer/sale-record",
        components: {
          helper: () => import("../page/buyer/sale-record/index.vue"),
          default: () => import("../page/buyer/sale-record/index.vue"),
        },
      },
      {
        path: "/common/fund-change",
        components: {
          helper: () => import("../page/buyer/fund-change/index.vue"),
          default: () => import("../page/buyer/fund-change/index.vue"),
        },
      },
      {
        path: "/common/user-info",
        components: {
          helper: () => import("../page/buyer/user-info/index.vue"),
          default: () => import("../page/buyer/user-info/index.vue"),
        },
      },
      {
        path: "buyer/recharge",
        components: {
          helper: () => import("../page/buyer/recharge/index.vue"),
          default: () => import("../page/buyer/recharge/index.vue"),
        },
      },

      {
        path: "buyer/recharge-log",
        components: {
          helper: () => import("../page/buyer/recharge-log/index.vue"),
          default: () => import("../page/buyer/recharge-log/index.vue"),
        },
      },

      {
        path: "buyer/manual-lease",
        components: {
          helper: () => import("../page/buyer/manual-lease/index.vue"),
          default: () => import("../page/buyer/manual-lease/index.vue"),
        },
      },

      {
        path: "buyer/api-key",
        components: {
          helper: () => import("../page/buyer/api-key/index.vue"),
          default: () => import("../page/buyer/api-key/index.vue"),
        },
      },

      {
        path: "buyer/help",
        components: {
          helper: () => import("../page/buyer/help/index.vue"),
          default: () => import("../page/buyer/help/index.vue"),
        },
      },
      {
        path: "buyer/help/energy",
        components: {
          helper: () => import("../page/buyer/help/energy/index.vue"),
          default: () => import("../page/buyer/help/energy/index.vue"),
        },
      },
      {
        path: "buyer/help/withdraw",
        components: {
          helper: () => import("../page/buyer/help/with-draw/index.vue"),
          default: () => import("../page/buyer/help/with-draw/index.vue"),
        },
      },
      {
        path: "buyer/help/set-api-key",
        components: {
          helper: () => import("../page/buyer/help/set-api-key/index.vue"),
          default: () => import("../page/buyer/help/set-api-key/index.vue"),
        },
      },
      {
        path: "buyer/help/recharge",
        components: {
          helper: () => import("../page/buyer/help/recharge/index.vue"),
          default: () => import("../page/buyer/help/recharge/index.vue"),
        },
      },

      {
        path: "seller/dashboard",
        name: 'sellerDashboard',
        components: {
          helper: () => import("../page/seller/dashbord/index.vue"),
          default: () => import("../page/seller/dashbord/index.vue"),
        },
      },
      {
        path: "seller/order",
        name: "sellerOrder",
        components: {
          helper: () => import("../page/seller/order/index.vue"),
          default: () => import("../page/seller/order/index.vue"),
        },
      },
      {
        path: "seller/auto-sell",
        name: "sellerAutoSell",
        components: {
          helper: () => import("../page/seller/auto-sell/index.vue"),
          default: () => import("../page/seller/auto-sell/index.vue"),
        },
      },
      {
        path: "seller/auth-operation",
        name: "sellerAuthOperation",
        components: {
          helper: () => import("../page/seller/auth-operation/index.vue"),
          default: () => import("../page/seller/auth-operation/index.vue"),
        },
      },
      {
        path: "seller/help",
        name: "sellerHelp",
        components: {
          helper: () => import("../page/seller/help/index.vue"),
          default: () => import("../page/seller/help/index.vue"),
        },
      },
      {
        path: "seller/help/how-auto-sell",
        components: {
          helper: () => import("../page/seller/help/how-auto-sell/index.vue"),
          default: () => import("../page/seller/help/how-auto-sell/index.vue"),
        },
      },
      {
        path: "seller/guide",
        name: "guide",
        components: {
          helper: () => import("../page/seller/guide/index.vue"),
          default: () => import("../page/seller/guide/index.vue"),
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
    scrollBehavior(to,from,savedPosition){
    console.log(to,"to");
    console.log(from,"from");
    if(to.path === '/' && from.path.includes('/help/')){
      return { 
        top: document.body.scrollHeight,
      }
    }else{
      return { 
        top: 0,
      }
    }
  },
  routes: routes,
});

router.beforeEach(async(to, from, next) => {
    const { userInfo } = store.state.userInfo
    const list = ['sellerDashboard', 'sellerOrder','sellerAutoSell', 'sellerAuthOperation', 'sellerHelp']
    let user = {}
    if(Object.keys(userInfo).length == 0 && list.includes(to.name)) {
        user = await store.dispatch('getUserInfoAction')
    }else {
        user = userInfo
    }
    if(!user.permissionId && list.includes(to.name)) {
        next('/console/seller/guide')
    } else {

        next()
    }
})
export default router;
