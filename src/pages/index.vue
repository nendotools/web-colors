<template>
  <h3>
    Colors
  </h3>

  <div class="color-options">
    <ColorCard :color="currentScheme.primary" />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import ColorCard from '@/components/ColorCard.vue';
import { useGlobalStore } from '@/pinia/global';
import { useColorStore } from '@/pinia/colors';

const colorStore = useColorStore();
const globalStore = useGlobalStore();
const { isMobile } = storeToRefs(globalStore);
const { currentScheme } = storeToRefs(colorStore);
</script>

<style lang="scss" scoped>
.color-options {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
