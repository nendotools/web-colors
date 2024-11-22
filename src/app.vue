<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from '#imports';
import { useGlobalStore } from '@/pinia/global';
import { useColorStore } from '@/pinia/colors';

const colorStore = useColorStore();
const globalStore = useGlobalStore();

const themeStyle = computed(() => ({
  "--color-scheme": globalStore.mode,
  ...colorStore.currentScheme.toCSS()
}));

useHead({
  title: 'Colorscheme Builder',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Home page description',
    },
  ],
  bodyAttrs: {
    style: themeStyle
  },
});

const title = computed(() => 'Home');
onMounted(() => {
  const resize = new ResizeObserver(() => {
    globalStore.windowWidth = window.innerWidth;
  });

  resize.observe(document.body);
});
</script>

<style lang="scss">
html {
  font-size: 62.5%;
}

body {
  color-scheme: var(--color-scheme);
  font: var(--text-body-md);
  background-color: light-dark(var(--primary-color), var(--background-color));
  color: light-dark(var(--text-background), var(--text-foreground));
  transition: background-color 0.3s, color 0.3s;
  margin: 0;
  padding: 0;
}

h1 {
  font: var(--text-ui-xl);
  padding: 0;
  margin: 0;
}

h2 {
  font: var(--text-ui-lg);
  padding: 0;
  margin: 0;
}

h3 {
  font: var(--text-ui-md);
  padding: 0;
  margin: 0;
}

h4 {
  font: var(--text-ui-sm);
  padding: 0;
  margin: 0;
}

h5 {
  font: var(--text-ui-xs);
  padding: 0;
  margin: 0;
}

input {
  margin: 0;
  padding: 0;
}
</style>
