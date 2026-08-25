import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

type SectionTitleProps = {
  title: string;
  /** Optional supporting line rendered under the title. */
  subtitle?: string;
};

/**
 * A labelled section heading.
 *
 * `accessibilityRole="header"` is what lets VoiceOver and TalkBack users jump
 * between sections, so it matters even though it changes nothing visually.
 */
export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.heading,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
  },
});
