<script setup>
import { ref, onMounted, computed } from "vue";
import { usePostDetail } from "~/stores/PostDetail";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
const route = useRoute();
const postId = route.params.postid;
const postStore = usePostDetail();
const { post } = storeToRefs(postStore);
onMounted(() => {
  postStore.fetchPost(postId);
});
</script>


<template>
  <main class="min-h-screen bg-gray-50 py-8 !pt-[6rem]">
    <div class="container mx-auto px-4 max-w-3xl">
      <article class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-6 border-b border-gray-100">
          <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">
              {{ post?.title }}
            </h1>
            <div
              class="w-20 h-20 flex flex-col items-center justify-center p-2"
            >
              <Avatar />
              <span class="text-[#1E40AF] font-medium text-sm"
                >User {{ post?.userId }}</span
              >
            </div>
          </div>
          <div class="flex items-center gap-6 text-orange-500 text-sm">
            <div class="flex items-center gap-1">
              <EyeIcon />
              <span>{{ post?.views }} views</span>
            </div>

            <div class="flex items-center gap-4">
              <div class="flex items-center gap-1 text-green-600">
                <Likes />
                <span>{{ post?.reactions?.likes }}</span>
              </div>

              <div class="flex items-center gap-1 text-red-600">
                <Dislikes />
                <span>{{ post?.reactions?.dislikes }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6">
          <p class="text-gray-700 leading-relaxed mb-8">{{ post?.body }}</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in post?.tags"
              :key="tag"
              class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>