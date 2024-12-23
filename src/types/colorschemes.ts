import { useColorStore } from "~/pinia/colors";
import { hsl, type HSLColor } from "./colors";
import type { AnalogousColors } from "./colorschemes/analogous";
import type { ComplimentaryColors } from "./colorschemes/complimentary";
import type { MonochromeColors } from "./colorschemes/monochromatic";
import type { TriadicColors } from "./colorschemes/triadic";
import { useGlobalStore } from "~/pinia/global";
import { avg } from "~/utils/colorHelpers";

export interface Scheme {
  type: ColorSchemeTypes;
  primary: HSLColor;
  toString(): string;
  toJSON(): string;
  toCSS(filtered?: boolean): Record<string, string>;
  toCSSString(filtered?: boolean): string;
}

export type ColorScheme =
  | MonochromeColors
  | ComplimentaryColors
  | AnalogousColors
  | TriadicColors;

export enum ColorSchemeTypes {
  Monochrome = "Monochrome",
  Complimentary = "Complimentary",
  Analogous = "Analogous",
  Triadic = "Triadic",
}

export const mapColorScheme = (opts: {
  primary: HSLColor,
  secondary: HSLColor,
  tertiary: HSLColor,
}): Record<string, string> => {
  const { globalInfluence, colorCode } = useGlobalStore();
  const { minBlack, shadeWhite } = useColorStore();

  const white = new hsl(opts.primary.h, 0, 100 - shadeWhite);
  const mixedWhite = white.copy().setSaturation(avg(globalInfluence, white.s));
  const black = new hsl(opts.primary.h, 0, minBlack);
  const mixedBlack = black.copy().setSaturation(globalInfluence);

  const avgSaturation = (opts.primary.s + opts.secondary.s + opts.tertiary.s) / 2.5;
  const avgLuminance = Math.min(75, Math.max(30, (opts.primary.l + opts.secondary.l + opts.tertiary.l) / 3));

  const info = new hsl(mix(210, opts.primary.h, globalInfluence / 200), avgSaturation, avgLuminance);
  const success = new hsl(mix(120, opts.primary.h, globalInfluence / 200), avgSaturation, avgLuminance);
  const warning = new hsl(mix(60, opts.primary.h, globalInfluence / 200), avgSaturation, avgLuminance);
  const error = new hsl(mix(0, opts.primary.h, globalInfluence / 400), avgSaturation, avgLuminance);


  return {
    // MAIN COLORS
    "--primary-color": opts.primary.toString(colorCode),
    "--secondary-color": opts.secondary.toString(colorCode),
    "--tertiary-color": opts.tertiary.toString(colorCode),

    // WHITES
    "--white-color": white.toString(colorCode),
    "--white-color-dark": white.copy().darken(10).toString(colorCode),
    "--white-color-darker": white.copy().darken(20).toString(colorCode),
    "--white-tinted": mixedWhite.toString(colorCode),
    "--white-tinted-dark": mixedWhite.darken(10).toString(colorCode),
    "--white-tinted-darker": mixedWhite.darken(20).toString(colorCode),

    // BLACKS
    "--black-color": black.toString(colorCode),
    "--black-color-light": black.copy().lighten(10).toString(colorCode),
    "--black-color-lighter": black.copy().lighten(20).toString(colorCode),
    "--black-tinted": mixedBlack.toString(colorCode),
    "--black-tinted-light": mixedBlack.copy().lighten(10).toString(colorCode),
    "--black-tinted-lighter": mixedBlack.copy().lighten(20).toString(colorCode),

    // SEMANTIC COLORS
    "--info-color": info.toString(colorCode),
    "--success-color": success.toString(colorCode),
    "--warning-color": warning.toString(colorCode),
    "--error-color": error.toString(colorCode),
  };
}
