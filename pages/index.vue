<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const handleNavigation = () => {
  router.push("/posts");
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center bg-slate-50"
  >
    <h1
      class="text-3xl sm:text-4xl md:text-5xl text-slate-800 font-semibold mb-8 leading-tight max-w-2xl mx-auto"
    >
      Welcome Web Reinvent Technologies Pvt. Ltd.
    </h1>
    <button
      class="inline-flex items-center gap-4 px-6 py-4 text-lg font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 group relative"
      @click="handleNavigation"
    >
      <span class="flex-grow">Take me to the posts</span>
      <div class="relative flex items-center justify-center w-10 h-10">
        <div
          class="absolute w-full h-full border-2 border-white/30 border-t-white rounded-full group-hover:animate-spin origin-center"
        ></div>

        <ArrowIcon />
      </div>
    </button>
  </div>
</template>

