<template>
  <Sidebar>
    <h4>Global Options</h4>
    <Spacer size="sm" />
    <Slider :height="20" :limited-max="25" :limited="!globalStore.unrestrictedLimit" label="Primary Color Influence"
      :value="globalStore.globalInfluence" @update="(v) => globalStore.setGlobalInfluence(v)"
      @toggle-lock="globalStore.toggleUnrestrictedLimit" />
  </Sidebar>
  <div class="content">
    <div class="modes">
      <h3 class="active">monochromatic</h3>
      <h3>complementary</h3>
      <h3>analogous</h3>
      <h3>triadic</h3>
    </div>

    <div class="color-options">
      <ColorCard :color="currentScheme.primary" @update-color="(color) => currentScheme.primary = color" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import ColorCard from '@/components/ColorCard.vue';
import Sidebar from '@/components/ui/Sidebar.vue';
import Slider from '@/components/forms/Slider.vue';
import Spacer from '~/components/ui/Spacer.vue';
import { useGlobalStore } from '@/pinia/global';
import { useColorStore } from '@/pinia/colors';

const colorStore = useColorStore();
const globalStore = useGlobalStore();
const { currentScheme } = storeToRefs(colorStore);
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  padding: var(--spacing-xl) var(--spacing-xl);
}

.modes {
  padding: var(--spacing-sm) var(--spacing-xxl);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: var(--background-color-lighter);
  user-select: none;

  .active {
    color: var(--foreground-color);
  }
}

.color-options {
  padding: var(--spacing-xxxl) 0;
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
