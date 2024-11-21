import type { HSLColor } from "./colors";

export interface Scheme {
  primary: HSLColor;
  toString(): string;
}

// all same Hue
export interface MonochromeColors extends Scheme {
  size: number;
  spread: number;
  includeAdjacent: boolean;
  adjacentSpread: number;
}

// opposite Hue
export interface ComplimentaryColors extends Scheme {
  compliment: HSLColor;
  split: boolean;
  size: number;
  spread: number;
}

// adjacent Hues
// includes a contrast color: at 50% lightness, use a 25% darkened or lightened color
export interface AnalogousColors extends Scheme {
  size: number;
  spread: number;
}

// 3 Hues equally spaced
// includes a contrast color for each: at 50% lightness, use a 25% darkened or lightened color
export interface TriadicColors extends Scheme {
  secondary: HSLColor;
  tertiary: HSLColor;
}

export type ColorScheme =
  | MonochromeColors
  | ComplimentaryColors
  | AnalogousColors
  | TriadicColors;

export class MonochromeScheme implements MonochromeColors {
  primary: HSLColor;
  size: number;
  spread: number;
  includeAdjacent: boolean;
  adjacentSpread: number;
  constructor(
    primary: HSLColor,
    size: number = 5,
    spread: number = 15,
    includeAdjacent: boolean = false,
    adjacentSpread: number = 10,
  ) {
    this.primary = primary;
    console.log(this.primary.toString());
    this.size = size;
    this.spread = spread;
    this.includeAdjacent = includeAdjacent;
    this.adjacentSpread = adjacentSpread;
  }

  toString(): string {
    return JSON.stringify({
      "--primary-color": this.primary,
      "--secondary-color": this.primary.copy().lighten(this.spread * 3),
      "--background-color": this.primary.copy().darken(this.spread * 2),
      "--foreground-color": this.primary.copy().lighten(this.spread * 2),
      "--text-color": this.primary.copy().darken(this.spread),
      "--text-onFill": this.primary.copy().lighten(this.spread),
    });
  }
}
