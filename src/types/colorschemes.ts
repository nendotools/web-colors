import type { HSLColor } from "./colors";
import type { AnalogousColors } from "./colorschemes/analogous";
import type { ComplimentaryColors } from "./colorschemes/complimentary";
import type { MonochromeColors } from "./colorschemes/monochromatic";
import type { TriadicColors } from "./colorschemes/triadic";

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
