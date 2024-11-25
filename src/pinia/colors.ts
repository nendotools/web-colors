import { hsl } from "~/types/colors";
import { type ColorScheme, ColorSchemeTypes } from "~/types/colorschemes";
import { AnalogousScheme } from "~/types/colorschemes/analogous";
import { ComplimentaryScheme } from "~/types/colorschemes/complimentary";
import { MonochromeScheme } from "~/types/colorschemes/monochromatic";
import { TriadicScheme } from "~/types/colorschemes/triadic";

interface State {
  currentSchemeType: ColorSchemeTypes;
  schemes: ColorScheme[];
  mixAccentColor: boolean;
  mixAccentLevel: number;
  absoluteOffset: number;
  minBlack: number;
  shadeWhite: number;
}

export const useColorStore = defineStore("colors", {
  state: (): State => ({
    currentSchemeType: ColorSchemeTypes.Monochrome,
    schemes: [new MonochromeScheme(new hsl(randHue(), 100, 50))],
    mixAccentColor: false,
    mixAccentLevel: 0.5,
    absoluteOffset: 0,
    minBlack: 0,
    shadeWhite: 0,
  }),
  getters: {
    style: (state: State) => state.schemes.find((s) => s.type === state.currentSchemeType)?.toCSS(),
    currentScheme: (state: State) => state.schemes.find((s) => s.type === state.currentSchemeType),
    colors: (state: State) => {
      const current = state.schemes.find((s) => s.type === state.currentSchemeType);
      if (!current) return [];

      switch (current.type) {
        case ColorSchemeTypes.Monochrome:
          const mono = current as MonochromeScheme;
          return [mono.primary];
        case ColorSchemeTypes.Complimentary:
          const comp = current as ComplimentaryScheme;
          return [comp.primary, comp.compliment];
        case ColorSchemeTypes.Analogous:
          const analog = current as AnalogousScheme;
          return [analog.primary];
        case ColorSchemeTypes.Triadic:
          const triadic = current as TriadicScheme;
          return [triadic.primary, triadic.secondary, triadic.tertiary];
      }
    },
  },
  actions: {
    setMode(mode: ColorSchemeTypes) {
      // if schemes includes type, set currentScheme to that scheme
      // else create a new scheme and set it to currentScheme
      const scheme = this.schemes.find((s: ColorScheme) => s.type === mode);
      if (!scheme) {
        switch (mode) {
          case ColorSchemeTypes.Monochrome:
            this.schemes.push(new MonochromeScheme(new hsl(randHue(), 100, 50)));
            break;
          case ColorSchemeTypes.Complimentary:
            this.schemes.push(new ComplimentaryScheme(new hsl(randHue(), 100, 50)));
            break;
          case ColorSchemeTypes.Analogous:
            this.schemes.push(new AnalogousScheme(new hsl(randHue(), 100, 50)));
          case ColorSchemeTypes.Triadic:
            this.schemes.push(new TriadicScheme(new hsl(randHue(), 100, 50)));
          default:
            break;
        }
      }

      this.currentSchemeType = mode;
    },
    setMinBlack(value: number) {
      this.minBlack = Math.max(value, 0);
    },
    setWhiteShade(value: number) {
      this.shadeWhite = Math.max(value, 0);
    },
    toggleMixAccent() {
      console.log("toggling mix accent");
      this.mixAccentColor = !this.mixAccentColor;
    }
  },
});
