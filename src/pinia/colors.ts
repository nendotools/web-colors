import { hsl } from "~/types/colors";
import { type ColorScheme, MonochromeScheme } from "~/types/colorschemes";

interface State {
  hue: number;
  currentScheme: ColorScheme;
  schemes: ColorScheme[];
  mixAccentColor: boolean;
  mixAccentLevel: number;
  absoluteOffset: number;
}

export const useColorStore = defineStore("colors", {
  state: (): State => ({
    hue: 260,
    currentScheme: new MonochromeScheme(new hsl(260, 100, 50)),
    schemes: [],
    mixAccentColor: false,
    mixAccentLevel: 0.5,
    absoluteOffset: 0,
  }),
  getters: {
    style: (state: State) => state.currentScheme.toString(),
  },
  actions: {
    setHue(hue: number) {
      this.hue = hue % 360;
      this.currentScheme.primary.shift(hue);
    },
  },
});
