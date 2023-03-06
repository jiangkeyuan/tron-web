import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../page/home/index.vue'),
    children: [
      {
        path: '/',
        components: {
          helper: () => import('../page/home/index/index.vue'),
          default: () => import('../page/home/index/index.vue')
        }
      },
      {
        path: 'c2c',
        components: {
          helper: () => import('../page/home/c2c/index.vue'),
          default: () => import('../page/home/c2c/index.vue')
        }
      }
    ]
  },
  {
    path: '/auth/login',
    component: () => import('../page/login/index.vue')
  },
  {
    path: '/buyer',
    component: () => import('../page/buyer/index.vue'),
    children: [
      {
        path: 'dashboard',
        components: {
          helper: () => import('../page/buyer/dashbord/index.vue'),
          default: () => import('../page/buyer/dashbord/index.vue')
        }
      },
      {
        path: 'sale-record',
        components: {
          helper: () => import('../page/buyer/sale-record/index.vue'),
          default: () => import('../page/buyer/sale-record/index.vue')
        }
      },

      {
        path: 'recharge',
        components: {
          helper: () => import('../page/buyer/recharge/index.vue'),
          default: () => import('../page/buyer/recharge/index.vue')
        }
      },

      {
        path: 'recharge-log',
        components: {
          helper: () => import('../page/buyer/recharge-log/index.vue'),
          default: () => import('../page/buyer/recharge-log/index.vue')
        }
      },

      {
        path: 'manual-lease',
        components: {
          helper: () => import('../page/buyer/manual-lease/index.vue'),
          default: () => import('../page/buyer/manual-lease/index.vue')
        }
      },

      {
        path: 'api-key',
        components: {
          helper: () => import('../page/buyer/api-key/index.vue'),
          default: () => import('../page/buyer/api-key/index.vue')
        }
      },

      {
        path: 'help',
        components: {
          helper: () => import('../page/buyer/help/index.vue'),
          default: () => import('../page/buyer/help/index.vue')
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

//路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('stor')
  next()
  // const role = localStorage.getItem('ms_username');
  // NProgress.start(); //进度条
})

export default router
