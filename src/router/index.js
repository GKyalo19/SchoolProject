import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import AllEvents from '@/views/AllEvents.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import SignUp from '@/views/SignUp.vue'
import AboutUs from '@/views/AboutUs.vue'
import LoginPage from '@/views/LoginPage.vue'
import WelcomePage from '@/views/WelcomePage.vue'
import RolePage from '@/views/RolePage.vue'
import ContactUs from '@/components/ContactUs.vue'
import FeedBack from '@/views/FeedBack.vue'
import CreateEvent from '@/views/CreateEvent.vue'
import RegisterEvent from '@/views/RegisterEvent.vue'
import MyEvents from '@/views/MyEvents.vue'

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
      component: AboutUs,
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: ForgotPassword,
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      component: ResetPassword,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
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
      component: AllEvents,
    },
    {
      path: '/likedEvents',
      name: 'likedEvents',
      component: MyEvents,
    },
    {
      path: '/create',
      name: 'create',
      component: CreateEvent,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterEvent,
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: ContactUs,
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: FeedBack,
    },
  ],
})

export default router

//import.meta.env.BASE_URL
