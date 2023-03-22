import { createRouter, createWebHistory } from "vue-router";
import { getParamsNew } from "@/utils/utils/index.js";
const routes = [
  {
    path: "/",
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
    path: "/auth/login",
    component: () => import("../page/login/index.vue"),
  },
  {
    path: "/console",
    component: () => import("../page/buyer/index.vue"),
    redirect: (to, from) => {
      const redirect = getParamsNew("redirect");
      if (!redirect) {
        return { path: "/console/seller/dashboard" };
      } else {
        return { path: redirect };
      }
    },
    children: [
      {
        path: "buyer/dashboard",
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
        components: {
          helper: () => import("../page/seller/dashbord/index.vue"),
          default: () => import("../page/seller/dashbord/index.vue"),
        },
      },
      {
        path: "seller/order",
        components: {
          helper: () => import("../page/seller/order/index.vue"),
          default: () => import("../page/seller/order/index.vue"),
        },
      },
      {
        path: "seller/auto-sell",
        components: {
          helper: () => import("../page/seller/auto-sell/index.vue"),
          default: () => import("../page/seller/auto-sell/index.vue"),
        },
      },
      {
        path: "seller/auth-operation",
        components: {
          helper: () => import("../page/seller/auth-operation/index.vue"),
          default: () => import("../page/seller/auth-operation/index.vue"),
        },
      },
      {
        path: "seller/help",
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: routes,
});

//路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("stor");
  next();
  // const role = localStorage.getItem('ms_username');
  // NProgress.start(); //进度条
});

export default router;
