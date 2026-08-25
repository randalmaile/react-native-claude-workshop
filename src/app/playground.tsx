import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { SectionTitle } from '@/components/workshop/SectionTitle';
import { colors, radius, spacing, typography } from '@/theme';

/**
 * Slots for components that do not exist yet.
 *
 * Each lesson fills one of these in. They are listed as data so adding a slot is
 * a one-line change rather than a copy-pasted block of JSX.
 */
const SLOTS = [
  { lesson: '01', name: 'Content card', hint: 'Your first card built from primitives.' },
  { lesson: '03', name: 'Button', hint: 'Primary, secondary, disabled and loading states.' },
  { lesson: '04', name: 'Badge and status pill', hint: 'Small components driven entirely by tokens.' },
  { lesson: '05', name: 'Profile card', hint: 'The component you designed in Lesson 02.' },
  { lesson: '06', name: 'Contact form', hint: 'Local-only, with real validation and error copy.' },
  { lesson: '07', name: 'Filterable list', hint: 'Loading, empty, no-results and populated states.' },
] as const;

export default function PlaygroundScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.lede}>
        A workbench for building components in isolation, away from the screens that will eventually
        use them. Building a component here first makes its states easy to see all at once — which
        is the same reason people later reach for a tool like Storybook (Lesson 12).
      </Text>

      <View>
        <SectionTitle
          title="Primitives, live"
          subtitle="Two working examples. Read the source in src/app/playground.tsx."
        />
        <View style={styles.demoGroup}>
          <TapCounter />
          <StackingExample />
        </View>
      </View>

      <View>
        <SectionTitle
          title="Waiting to be built"
          subtitle="These slots stay empty until you complete the lesson that fills them."
        />
        <View style={styles.slots}>
          {SLOTS.map((slot) => (
            <View key={slot.lesson} style={styles.slot}>
              <Text style={styles.slotLesson}>Lesson {slot.lesson}</Text>
              <Text style={styles.slotName}>{slot.name}</Text>
              <Text style={styles.slotHint}>{slot.hint}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * `Pressable` plus `useState`: the smallest complete example of interaction in
 * React Native. Note the style callback — `pressed` is given to you, so you never
 * need to track "is the finger down" yourself.
 */
function TapCounter() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.demo}>
      <Text style={styles.demoTitle}>Pressable and state</Text>
      <Text style={styles.demoBody}>Tapped {count === 1 ? 'once' : `${count} times`}.</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add one to the counter"
        onPress={() => setCount((current) => current + 1)}
        style={({ pressed }) => [styles.tapTarget, pressed && styles.tapTargetPressed]}>
        <Text style={styles.tapTargetText}>Tap me</Text>
      </Pressable>
    </View>
  );
}

/**
 * Flexbox in React Native defaults to a column, not a row — the single most
 * common surprise when coming from the browser.
 */
function StackingExample() {
  return (
    <View style={styles.demo}>
      <Text style={styles.demoTitle}>Layout defaults to a column</Text>
      <Text style={styles.demoBody}>
        These two rows hold identical children. Only `flexDirection` differs.
      </Text>
      <View style={styles.stackColumn}>
        <View style={styles.swatch} />
        <View style={styles.swatch} />
      </View>
      <View style={styles.stackRow}>
        <View style={styles.swatch} />
        <View style={styles.swatch} />
      </View>
    </View>
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
  lede: {
    ...typography.body,
    color: colors.textMuted,
  },
  demoGroup: {
    gap: spacing.md,
  },
  demo: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  demoTitle: {
    ...typography.subheading,
    color: colors.text,
  },
  demoBody: {
    ...typography.caption,
    color: colors.textMuted,
  },
  tapTarget: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.xl,
  },
  tapTargetPressed: {
    backgroundColor: colors.primaryPressed,
  },
  tapTargetText: {
    ...typography.label,
    color: colors.onPrimary,
  },
  stackColumn: {
    flexDirection: 'column',
    gap: spacing.sm,
  },
  stackRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  swatch: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.sm,
    height: 28,
    width: 56,
  },
  slots: {
    gap: spacing.md,
  },
  slot: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderStyle: 'dashed',
    borderWidth: 1,
    gap: spacing.xs / 2,
    padding: spacing.lg,
  },
  slotLesson: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  slotName: {
    ...typography.subheading,
    color: colors.text,
  },
  slotHint: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
