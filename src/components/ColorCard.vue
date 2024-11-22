<template>
  <Card>
    <div class="color-group">
      <Swatch v-for="c in darkenedColors" :key="c.label" :color="c.color" @click="$emit('updateColor', c.color)" />
    </div>
    <Swatch :color="color" />
    <div class="color-group">
      <Swatch v-for="c in lightenedColors" :key="c.label" :color="c.color" @click="$emit('updateColor', c.color)" />
    </div>

    <Spacer />
    <HueSlider label="Hue" :value="color.h" @update="(v) => color.shift(-v)" />

    <Spacer />
    <Slider label="Saturation" :value="color.s" @update="(v) => color.setSaturation(v)" />

    <Spacer />
    <Slider label="lightness" :value="color.l" @update="(v) => color.setLightness(v)" />
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card.vue';
import Swatch from '@/components/Swatch.vue';
import Spacer from '@/components/ui/Spacer.vue';
import Slider from '@/components/forms/Slider.vue';
import HueSlider from '@/components/HueSlider.vue';
import { useColorStore } from '@/pinia/colors';

import { hsl } from '@/pinia/colors';

const colorStore = useColorStore();
const props = defineProps<{
  color: HSLColor;
}>();

defineEmits<{
  updateColor: (color: HSLColor) => void;
}>();

const darkenedColors = computed(() => [
  { color: props.color.copy().darken(20), label: '20' },
  { color: props.color.copy().darken(15), label: '15' },
  { color: props.color.copy().darken(10), label: '10' },
  { color: props.color.copy().darken(5), label: '5' },
]);

const lightenedColors = computed(() => [
  { color: props.color.copy().lighten(5), label: '5' },
  { color: props.color.copy().lighten(10), label: '10' },
  { color: props.color.copy().lighten(15), label: '15' },
  { color: props.color.copy().lighten(20), label: '20' },
]);
</script>

<style lang="scss" scoped>
.color {
  width: 100%;
  height: 50px;
}

.color-group {
  display: flex;
  flex-direction: row;
}
</style>
