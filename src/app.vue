<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from '#imports';
import { useGlobalStore } from '@/pinia/global';

const globalStore = useGlobalStore();
const title = computed(() => 'Home');
onMounted(() => {
  const resize = new ResizeObserver(() => {
    globalStore.windowWidth = window.innerWidth;
  });

  resize.observe(document.body);
});
</script>

<style lang="scss">
body {
  background-color: #090909;
  color: #f0f0f0;
}
</style>
