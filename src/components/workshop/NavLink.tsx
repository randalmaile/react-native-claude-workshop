import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

type NavLinkProps = {
  href: Href;
  label: string;
  description: string;
};

/**
 * A navigation row linking to another screen in the workshop app.
 *
 * This is deliberately NOT the reusable Button you build in Lesson 03 — it only
 * ever navigates. Keeping them separate is the point of Lesson 05: small
 * components with one job each compose better than one component with a `variant`
 * prop for every situation.
 */
export function NavLink({ href, label, description }: NavLinkProps) {
  return (
    <Link href={href} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityHint={description}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
        <View style={styles.content}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: spacing.md,
    // 44pt is the smallest comfortable touch target on iOS; Android asks for 48dp.
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  pressed: {
    backgroundColor: colors.surfaceMuted,
  },
  content: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  label: {
    ...typography.subheading,
    color: colors.primary,
  },
  description: {
    ...typography.caption,
    color: colors.textMuted,
  },
  chevron: {
    ...typography.heading,
    color: colors.textMuted,
  },
});
