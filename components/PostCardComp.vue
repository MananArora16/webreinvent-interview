<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  postData: {
    type: Object,
  },
  isLoading: {
    type: Boolean,
  },
});

const handlePostDetail = () => {
  router.push(`/post-detail/${props.postData?.id}`);
};
</script>

<template >
  <div
    v-loading="props.isLoading"
    class="w-full max-w-sm mx-auto bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    @click="handlePostDetail"
  >
    <div
      class="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center"
    >
      <div class="flex space-x-2">
        <span
          class="px-2 py-1 bg-white/20 text-white rounded-full text-xs uppercase font-semibold"
          v-for="tag in props.postData.tags"
          :key="tag"
        >
          {{ tag }}
        </span>
      </div>
      <div class="text-white flex items-center justify-center space-x-1">
        <EyeIcon />
        <span class="text-sm">{{ props.postData?.views }}</span>
      </div>
    </div>

    <div class="p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4 line-clamp-1">
        {{ props.postData?.title }}
      </h2>
      <p class="text-gray-600 mb-4 line-clamp-2">{{ props.postData?.body }}</p>

      <div
        class="flex justify-between items-center border-t border-gray-200 pt-4"
      >
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-1 text-green-600">
            <Likes />
            <span>{{ props.postData?.reactions["likes"] }}</span>
          </div>
          <div class="flex items-center space-x-1 text-red-600">
            <Dislikes />
            <span>{{ props.postData?.reactions["dislikes"] }}</span>
          </div>
        </div>
        <div class="flex items-center space-x-1 text-gray-500">
          <Comments />
          <span>Comments</span>
        </div>
      </div>
    </div>
  </div>
</template>
  
 