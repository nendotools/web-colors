<template>
  <Card>
    <div class="color-group">
      <Swatch :color="color.copy().darken(20)" />
      <Swatch :color="color.copy().darken(15)" />
      <Swatch :color="color.copy().darken(10)" />
      <Swatch :color="color.copy().darken(5)" />
    </div>
    <Swatch :color="color" />
    <div class="color-group">
      <Swatch :color="color.copy().lighten(5)" />
      <Swatch :color="color.copy().lighten(10)" />
      <Swatch :color="color.copy().lighten(15)" />
      <Swatch :color="color.copy().lighten(20)" />
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
