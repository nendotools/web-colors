<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  padding: var(--spacing-lg);
  border-radius: 0.5rem;
  background-color: light-dark(var(--white-tinted), var(--black-tinted-light));
  box-shadow: 0 0 10px light-dark(hsl(from var(--black-color) h s l / 0.2), hsl(from var(--white-color) h s l / 0.1));
}
</style>
