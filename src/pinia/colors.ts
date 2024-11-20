interface State {
  primaryColor: string;
  accentColor: string;
  mixAccentColor: boolean;
  mixAccentLevel: number;
  absoluteOffset: number;
}

export const useColorStore = defineStore("colors", {
  state: (): State => ({
    primaryColor: "hsl(260, 100%, 65%)",
    accentColor: "hsl(60, 100%, 65%)",
    mixAccentColor: false,
    mixAccentLevel: 0.5,
    absoluteOffset: 0,
  }),
  getters: {
    style: (state: State) => {
      return {
        "--primary-color": state.primaryColor,
        "--accent-color": state.accentColor,
        "--accent-color-mix": state.mixAccentColor
          ? `rgba(var(--accent-color-rgb), ${state.mixAccentLevel})`
          : state.accentColor,
        "--absolute-offset": `${state.absoluteOffset}px`,
        "--text-foreground": state.accentColor,
        "--text-background": state.primaryColor,
      };
    },
  },
  actions: {
    setPrimaryColor(color: string) {
      this.primaryColor = color;
    },
  },
});
