import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入需要的路由组件
const Login = () => import('@/views/Login/Login.vue')
const Register = () => import('@/views/Register/Register.vue')
const Welcome = () => import('@/views/Welcome/Welcome.vue')
const Home = () => import('@/views/Home/Home.vue')
const Index = () => import('@/components/reception/Index.vue')
const Detail = () => import('@/components/reception/Detail.vue')
const Customize = () => import('@/components/reception/Customize.vue')
const My = () => import('@/components/reception/My.vue')

const User = () => import('@/components/system/User.vue')

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  // 带有 name 名称的路由规则，叫做"命名路由"
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, name: 'login', meta: { title: '登录 - 游戏信息管理' } },
  // 注册页面
  { path: '/register', component: Register, name: 'register', meta: { title: '注册 - 游戏信息管理' } },
  {
    path: '/welcome', component: Welcome, name: 'welcome', redirect: '/welcome/index',
    children: [
      { path: 'index', component: Index, name: 'index', meta: { title: '游戏库 - 我的游戏收藏' } },
      { path: 'customize', component: Customize, name: 'customize', meta: { title: '内容管理 - 首页游戏管理' } },
      { path: 'my', component: My, name: 'my', meta: { title: '我的游戏记录' } },
    ]
  },
  { path: '/detail', component: Detail, name: 'detail', meta: { title: '游戏详情' } },
  {
    path: '/home', component: Home, redirect: '/home/user',
    children: [
      { path: 'user', component: User, name: 'user', meta: { title: '用户管理 - 游戏信息管理后台' } },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const paths = ['/welcome/index', '/welcome/customize', '/welcome/my', '/detail']
  if (to.meta.title) {
    document.title = to.meta.title
  }
  paths.forEach(item => {
    if (to.path === item) {
      const state = JSON.parse(localStorage.getItem('state'))
      if (state.tokenInfo) {
        next()
      } else {
        next('/login')
      }
    } else next()
  })
})

export default router
