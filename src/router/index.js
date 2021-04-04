import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Login = () =>
	import('../views/login/Login.vue')
const Home = () =>
	import('../views/home/Home.vue')
const Welcome = () =>
	import('../views/welcome/Welcome.vue')
const routes = [
	{
		path: '*',
		redirect: '/login'
	},
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
			}
		]
	}]
const router = new Router({
	routes
})
export default router
