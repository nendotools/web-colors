export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
export const percent = (value: number) => clamp(value, 0, 100);

export const randHue = () => Math.floor(Math.random() * 360);
export const mix = (a: number, b: number, mix: number) =>
  a * (1 - mix) + b * mix;
