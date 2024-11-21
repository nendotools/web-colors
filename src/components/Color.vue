<template>
  <Card>
    <Swatch :color="color" />
    <div class="color-group">
      <Swatch :color="color.copy().lighten(5)" />
      <Swatch :color="color.copy().lighten(10)" />
      <Swatch :color="color.copy().lighten(15)" />
      <Swatch :color="color.copy().lighten(20)" />
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card.vue';
import Swatch from '@/components/Swatch.vue';

import { hsl } from '@/pinia/colors';

const props = defineProps<{
  color: HSLColor;
}>();

onMounted(() => {
  console.log('Color component mounted:', props.color.l);
  console.log('Color component mounted:', props.color.toString());
});
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
