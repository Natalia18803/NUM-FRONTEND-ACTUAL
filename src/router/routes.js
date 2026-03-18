import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Dashboard from '../views/user/Dashboard.vue'
import { useAuthStore } from '../store/auth'

// Placeholder components
// ... (if any other placeholders exist)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/crear-cuenta',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/AdminDashboard.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegación
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  console.log('Router BeforeEach -> Navigating to:', to.path, '| current token:', authStore.token)

  if (to.meta.requiresAuth && !authStore.token) {
    console.log('Blocked: requiresAuth but no token. Redirecting to /login')
    next('/login')
  } else {
    console.log('Allowed: next()')
    next()
  }
})

export default router
