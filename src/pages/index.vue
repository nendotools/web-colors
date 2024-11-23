<template>
  <Sidebar>
    <h4>Global Options</h4>
    <Spacer size="sm" />
    <Slider :height="20" :limited-max="25" :limited="!globalStore.unrestrictedLimit" label="Primary Color Influence"
      :value="globalStore.globalInfluence" @update="(v) => globalStore.setGlobalInfluence(v)"
      @toggle-lock="globalStore.toggleUnrestrictedLimit" />
  </Sidebar>
  <div class="content">
    <div class="modes">
      <Button v-for="mode in ColorSchemeTypes" :key="mode" variant="plain" size="lg" :highlight="mode === currentMode"
        :glow="mode !== currentMode" @click="setMode(mode)">
        {{ mode }}
      </Button>
    </div>

    <div class="color-options">
      <ColorCard v-for="color, i in colors" :key="i" :color="color" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import ColorCard from "@/components/ColorCard.vue";
import Sidebar from "@/components/ui/Sidebar.vue";
import Slider from "@/components/forms/Slider.vue";
import Button from "~/components/ui/Button.vue";
import Spacer from "~/components/ui/Spacer.vue";
import { useGlobalStore } from "@/pinia/global";
import { useColorStore } from "@/pinia/colors";
import { ColorSchemeTypes } from "~/types/colorschemes";

const colorStore = useColorStore();
const globalStore = useGlobalStore();
const { currentScheme } = storeToRefs(colorStore);

const currentMode = ref<ColorSchemeTypes>(ColorSchemeTypes.Monochrome);

const setMode = (mode: ColorSchemeTypes) => {
  currentMode.value = mode;
  colorStore.setMode(mode);
};

const colors = computed(() => {
  return colorStore.colors;
});
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  padding: var(--spacing-xl) var(--spacing-xl);
}

.modes {
  padding: var(--spacing-sm) var(--spacing-xxl);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: var(--background-color-lighter);
  user-select: none;

  .active {
    color: var(--foreground-color);
  }
}

.color-options {
  padding: var(--spacing-xxxl) 0;
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
