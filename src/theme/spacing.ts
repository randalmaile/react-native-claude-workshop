/**
 * A small 4pt spacing scale.
 *
 * Keeping the scale short is deliberate: when there are only six choices,
 * layouts stay consistent and "which padding do I use here?" stops being a decision.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export type SpacingToken = keyof typeof spacing;
