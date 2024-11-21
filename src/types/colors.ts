export interface HSLColor {
  h: number;
  s: number;
  l: number;
  a?: number | "none";
  copy(): HSLColor;
  toString(): string;
  shift(hue: number): void;
  saturate(percent: number): void;
  desaturate(percent: number): void;
  lighten(percent: number): void;
  darken(percent: number): void;
  lighten(percent: number): void;
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
    const alpha = [0, 1, "none"].includes(this.a!) ? "" : ` / ${this.a}`;
    return `hsl(${this.h}, ${this.s}%, ${this.l}%${alpha})`;
  }

  shift(hue: number) {
    this.h = (this.h + hue) % 360;
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
}
