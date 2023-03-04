import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../page/home/index.vue'),
  },
  {
    path: '/auth/login',
    component: () => import('../page/login/index.vue'),
  },
  {
    path: '/buyer',
    component: () => import('../page/buyer/index.vue'),
    children:[
      {
        path: 'dashboard',
        components:{
          helper: () => import('../page/buyer/dashbord/index.vue'),
          default:() => import('../page/buyer/dashbord/index.vue'),
        }
      },
      {
        path: 'sale-record',
        components:{
          helper: () => import('../page/buyer/sale-record/index.vue'),
          default:() => import('../page/buyer/sale-record/index.vue'),
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})


  //路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('stor')
  next();
  // const role = localStorage.getItem('ms_username');
  // NProgress.start(); //进度条
});

export default router;