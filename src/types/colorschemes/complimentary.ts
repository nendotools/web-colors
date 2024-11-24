import type { HSLColor } from "../colors";
import { ColorSchemeTypes, mapColorScheme, type Scheme } from "../colorschemes";


// opposite Hue
export interface ComplimentaryColors extends Scheme {
  compliment: HSLColor;
  split: boolean;
  size: number;
  spread: number;
}

export class ComplimentaryScheme implements ComplimentaryColors {
  type: ColorSchemeTypes.Complimentary = ColorSchemeTypes.Complimentary;
  primary: HSLColor;
  compliment: HSLColor;
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
    this.compliment = primary.copy().shift(180);
    this.size = size;
    this.split = false;
    this.spread = spread;
    this.includeAdjacent = includeAdjacent;
    this.adjacentSpread = adjacentSpread;
  }

  prepareColorMap(): Record<string, string> {
    return mapColorScheme({
      primary: this.primary,
      secondary: this.compliment,
      tertiary: this.primary.copy().setHue(mix(this.primary.h, this.compliment.h, 0.5)),
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
