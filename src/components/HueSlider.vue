<template>
  <div class="scroll-hue-gradient" :style="hueOffsetStyle" @mousedown.self="startDrag">
  </div>
  <label v-if="label">{{ label }}</label>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update', value: number): void;
}>();
const props = withDefaults(
  defineProps<{
    value: number;
    height?: number;
    label?: string;
  }>(), {
  height: 35,
});

const startDrag = (event: MouseEvent) => {
  const el = event.target as HTMLElement;
  const handleMouseMove = (event: MouseEvent) => {
    emit('update', Math.round(event.movementX / el.clientWidth * 240));
  };
  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
};

const height = computed(() => `${props.height}px`);

const hueOffsetStyle = computed(() =>
({
  '--hue-offset': (props.value - 180) % 360,
  '--height': height.value,
}))
</script>

<style lang="scss" scoped>
.scroll-hue-gradient {
  width: 100%;
  height: var(--height);
  background: linear-gradient(to right, hsl(var(--hue-offset), 100%, 50%), hsl(calc(var(--hue-offset) + 60), 100%, 50%), hsl(calc(var(--hue-offset) + 120), 100%, 50%), hsl(calc(var(--hue-offset) + 180), 100%, 50%), hsl(calc(var(--hue-offset) + 240), 100%, 50%), hsl(calc(var(--hue-offset) + 300), 100%, 50%), hsl(calc(var(--hue-offset) + 360), 100%, 50%));
}
</style>
