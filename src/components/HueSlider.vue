<template>
  <div class="scroll-hue-gradient" :style="hueOffsetStyle" @mousedown="startDrag">
  </div>
  <label v-if="label">{{ label }}</label>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  update: (value: number) => void;
}>();
const props = withDefaults(
  defineProps<{
    value: number;
    height?: number;
    label?: string;
  }>(), {
  height: 15,
});

const startDrag = (event: MouseEvent) => {
  const el = event.target;
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

const width = computed(() => `${props.value}%`);
const height = computed(() => `${props.height}px`);

const hueOffsetStyle = computed(() =>
  ({ '--hue-offset': (props.value - 180) % 360 }))
</script>

<style lang="scss" scoped>
.scroll-hue-gradient {
  width: 100%;
  height: 20px;
  background: linear-gradient(to right, hsl(var(--hue-offset), 100%, 50%), hsl(calc(var(--hue-offset) + 60), 100%, 50%), hsl(calc(var(--hue-offset) + 120), 100%, 50%), hsl(calc(var(--hue-offset) + 180), 100%, 50%), hsl(calc(var(--hue-offset) + 240), 100%, 50%), hsl(calc(var(--hue-offset) + 300), 100%, 50%), hsl(calc(var(--hue-offset) + 360), 100%, 50%));
}
</style>
