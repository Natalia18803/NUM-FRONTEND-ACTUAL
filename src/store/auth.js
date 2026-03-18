import { defineStore } from 'pinia';
import { ref } from 'vue';    

export const useAuthStore = defineStore('auth', () => {
  let token = ref("")
  let usuario = ref(null)

    return {
        token,
        usuario
    }
},

    { persist: true }
)
