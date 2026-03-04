<template>
  <q-page class="flex flex-center">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">Iniciar Sesión</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleLogin" class="q-gutter-md">
          <q-input
            v-model="form.email"
            label="Correo electrónico"
            type="email"
            lazy-rules
            :rules="[val => !!val || 'El correo es obligatorio']"
          />

          <q-input
            v-model="form.password"
            label="Contraseña"
            type="password"
            lazy-rules
            :rules="[val => !!val || 'La contraseña es obligatoria']"
          />

          <div>
            <q-btn label="Entrar" type="submit" color="primary" class="full-width" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { loginService } from '../services/authService';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  email: '',
  password: ''
});

const handleLogin = async () => {
  try {
    const response = await loginService(form.value);
    if (response.token) {
      authStore.setToken(response.token);
      router.push('/dashboard');
    }
  } catch (error) {
    console.error('Error en el login:', error);
  }
};
</script>