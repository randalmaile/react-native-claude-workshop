import { StyleSheet, Text, View } from 'react-native';

import type { Lesson } from '@/data/lessons';
import { colors, radius, spacing, typography } from '@/theme';

type LessonCardProps = {
  lesson: Lesson;
};

/**
 * A single lesson summary.
 *
 * The whole card is one accessibility element: a screen reader should announce
 * "Lesson 03, Plan then Implement a Button, Moderate" as one unit rather than
 * making the user swipe through six separate scraps of text.
 */
export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <View
      accessible
      accessibilityLabel={`Lesson ${lesson.id}, ${lesson.title}, ${lesson.difficulty}`}
      style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.number}>{lesson.id}</Text>
        <Text style={styles.difficulty}>{lesson.difficulty}</Text>
      </View>

      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.summary}>{lesson.summary}</Text>

      <View style={styles.focusRow}>
        <Text style={styles.focusLabel}>React Native</Text>
        <Text style={styles.focusValue}>{lesson.reactNativeFocus}</Text>
      </View>
      <View style={styles.focusRow}>
        <Text style={styles.focusLabel}>Claude workflow</Text>
        <Text style={styles.focusValue}>{lesson.claudeFocus}</Text>
      </View>

      <Text style={styles.file}>{lesson.file}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  number: {
    ...typography.label,
    color: colors.primary,
  },
  difficulty: {
    ...typography.caption,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.pill,
    color: colors.textMuted,
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
  },
  title: {
    ...typography.subheading,
    color: colors.text,
  },
  summary: {
    ...typography.body,
    color: colors.textMuted,
  },
  focusRow: {
    gap: spacing.xs / 2,
    marginTop: spacing.sm,
  },
  focusLabel: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '600',
  },
  focusValue: {
    ...typography.caption,
    color: colors.textMuted,
  },
  file: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
});
