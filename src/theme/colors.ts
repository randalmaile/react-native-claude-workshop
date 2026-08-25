/**
 * Semantic colors for the workshop app.
 *
 * Every value is named for its ROLE ("surface", "textMuted"), not for the colour
 * itself ("lightGrey"). That is what lets you — or Claude Code — restyle the whole
 * app by editing this one file instead of hunting through components.
 */
export const colors = {
  /** Page background, behind everything else. */
  background: '#F7F7F5',
  /** Raised panels and cards sitting on the background. */
  surface: '#FFFFFF',
  /** A quieter panel, for secondary or nested content. */
  surfaceMuted: '#EFEEEA',
  /** Default body and heading text. */
  text: '#1A1A18',
  /** Supporting text: captions, metadata, helper copy. */
  textMuted: '#5F5E58',
  /** Primary brand colour for key actions. */
  primary: '#1F5C8B',
  /** Primary colour while a control is held down. */
  primaryPressed: '#17456A',
  /** Text and icons placed on top of `primary`. */
  onPrimary: '#FFFFFF',
  /** Hairline borders and dividers. */
  border: '#DEDCD5',
  /** Destructive actions and validation errors. */
  danger: '#9B2C2C',
  /** Confirmation and success messaging. */
  success: '#1F6F4A',
} as const;

export type ColorToken = keyof typeof colors;
