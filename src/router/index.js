import { createWebHistory, createRouter } from 'vue-router'

import MyLogin from '../views/MyLogin.vue'
import NotFound from '../views/NotFound.vue'
import MyHome from '../views/MyHome.vue'
import MyReport from '@/views/MyReport.vue'

const routes = [
  { path: '/reports', name: "home", component: MyHome },
  { path: '/login', name: "login", component: MyLogin },
  { path: '/register-report', name: "report", component: MyReport },
  { path: '/', redirect: '/reports' },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); 
  if (!token && to.name !== 'login') {
    next({ name: 'login' });
  } else if (token && to.name === 'login') {
    next({ name: 'home' });
  } else {
    next();
  }
});


export default router;