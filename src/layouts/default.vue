<template>
  <Header>
    <template #left>
      <h3>Colorscheme Builder</h3>
    </template>
    <template #right>
      <Button size="md" variant="plain" @click="globalStore.toggleMode">
        <Transition name="fade">
          <Icon v-show="isLightMode" name="sun" />
        </Transition>
        <Transition name="fade">
          <Icon v-show="!isLightMode" name="moon" />
        </Transition>
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

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 0.2s cubic-bezier(.56, 0, .9, .11);
}

.fade-leave-active {
  transition: opacity 0.2s cubic-bezier(.06, .74, .66, 1)
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

button {
  position: relative;

  .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
