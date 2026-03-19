<template>
  <q-page class="lectura-view q-pa-md">
    <!-- Navbar interna -->
    <div class="lectura-header row items-center justify-between q-mb-xl">
      <div class="row items-center">
        <q-icon name="auto_awesome" size="20px" color="primary" class="q-mr-sm" />
        <span class="brand-text">ASTRANUMEROS</span>
      </div>
      <div class="row items-center q-gutter-md">
        <router-link to="/dashboard" class="nav-link">Mis Lecturas</router-link>
        <q-btn unelevated no-caps color="primary" icon="download" label="Descargar PDF" size="sm" />
        <q-avatar size="32px" class="user-avatar cursor-pointer">
          <q-icon name="person" color="white" size="16px" />
        </q-avatar>
      </div>
    </div>

    <!-- Contenido del informe -->
    <div class="informe-container">
      <div v-if="loading" class="text-center q-py-xl">
        <q-spinner-dots color="primary" size="60px" />
        <p class="text-grey-5 q-mt-md">Calculando tu destino...</p>
      </div>

      <div v-else>
        <!-- Header del informe -->
        <div class="text-center q-mb-xl">
          <div class="text-caption text-primary text-uppercase letter-spacing q-mb-sm">Informe Personalizado</div>
          <h1 class="informe-title q-mb-sm">Tu Destino <em class="text-primary">Revelado</em></h1>
          <p class="text-grey-4">Análisis vibracional para <strong class="text-white">{{ usuario?.nombre || 'Elena Rodriguez' }}</strong></p>
          <p class="text-grey-6 text-caption">Nacida el {{ fechaNacimiento }}</p>
        </div>

        <!-- Números principales -->
        <div class="numeros-row row justify-center q-gutter-xl q-mb-xl">
          <div v-for="num in numerosprincipales" :key="num.label" class="numero-display text-center" :class="{ 'numero-featured': num.featured }">
            <div class="numero-circle q-mx-auto q-mb-sm" :class="num.featured ? 'numero-circle-featured' : ''">
              <span class="numero-val">{{ num.valor }}</span>
            </div>
            <div class="text-caption text-primary text-uppercase letter-spacing">{{ num.label }}</div>
            <div class="text-grey-6 text-caption q-mt-xs" style="max-width:120px; margin:0 auto">{{ num.desc }}</div>
          </div>
        </div>

        <!-- Lectura principal -->
        <div v-if="lectura" class="lectura-content q-pa-xl q-mb-xl">
          <div class="text-center q-mb-lg">
            <q-icon name="auto_awesome" color="primary" size="24px" />
            <h2 class="text-h5 text-weight-bold text-white q-mt-sm">El Camino del Buscador Eterno</h2>
          </div>
          <div class="lectura-text" v-html="lectura.interpretacion || textoEjemplo"></div>
        </div>

        <!-- Sección de Consejo Espiritual -->
        <div class="consejo-card q-pa-lg q-mb-xl">
          <div class="text-caption text-primary text-uppercase letter-spacing q-mb-sm">Consejo Espiritual</div>
          <p class="text-grey-3" style="line-height:1.7">
            Las personas con esta vibración suelen ser vistas como misteriosas. Tu intuición es tu mayor herramienta; úsala para navegar los desafíos que se presentarán en el próximo ciclo lunar.
          </p>
        </div>
      </div>
    </div>

    <!-- Botón compartir flotante -->
    <q-btn fab icon="share" color="primary" class="fixed-btn" />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../../store/auth'
import { getData } from '../../../services/apiClient'

const route = useRoute()
const authStore = useAuthStore()
const usuario = computed(() => authStore.usuario)

const loading = ref(false)
const lectura = ref(null)

const fechaNacimiento = computed(() => {
  if (usuario.value?.fecha_nacimiento) {
    return new Date(usuario.value.fecha_nacimiento).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  return '14 de Mayo, 1988'
})

const numerosprincipales = ref([
  { valor: 7, label: 'Alma', desc: 'Tus deseos internos más profundos.', featured: false },
  { valor: 5, label: 'Personalidad', desc: 'Cómo el mundo percibe tu energía.', featured: true },
  { valor: 11, label: 'Destino', desc: 'Tu propósito espiritual final.', featured: false },
])

const textoEjemplo = `
  <p>Tu número de Alma 7 revela una naturaleza profundamente introspectiva. No te conformas con respuestas superficiales; buscas la verdad última detrás de cada experiencia. En esta etapa de tu vida, la vibración del 7 te invita a la soledad creativa y al estudio de lo oculto.</p>
  <br/>
  <p>Las personas con esta vibración suelen ser vistas como misteriosas. Tu intuición es tu mayor herramienta; úsala para navegar los desafíos que se presentarán en el próximo ciclo lunar.</p>
`

onMounted(async () => {
  const lecturaId = route.params.id
  if (lecturaId) {
    loading.value = true
    try {
      const res = await getData(`/api/lecturas/${lecturaId}`)
      lectura.value = res
      // Actualizar números si la lectura los tiene
      if (res.numeros) {
        numerosprincipales.value = [
          { valor: res.numeros.alma || 7, label: 'Alma', desc: 'Tus deseos internos más profundos.', featured: false },
          { valor: res.numeros.personalidad || 5, label: 'Personalidad', desc: 'Cómo el mundo percibe tu energía.', featured: true },
          { valor: res.numeros.destino || 11, label: 'Destino', desc: 'Tu propósito espiritual final.', featured: false },
        ]
      }
    } catch (e) {
      console.error('Error cargando lectura:', e)
    } finally {
      loading.value = false
    }
  }
})
</script>

<style scoped lang="sass">
.lectura-view
  min-height: 100vh
  background: transparent
  max-width: 900px
  margin: 0 auto

.lectura-header
  padding: 0 0 20px
  border-bottom: 1px solid rgba(108, 92, 231, 0.15)

.brand-text
  font-size: 14px
  font-weight: 800
  color: white
  letter-spacing: 2px

.nav-link
  text-decoration: none
  color: rgba(255,255,255,0.6)
  font-size: 13px
  &:hover
    color: white

.user-avatar
  background: rgba(108, 92, 231, 0.4)
  border: 2px solid rgba(108,92,231,0.4)

.informe-container
  max-width: 750px
  margin: 0 auto

.informe-title
  font-size: 48px
  font-weight: 900
  color: white
  line-height: 1.1
  em
    font-style: italic
    color: #A29BFE

.numeros-row
  flex-wrap: nowrap
  @media (max-width: 600px)
    flex-wrap: wrap

.numero-circle
  width: 90px
  height: 90px
  border-radius: 50%
  border: 2px solid rgba(108, 92, 231, 0.4)
  display: flex
  align-items: center
  justify-content: center
  background: rgba(108, 92, 231, 0.1)

.numero-circle-featured
  width: 110px
  height: 110px
  border: 2px solid rgba(108, 92, 231, 0.8)
  background: rgba(108, 92, 231, 0.2)
  box-shadow: 0 0 30px rgba(108, 92, 231, 0.3)

.numero-val
  font-size: 36px
  font-weight: 900
  color: white

.numero-featured .numero-val
  font-size: 44px
  color: #A29BFE

.lectura-content
  background: rgba(26, 26, 60, 0.4)
  border: 1px solid rgba(108, 92, 231, 0.2)
  border-radius: 16px

.lectura-text
  color: rgba(255,255,255,0.8)
  line-height: 1.8
  font-size: 15px

.consejo-card
  background: rgba(108, 92, 231, 0.08)
  border: 1px solid rgba(108, 92, 231, 0.25)
  border-radius: 14px

.fixed-btn
  position: fixed
  bottom: 32px
  right: 32px

.letter-spacing
  letter-spacing: 2px
</style>
