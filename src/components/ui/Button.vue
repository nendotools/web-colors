<template>
  <button :class="[size, variant]">
    <slot />
  </button>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  size?: "sm" | "md" | "lg";
  variant?: "normal" | "plain";
}>(),
  {
    size: 'md',
    variant: 'normal',
  });
</script>

<style lang="scss" scoped>
button {
  margin: 0;
  padding: 0;
  border: none;
  cursor: pointer;
  color: var(--color-primary);
  border-radius: var(--border-radius-md);

  &.normal {
    background-color: light-dark(var(--color-background), var(--color-primary));
    color: light-dark(var(--text-foreground), var(--text-background));
  }

  &.plain {
    background-color: transparent;
    color: light-dark(var(--text-background), var(--text-foreground));
  }

  &.sm {
    font: var(--text-ui-xs);
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  &.md {
    font: var(--text-ui-sm);
    padding: var(--spacing-sm) var(--spacing-md);
  }

  &.lg {
    font: var(--text-ui-md);
    padding: var(--spacing-md) var(--spacing-lg);
  }
}
</style>
