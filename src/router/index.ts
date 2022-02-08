import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home.vue'
import contact from '../pages/contact.vue'
const routes = [
	{ path: '/', component: Home },
	{ path: '/about', component: contact },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
