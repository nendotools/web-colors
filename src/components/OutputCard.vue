<template>
  <Card>
    <div>
      <h3>CSS Variables</h3>
    </div>
    <pre class="code">{{
      colorStore.currentScheme?.toCSSString()
      }}</pre>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card.vue';
import { useColorStore } from '~/pinia/colors';
const colorStore = useColorStore();
</script>

<style lang="scss" scoped>
.code {
  padding: var(--spacing-sm);
  background-color: var(--background-color-light);
  border-radius: var(--border-radius);
  font-size: var(--font-size-sm);
  font-family: var(--font-family-mono);
  background-color: var(--background-color);
  overflow-x: auto;
  user-select: all;
}
</style>
