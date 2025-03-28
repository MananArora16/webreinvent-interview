<script setup>
import { ElMessage } from "element-plus";
import { useAuthStore } from "~/stores/authStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();
const authStore = useAuthStore();
const username = ref("");
const password = ref("");
const showPassword = ref(false);
const isLoading = ref(false);
const login = async (username, password) => {
  try {
    isLoading.value = true;
    const response = await axios.post(
      "https://dummyjson.com/auth/login",
      {
        username: username,
        password: password,
        expiresInMins: 30,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("Status Code:", response.status);
    if (response.status === 200) {
      ElMessage.success("Login Successful");
      authStore.setAccessToken(response.data.accessToken);
      router.push("/");
    } else {
      ElMessage.error("Invalid Credentials");
    }
  } catch (error) {
    ElMessage.error("Invalid credentials. Please try again.");
    console.error("Login failed:", error);
  } finally {
    isLoading.value = false;
  }
};
const handleLogin = async () => {
  if (!username.value) {
    ElMessage.warning("Username cannot be empty");
    return;
  }

  if (!password.value) {
    ElMessage.warning("Password cannot be empty");
    return;
  }

  await login(username.value, password.value);
};
</script>


<template>
  <div
    class="min-h-screen bg-gray-100 flex items-center justify-center relative overflow-hidden"
  >
    <div
      class="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-b-[50%] transform -translate-y-1/2"
    ></div>

    <div
      class="relative bg-white rounded-xl shadow-lg p-8 max-w-xs w-full mx-4 md:max-w-md md:p-10 transition-all"
    >
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Welcome!
      </h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-semibold mb-2"
            >Username</label
          >
          <input
            v-model="username"
            type="username"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your username"
          />
        </div>

        <div class="mb-8 relative">
          <label class="block text-gray-700 text-sm font-semibold mb-2"
            >Password</label
          >
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your password"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-1 top-[50px] -translate-y-1/2 p-2 rounded-full transition-colors"
          >
            <EyeIcon
              :class="showPassword ? 'text-blue-500' : 'text-gray-400'"
              class="w-5 h-5 transition-colors"
            />
          </button>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          :disabled="isLoading"
        >
          {{ isLoading ? "Logging in..." : "Login" }}
        </button>
      </form>
    </div>
  </div>
</template>
  
  