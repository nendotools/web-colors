<template>
  <div class="color" :style="style">
    <div v-if="!hideHint && color !== null" class="detail">{{ color?.toString(colorCode) }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, storeToRefs } from '#imports';
import { type HSLColor } from '~/types/colors';
import { useGlobalStore } from '~/pinia/global';
const { colorCode } = storeToRefs(useGlobalStore());

const props = withDefaults(
  defineProps<{
    color?: HSLColor;
    colorString?: string;
    height?: number;
    hideHint?: boolean
  }>(),
  {
    height: 20,
    hideHint: false
  });

const style = computed(() => ({
  'background-color': props.color ? props.color.toString() : props.colorString,
  'height': `${props.height}px`
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
    pointer-events: none;
  }

  &:hover {
    .detail {
      opacity: 1;
    }
  }
}
</style>
