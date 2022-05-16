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
    name: 'Adoption',
    component: () => import('../views/AdoptionView.vue')
  },
  {
    path: '/funnypets',
    name: 'FunnyPets',
    component: () => import('../views/FunnyPetsView.vue')
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: () => import('../views/QuizView.vue')
  },
  {
    path: '/hangman',
    name: 'Hangman',
    component: () => import('../views/HangmanView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/event',
    name: 'Event',
    component: () => import('../views/EventView.vue')
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