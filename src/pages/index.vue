<template>
  <Sidebar>
    <h4>Global Options</h4>
    <Spacer size="sm" />
    <Slider :height="20" :limited-max="25" :limited="!globalStore.unrestrictedLimit" label="Primary Color Influence"
      :value="globalStore.globalInfluence" @update="(v) => globalStore.setGlobalInfluence(v)"
      @toggle-lock="globalStore.toggleUnrestrictedLimit" />

    <Slider :height="20" :limited-max="15" :limited="!globalStore.unrestrictedBlack" label="Lift Black Value"
      :value="colorStore.minBlack" @update="(v) => colorStore.setMinBlack(v)"
      @toggle-lock="globalStore.toggleUnrestrictedBlack" />

    <Slider :height="20" :limited-max="15" :limited="!globalStore.unrestrictedWhite" label="Shade White Value"
      :value="colorStore.shadeWhite" @update="(v) => colorStore.setWhiteShade(v)"
      @toggle-lock="globalStore.toggleUnrestrictedWhite" />

    <Spacer size="lg" />
    <Checkbox label="Mix Accent Color" :checked="colorStore.mixAccentColor" @toggle="colorStore.toggleMixAccent" />
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

    <Card v-if="colorStore.currentScheme">
      <h3>Color Pallette</h3>
      <Spacer size="md" />
      <div class="pallette">
        <Swatch v-for="col, cssId in colorStore.currentScheme.toCSS()" :key="cssId" :color-string="col" />
      </div>
    </Card>

    <div class="output">
      <OutputCard />
    </div>

    <Spacer size="xxl" />
  </div>
</template>

<script lang="ts" setup>
import ColorCard from "@/components/ColorCard.vue";
import Sidebar from "@/components/ui/Sidebar.vue";
import Slider from "@/components/forms/Slider.vue";
import Checkbox from "@/components/forms/Checkbox.vue";
import Button from "~/components/ui/Button.vue";
import Spacer from "~/components/ui/Spacer.vue";
import Card from "~/components/ui/Card.vue";
import OutputCard from "~/components/OutputCard.vue";
import { useGlobalStore } from "@/pinia/global";
import { useColorStore } from "@/pinia/colors";
import { ColorSchemeTypes } from "~/types/colorschemes";

const colorStore = useColorStore();
const globalStore = useGlobalStore();

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
  position: relative;
  width: 100%;
  overflow-x: hidden;
  padding: var(--spacing-xl) var(--spacing-xl);
}

.modes {
  padding: var(--spacing-sm) var(--spacing-xxl);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  color: white-black(var(--background-color), var(--background-color));
  user-select: none;
}

.color-options {
  padding: var(--spacing-xl) 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  justify-content: space-evenly;
  gap: 10px;

  div {
    flex-grow: 1;
  }
}

.pallette {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;

  div {
    border: 2px solid light-dark(var(--black-color-lighter), var(--white-color-darker));
  }
}


.output {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--spacing-xxl) 0;
}
</style>
