<template>
  <Sidebar>
    <h4>Global Options</h4>
    <Spacer size="sm" />
    <Slider :height="20" :limited-max="25" :limited="!globalStore.unrestrictedLimit" label="Primary Color Influence"
      :value="globalStore.globalInfluence" @update="(v) => globalStore.setGlobalInfluence(v)"
      @toggle-lock="globalStore.toggleUnrestrictedLimit" />
  </Sidebar>
  <div class="content">
    <h3>
      Colors
    </h3>

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
  padding: var(--spacing-xxxl) var(--spacing-xl);
}

.color-options {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
