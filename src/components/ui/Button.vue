<template>
  <button :class="[size, variant, { highlight, glow }]">
    <slot />
  </button>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "normal" | "plain";
  highlight?: boolean;
  glow?: boolean;
}>(),
  {
    size: 'md',
    variant: 'normal',
    highlight: false,
    glow: false
  });
</script>

<style lang="scss" scoped>
@keyframes glow {
  0% {
    background-color: hsl(var(--secondary-color) / 0);
  }

  100% {
    background-color: hsl(from var(--secondary-color) h s l / .2);
  }
}

button {
  margin: 0;
  padding: 0;
  border: none;
  cursor: pointer;
  color: var(--color-primary);
  transition: color 0.5s ease-in-out;

  &.glow {
    // slowly pulsate the color of the button on hover
    transition: background-color 0.8s ease-in-out;

    &:hover {
      animation: glow 1s infinite alternate;
    }
  }

  &.normal {
    background-color: light-dark(var(--color-background), var(--color-primary));
    color: light-dark(var(--text-foreground), var(--text-background));
  }

  &.plain {
    background-color: transparent;
    color: light-dark(var(--text-background), var(--text-foreground));

    &.highlight {
      color: var(--color-primary);
      border-bottom: 2px solid var(--secondary-color);
    }
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

  &.xl {
    font: var(--text-ui-lg);
    padding: var(--spacing-lg) var(--spacing-xl);
  }
}
</style>
