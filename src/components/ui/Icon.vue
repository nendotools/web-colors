<template>
  <div :class="iconClasses">
    <i :data-feather="name" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from '#imports';
import feather from 'feather-icons';

const props = withDefaults(defineProps<{
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
}>(),
  {
    size: 'md',
  });

const iconClasses = computed(() => {
  return [
    'icon',
    `icon-${props.size}`,
  ];
});

onMounted(() => {
  feather.replace();
});
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;

  svg {
    width: 1rem;
    height: 1rem;
  }

  &.icon-xs {
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &.icon-sm {
    svg {
      width: 2rem;
      height: 2rem;
    }
  }

  &.icon-md {
    svg {
      width: 3rem;
      height: 3rem;
    }
  }

  &.icon-lg {
    svg {
      width: 6rem;
      height: 6rem;
    }
  }
}
</style>
