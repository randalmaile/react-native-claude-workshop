/** Corner radii. `pill` is intentionally large so it rounds any control fully. */
export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999,
} as const;

export type RadiusToken = keyof typeof radius;
