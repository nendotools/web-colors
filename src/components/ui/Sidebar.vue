<template>
  <div class="sidebar">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  min-width: 200px;
  width: min-content;
  height: 100%;
  background-color: var(--background-color-light);
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}
</style>
