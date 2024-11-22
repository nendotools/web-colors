import { defineStore } from "pinia";

interface State {
  windowWidth: number;
  mode: "light" | "dark";
  globalInfluence: number;
}

export const useGlobalStore = defineStore("global", {
  state: (): State => ({
    windowWidth: window.innerWidth,
    mode: "dark",
    globalInfluence: 10,
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
  },
});
