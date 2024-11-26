<template>
  <Card>
    <div class="wrapper">
      <div>
        <h3>CSS Variables</h3>
      </div>
      <Button class="copy" :class="{ copied }" @click="copyToClipboard">
        <Icon v-if="copied" name="check" size="sm" class="copied" />
        <Icon v-else name="copy" size="sm" class="clip-icon" />
      </Button>
      <pre class="code">:root {{
        colorStore.currentScheme?.toCSSString(true)
        }}</pre>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Icon from './ui/Icon.vue';
import Button from './ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import { useColorStore } from '~/pinia/colors';
const colorStore = useColorStore();

const copied = ref(false);

const copyToClipboard = () => {
  if (!colorStore.currentScheme || copied.value) return;
  navigator.clipboard.writeText(colorStore.currentScheme?.toCSSString(true));
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.code {
  padding: var(--spacing-sm);
  background-color: light-dark(var(--black-color), var(--black-color));
  color: var(--white-color);
  border-radius: 8px;
  font-size: var(--font-size-sm);
  font-family: var(--font-family-mono);
  overflow-x: auto;
  user-select: text;
}

.success {
  position: absolute;
  top: var(--spacing-xs);
  right: var(--spacing-xs);
}

.wrapper {
  .copy {
    border: none;
    position: absolute;
    right: var(--spacing-md);
    top: var(--spacing-xxxl);
    color: var(--white-color);
    background-color: light-dark(var(--black-tinted-lighter), var(--black-tinted-lighter));
  }

  .clip-icon {
    color: var(--white-color);
  }

  .copied {
    color: var(--success-color);
    background-color: light-dark(var(--black-tinted-lighter), var(--black-tinted-lighter));
  }
}
</style>
