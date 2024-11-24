import { useColorStore } from "~/pinia/colors";
import { hsl, type HSLColor } from "./colors";
import type { AnalogousColors } from "./colorschemes/analogous";
import type { ComplimentaryColors } from "./colorschemes/complimentary";
import type { MonochromeColors } from "./colorschemes/monochromatic";
import type { TriadicColors } from "./colorschemes/triadic";
import { useGlobalStore } from "~/pinia/global";

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
  const black = new hsl(opts.primary.h, 0, minBlack);

  const info = new hsl(mix(210, opts.primary.h, globalInfluence / 200), 100, 50);
  const success = new hsl(mix(120, opts.primary.h, globalInfluence / 200), 100, 50);
  const warning = new hsl(mix(60, opts.primary.h, globalInfluence / 200), 100, 50);
  const error = new hsl(mix(0, opts.primary.h, globalInfluence / 200), 100, 50);

  return {
    // MAIN COLORS
    "--primary-color": opts.primary.toString(),
    "--secondary-color": opts.secondary.toString(),
    "--tertiary-color": opts.tertiary.toString(),

    // WHITES
    "--white-color": white.toString(),
    "--white-color-dark": white.copy().darken(10).toString(),
    "--white-color-darker": white.copy().darken(20).toString(),
    "--white-tinted": white.copy().setSaturation(globalInfluence).toString(),
    "--white-tinted-dark": white.copy().darken(10).setSaturation(globalInfluence).toString(),
    "--white-tinted-darker": white.copy().darken(20).setSaturation(globalInfluence).toString(),

    // BLACKS
    "--black-color": black.toString(),
    "--black-color-light": black.copy().lighten(10).toString(),
    "--black-color-lighter": black.copy().lighten(20).toString(),
    "--black-tinted": black.copy().setSaturation(globalInfluence).toString(),
    "--black-tinted-light": black.copy().lighten(10).setSaturation(globalInfluence).toString(),
    "--black-tinted-lighter": black.copy().lighten(20).setSaturation(globalInfluence).toString(),

    // SEMANTIC COLORS
    "--info-color": info.toString(),
    "--success-color": success.toString(),
    "--warning-color": warning.toString(),
    "--error-color": error.toString(),
  };
}
