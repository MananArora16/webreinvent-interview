<script setup>
import { ref, onMounted, computed } from "vue";
import { usePostList } from "~/stores/PostList";
import { storeToRefs } from "pinia";
import PostCardComp from "~/components/PostCardComp.vue";

const postStore = usePostList();
const { posts, limit, total, isLoading, skip } = storeToRefs(postStore);

const currentPage = ref(1);

const pageSize = computed(() => limit.value || 10);

const handlePageChange = (page) => {
  const skipValue = (page - 1) * pageSize.value;
  currentPage.value = page;
  postStore.fetchPosts(skipValue);
};

onMounted(() => {
  postStore.fetchPosts();
});
</script>

<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 !pb-[6rem] !pt-[6rem]"
  >
    <PostCardComp
      v-for="post in posts"
      :key="post.id"
      :post-data="post"
      :isLoading="isLoading"
    />
  </div>

  <div
    v-show="!isLoading"
    class="fixed bottom-0 flex flex-col sm:flex-row items-center justify-between w-full px-4 py-4 space-y-3 sm:space-y-0 bg-gray-100 shadow-md"
  >
    <div class="text-sm font-semibold">Total Posts: {{ total }}</div>
    <div
      v-if="posts?.length >= 1"
      class="flex items-center justify-center space-x-2"
    >
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next"
        @current-change="handlePageChange"
        class="flex items-center justify-center space-x-2"
        :pager-count="5"
      />
    </div>
  </div>
</template>