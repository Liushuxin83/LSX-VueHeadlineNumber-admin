import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Login = () =>
	import('../views/login/Login.vue')
const routes = [
	{
		path: '*',
		redirect: '/login'
	},
	{
		path: '/login',
		component: Login
	}]
const router = new Router({
	routes
})
export default router