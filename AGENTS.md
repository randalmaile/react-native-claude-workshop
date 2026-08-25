# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

---

# React Native Claude Workshop — agent instructions

## Project purpose

This repository is two things at once, and both matter:

1. **A working React Native app.** It must run, typecheck, lint and test cleanly at all times.
2. **A teaching repository.** A learner works through `docs/lessons/` and changes this code as they
   go. Code here is read by a beginner, so clarity beats cleverness every time.

The workflow the workshop teaches is **Design → Plan → Implement → Test → Reiterate**. Respect it:
propose before you edit, and treat a UI task as unfinished until a human has looked at it running.

## Architecture

- **Expo SDK 57**, React Native 0.86, React 19, TypeScript, Expo Router (typed routes enabled).
- **Routes live in `src/app/`.** This is the current Expo Router convention for the SDK 57 default
  template — not the older root-level `app/`. Every file there is a route.
- `src/components/workshop/` — components used by the workshop's own screens.
- `src/theme/` — design tokens. `src/data/` — local mock data.
- `__tests__/` — tests live **outside** `src/app/`, so Expo Router never treats them as routes.
- `@/*` is an alias for `./src/*`. Prefer it over long relative paths.

## Local-first constraint

There is **no backend, database, authentication, analytics or cloud service** in this project, and
none should be added. Sample data is local. If a lesson seems to need a server, it does not — use
local mock data and, where realism demands it, a timer.

## TypeScript rules

- Strict mode. **No `any`. No `@ts-ignore`.** If types fight you, fix the type.
- Reusable components declare an explicit props type.
- Prefer plain, readable code over generic abstractions or component factories.

## React Native rules

- **Never emit DOM elements** — no `div`, `span`, `button`, `input`, `img`, `a`. This is the single
  most common failure mode for an AI writing React Native. Use `View`, `Text`, `Pressable`,
  `TextInput`, `Image`, `ScrollView`, `FlatList`, `Modal`.
- All text must be inside a `<Text>`. Bare strings inside a `<View>` crash on native.
- Reach for `Platform` only where behavior genuinely differs — not pre-emptively.
- Avoid browser-only APIs (`window`, `document`, `localStorage`) except in a deliberate web fallback.

## Styling and theme

- Use `StyleSheet.create`. Do not add NativeWind, Tailwind, Tamagui, styled-components or any other
  styling library.
- Use tokens from `@/theme` (`colors`, `spacing`, `radius`, `typography`). Do not hardcode hex
  colours or one-off font sizes in components.
- If a needed value is missing from the theme, add it to the theme rather than inlining it — but say
  so, because changing shared tokens affects every screen.
- Keep the theme small. This is a teaching design system, not a product one.

## Accessibility

Accessibility is part of "done", not a later pass.

- Interactive elements need an `accessibilityRole` and an accessible name.
- Add `accessibilityHint` when the outcome is not obvious from the label.
- Reflect disabled and busy state with `accessibilityState`, not colour alone.
- Touch targets at least 44pt (iOS) / 48dp (Android).
- Never convey meaning by colour alone — pair it with text or an icon.
- Prefer correct native semantics over patching everything with `accessibilityLabel`.

## Test expectations

- Jest with the `jest-expo` preset and React Native Testing Library.
- **In RNTL v14, `render`, `fireEvent` and `userEvent` are async.** `await render(...)`, or `screen`
  will be empty and every query will fail with "`render` function has not been called".
- Matchers and cleanup register automatically; no Jest setup file is needed.
- Test behavior a user could observe — visible text, roles, accessible names, what a press does.
  Do not assert on style objects or component internals.
- Query by role and accessible name where you reasonably can. It tests accessibility for free.

## Scope discipline

- Do exactly the task asked. Do not opportunistically refactor neighbouring code, restyle screens,
  or "improve" things nobody asked about.
- **Do not add a dependency without asking.** First check whether React Native or Expo already
  solves the problem. If a dependency really is warranted, explain the cost and wait for approval.
- Prefer several small obvious files over one clever abstraction.
- No dead code, no commented-out blocks, no placeholder lorem ipsum.

## Documentation

- `docs/design/` holds **durable** decisions — component briefs, visual direction, content patterns.
- `docs/lessons/` holds the course. Keep lesson files consistent with the code they describe.
- The rule for what gets committed: *if it will still be useful in three months, it is documentation;
  if it is obsolete the moment you finish executing it, it was a prompt.* Prompts belong in the
  conversation, or in the gitignored `.prompts/`.

## Cowork / Claude Code boundary

- **Cowork** is for design, UX, information architecture, component states, content and microcopy,
  and critique. If asked to explore visual direction or wording, that work belongs there.
- **Claude Code (you)** is for reading the repository, planning, implementing, refactoring, testing,
  debugging and verifying.
- When a request is really a design question in disguise ("make it look better"), say so and ask for
  the specific outcome, rather than guessing at taste.

## Verification — a task is not done because the code was written

For any implementation task, run the checks that apply:

```bash
npm run typecheck
npm run lint
npm test
# or all three:
npm run verify
```

Report what you actually ran and what it actually said. If something fails, say so plainly with the
output — never describe work as complete when a check is failing or was skipped.

**For any UI task, explicitly remind the human that visual review is still required**, because no
check in this repository can see the screen. Say which target to look at (iOS Simulator, Android
Emulator, or a physical device) and name the specific things worth inspecting — long text, the
disabled state, the keyboard, small screens.

Do not run simulator or device interaction as part of `npm run verify`. Visual review is a human step.

## Git expectations

- Do not commit unless asked.
- Do not push, create remotes, or configure CI.
- Never commit secrets. This project needs no API keys and no `.env`.
- Keep commits focused, with a short imperative subject line.
