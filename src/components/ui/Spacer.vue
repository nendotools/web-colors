<template>
  <div class="spacer" :class="[size]"></div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg';
  }>(), {
  size: 'md',
});
</script>

<style lang="scss" scoped>
.spacer {
  &.sm {
    height: var(--spacing-sm);
  }

  &.md {
    height: var(--spacing-md);
  }

  &.lg {
    height: var(--spacing-lg);
  }
}
</style>
