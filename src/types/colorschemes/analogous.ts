import { useGlobalStore } from "~/pinia/global";
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

  toCSSString(filtered: boolean = false): string {
    const colMap = this.prepareColorMap();
    const globalStore = useGlobalStore();
    if (filtered && !globalStore.globalInfluence) {
      for (const key in colMap) {
        if (key.startsWith('--white-tint') || key.startsWith('--black-tint')) {
          delete colMap[key];
        }
      }
    }

    const outputString = Object.keys(colMap).reduce((acc, key) => {
      return `${acc}\n    ${key}: ${colMap[key]};`;
    },
      "{");
    return outputString + "\n}";
  }
  toCSS(filtered: boolean = false): Record<string, string> {
    const colMap = this.prepareColorMap();
    const globalStore = useGlobalStore();
    if (filtered && !globalStore.globalInfluence) {
      for (const key in colMap) {
        if (key.startsWith('--white-tint') || key.startsWith('--black-tint')) {
          delete colMap[key];
        }
      }
    }
    console.log(colMap);
    return colMap;
  }
}

