import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import AllEvents from '@/views/AllEvents.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import SignUp from '@/views/SignUp.vue'
import InternationalEvents from '@/views/InternationalEvents.vue'
import NationalEvents from '@/views/NationalEvents.vue'
import DebateEvents from '@/views/Events/DebateEvents.vue'
import AcademicEvents from '@/views/Events/AcademicEvents.vue'
import AboutUs from '@/views/AboutUs.vue'
import LoginPage from '@/views/LoginPage.vue'
import WelcomePage from '@/views/WelcomePage.vue'
import RolePage from '@/views/RolePage.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutUs
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: ForgotPassword
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      component: ResetPassword
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomePage,
    },
    {
      path: '/roles',
      name: 'roles',
      component: RolePage,
    },
    {
      path: '/events',
      name: 'events',
      component: AllEvents
    },
    {
      path: '/events/international',
      name: 'internationalEvents',
      component: InternationalEvents
    },
    {
      path: '/events/national',
      name: 'nationalEvents',
      component: NationalEvents
    },
    {
      path: '/events/national/Academic',
      name: 'AcademicEvents',
      component: AcademicEvents
    },
    {
      path: '/events/national/Debate',
      name: 'DebateEvents',
      component: DebateEvents
    },
  ],
})

export default router

//import.meta.env.BASE_URL
