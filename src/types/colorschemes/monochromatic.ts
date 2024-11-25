import type { HSLColor } from "../colors";
import { ColorSchemeTypes, mapColorScheme, type Scheme } from "../colorschemes";

// all same Hue
export interface MonochromeColors extends Scheme {
  size: number;
  spread: number;
  includeAdjacent: boolean;
  adjacentSpread: number;
}

export class MonochromeScheme implements MonochromeColors {
  type: ColorSchemeTypes.Monochrome = ColorSchemeTypes.Monochrome;
  primary: HSLColor;
  size: number;
  spread: number;
  includeAdjacent: boolean;
  adjacentSpread: number;
  constructor(
    primary: HSLColor,
    size: number = 5,
    spread: number = 25,
    includeAdjacent: boolean = false,
    adjacentSpread: number = 10,
  ) {
    this.primary = primary;
    this.size = size;
    this.spread = spread;
    this.includeAdjacent = includeAdjacent;
    this.adjacentSpread = adjacentSpread;
  }

  prepareColorMap(): Record<string, string> {
    return mapColorScheme({
      primary: this.primary,
      secondary: this.primary.copy().lighten(this.spread),
      tertiary: this.primary.copy().darken(this.spread),
    });
  }

  toJSON(): string {
    return JSON.stringify(this.prepareColorMap());
  }
  toCSSString(): string {
    const values = this.prepareColorMap();
    const outputString = Object.keys(values).reduce((acc, key) => {
      return `${acc}\n    ${key}: ${values[key]};`;
    },
      "{");
    return outputString + "\n}";
  }
  toCSS(): Record<string, string> {
    return this.prepareColorMap();
  }
}
