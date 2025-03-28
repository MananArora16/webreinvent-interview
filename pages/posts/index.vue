<script setup>
import { usePostList } from "~/stores/PostList";
import { storeToRefs } from "pinia";
const postStore = usePostList();
const { posts, limit, total, isLoading } = storeToRefs(postStore);
onMounted(async () => {
  await postStore.fetchPosts();
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    <PostCardComp 
      v-for="post in posts" 
      :key="post.id" 
      :post-data="post"
    />
  </div>
</template>