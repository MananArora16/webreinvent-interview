import { defineStore } from "pinia";
import axios from "axios";

export const usePostDetail = defineStore("postDetail", () => {
  const post = ref({});
  const isLoading = ref(false);
  const cachedPosts = ref({});

  if (process.client) {
    setInterval(() => {
      cleanupExpiredCache();
    }, 9000000);
  }
  
  const fetchPost = async (postId) => {
    const currentTime = new Date().getTime();

    const cachedPost = cachedPosts.value[postId];
    if (cachedPost && currentTime - cachedPost.timestamp < 15 * 60 * 1000) {
      post.value = cachedPost.data;
      return;
    }

    try {
      isLoading.value = true;
      const response = await axios.get(`https://dummyjson.com/posts/${postId}`);

      if (response.status === 200) {
        post.value = response.data;

        cachedPosts.value[postId] = {
          data: response.data,
          timestamp: currentTime,
        };
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const cleanupExpiredCache = () => {
    const currentTime = new Date().getTime();
    Object.keys(cachedPosts.value).forEach((postId) => {
      if (currentTime - cachedPosts.value[postId].timestamp > 15 * 60 * 1000) {
        delete cachedPosts.value[postId];
      }
    });
  };

  return {
    fetchPost,
    post,
    isLoading,
    cleanupExpiredCache,
  };
});
