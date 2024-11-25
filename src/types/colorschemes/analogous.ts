import type { HSLColor } from "../colors";
import { ColorSchemeTypes, mapColorScheme, type Scheme } from "../colorschemes";

// includes a contrast color: at 50% lightness, use a 25% darkened or lightened color
export interface AnalogousColors extends Scheme {
  size: number;
  spread: number;
}

export class AnalogousScheme implements AnalogousColors {
  type: ColorSchemeTypes.Analogous = ColorSchemeTypes.Analogous;
  primary: HSLColor;
  size: number;
  split: boolean;
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
    this.size = size;
    this.split = false;
    this.spread = spread;
    this.includeAdjacent = includeAdjacent;
    this.adjacentSpread = adjacentSpread;
  }


  prepareColorMap(): Record<string, string> {
    return mapColorScheme({
      primary: this.primary,
      secondary: this.primary.copy().shift(this.spread),
      tertiary: this.primary.copy().shift(-this.spread),
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

