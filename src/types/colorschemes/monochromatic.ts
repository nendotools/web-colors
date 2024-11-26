import { useColorStore } from "~/pinia/colors";
import type { HSLColor } from "../colors";
import { ColorSchemeTypes, mapColorScheme, type Scheme } from "../colorschemes";
import { useGlobalStore } from "~/pinia/global";

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
    return colMap;
  }
}
