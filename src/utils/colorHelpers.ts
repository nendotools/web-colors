export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
export const percent = (value: number) => clamp(value, 0, 100);
export const sum = (...args: number[]) => args.reduce((n, v) => n + v, 0);
export const avg = (...args: number[]) => sum(...args) / args.length;

export const randHue = () => Math.floor(Math.random() * 360);
export const mix = (a: number, b: number, mix: number) =>
  a * (1 - mix) + b * mix;

export const avgHue = (a: number, b: number, bias?: number) => {
  const diff = Math.abs(a - b);
  if (bias) {
    return a < b ? a + diff * bias : a - diff * bias;
  }
  return diff > 180 ? (360 - diff) / 2 : diff / 2;
}
