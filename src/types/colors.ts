import { useColorStore } from "~/pinia/colors";
import { hslToHex, hslToRgb } from "~/utils/colorHelpers";

export enum ColorTypes {
  HSL = 'hsl',
  RGB = 'rgb',
  HEX = 'hex',
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
  a?: number | "none";
  copy(): HSLColor;
  toString(mode?: ColorTypes): string;
  shift(hue: number): HSLColor;
  saturate(percent: number): HSLColor;
  desaturate(percent: number): HSLColor;
  darken(percent: number): HSLColor;
  lighten(percent: number): HSLColor;
  setHue(hue: number): HSLColor;
  setSaturation(saturation: number): HSLColor;
  setLightness(lightness: number): HSLColor;
}

export class hsl implements HSLColor {
  h: number;
  s: number;
  l: number;
  a?: number | "none";

  constructor(
    h: number,
    s: number,
    l: number,
    a: number | "none" = 1,
  ) {
    this.h = (h % 360);
    this.s = percent(s);
    this.l = percent(l);
    this.a = a === "none" ? a : percent(a);
  }

  copy(): HSLColor {
    return new hsl(this.h, this.s, this.l, this.a);
  }

  toString(mode: ColorTypes = ColorTypes.HSL): string {
    const { minBlack, shadeWhite } = useColorStore();

    switch (mode) {
      case "hsl":
        const alpha = [0, 1, "none"].includes(this.a!) ? "" : ` / ${this.a}`;
        return `hsl(${this.h.toFixed(1)}, ${this.s.toFixed(1)}%, ${clamp(this.l, minBlack, 100 - shadeWhite).toFixed(1)}%${alpha})`;
      case "rgb":
        const { r, g, b } = hslToRgb(this.h, this.s, this.l, isNaN(this.a as number) || !this.a ? 1 : Number(this.a));
        return `rgb(${r}, ${g}, ${b})`;
      case "hex":
        return hslToHex(this.h, this.s, this.l, isNaN(this.a as number) || !this.a ? 1 : Number(this.a));
      default:
        return '';
    }
  }

  shift(hue: number) {
    this.h = (this.h + hue) % 360;
    if (this.h < 0) {
      this.h = 360 + this.h;
    }
    return this;
  }

  saturate(p: number) {
    this.s = percent(this.s + p);
    return this;
  }

  desaturate(p: number) {
    this.s = percent(this.s - p);
    return this;
  }

  lighten(p: number) {
    this.l = percent(this.l + p);
    return this;
  }

  darken(p: number) {
    this.l = percent(this.l - p);
    return this;
  }

  setHue(hue: number) {
    this.h = hue % 360;
    return this;
  }
  setSaturation(saturation: number) {
    this.s = percent(saturation);
    return this;
  }
  setLightness(lightness: number) {
    this.l = percent(lightness);
    return this;
  }
}
