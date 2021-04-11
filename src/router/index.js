import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
Vue.use(Router)

const Login = () => import('../views/login/Login.vue')
const Home = () => import('../views/home/Home.vue')
const Welcome = () => import('../views/welcome/Welcome.vue')
const Content = () => import('../views/content/Content.vue')
const PublishArticles = () =>
  import('../views/publishArticles/PublishArticles.vue')
const MaterilaManage = () =>
  import('../views/materialManage/MaterialManage.vue')
const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/home/welcome',
    children: [
      {
        path: 'welcome',
        component: Welcome
      },
      {
        path: 'content',
        component: Content
      },
      {
        path: 'publisharticles',
        component: PublishArticles
      },
      {
        path: 'materialmanage',
        component: MaterilaManage
      }
    ]
  }
]
const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.afterUserLoginInfo.token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
