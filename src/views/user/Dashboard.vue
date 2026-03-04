<template>
  <q-page class="user-dashboard q-pa-lg">
    <div class="dashboard-grid">
      <!-- Columna izquierda: Perfil -->
      <div class="profile-column">
        <!-- Card de perfil -->
        <div class="profile-card q-pa-lg q-mb-md">
          <div class="text-center q-mb-md">
            <q-avatar size="80px" class="profile-avatar q-mb-md">
              <q-icon name="person" size="40px" color="white" />
            </q-avatar>
            <div class="text-h6 text-weight-bold text-white">{{ usuario?.nombre || 'Elena Valerius' }}</div>
            <div class="text-mystic-gold text-caption text-uppercase letter-spacing">Buscadora de Luz</div>
          </div>

          <!-- Números clave -->
          <div class="row q-gutter-sm q-mt-md">
            <div class="col text-center numero-badge">
              <div class="numero-valor text-primary">{{ numeroCamino }}</div>
              <div class="numero-label">CAMINO DE VIDA</div>
            </div>
            <div class="col text-center numero-badge">
              <div class="numero-valor text-secondary">{{ numeroDestino }}</div>
              <div class="numero-label">Nº DE DESTINO</div>
            </div>
          </div>

          <!-- Info -->
          <div class="q-mt-lg q-gutter-sm">
            <div class="row items-center q-gutter-xs">
              <q-icon name="cake" size="16px" color="grey-5" />
              <span class="text-grey-5 text-caption">{{ usuario?.fecha_nacimiento ? formatDate(usuario.fecha_nacimiento) : '14 de Mayo, 1992' }}</span>
            </div>
            <div class="row items-center q-gutter-xs">
              <q-icon name="email" size="16px" color="grey-5" />
              <span class="text-grey-5 text-caption">{{ usuario?.email || 'usuario@mystic.com' }}</span>
            </div>
          </div>

          <!-- Esencia del día -->
          <div class="esencia-card q-pa-md q-mt-lg">
            <div class="text-mystic-gold text-caption text-uppercase text-weight-bold q-mb-sm">Esencia de Hoy</div>
            <p class="text-grey-4 text-caption q-mb-sm" style="line-height:1.5; font-style:italic">
              "Tu energía vibra hoy en el número 3. Es un día ideal para la autoexpresión creativa y la comunicación abierta."
            </p>
            <q-btn flat no-caps size="sm" color="primary" label="Ver guía diaria" class="q-pa-none" />
          </div>
        </div>
      </div>

      <!-- Columna derecha: Lecturas y actividad -->
      <div class="content-column">
        <!-- Tabs -->
        <q-tabs
          v-model="activeTab"
          class="dashboard-tabs q-mb-lg"
          active-color="white"
          indicator-color="primary"
          align="left"
          no-caps
        >
          <q-tab name="lecturas" label="Mis Lecturas" />
          <q-tab name="pagos" label="Historial de Pagos" />
          <q-tab name="ajustes" label="Ajustes" />
        </q-tabs>

        <q-tab-panels v-model="activeTab" animated class="bg-transparent">
          <!-- Panel: Mis Lecturas -->
          <q-tab-panel name="lecturas" class="q-pa-none">
            <div class="row items-center justify-between q-mb-md">
              <div class="text-h6 text-weight-bold text-white">Lecturas Personalizadas</div>
              <q-btn outline no-caps size="sm" color="primary" label="Nueva Lectura +" to="/lecturas" />
            </div>

            <!-- Loading state -->
            <div v-if="loadingLecturas" class="text-center q-py-xl">
              <q-spinner-dots color="primary" size="40px" />
            </div>

            <!-- Lecturas grid -->
            <div v-else class="lecturas-grid q-mb-lg">
              <div
                v-for="lectura in lecturas"
                :key="lectura._id"
                class="lectura-card q-pa-md"
              >
                <div class="row items-center justify-between q-mb-sm">
                  <q-icon :name="getLecturaIcon(lectura.tipo)" size="24px" color="primary" />
                  <span class="text-caption text-grey-6">{{ formatDate(lectura.fecha) }}</span>
                </div>
                <div class="text-subtitle2 text-weight-bold text-white q-mb-xs">{{ lectura.tipo || 'Mapa de Vida Completo' }}</div>
                <p class="text-caption text-grey-5 q-mb-sm" style="line-height:1.4">{{ lectura.descripcion || 'Análisis profundo de tus números centrales.' }}</p>
                <div class="row items-center justify-between">
                  <q-badge :color="lectura.estado === 'completado' ? 'positive' : 'warning'" :label="lectura.estado || 'Completado'" />
                  <q-btn flat no-caps size="xs" color="primary" label="Leer ›" />
                </div>
              </div>

              <!-- Placeholder si no hay lecturas -->
              <div v-if="lecturas.length === 0" class="lectura-card-locked q-pa-md text-center">
                <q-icon name="lock" size="32px" color="grey-7" class="q-mb-sm" />
                <div class="text-subtitle2 text-grey-5 q-mb-xs">Pronóstico Anual 2024</div>
                <p class="text-caption text-grey-7 q-mb-sm">Descubre lo que los números te deparan para el nuevo ciclo solar.</p>
                <q-btn unelevated no-caps size="sm" color="primary" label="Desbloquear" />
              </div>
            </div>

            <!-- Actividad reciente -->
            <div class="text-h6 text-weight-bold text-white q-mb-md">Actividad Reciente</div>
            <div v-if="loadingPagos" class="text-center q-py-md">
              <q-spinner-dots color="primary" size="30px" />
            </div>
            <q-markup-table v-else flat dark class="activity-table">
              <thead>
                <tr>
                  <th class="text-left text-grey-6 text-caption">SERVICIO</th>
                  <th class="text-left text-grey-6 text-caption">FECHA</th>
                  <th class="text-left text-grey-6 text-caption">MONTO</th>
                  <th class="text-left text-grey-6 text-caption">ESTADO</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pago in pagos.slice(0, 3)" :key="pago._id">
                  <td class="text-white text-caption">{{ pago.concepto || pago.tipo || 'Lectura' }}</td>
                  <td class="text-grey-5 text-caption">{{ formatDate(pago.fecha) }}</td>
                  <td class="text-white text-caption">${{ pago.monto }}</td>
                  <td><q-badge :color="pago.estado === 'completado' ? 'positive' : 'warning'" :label="pago.estado" /></td>
                </tr>
                <tr v-if="pagos.length === 0">
                  <td colspan="4" class="text-center text-grey-6 text-caption q-py-md">No hay actividad reciente</td>
                </tr>
              </tbody>
            </q-markup-table>
            <div class="text-center q-mt-sm">
              <q-btn flat no-caps size="sm" color="primary" label="Ver historial completo" @click="activeTab = 'pagos'" />
            </div>
          </q-tab-panel>

          <!-- Panel: Historial de Pagos -->
          <q-tab-panel name="pagos" class="q-pa-none">
            <div class="text-h6 text-weight-bold text-white q-mb-md">Historial de Pagos</div>
            <div v-if="loadingPagos" class="text-center q-py-xl">
              <q-spinner-dots color="primary" size="40px" />
            </div>
            <q-markup-table v-else flat dark class="activity-table">
              <thead>
                <tr>
                  <th class="text-left text-grey-6 text-caption">FECHA</th>
                  <th class="text-left text-grey-6 text-caption">CONCEPTO</th>
                  <th class="text-left text-grey-6 text-caption">MÉTODO</th>
                  <th class="text-left text-grey-6 text-caption">MONTO</th>
                  <th class="text-left text-grey-6 text-caption">ESTADO</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pago in pagos" :key="pago._id">
                  <td class="text-grey-5 text-caption">{{ formatDate(pago.fecha) }}</td>
                  <td class="text-white text-caption">{{ pago.concepto || pago.tipo || 'Servicio' }}</td>
                  <td class="text-grey-5 text-caption">{{ pago.metodo || 'Tarjeta' }}</td>
                  <td class="text-white text-caption">${{ pago.monto }}</td>
                  <td><q-badge :color="pago.estado === 'completado' ? 'positive' : pago.estado === 'pendiente' ? 'warning' : 'grey'" :label="pago.estado" /></td>
                </tr>
                <tr v-if="pagos.length === 0">
                  <td colspan="5" class="text-center text-grey-6 text-caption q-py-xl">No hay pagos registrados</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-tab-panel>

          <!-- Panel: Ajustes -->
          <q-tab-panel name="ajustes" class="q-pa-none">
            <div class="text-h5 text-weight-bold text-white q-mb-xs">Ajustes de Cuenta</div>
            <p class="text-grey-5 text-caption q-mb-lg">Gestiona tu identidad cósmica y preferencias personales.</p>

            <!-- Información Personal -->
            <div class="settings-section q-pa-lg q-mb-md">
              <div class="row items-center q-mb-lg">
                <q-icon name="person" color="primary" size="20px" class="q-mr-sm" />
                <span class="text-subtitle1 text-weight-bold text-white">Información Personal</span>
              </div>
              <div class="row q-gutter-md q-mb-md">
                <div class="col-12 col-sm-6">
                  <label class="field-label">NOMBRE COMPLETO</label>
                  <q-input v-model="editForm.nombre" outlined dark color="primary" class="custom-input" />
                </div>
                <div class="col-12 col-sm-6">
                  <label class="field-label">CORREO ELECTRÓNICO</label>
                  <q-input v-model="editForm.email" outlined dark color="primary" type="email" class="custom-input" />
                </div>
                <div class="col-12 col-sm-6">
                  <label class="field-label">FECHA DE NACIMIENTO</label>
                  <q-input v-model="editForm.fecha_nacimiento" outlined dark color="primary" type="date" class="custom-input" />
                </div>
                <div class="col-12 col-sm-6">
                  <label class="field-label">PAÍS / REGIÓN</label>
                  <q-select v-model="editForm.pais" outlined dark color="primary" :options="paises" class="custom-input" />
                </div>
              </div>
              <div class="text-right">
                <q-btn unelevated no-caps color="primary" label="Guardar Cambios" @click="guardarCambios" />
              </div>
            </div>

            <!-- Preferencias de Notificación -->
            <div class="settings-section q-pa-lg">
              <div class="row items-center q-mb-lg">
                <q-icon name="notifications" color="primary" size="20px" class="q-mr-sm" />
                <span class="text-subtitle1 text-weight-bold text-white">Preferencias de Notificación</span>
              </div>
              <div class="q-gutter-md">
                <div v-for="notif in notificaciones" :key="notif.key" class="notif-row row items-center justify-between q-pa-md">
                  <div>
                    <div class="text-white text-body2 text-weight-medium">{{ notif.label }}</div>
                    <div class="text-grey-6 text-caption">{{ notif.desc }}</div>
                  </div>
                  <q-toggle v-model="notif.active" color="primary" />
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../../../store/auth'
import { getData, putData } from '../../../services/apiClient'

const authStore = useAuthStore()
const usuario = computed(() => authStore.usuario)

const activeTab = ref('lecturas')
const lecturas = ref([])
const pagos = ref([])
const loadingLecturas = ref(false)
const loadingPagos = ref(false)

const numeroCamino = ref(11)
const numeroDestino = ref(7)

const editForm = ref({
  nombre: usuario.value?.nombre || '',
  email: usuario.value?.email || '',
  fecha_nacimiento: '',
  pais: 'España'
})

const paises = ['España', 'México', 'Argentina', 'Colombia', 'Chile', 'Perú', 'Venezuela', 'Otro']

const notificaciones = ref([
  { key: 'diarias', label: 'Lecturas Diarias', desc: 'Recibe tu vibración numérica cada mañana.', active: true },
  { key: 'ofertas', label: 'Nuevas Ofertas y Servicios', desc: 'Sé el primero en saber sobre nuevas lecturas.', active: false },
  { key: 'astro', label: 'Eventos Astrológicos Críticos', desc: 'Alertas sobre fechas clave de alta vibración.', active: true },
])

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

const getLecturaIcon = (tipo) => {
  const icons = { 'principal': 'star', 'diaria': 'wb_sunny', 'pareja': 'favorite' }
  return icons[tipo] || 'auto_awesome'
}

const guardarCambios = async () => {
  try {
    if (usuario.value?._id) {
      await putData(`/api/usuarios/${usuario.value._id}`, editForm.value)
    }
  } catch (e) {
    console.error('Error guardando cambios:', e)
  }
}

onMounted(async () => {
  if (usuario.value?._id) {
    // Cargar lecturas
    loadingLecturas.value = true
    try {
      const res = await getData(`/api/lecturas/usuario/${usuario.value._id}`)
      lecturas.value = Array.isArray(res) ? res : (res.lecturas || [])
    } catch (e) {
      console.error('Error cargando lecturas:', e)
    } finally {
      loadingLecturas.value = false
    }

    // Cargar pagos
    loadingPagos.value = true
    try {
      const res = await getData(`/api/pagos/${usuario.value._id}`)
      pagos.value = Array.isArray(res) ? res : (res.pagos || [])
    } catch (e) {
      console.error('Error cargando pagos:', e)
    } finally {
      loadingPagos.value = false
    }
  }
})
</script>

<style scoped lang="sass">
.user-dashboard
  min-height: 100vh
  max-width: 1200px
  margin: 0 auto

.dashboard-grid
  display: grid
  grid-template-columns: 300px 1fr
  gap: 24px
  @media (max-width: 768px)
    grid-template-columns: 1fr

.profile-card
  background: rgba(26, 26, 60, 0.5)
  border: 1px solid rgba(108, 92, 231, 0.2)
  border-radius: 16px
  backdrop-filter: blur(10px)

.profile-avatar
  background: linear-gradient(135deg, rgba(108,92,231,0.6), rgba(162,155,254,0.4))
  border: 3px solid rgba(108,92,231,0.4)
  margin: 0 auto

.numero-badge
  background: rgba(108, 92, 231, 0.1)
  border: 1px solid rgba(108, 92, 231, 0.2)
  border-radius: 10px
  padding: 10px 8px

.numero-valor
  font-size: 28px
  font-weight: 800
  line-height: 1

.numero-label
  font-size: 9px
  font-weight: 600
  letter-spacing: 1px
  color: rgba(255,255,255,0.4)
  text-transform: uppercase
  margin-top: 4px

.esencia-card
  background: rgba(108, 92, 231, 0.08)
  border: 1px solid rgba(108, 92, 231, 0.2)
  border-radius: 10px

.dashboard-tabs
  background: transparent
  border-bottom: 1px solid rgba(108, 92, 231, 0.2)
  :deep(.q-tab)
    color: rgba(255,255,255,0.5)
    font-size: 13px
    padding: 8px 16px

.lecturas-grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))
  gap: 16px

.lectura-card
  background: rgba(26, 26, 60, 0.4)
  border: 1px solid rgba(108, 92, 231, 0.2)
  border-radius: 12px
  transition: border-color 0.2s
  &:hover
    border-color: rgba(108, 92, 231, 0.5)

.lectura-card-locked
  background: rgba(26, 26, 60, 0.3)
  border: 1px dashed rgba(108, 92, 231, 0.25)
  border-radius: 12px
  opacity: 0.8

.activity-table
  background: rgba(26, 26, 60, 0.3)
  border: 1px solid rgba(108, 92, 231, 0.15)
  border-radius: 12px
  :deep(th), :deep(td)
    border-bottom: 1px solid rgba(108, 92, 231, 0.1)
    padding: 10px 16px

.settings-section
  background: rgba(26, 26, 60, 0.4)
  border: 1px solid rgba(108, 92, 231, 0.2)
  border-radius: 14px

.field-label
  display: block
  font-size: 11px
  font-weight: 600
  letter-spacing: 1px
  color: rgba(253, 203, 110, 0.7)
  text-transform: uppercase
  margin-bottom: 6px

.custom-input
  :deep(.q-field__control)
    background: rgba(15, 15, 40, 0.5)
  :deep(.q-field__native)
    color: white

.notif-row
  background: rgba(15, 15, 40, 0.4)
  border: 1px solid rgba(108, 92, 231, 0.15)
  border-radius: 10px

.text-mystic-gold
  color: #FDCB6E

.letter-spacing
  letter-spacing: 2px

.text-secondary
  color: #A29BFE
</style>
