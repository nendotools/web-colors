export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
export const percent = (value: number) => clamp(value, 0, 100);
export const sum = (...args: number[]) => args.reduce((n, v) => n + v, 0);
export const avg = (...args: number[]) => sum(...args) / args.length;

export const randHue = () => Math.floor(Math.random() * 360);
export const mix = (a: number, b: number, bias: number) => {
  const diff = Math.abs(a - b) * bias;
  const dir = a > b ? -1 : 1;
  return (a + dir * diff) % 360;
}
