import { hsl } from "~/types/colors";
import { type ColorScheme, ColorSchemeTypes } from "~/types/colorschemes";
import { AnalogousScheme } from "~/types/colorschemes/analogous";
import { ComplimentaryScheme } from "~/types/colorschemes/complimentary";
import { MonochromeScheme } from "~/types/colorschemes/monochromatic";
import { TriadicScheme } from "~/types/colorschemes/triadic";

interface State {
  hue: number;
  currentSchemeType: ColorSchemeTypes;
  schemes: ColorScheme[];
  mixAccentColor: boolean;
  mixAccentLevel: number;
  absoluteOffset: number;
}

export const useColorStore = defineStore("colors", {
  state: (): State => ({
    hue: 260,
    currentSchemeType: ColorSchemeTypes.Monochrome,
    schemes: [new MonochromeScheme(new hsl(260, 100, 50)),],
    mixAccentColor: false,
    mixAccentLevel: 0.5,
    absoluteOffset: 0,
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
    shiftHue(hue: number) {
      if (!this.currentScheme) return;
      this.currentScheme.primary.shift(hue % 360);
    },
    shiftSaturation(saturation: number) {
      if (!this.currentScheme) return;
      this.currentScheme.primary.saturate(saturation);
    },
    shiftLightness(lightness: number) {
      if (!this.currentScheme) return;
      this.currentScheme.primary.lighten(lightness);
    },
    setMode(mode: ColorSchemeTypes) {
      // if schemes includes type, set currentScheme to that scheme
      // else create a new scheme and set it to currentScheme
      const scheme = this.schemes.find((s: ColorScheme) => s.type === mode);
      if (!scheme) {
        switch (mode) {
          case ColorSchemeTypes.Monochrome:
            this.schemes.push(new MonochromeScheme(new hsl(this.hue, 100, 50)));
            break;
          case ColorSchemeTypes.Complimentary:
            this.schemes.push(new ComplimentaryScheme(new hsl(this.hue, 100, 50)));
            break;
          case ColorSchemeTypes.Analogous:
            this.schemes.push(new AnalogousScheme(new hsl(this.hue, 100, 50)));
          case ColorSchemeTypes.Triadic:
            this.schemes.push(new TriadicScheme(new hsl(this.hue, 100, 50)));
          default:
            break;
        }
      }

      this.currentSchemeType = mode;
    },
  },
});
