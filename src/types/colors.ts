import { useColorStore } from "~/pinia/colors";

export interface HSLColor {
  h: number;
  s: number;
  l: number;
  a?: number | "none";
  copy(): HSLColor;
  toString(): string;
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
    this.h = h % 360;
    this.s = percent(s);
    this.l = percent(l);
    this.a = a === "none" ? a : percent(a);
  }

  copy(): HSLColor {
    return new hsl(this.h, this.s, this.l, this.a);
  }

  toString(): string {
    const { minBlack, shadeWhite } = useColorStore();
    const alpha = [0, 1, "none"].includes(this.a!) ? "" : ` / ${this.a}`;
    return `hsl(${this.h}, ${this.s}%, ${clamp(this.l, minBlack, 100 - shadeWhite)}%${alpha})`;
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
