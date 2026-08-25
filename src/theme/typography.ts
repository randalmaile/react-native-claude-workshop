import type { TextStyle } from 'react-native';

/**
 * Named text styles. Components pick a style by name rather than setting
 * `fontSize` / `fontWeight` ad hoc, so headings stay consistent across screens.
 *
 * These use the system font on every platform, which is the right default for
 * native apps: it matches the OS and needs no font loading.
 */
export const typography = {
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
  },
  heading: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
  },
  subheading: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;
