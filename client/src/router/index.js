import { createRouter, createWebHistory } from 'vue-router'
import HomeItem from '../views/HomeView.vue'
import ErrorItem from '../components/Error.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeItem
  },
  {
    path: '/adoption',
    name: 'adoption',
    component: import('../views/AdoptionView.vue')
  },
  {
    path: "/:catchAll(.*)",
    name: "Error",
    component: ErrorItem,
    meta: {
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
