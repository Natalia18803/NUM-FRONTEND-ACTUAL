import { createRouter, createWebHistory } from 'vue-router'
import Login from '../utils/views/Login.vue'
import SignUp from '../utils/views/SignUp.vue'
import { useAuthStore } from '../store/auth'

// Layouts
import UserLayout from '../layouts/UserLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// Vistas de usuario
import Dashboard from '../utils/views/user/Dashboard.vue'
import LecturaDetalle from '../utils/views/user/LecturaDetalle.vue'

// Vistas de administrador
import AdminDashboard from '../utils/views/admin/AdminDashboard.vue'
import AdminUsuarios from '../utils/views/admin/AdminUsuarios.vue'
import AdminPagos from '../utils/views/admin/AdminPagos.vue'
import AdminLecturas from '../utils/views/admin/AdminLecturas.vue'
import AdminAjustes from '../utils/views/admin/AdminAjustes.vue'
import AdminSoporte from '../utils/views/admin/AdminSoporte.vue'
import { Component } from 'react' 

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/crear-cuenta', name: 'SignUp', component: SignUp },
 

  // Rutas de Usuario con UserLayout
  {
    path: '/',
    component: UserLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
      { path: 'mi-perfil', name: 'MiPerfil', component: Dashboard },
      { path: 'lecturas', name: 'Lecturas', component: Dashboard },
      { path: 'lectura/:id', name: 'LecturaDetalle', component: LecturaDetalle },
    ]
  },

  // Rutas de Administrador con AdminLayout
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'AdminDashboard', component: AdminDashboard },
      { path: 'usuarios', name: 'AdminUsuarios', component: AdminUsuarios },
      { path: 'pagos', name: 'AdminPagos', component: AdminPagos },
      { path: 'lecturas', name: 'AdminLecturas', component: AdminLecturas },
      { path: 'ajustes', name: 'AdminAjustes', component: AdminAjustes },
      { path: 'soporte', name: 'AdminSoporte', component: AdminSoporte },
    ]
  },

  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.token) {
    next('/login')
  } else {
    next()
  }
})

export default router
