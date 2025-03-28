// middleware/auth.global.js
import { useAuthStore } from "#imports";
import { useCookie } from "#imports";
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const token = useCookie("accessToken").value;
  authStore.setAccessToken(token || "");

  const publicPages = ["/login"];

  const isPublicPage = publicPages.includes(to.path);

  if (authStore.isAuthenticated) {
    console.log("User is authenticated");
    if (["/login"].includes(to.path)) {
      return navigateTo("/");
    }
  } else {
    console.log("User is not authenticated");
    if (!isPublicPage) {
      return navigateTo("/login");
    }
  }
});
