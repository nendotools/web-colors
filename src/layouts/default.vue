<template>
  <Header>
    <template #left>
      <h3>Colorscheme Builder</h3>
    </template>
    <template #right>
      <Button size="md" variant="plain" @click="globalStore.toggleMode">
        <Icon v-if="isLightMode" name="sun" />
        <Icon v-else name="moon" />
      </Button>
    </template>
  </Header>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import Icon from '@/components/ui/Icon.vue';
import Header from '@/components/ui/Header.vue';
import Button from '@/components/ui/Button.vue';
import { useGlobalStore } from '@/pinia/global';

const globalStore = useGlobalStore();
const { isLightMode } = storeToRefs(globalStore);
</script>
