import { useGlobalStore } from "~/pinia/global";
import type { HSLColor } from "../colors";
import { ColorSchemeTypes, type Scheme } from "../colorschemes";

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
  toCSS(): Record<string, string> {
    const globalStore = useGlobalStore();
    const background = this.primary.copy().setSaturation(
      this.primary.s * (globalStore.globalInfluence / 100),
    );
    return {
      "--primary-color": this.primary.toString(),
      "--secondary-color": this.primary.copy().lighten(this.spread * 2)
        .toString(),
      "--background-color": background.copy().darken(this.spread * 3)
        .toString(),
      "--background-color-light": background.copy().darken(this.spread * 2.5)
        .toString(),
      "--background-color-lighter": background.copy().darken(this.spread * 1.5)
        .toString(),
      "--foreground-color": this.primary.copy().lighten(this.spread * 2)
        .toString(),
      "--text-color": this.primary.copy().darken(this.spread).toString(),
      "--text-onFill": this.primary.copy().lighten(this.spread).toString(),
      "--text-color-danger": this.primary.copy().setHue(0).setSaturation(
        this.primary.s * 0.65,
      ).toString(),
    };
  }
}