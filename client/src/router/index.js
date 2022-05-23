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
    path: '/volunteering',
    name: 'Volunteering',
    component: () => import('../views/VolunteeringView.vue')
  },
  {
    path: '/funnypets',
    name: 'FunnyPets',
    component: () => import('../views/FunnyPetsView.vue')
  },
  {
    path: '/funfacts',
    name: 'FunFacts',
    component: () => import('../views/FunFactsView.vue')
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
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue')
  },
  {
    path: '/events',
    name: 'Event',
    component: () => import('../views/EventView.vue')
  },
  {
    path: '/adoption-booking/:petType/:petName',
    name: 'AdoptionBooking',
    component: () => import('../views/AdoptionBookingView.vue')
  },
  {
    path: '/mybookings',
    name: 'MyBookings',
    component: () => import('../views/MyBookingsView.vue')
  },
  {
    path: '/manage-adoptions',
    name: 'ManageAdoptions',
    component: () => import('../views/ManageAdoptionsView.vue')
  },
  {
    path: '/manage-events',
    name: 'ManageEvents',
    component: () => import('../views/ManageEventsView.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/UsersView.vue')
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
