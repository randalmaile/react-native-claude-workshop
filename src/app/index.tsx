import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { LessonCard } from '@/components/workshop/LessonCard';
import { NavLink } from '@/components/workshop/NavLink';
import { SectionTitle } from '@/components/workshop/SectionTitle';
import { lessons } from '@/data/lessons';
import { colors, radius, spacing, typography } from '@/theme';

/** The loop this workshop teaches, rendered as an ordered list on the home screen. */
const WORKFLOW_STAGES = [
  {
    name: 'Design',
    detail: 'Explore the problem in Cowork. Decide what the thing is before deciding how to build it.',
  },
  {
    name: 'Plan',
    detail: 'Claude Code reads the repository and proposes an approach. No files change yet.',
  },
  {
    name: 'Implement',
    detail: 'You approve a plan you actually read, and Claude Code writes the code.',
  },
  {
    name: 'Test',
    detail: 'Types, lint and automated tests — then run the app on a real target.',
  },
  {
    name: 'Reiterate',
    detail: 'Give specific feedback on what you saw, and go round again. This is normal, not failure.',
  },
] as const;

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      testID="home-scroll">
      <View style={styles.intro}>
        <Text accessibilityRole="header" style={styles.title}>
          React Native + Claude Workshop
        </Text>
        <Text style={styles.lede}>
          A local-first workshop. You will build React Native components on your own machine with
          Expo, and practise a specific way of working with Claude: design in Cowork, plan in Claude
          Code, implement, test, then reiterate on what you actually see running on a device.
          Nothing here needs a cloud account, a backend or a database.
        </Text>
      </View>

      <View style={styles.section}>
        <SectionTitle
          title="The loop"
          subtitle="Every lesson walks this path. It is the point of the workshop."
        />
        <View style={styles.workflow}>
          {WORKFLOW_STAGES.map((stage, index) => (
            <View key={stage.name} style={styles.stage}>
              <View style={styles.stageBadge}>
                <Text style={styles.stageBadgeText}>{index + 1}</Text>
              </View>
              <View style={styles.stageBody}>
                <Text style={styles.stageName}>{stage.name}</Text>
                <Text style={styles.stageDetail}>{stage.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle title="Screens" subtitle="Where your work will show up." />
        <View style={styles.links}>
          <NavLink
            href="/playground"
            label="Component Playground"
            description="Render the components you build as you work through the lessons."
          />
          <NavLink
            href="/capstone"
            label="Capstone"
            description="The final project: a People Directory, taken from a loose brief to a working app."
          />
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle
          title={`Lessons (${lessons.length})`}
          subtitle="Work through them in order. Each one teaches a React Native skill and a Claude skill."
        />
        <View style={styles.lessons}>
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </View>
      </View>

      <Text style={styles.footer}>
        The lesson files live in docs/lessons. Open them next to your editor as you go.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    gap: spacing.xxl,
    padding: spacing.lg,
    paddingBottom: spacing.xxl * 2,
  },
  intro: {
    gap: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  lede: {
    ...typography.body,
    color: colors.textMuted,
  },
  section: {
    gap: spacing.sm,
  },
  workflow: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing.lg,
    padding: spacing.lg,
  },
  stage: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stageBadge: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    height: 26,
    justifyContent: 'center',
    width: 26,
  },
  stageBadgeText: {
    ...typography.caption,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  stageBody: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  stageName: {
    ...typography.subheading,
    color: colors.text,
  },
  stageDetail: {
    ...typography.caption,
    color: colors.textMuted,
  },
  links: {
    gap: spacing.md,
  },
  lessons: {
    gap: spacing.md,
  },
  footer: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
