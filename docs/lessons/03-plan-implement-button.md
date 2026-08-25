# Lesson 03 — Plan, then Implement a Button

## Why this matters

A button is the most deceptive component in UI work. Everyone thinks they can build one in ten
minutes; almost nobody handles all its states properly on the first try.

It is also the perfect vehicle for the habit this workshop exists to teach. The requirement is small
enough that you can hold the whole plan in your head, which means you have no excuse for approving a
plan you did not read. Later components will be too big for that — the habit has to be automatic by
then.

**This is the first lesson where Plan mode is mandatory, not suggested.**

## What you will learn

### React Native
- Designing a component's prop API before writing it
- `Pressable` and its `pressed` state callback
- Representing `disabled` and `loading` visually *and* semantically
- `accessibilityRole`, `accessibilityState`, and why colour alone is not enough
- Preventing layout shift when a component's content changes

### Claude workflow
- **Plan mode** as the default working posture
- Reading a plan well enough to predict its diff
- Changing a plan before approving it
- One deliberate, specific reiteration — and re-verifying after

## Before you start

Finish [Lesson 01](01-react-native-primitives.md). Have the app running with the Playground open.

Confirm Plan mode is active: a new Claude Code session in this project should start there, because
`.claude/settings.json` sets `permissions.defaultMode` to `"plan"`. If you have toggled it off,
`Shift+Tab` cycles back.

## Part 1 — Explore / understand

You are building a reusable `Button` with four states:

| State | Meaning |
| --- | --- |
| `primary` | The main action. High emphasis. |
| `secondary` | A supporting action. Lower emphasis, still clearly a button. |
| `disabled` | Cannot be pressed right now. |
| `loading` | Pressed, and something is happening. |

Before you plan anything, work out the answers yourself:

1. Are `primary`/`secondary` and `disabled`/`loading` the same axis, or two different ones? (Can a
   secondary button be loading?)
2. Should a loading button also be disabled? What happens if the user taps it twice?
3. What does the label do while loading — disappear, stay, get replaced?
4. If the label is replaced by a spinner, does the button change **width**? What does that do to the
   row it sits in?
5. How does a screen reader user know the button is disabled, if they cannot see that it is grey?

Write down your answers. You are about to compare them to Claude's plan, and disagreement is the most
useful thing that can happen.

## Part 2 — Cowork

Short design round — the visual decisions matter here.

**Suggested Cowork prompt:**

> I am designing a Button component for a React Native app with primary, secondary, disabled and
> loading states. The palette is a muted neutral background with a single blue primary
> (`#1F5C8B`).
>
> How should disabled read visually so it is unmistakably not-pressable without being invisible to
> someone with low contrast sensitivity? And how should the loading state work so the button does not
> change size and make the layout jump?
>
> Give me options and tell me what each trades away.

The disabled-state question is worth real attention. "Make it grey and 50% opacity" is the reflex
answer and it frequently produces text that fails contrast requirements entirely — legible enough to
tease, not enough to read.

## Part 3 — Turn the direction into a clear brief

You do not need a full `docs/design/` document for this one. A short spec in your prompt is enough —
but write it down before you open Claude Code, so the decisions are yours rather than the first thing
suggested.

Decide and record:

- The prop API: what props, what types, what defaults
- What each of the four states changes: background, border, text colour, opacity
- The loading behavior: spinner placement, label handling, and how width stays stable
- The accessibility contract: role, state, and what gets announced

## Part 4 — Claude Code Plan mode

**Suggested Claude Code prompt:**

> Read `AGENTS.md`, `src/theme/index.ts`, and `src/components/workshop/NavLink.tsx` to match the
> existing conventions.
>
> Plan a reusable `Button` component at `src/components/workshop/Button.tsx` supporting primary and
> secondary variants, plus disabled and loading states. Render every state in the Lesson 03 slot on
> the Playground screen, and add tests.
>
> Here is the specification I decided on: [paste your Part 3 notes].
>
> In your plan, state explicitly: the full prop type, which theme tokens each state uses, how you
> keep the button's width stable while loading, and what a screen reader announces in each state. Do
> not edit any files yet.

### STOP AND REVIEW THE PLAN.

**Do not approve it until you can say out loud which files it will change and what each change is.**

Questions to ask yourself:

- **Prop API** — is `variant` a union type (`'primary' | 'secondary'`) or a loose `string`? Are
  `disabled` and `loading` separate booleans, or crammed into `variant`? Does that match what you
  decided in Part 1?
- **Tokens** — does every colour come from `@/theme`, or did a literal hex sneak in?
- **Width stability** — does the plan actually address it, or just mention a spinner? "Render an
  `ActivityIndicator` instead of the label" is a plan that *causes* the layout jump.
- **Disabled behavior** — does it prevent `onPress` from firing, or only grey the button out? Those
  are different, and only one of them is correct.
- **Accessibility** — does it use `accessibilityState={{ disabled, busy }}`? A `disabled` prop on
  `Pressable` alone does not always announce correctly.
- **Scope** — is it touching anything beyond the component, the playground and the tests?
- **Reuse** — `NavLink` already has a pressed-state pattern. Does the plan follow it, or invent a
  second one?

**Change at least one thing before you approve.** If the plan genuinely looks perfect, you have not
looked hard enough — pick the weakest justification and ask about it.

## Part 5 — Implement

**Suggested prompt:**

> Implement the approved plan, with the change we agreed. Then run `npm run verify` and tell me what
> it reports.

When it finishes, **read the diff** before you look at the app. In the VS Code extension you can
review changes file by file. You are looking for:

- Anything not in the plan
- Literal values that should be tokens
- Tests that assert on styles rather than behavior

## Part 6 — Run locally

```bash
npm start
# press i, a, or scan the QR code with Expo Go
```

Go to the Playground and find your buttons.

Things to inspect:

- **Press each one on a real target.** Does the pressed state read clearly under a finger, which
  covers most of the button?
- Is the disabled button *obviously* not pressable, at a glance, without comparing it to the others?
- **Tap the disabled button.** Does anything happen? Nothing should.
- Watch the loading button carefully as it toggles. **Does the width change?** Does the row jump?
- Turn on VoiceOver (iOS) or TalkBack (Android) and swipe to each button. Does it announce "dimmed"
  or "disabled"? Does the loading one announce as busy?
- Try a long label. Does the text wrap, truncate, or overflow?

## Part 7 — Reiterate

**You must do this step even if everything looks fine.** Find something.

Common real findings:

- The disabled state is too subtle — it reads as "slightly quieter", not "unavailable"
- The loading state changes the button width and the layout jumps
- The pressed state is invisible on a physical device, though it was fine on the simulator
- A long label overflows the button instead of wrapping

**Suggested feedback (use what you actually observed):**

> On a physical device the disabled state is too subtle — next to the secondary variant I cannot tell
> at a glance which one is unavailable. Make it clearly weaker while keeping the label readable at
> normal contrast. Do not just lower opacity on the whole button; check the label still passes
> contrast against its background.
>
> Also, the button gets narrower while loading and the row jumps. Keep its width fixed across the
> loading transition.
>
> Run `npm run verify` afterwards.

Notice the shape of that feedback: **what you observed, on what device, and what you expected**. Not
"make the disabled state better".

Then **look at it again**. Reiteration is not done when the code changes; it is done when you have
re-inspected.

## Part 8 — Verify

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes, including tests for disabled and loading
- [ ] The app runs and all four states render
- [ ] Human UX review on a native target: pressed feedback visible, disabled unmistakable, no layout
      jump while loading, screen reader announces state correctly

```bash
npm run verify
```

## What changed in the repository

- New: `src/components/workshop/Button.tsx`
- New: `__tests__/button.test.tsx`
- Modified: `src/app/playground.tsx` — the Lesson 03 slot renders every button state

## What you should understand before continuing

- A component's **states** are most of its design; the default state is the easy part
- `Pressable`'s style callback gives you `pressed` — you never track touch state yourself
- Disabled means both "looks unavailable" **and** "does not fire", plus `accessibilityState`
- Content that changes size causes layout shift, and layout shift is a real defect
- **You can read a plan and predict the diff.** That is the skill; the button is just the excuse
- Specific feedback fixes things. "Make it better" changes things.

## Stretch exercise

Add a third variant — `danger`, for destructive actions — but do it as an exercise in *plan review*
rather than implementation. Ask Claude Code to plan it, then examine whether the plan generalises the
component cleanly or bolts on a special case.

Then ask yourself the harder question: at what point does adding variants mean this should be two
components instead of one? Ask Cowork to argue both sides.
