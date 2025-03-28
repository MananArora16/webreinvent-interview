import { defineStore } from "pinia";
import axios from "axios";

export const usePostList = defineStore("postList", () => {
  const posts = ref([]);
  const limit = ref(0);
  const total = ref(0);
  const isLoading = ref(false);
  const lastFetchTime = ref(0);
  const fetchPosts = async () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastFetchTime.value < 15 * 60 * 1000) {
      console.log("Applied Caching for the lists of 15 mins.");
      return;
    }

    try {
      isLoading.value = true;
      const response = await axios.get("https://dummyjson.com/posts");
      console.log(response);
      if (response.status == 200) {
        posts.value = response?.data?.posts;
        limit.value = response?.data?.limit;
        total.value = response?.data?.total;
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    fetchPosts,
    posts,
    limit,
    total,
    isLoading,
  };
});
