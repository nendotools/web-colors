import { useColorStore } from "~/pinia/colors";
import { hsl, type HSLColor } from "./colors";
import type { AnalogousColors } from "./colorschemes/analogous";
import type { ComplimentaryColors } from "./colorschemes/complimentary";
import type { MonochromeColors } from "./colorschemes/monochromatic";
import type { TriadicColors } from "./colorschemes/triadic";
import { useGlobalStore } from "~/pinia/global";
import { avg, avgHue } from "~/utils/colorHelpers";

export interface Scheme {
  type: ColorSchemeTypes;
  primary: HSLColor;
  toString(): string;
  toJSON(): string;
  toCSS(): Record<string, string>;
  toCSSString(): string;
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
  const { globalInfluence } = useGlobalStore();
  const { minBlack, shadeWhite } = useColorStore();

  const white = new hsl(opts.primary.h, 0, 100 - shadeWhite);
  const mixedWhite = white.copy().setSaturation(avg(globalInfluence, white.s));
  const black = new hsl(opts.primary.h, 0, minBlack);
  const mixedBlack = black.copy().setSaturation(globalInfluence);

  const avgSaturation = (opts.primary.s + opts.secondary.s + opts.tertiary.s) / 2.5;
  const avgLuminance = Math.min(75, Math.max(30, (opts.primary.l + opts.secondary.l + opts.tertiary.l) / 3));

  const info = new hsl(avgHue(210, opts.primary.h, 0.8 / globalInfluence), avgSaturation, avgLuminance);
  const success = new hsl(avgHue(120, opts.primary.h, 0.8 / globalInfluence), avgSaturation, avgLuminance);
  const warning = new hsl(avgHue(60, opts.primary.h, 0.8 / globalInfluence), avgSaturation, avgLuminance);
  const error = new hsl(avgHue(0, opts.primary.h, 0.8 / globalInfluence), avgSaturation, avgLuminance);


  return {
    // MAIN COLORS
    "--primary-color": opts.primary.toString(),
    "--secondary-color": opts.secondary.toString(),
    "--tertiary-color": opts.tertiary.toString(),

    // WHITES
    "--white-color": white.toString(),
    "--white-color-dark": white.copy().darken(10).toString(),
    "--white-color-darker": white.copy().darken(20).toString(),
    "--white-tinted": mixedWhite.toString(),
    "--white-tinted-dark": mixedWhite.darken(10).toString(),
    "--white-tinted-darker": mixedWhite.darken(20).toString(),

    // BLACKS
    "--black-color": black.toString(),
    "--black-color-light": black.copy().lighten(10).toString(),
    "--black-color-lighter": black.copy().lighten(20).toString(),
    "--black-tinted": mixedBlack.toString(),
    "--black-tinted-light": mixedBlack.copy().lighten(10).toString(),
    "--black-tinted-lighter": mixedBlack.copy().lighten(20).toString(),

    // SEMANTIC COLORS
    "--info-color": info.toString(),
    "--success-color": success.toString(),
    "--warning-color": warning.toString(),
    "--error-color": error.toString(),
  };
}
