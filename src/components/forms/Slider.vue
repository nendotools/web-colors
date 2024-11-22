<template>
  <div class="slider-container">
    <div class="slider-indicator" :style="{ height, width }"></div>
    <input type="range" min="0" max="100" :value="value" class="slider-input" :style="{ height }"
      @input="handleChange" />

    <label v-if="label">{{ label }}</label>
  </div>
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

const width = computed(() => `${props.value}%`);
const height = computed(() => `${props.height}px`);

const handleChange = (event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  emit('update', parseFloat(target.value));
};
</script>

<style lang="scss" scoped>
.slider-container {
  position: relative;
  width: 100%;
  height: auto;
}

/**
 * OVERALL SETTINGS
 **/
.slider-input {
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  appearance: none;
  background: var(--background-color);
  outline: none;
}

.slider-indicator {
  background: var(--foreground-color);
  position: absolute;
  pointer-events: none;
}

/**
 * REMOVE DEFAULT SETTINGS
 **/
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-ms-track {
  width: 100%;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  background: transparent;
  border-color: transparent;
  color: transparent;
}

/* Special styling for WebKit/Blink */
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 30px;
  height: 100%;
  cursor: pointer;
  background: transparent;
}

/* All the same stuff for Firefox */
input[type=range]::-moz-range-thumb {
  width: 30px;
  height: 100%;
  cursor: pointer;
  background: transparent;
}

/* All the same stuff for IE */
input[type=range]::-ms-thumb {
  width: 30px;
  height: 100%;
  cursor: pointer;
  background: transparent;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: var(--background-color);
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: var(--background-color);
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: var(--background-color);
}

input[type=range]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: var(--primary-color);
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}

input[type=range]::-ms-fill-lower {
  background: var(--primary-color);
}

input[type=range]:focus::-ms-fill-lower {
  background: var(--primary-color);
}

input[type=range]::-ms-fill-upper {
  background: var(--background-color);
}

input[type=range]:focus::-ms-fill-upper {
  background: var(--background-color);
}
</style>
