<template>
  <div class="numerology-app">
    <!-- Fondo con efectos geométricos -->
    <div class="fixed-full bg-dark">
      <div class="geometric-bg absolute-full"></div>
      <div class="mystic-overlay absolute-full"></div>
      <div class="mystic-symbol">
        <svg class="full-width full-height text-mystic-gold" viewBox="0 0 100 100">
          <circle cx="50" cy="50" fill="none" r="45" stroke="currentColor" stroke-width="0.5"></circle>
          <circle cx="50" cy="50" fill="none" r="30" stroke="currentColor" stroke-width="0.5"></circle>
          <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke="currentColor" stroke-width="0.3"></path>
          <polygon fill="none" points="50,5 95,50 50,95 5,50" stroke="currentColor" stroke-width="0.3"></polygon>
        </svg>
      </div>
    </div>

    <!-- Elementos decorativos flotantes -->
    <div class="floating-circle floating-circle-1"></div>
    <div class="floating-circle floating-circle-2"></div>

    <!-- Contenido principal -->
    <div class="login-container">
      <!-- Header -->
      <div class="text-center q-mb-lg">
        <div class="logo-container q-mx-auto q-mb-md">
          <q-icon name="auto_awesome" size="48px" color="primary" />
        </div>
        <h1 class="text-h3 text-weight-bold text-white q-mb-sm">Numerología</h1>
        <p class="text-mystic-gold text-caption text-weight-medium text-uppercase letter-spacing">
          Descubre tu destino en los números
        </p>
      </div>

      <!-- Card principal -->
      <q-card class="login-card">
        <q-card-section class="q-pb-none">
          <h2 class="text-h5 text-weight-semibold text-white q-mb-xs">Bienvenido al Oráculo</h2>
          <p class="text-grey-5 text-caption">Ingresa tus credenciales para continuar tu viaje.</p>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent class="q-gutter-md">
            <!-- Selector de rol -->
            <div class="role-selector-wrapper">
              <q-btn-toggle
                v-model="role"
                spread
                no-caps
                unelevated
                toggle-color="primary"
                text-color="grey-5"
                class="role-selector"
                :options="[
                  { label: 'Usuario', value: 'user', icon: 'person', slot: 'user' },
                  { label: 'Administrador', value: 'admin', icon: 'admin_panel_settings', slot: 'admin' }
                ]"
              >
                <template v-slot:user>
                  <div class="row items-center no-wrap">
                    <q-icon name="person" size="18px" class="q-mr-xs" />
                    <div>Usuario</div>
                  </div>
                </template>
                <template v-slot:admin>
                  <div class="row items-center no-wrap">
                    <q-icon name="admin_panel_settings" size="18px" class="q-mr-xs" />
                    <div>Administrador</div>
                  </div>
                </template>
              </q-btn-toggle>
            </div>

            <!-- Email -->
            <div>
              <label class="field-label">CORREO ELECTRÓNICO</label>
              <q-input
                v-model="usuario"
                type="email"
                outlined
                dark
                color="primary"
                placeholder="tu@email.com"
                bg-color="input-bg"
                class="custom-input"
              >
                <template v-slot:prepend>
                  <q-icon name="alternate_email" color="grey-7" size="18px" />
                </template>
              </q-input>
            </div>

            <!-- Contraseña -->
            <div>
              <div class="row items-center justify-between q-mb-xs">
                <label class="field-label">CONTRASEÑA</label>
                <a href="#" class="text-primary text-caption text-weight-medium forgot-link">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <q-input
                v-model="pass"
                :type="showPassword ? 'text' : 'password'"
                outlined
                dark
                color="primary"
                placeholder="••••••••"
                bg-color="input-bg"
                class="custom-input"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" color="grey-7" size="18px" />
                </template>
              </q-input>
            </div>

            <!-- Recordarme -->
            <q-checkbox
              v-model="remember"
              dark
              color="primary"
              label="Recordarme en este dispositivo"
              class="custom-checkbox"
            />

            <!-- Botones de acción -->
            <div class="q-gutter-y-sm q-pt-sm">
              <q-btn
                type="submit"
                unelevated
                no-caps
                color="primary"
                class="full-width btn-login"
                @click="ingresar()"
              >
                <span class="q-mr-sm">Iniciar Sesión</span>

                <q-icon name="login" size="18px" />
              </q-btn>
              
              <q-btn
                unelevated
                outline
                no-caps
                text-color="white"
                class="full-width btn-register"
                @click="crearCuenta"
              >
                <span class="q-mr-sm">Crear Cuenta</span>
                <q-icon name="person_add" size="18px" />
              </q-btn>
            </div>
          </q-form>

          <!-- Divider -->
          <div class="divider-container q-my-lg">
            <q-separator dark color="grey-9" />
            <div class="divider-text">O CONTINÚA CON</div>
          </div>

          <!-- Botones sociales -->
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-btn
                unelevated
                outline
                no-caps
                text-color="white"
                class="full-width social-btn"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5Enz5ja4j2gp-eCfZiWfEll572BJI0M_Hi7GKn-WUxyURmtf9wv1ikn1HQCm7MedEZ0TVQrN7d_R8vFg8GUjSPxfnerJwac0ZVFf29a5mki6Mm8p8ytG8XT2_9W8OtWdA9H-lV7WZUjGwh0-WTRj0hFFUQtKaTxtebeJS1InFh2M6EYP_cnfb4H-_Lccgf7vz8emigacYtCp8yfX5OpMvS37-ICciyZfYjDeoou_mQm5k45adIgAtck851PjH5GRcBIU-ucqddaA"
                  alt="Google"
                  class="social-icon"
                />
                <span class="text-caption text-weight-medium q-ml-xs">Google</span>
              </q-btn>
            </div>
            <div class="col-6">
              <q-btn
                unelevated
                outline
                no-caps
                text-color="white"
                class="full-width social-btn"
              >
                <q-icon name="fab fa-apple" size="20px" />
                <span class="text-caption text-weight-medium q-ml-xs">Apple</span>
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Footer links -->
      <div class="text-center q-mt-xl">
        <div class="footer-links">
          <a href="#">Privacidad</a>
          <span class="separator">•</span>
          <a href="#">Términos</a>
          <span class="separator">•</span>
          <a href="#">Ayuda</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { postData } from './services/apiClient';
import { useAuthStore } from './store/auth';

let usuario = ref("")
let pass = ref("")
let role = ref("user")
let remember = ref(false)

const useAuth = useAuthStore()
const router = useRouter()

async function ingresar(){
  try {
    let res = await postData("auth/login",{
      email: usuario.value,
      password: pass.value
    })
    console.log(res);
    useAuth.token = res.token
    
  } catch (error) {
    console.log(error.response);
    
  }
}



function crearCuenta() {
  router.push('/crear-cuenta');
}

</script>

<style lang="scss">
// Importar variables de Quasar si es necesario
// @import './css/quasar.variables.scss';

// Variables de color
$primary: #3211d4;
$mystic-gold: #c5a059;
$background-dark: #131022;
$input-bg: rgba(255, 255, 255, 0.05);

// Estilos globales
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
}

.numerology-app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: $background-dark;
}

// Fondo
.bg-dark {
  background: $background-dark;
}

.geometric-bg {
  background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuBOaTtP6X4kNAxxOf93XLP4tTo1M0sWGD0bzt427_JsozeIW5rraXBsAB4ZW87xSiM6ptJ0_bMU2CoBKHyZoLyFTycP_A_Q4oo2GzO2D0dQoCt5na1U6nl0sqy0Gzv10jZ3lJGKbjmBRCUpH5EGeWaNV-CLETOC5ABD3fbhdwvWTo_dX9U1p0DBUSrlA9kyt0G0H_igTgO5t09AALjV6dODTUhZ6xu6aAXRN1NT93bcj4X70FmX3GXk6rHXUVKiDdwrIo2CP6LsJ9U);
  background-size: cover;
  background-position: center;
  mix-blend-mode: overlay;
  opacity: 0.3;
}

.mystic-overlay {
  background-image: radial-gradient(circle at center, rgba(50, 17, 212, 0.15) 0%, transparent 70%);
}

.mystic-symbol {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  opacity: 0.1;
  pointer-events: none;
  
  @media (max-width: 768px) {
    width: 400px;
    height: 400px;
  }
}

.text-mystic-gold {
  color: $mystic-gold;
}

// Elementos decorativos
.floating-circle {
  position: fixed;
  border: 1px solid rgba(197, 160, 89, 0.1);
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
}

.floating-circle-1 {
  top: 80px;
  right: 10%;
  width: 128px;
  height: 128px;
}

.floating-circle-2 {
  bottom: 80px;
  left: 10%;
  width: 192px;
  height: 192px;
  border-color: rgba(50, 17, 212, 0.1);
}

// Contenedor principal
.login-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 448px;
  padding: 24px;
}

// Logo
.logo-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(50, 17, 212, 0.2);
  border-radius: 50%;
  border: 1px solid rgba(50, 17, 212, 0.3);
  backdrop-filter: blur(8px);
}

.letter-spacing {
  letter-spacing: 0.1em;
}

// Card
.login-card {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
}

// Selector de rol
.role-selector-wrapper {
  background: rgba(0, 0, 0, 0.2);
  padding: 4px;
  border-radius: 12px;
}

.role-selector {
  width: 100%;
  background: transparent !important;
  
  .q-btn {
    border-radius: 8px;
    padding: 10px 16px;
    transition: all 0.3s ease;
    font-size: 14px;
    font-weight: 500;
    
    &.q-btn--active {
      background: $primary !important;
      color: white !important;
      box-shadow: 0 10px 15px -3px rgba(50, 17, 212, 0.3);
    }
    
    &:not(.q-btn--active) {
      background: transparent !important;
      color: #94a3b8 !important;
    }
  }
}

// Labels
.field-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

// Inputs
.custom-input {
  .q-field__control {
    background: $input-bg !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
    border-radius: 8px !important;
    color: white !important;
    height: 48px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.08) !important;
    }
    
    &::before {
      border-color: rgba(255, 255, 255, 0.1) !important;
    }
  }
  
  .q-field__native {
    color: white !important;
    
    &::placeholder {
      color: #64748b !important;
    }
  }
  
  &.q-field--focused {
    .q-field__control {
      &::before {
        border-color: $primary !important;
      }
      
      &::after {
        border-color: $primary !important;
        box-shadow: 0 0 0 2px rgba(50, 17, 212, 0.2);
      }
    }
  }
}

// Forgot password link
.forgot-link {
  text-decoration: none;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
}

// Checkbox
.custom-checkbox {
  color: #94a3b8 !important;
  
  .q-checkbox__label {
    font-size: 14px;
  }
}

// Botones
.btn-login {
  font-weight: 600 !important;
  padding: 14px !important;
  font-size: 0.9375rem !important;
  height: 52px !important;
  box-shadow: 0 10px 15px -3px rgba(50, 17, 212, 0.2) !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 20px 25px -5px rgba(50, 17, 212, 0.3) !important;
  }
}

.btn-register {
  font-weight: 600 !important;
  padding: 14px !important;
  font-size: 0.9375rem !important;
  height: 52px !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.4) !important;
    background: rgba(255, 255, 255, 0.05) !important;
  }
}

// Divider
.divider-container {
  position: relative;
}

.divider-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #1b182d;
  padding: 0 12px;
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.05em;
}

// Botones sociales
.social-btn {
  padding: 8px 16px !important;
  height: 40px !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05) !important;
  }
}

.social-icon {
  width: 20px;
  height: 20px;
}

// Footer
.footer-links {
  font-size: 0.75rem;
  color: #64748b;
  
  a {
    color: #64748b;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: $mystic-gold;
    }
  }
  
  .separator {
    margin: 0 16px;
  }
}

// Responsive
@media (max-width: 640px) {
  .login-container {
    padding: 16px;
  }
  
  .text-h3 {
    font-size: 2rem !important;
  }
  
  .logo-container {
    width: 64px;
    height: 64px;
    
    .q-icon {
      font-size: 36px !important;
    }
  }
}
</style>
