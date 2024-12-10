import { defineStore } from "pinia";
import { ColorTypes } from "~/types/colors";

interface State {
  windowWidth: number;
  mode: "light" | "dark";
  colorCode: ColorTypes;
  globalInfluence: number;
  unrestrictedLimit: boolean;
  unrestrictedBlack: boolean;
  unrestrictedWhite: boolean;
}

export const useGlobalStore = defineStore("global", {
  state: (): State => ({
    windowWidth: window.innerWidth,
    mode: "dark",
    colorCode: ColorTypes.HSL,
    globalInfluence: 10,
    unrestrictedLimit: false,
    unrestrictedBlack: false,
    unrestrictedWhite: false,
  }),
  getters: {
    isMobile(state: State) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
        .test(navigator.userAgent) || state.windowWidth < 768;
    },
    isLightMode(state: State) {
      return state.mode === "light";
    },
  },

  actions: {
    toggleMode() {
      this.mode = this.mode === "light" ? "dark" : "light";
    },
    setGlobalInfluence(value: number) {
      this.globalInfluence = value;
    },
    toggleUnrestrictedLimit() {
      this.unrestrictedLimit = !this.unrestrictedLimit;
    },
    toggleUnrestrictedBlack() {
      this.unrestrictedBlack = !this.unrestrictedBlack;
    },
    toggleUnrestrictedWhite() {
      this.unrestrictedWhite = !this.unrestrictedWhite;
    },
  },
});
