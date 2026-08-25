# Lesson 04 — Component States and Design Tokens

## Why this matters

Design tokens look like bureaucracy until the first time you need to change something everywhere.

Say the primary blue fails contrast on a real screen. With tokens, that is one line in
`src/theme/colors.ts`. Without them, it is a search across every component, a judgement call at each
site about whether *this* blue is the same blue, and a near-certainty that you miss two.

Tokens matter even more when an AI is doing the editing. "Make the primary colour warmer" is a
precise, verifiable instruction against a token file. Against forty scattered hex literals it is a
guess, and you have no reliable way to check the result.

## What you will learn

### React Native
- Semantic naming: `surfaceMuted`, not `lightGrey`
- Spacing, radius and typography scales, and why short scales beat flexible ones
- Building small components whose entire appearance is driven by tokens
- Modelling state as data (`status`) rather than as appearance (`isGreen`)

### Claude workflow
- Using Cowork to revise a visual direction with reasoning, not vibes
- Making a repository-wide restyle a one-file change
- Recognising when Claude proposes a one-off value instead of a token

## Before you start

Finish [Lesson 03](03-plan-implement-button.md) — you need the `Button`, which will restyle itself
for free when the tokens change. That moment is the lesson.

Read all five files in `src/theme/`. They are short. Note that `colors.ts` names roles, not colours.

## Part 1 — Explore / understand

Look at how tokens are actually used:

1. In `LessonCard.tsx`, every colour comes from `@/theme`. Find the one place a raw number appears
   (`spacing.xs / 2`). Is that a reasonable escape hatch or a smell?
2. `typography.ts` uses `as const satisfies Record<string, TextStyle>`. What does `satisfies` buy you
   that a plain type annotation would not?
3. `radius.pill` is `999`. Why that, rather than computing half the height?
4. Change `colors.primary` in `src/theme/colors.ts` to `#7A3E9D` and save. Watch **every** screen
   update. Change it back.

That last one takes ten seconds and is the entire argument for tokens.

## Part 2 — Cowork

You are going to revise the workshop's visual direction. Not redesign it — revise it, with reasons.

**Suggested Cowork prompt:**

> Here is the colour palette for a React Native learning app. It is meant to be calm, readable and
> neutral enough that a learner can make it their own later.
>
> [paste `src/theme/colors.ts`]
>
> Critique it. Where is contrast marginal for body text and for muted text? Is the primary blue
> distinguishable from the text colour for someone with a colour vision deficiency? Then propose a
> revised palette that keeps the same semantic roles, and explain each change — I want the reasoning,
> not just new hex values.

Follow up:

> What contrast ratio does `textMuted` on `surfaceMuted` achieve? Is that acceptable for 13px text?

> I need two more semantic colours for status: one for "away" and one for "do not disturb". What
> should they be, and how do I make sure the status is not communicated by colour alone?

**Keep the reasoning.** You are going to put it in `docs/design/visual-direction.md`, and "we chose
this because the previous muted text was 3.9:1 on the muted surface" is worth infinitely more in
three months than a list of hex codes.

## Part 3 — Turn the direction into a clear brief

Write `docs/design/visual-direction.md`. Include:

- The revised palette, with the role each colour plays
- **Why** each change was made — contrast, hierarchy, accessibility
- Any new tokens you are adding, and what they are for
- The rule for when a new token is justified versus when to reuse an existing one

That last point is the one that keeps a design system small. Write it down explicitly.

## Part 4 — Claude Code Plan mode

Two pieces of work here: the token revision, and small components that consume it.

**Suggested Claude Code prompt:**

> Read `AGENTS.md`, `docs/design/visual-direction.md`, and everything in `src/theme/`.
>
> Plan two things:
>
> 1. Updating the theme tokens to match the approved visual direction, including any new status
>    colours.
> 2. Two small components in `src/components/workshop/` — a `Badge` (a short text label) and a
>    `StatusPill` (an availability indicator with a status and a label). Both driven entirely by
>    tokens, rendered in the Lesson 04 playground slot, with tests.
>
> For the `StatusPill`, the status must be legible without relying on colour. Say in the plan how you
> achieve that.
>
> Do not edit any files yet.

**STOP AND REVIEW THE PLAN.**

Questions to ask yourself:

- Does the plan add tokens to `src/theme/`, or define local constants inside the components? Only one
  of those is the point of this lesson.
- Are the new status colours **semantic** (`statusAway`) or literal (`amber`)? Which will still make
  sense if the palette changes again?
- How does `StatusPill` convey status without colour — text, an icon, a shape? Is it real, or a token
  gesture?
- Is `status` typed as a union, or as `string`?
- Does changing the theme break the existing `Button` or `LessonCard`? Does the plan check?
- Is it adding tokens you do not actually need? A design system that grows every time someone builds
  a component is not a design system.

## Part 5 — Implement

**Suggested prompt:**

> Implement the approved plan. Afterwards, confirm that no component in `src/components/` contains a
> hardcoded colour value, and run `npm run verify`.

That second clause is worth including as a habit. It turns a rule from `AGENTS.md` into something
actually checked.

## Part 6 — Run locally

```bash
npm start
```

Things to inspect:

- **Every screen**, not just the playground. The token change touches all of them — did anything get
  worse? This is exactly the kind of regression that only a human notices.
- The `Button` from Lesson 03 restyled itself with no code change. Confirm it still looks right in
  all four states.
- Is `StatusPill` legible in greyscale? Screenshot it and desaturate it, or use the simulator's
  colour filters (iOS: Settings → Accessibility → Display & Text Size → Colour Filters).
- Does muted text on the muted surface actually read on a real screen at arm's length? Simulators
  flatter contrast.

## Part 7 — Reiterate

**Suggested feedback (adapt to what you saw):**

> The new `textMuted` is harder to read on `surfaceMuted` than the old one — on a phone in daylight
> the lesson card captions are washed out. Adjust so muted text on a muted surface reaches at least
> 4.5:1, without making it as dark as the primary text; the hierarchy has to survive.
>
> Also, `StatusPill` still relies on colour alone at a glance — the label is there but too small to
> register. Make the status readable without colour. Run `npm run verify` afterwards.

## Part 8 — Verify

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes
- [ ] The app runs and **every** screen still looks right
- [ ] Human UX review: contrast checked on a real device, status legible in greyscale
- [ ] No hardcoded colours remain in `src/components/`

```bash
npm run verify
```

## What changed in the repository

- Modified: `src/theme/colors.ts` (and possibly other theme files) — revised tokens
- New: `src/components/workshop/Badge.tsx`, `src/components/workshop/StatusPill.tsx`
- New: tests for both
- Modified: `src/app/playground.tsx` — Lesson 04 slot
- New: `docs/design/visual-direction.md`

## What you should understand before continuing

- Semantic names describe **role**, which is why they survive a redesign
- A short scale is a feature: fewer choices, more consistency
- Tokens make repository-wide restyling a one-file change — for you and for Claude
- Status is data, not appearance: `status="away"`, never `color="amber"`
- Never communicate meaning by colour alone
- The reasoning behind a palette is more durable than the palette

## Stretch exercise

Ask Claude Code to add a dark theme — then **do not accept the plan**. Read it and work out what it
would really cost: every token needs a second value, every component needs to resolve tokens at
runtime instead of at import, and `StyleSheet.create` at module scope stops working the way it
currently does.

Then decide whether it is worth it for this project. Ask Cowork to argue the other side. Getting
comfortable saying "the plan is fine and we still should not do this" is a genuinely important skill.
