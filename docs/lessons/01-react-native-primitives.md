# Lesson 01 — React Native Primitives

## Why this matters

React Native looks like React, and that is the trap. The component model, hooks and JSX are all
familiar — but there is no DOM underneath. `<View>` is not a `<div>` with a different name; it
becomes a real `UIView` on iOS and a real `android.view.View` on Android.

Getting the primitives into your fingers early prevents the most common failure in AI-assisted React
Native work: code that *looks* right, uses web idioms, and does not run. You cannot catch that in a
plan review if you do not know what the primitives are.

## What you will learn

### React Native
- `View`, `Text`, `Pressable`, `Image`, `ScrollView`
- `StyleSheet.create` and why styles are objects, not CSS
- Flexbox differences: `column` by default, no `display`, no `float`
- Why every string must live inside a `<Text>`
- That there are no cascading styles — nothing inherits except within `Text`

### Claude workflow
- Asking Claude to **explain** unfamiliar concepts rather than abstract them away
- Reading generated code closely enough to find a web idiom that slipped through
- Using Claude as a tutor mid-implementation, not only as a code generator

## Before you start

Finish [Lesson 00](00-environment-and-local-loop.md). Have the app running with the Playground screen
open — that is where your work will appear.

Open `src/app/playground.tsx` and read `TapCounter` and `StackingExample`. They are short on purpose.

## Part 1 — Explore / understand

Answer these from the existing code before you write any of your own:

1. In `StackingExample`, the two rows have identical children. Why do they lay out differently?
2. In `TapCounter`, `style` on the `Pressable` is a **function**, not an object. What is it given?
3. In `LessonCard.tsx`, why is `overflow: 'hidden'` on the `difficulty` style? (Try removing it on
   Android.)
4. Find a place where a style value comes from `@/theme` rather than a literal. Why does that matter?

If any of these are unclear, that is exactly what Part 2 is for.

## Part 2 — Cowork

Use Cowork to build the mental model, not the code.

**Suggested Cowork prompt:**

> I know React for the web and I am learning React Native. Walk me through what actually replaces the
> DOM: what `View`, `Text` and `Pressable` become on iOS and Android, and which web habits will
> actively hurt me — cascading styles, `display`, percentage units, `z-index`, hover states. Be
> specific about what breaks rather than just listing differences.

Follow up on whatever surprised you. The goal is that "there is no cascade" and "flex defaults to
column" become things you *expect*, not things you rediscover at 11pm.

## Part 3 — Turn the direction into a clear brief

You are going to build a small **content card** — something with an image, a heading, a couple of
lines of text, and one pressable action.

Decide, before you ask for anything:

- What content does it hold? Use something real, not "Card Title" and lorem ipsum.
- What happens when the text is long?
- What does pressing it do? (Anything visible is fine — a state toggle is plenty.)

Write it down in three or four lines. This is not a formal brief yet — Lesson 02 covers those — but
deciding before delegating is the habit.

## Part 4 — Claude Code Plan mode

**Suggested Claude Code prompt:**

> Read `AGENTS.md`, `src/theme/index.ts` and `src/app/playground.tsx`.
>
> Plan a `ContentCard` component in `src/components/workshop/ContentCard.tsx`, rendered in the
> Lesson 01 slot on the Playground screen. It should use only React Native primitives, take its
> content through props, and use theme tokens for all styling.
>
> In the plan, list every React Native primitive you intend to use and say in one line why that one
> rather than an alternative. Do not edit any files yet.

**STOP AND REVIEW THE PLAN.**

Questions to ask yourself:

- Which primitives did it choose, and do the justifications actually make sense?
- Is it using `Pressable`, or the older `TouchableOpacity`? Ask why. (`Pressable` is the current
  recommendation; if it reached for a legacy API, that tells you something about its default.)
- Does it use tokens from `@/theme`, or does the plan contain literal hex colours?
- Where is the image coming from? There is no bundled photo in this repo — does the plan address
  that, or has it assumed a file that does not exist?
- Does it plan to touch anything beyond the component and the playground slot?

Change at least one thing before approving.

## Part 5 — Implement

**Suggested prompt:**

> Implement the approved plan. As you go, add a brief comment above any React Native concept that
> would be unfamiliar to someone coming from React on the web — explaining the concept, not
> restating the code. Then run `npm run verify`.

## Part 6 — Run locally

```bash
npm start
# then press i, a, or scan the QR code with Expo Go
```

Navigate to the Playground screen.

Things to inspect:

- Does the card look deliberate, or just technically present?
- Press it. Is there any visible feedback? How does it feel under a real finger versus a mouse click?
- Is the touch target comfortably large — at least 44pt tall?
- Replace one prop with a very long string. Does the layout hold, or does text escape the card?
- Try it on the smallest screen you can. Still fine?

## Part 7 — Reiterate

**Intentionally look for something to improve.** There is always something in a first draft.

Likely candidates: the pressed state is invisible, spacing is uneven because a literal crept in
somewhere, or long text overflows.

**Suggested feedback (adapt to what you actually saw):**

> Pressing the card gives no visible feedback on a device — I cannot tell it registered. Add a
> pressed state using the existing tokens, matching how `NavLink` handles it. Also, the heading
> currently wraps to four lines with a long title; clamp it to two lines with an ellipsis. Run
> `npm run verify` afterwards.

Then look at it again. Reiteration is not finished until you have re-inspected.

## Part 8 — Verify

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes
- [ ] The card renders on your target
- [ ] Human UX review: pressed state visible, long text handled, touch target large enough

```bash
npm run verify
```

## What changed in the repository

- New: `src/components/workshop/ContentCard.tsx`
- Modified: `src/app/playground.tsx` — the Lesson 01 slot now renders your card

## What you should understand before continuing

- `View` / `Text` / `Pressable` / `Image` / `ScrollView`, and when each applies
- Text must be wrapped in `<Text>`; strings loose in a `View` will crash on native
- `StyleSheet.create` produces plain objects; nothing cascades, nothing inherits across `View`s
- Flex is `column` by default in React Native and `row` in CSS — this catches everyone once
- **You can read generated React Native and tell whether it is idiomatic.** That is the skill that
  makes every later plan review meaningful.

## Stretch exercise

Ask Claude Code to rewrite your `ContentCard` using `TouchableOpacity` instead of `Pressable`, on a
scratch branch or just to read and discard. Compare them. Which gives you more control over the
pressed state? Which is more code? Then ask it to explain why the React Native docs now recommend
`Pressable`. Understanding *why* an API was replaced is how you stop being surprised when generated
code uses the old one.
