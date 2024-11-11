<template>
  <div>page content</div>
  <div>
    {{ isMobile }}
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/pinia/global';

const globalStore = useGlobalStore();
const { isMobile } = storeToRefs(globalStore);
</script>
