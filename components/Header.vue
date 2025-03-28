<script setup>
const route = useRoute();
const isOpen = useState("isOpen", () => false);

const currentRouteName = computed(() => {
  if (route.path === "/") return "Home";
  else if (route.path === "/posts") return "Posts";
  else if (route.path.includes("/post-detail")) return "Post Detail";
});

const handleReload = () => {
  window.location.reload();
};
</script>

<template>
  <nav class="bg-gray-100 shadow-md fixed w-full z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex-shrink-0 flex items-center">
          <span
            class="text-xl font-semibold text-gray-900 cursor-pointer"
            @click="handleReload"
          >
            {{ currentRouteName }}
          </span>
        </div>
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink
            to="/"
            class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/posts"
            class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Posts
          </NuxtLink>
        </div>

        <div class="md:hidden flex items-center">
          <button
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            aria-label="Main menu"
          >
            <svg
              class="h-6 w-6"
              :class="isOpen ? 'hidden' : 'block'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="h-6 w-6"
              :class="isOpen ? 'block' : 'hidden'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="md:hidden" :class="isOpen ? 'block' : 'hidden'">
      <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
        <NuxtLink
          to="/"
          class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          @click="isOpen = false"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/posts"
          class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          @click="isOpen = false"
        >
          Posts
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
  
 