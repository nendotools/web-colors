<template>
  <div class="slider-container">
    <div class="slider-indicator" :style="{ height, width }"></div>
    <input type="range" min="0" :max="limited ? limitedMax : max" :value="value" class="slider-input"
      :style="{ height }" @input="handleChange" />

    <label v-if="label">{{ label }}</label>
    <Icon v-if="limited" name="x-octagon" class="lock limited" size="sm" @click="toggleLock" />
    <Icon v-if="!limited && limited != null" name="octagon" class="lock" size="sm" @click="toggleLock" />
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue';

const emit = defineEmits<{
  (e: 'update', value: number): void;
  (e: 'toggleLock'): void;
}>();
const props = withDefaults(
  defineProps<{
    value: number;
    max?: number;
    limited?: boolean | null;
    limitedMax?: number;
    height?: number;
    label?: string;
  }>(), {
  max: 100,
  limited: null,
  limitedMax: 100,
  height: 15,
});

const width = computed(() => `${Math.min(props.value / (props.limited ? props.limitedMax : props.max) * 100, 100)}%`);
const height = computed(() => `${props.height}px`);

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update', parseFloat(target.value));
};

const toggleLock = () => {
  if (props.limited === null) return;
  if (!props.limited && props.value > props.limitedMax) {
    emit('update', props.limitedMax);
  }

  emit('toggleLock');
}
</script>

<style lang="scss" scoped>
.slider-container {
  position: relative;
  width: 100%;
  height: auto;
}

.lock {
  position: absolute;
  right: 0;
  bottom: -5px;

  &.limited {
    color: var(--error-color);
  }
}

/**
 * OVERALL SETTINGS
 **/
.slider-input {
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  appearance: none;
  outline: none;
}

.slider-indicator {
  background: var(--secondary-color);
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
  background: light-dark(var(--white-tinted-dark), var(--black-tinted));
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: light-dark(var(--white-tinted-dark), var(--black-tinted));
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: light-dark(var(--white-tinted-dark), var(--black-tinted));
}

input[type=range]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: light-dark(var(--white-tinted-dark), var(--black-tinted));
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}

input[type=range]::-ms-fill-lower {
  background: var(--secondary-color);
}

input[type=range]:focus::-ms-fill-lower {
  background: var(--secondary-color);
}

input[type=range]::-ms-fill-upper {
  background: var(--secondary-color);
}

input[type=range]:focus::-ms-fill-upper {
  background: var(--secondary-color);
}
</style>
