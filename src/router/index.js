import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../page/home/index.vue'),
  },
//   {
//     path: '/dome2',
//     component: () => import('../views/Dome2.vue'),
//     meta: {
//       title: 'Dome2'
//     }
//   }
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