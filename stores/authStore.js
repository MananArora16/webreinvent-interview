// stores/authStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCookie } from "#app";
export const useAuthStore = defineStore("authStore", () => {
  const accessTokenCookie = useCookie("accessToken");
  const bearerToken = ref(accessTokenCookie.value || null);

  const isAuthenticated = computed(() => !!bearerToken.value);

  const setAccessToken = (token) => {
    bearerToken.value = token;
    accessTokenCookie.value = token;
  };

  const clearAccessToken = () => {
    bearerToken.value = null;
    accessTokenCookie.value = null;
  };

  return {
    isAuthenticated,
    setAccessToken,
    clearAccessToken,
  };
});
