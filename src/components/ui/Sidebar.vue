<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>
  <div class="control" :class="{ open: isOpen }" @click="() => isOpen = !isOpen">
    <Icon v-if="isOpen" name="chevrons-left" />
    <Icon v-else name="chevrons-right" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from '#imports';
import Icon from './Icon.vue';

const isOpen = ref(true);
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  width: 0;
  height: 100%;
  background-color: light-dark(var(--white-tinted), var(--black-tinted-light));
  padding: var(--spacing-md) 0;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  gap: var(--spacing-lg);
  transition: width 0.3s ease, padding 0.2s ease;

  .wrapper {
    width: calc(260px - var(--spacing-xl));
    display: flex;
    flex-direction: column;
    padding: 0 var(--spacing-xl);
    background-color: transparent;
    gap: var(--spacing-lg);
  }

  &.open {
    width: calc(400px + var(--spacing-xl));
    padding: var(--spacing-md);
  }
}

.control {
  position: relative;
  width: min-content;
  height: min-content;
  cursor: pointer;
  margin-right: -30px;
  top: 0;
  right: 0;
  padding: var(--spacing-sm);
  color: light-dark(var(--black-color), var(--white-color));
  background-color: light-dark(var(--white-tinted), var(--black-tinted-light));
  transform: translateX(0);
  transition: transform 0.3s ease;
  z-index: 100;

  &.open {
    transform: translateX(-100%);
  }
}
</style>
