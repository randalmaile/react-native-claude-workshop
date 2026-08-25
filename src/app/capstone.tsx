import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { SectionTitle } from '@/components/workshop/SectionTitle';
import { colors, radius, spacing, typography } from '@/theme';

/**
 * A placeholder on purpose.
 *
 * The capstone is deliberately unsolved in this repository — working out what to
 * build here IS Lesson 11. See docs/lessons/11-capstone-cowork-to-code.md.
 */
const REQUIREMENTS = [
  'A list of people, from local mock data',
  'Search or filtering, with a real no-results state',
  'A card component used consistently across the list',
  'A detail view for a single person',
  'One form or interactive control',
  'A considered empty state',
  'Accessible semantics, checked with a screen reader',
  'Tests that describe behavior rather than markup',
] as const;

export default function CapstoneScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.lede}>
        Build a small People Directory. The brief stops there on purpose: deciding what it should
        look like and how it should behave is the work, and that decision starts in Cowork rather
        than in code.
      </Text>

      <View>
        <SectionTitle
          title="What it has to do"
          subtitle="The constraints. Everything else is yours to decide."
        />
        <View style={styles.card}>
          {REQUIREMENTS.map((requirement) => (
            <View key={requirement} style={styles.requirement}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.requirementText}>{requirement}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.note}>
        <Text style={styles.noteTitle}>Start in Lesson 11</Text>
        <Text style={styles.noteBody}>
          docs/lessons/11-capstone-cowork-to-code.md walks the full sequence: discovery in Cowork, a
          durable brief in docs/design, a plan you change at least one item in, implementation,
          verification, device review, and two real reiterations. Replace this screen with what you
          build.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    gap: spacing.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xxl * 2,
  },
  lede: {
    ...typography.body,
    color: colors.textMuted,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  requirement: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  bullet: {
    ...typography.body,
    color: colors.primary,
  },
  requirementText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  note: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  noteTitle: {
    ...typography.subheading,
    color: colors.text,
  },
  noteBody: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
