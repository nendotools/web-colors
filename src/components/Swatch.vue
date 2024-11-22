<template>
  <div class="color" :style="style">
    <div class="detail">{{ props.color.toString() }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from '#imports';

const props = defineProps<{
  color: HSLColor;
}>();

const style = computed(() => ({
  'background-color': props.color.toString(),
}));
</script>

<style lang="scss" scoped>
.color {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  width: 100%;
  height: 50px;
  transition: background-color 0.3s;

  .detail {
    align-self: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    .detail {
      opacity: 1;
    }
  }
}
</style>
