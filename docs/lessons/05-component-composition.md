# Lesson 05 — Component Composition

## Why this matters

You have a `Button`, a `Badge`, a `StatusPill` and a set of tokens. Now you build the Profile Card
you designed back in Lesson 02 — and the interesting question is not "can Claude build it" but
"will it build it out of what already exists, or quietly reinvent all of it".

Left alone, AI-generated components trend toward self-sufficiency. A generated Profile Card will
happily contain its own inline pressable, its own status dot and its own colour literals, because
that is the shortest path from prompt to working code. It works. It also means your Button fix in
three weeks does not reach it.

Composition is not an aesthetic preference. It is how a change made in one place actually takes
effect everywhere.

## What you will learn

### React Native
- Composing small components instead of writing one large one
- Layout under pressure: long names, missing images, four-line bios
- `numberOfLines` and `ellipsizeMode`, and their accessibility implications
- Handling a missing image without a broken-image placeholder
- Keeping a component's API narrow as it gains parts

### Claude workflow
- Making Claude read a **design brief** as the source of truth
- Requiring a plan to inventory existing components before proposing new ones
- Catching reinvention during plan review, when it is still cheap
- Feedback driven by what you saw on a device with hostile data

## Before you start

You need [Lesson 02](02-cowork-design-brief.md) (the brief), [Lesson 03](03-plan-implement-button.md)
(the Button) and [Lesson 04](04-component-states-and-tokens.md) (Badge, StatusPill, tokens).

Re-read `docs/design/profile-card.md`. You wrote it a while ago; check you still agree with it.

## Part 1 — Explore / understand

Take an inventory yourself, before Claude does. List what you already have that this card could use:

| Need | Existing component? |
| --- | --- |
| Primary action | `Button` (Lesson 03) |
| Status / availability | `StatusPill` (Lesson 04) |
| Role or tag label | `Badge` (Lesson 04) |
| Avatar | *nothing yet* |
| Layout, text, spacing | Primitives + `@/theme` |

Now the design questions that only appear once you are composing:

1. The `Button` takes an `onPress`. Does `ProfileCard` pass one through, or own the behavior?
2. If the card is pressable **and** contains a button, what happens when you tap the button? (Nested
   press targets are a real and common bug.)
3. The avatar has no component yet. Should it be one, or is an `Image` with a fallback enough?
4. Your brief says names truncate. Truncated for *display* — but what does a screen reader get?

## Part 2 — Cowork

Short round. The brief already covers most decisions; you are filling the composition-specific gap.

**Suggested Cowork prompt:**

> I am implementing the Profile Card from this brief:
>
> [paste `docs/design/profile-card.md`]
>
> I already have `Button`, `Badge` and `StatusPill` components. Two things the brief does not settle:
>
> 1. What should the avatar show when the image is missing or fails to load? Compare initials, a
>    generic silhouette, and a coloured placeholder — including what each communicates and how each
>    behaves for a screen reader.
> 2. If the whole card is pressable and it also contains a button, how should that work on touch so
>    the user is never surprised by which one they hit?

The initials-versus-silhouette question is a genuinely good one. Initials feel personal and break
badly for single-word names, non-Latin scripts and names with particles ("van der Berg"). Ask about
those cases specifically.

## Part 3 — Turn the direction into a clear brief

Update `docs/design/profile-card.md` rather than starting a new document — the decision belongs with
the rest of the component's decisions.

Add:

- Avatar fallback behavior, including the awkward name cases
- The nested-press resolution
- What a screen reader announces for a truncated name

## Part 4 — Claude Code Plan mode

**Suggested Claude Code prompt:**

> Read `AGENTS.md`, `docs/design/profile-card.md`, and every component in
> `src/components/workshop/`.
>
> Before planning anything, list the existing components and say for each whether the Profile Card
> should use it, and why or why not.
>
> Then plan `ProfileCard` in `src/components/workshop/`, rendered in the Lesson 05 playground slot
> with realistic sample data that includes at least one hostile case — a very long name and a missing
> avatar. Include tests.
>
> Do not edit any files yet.

**STOP AND REVIEW THE PLAN.**

The inventory step is there so that reinvention is visible in the plan instead of buried in a diff.

Questions to ask yourself:

- **Does it use `Button`, or an inline `Pressable`?** This is the main thing you are checking for.
- Does it use `StatusPill`, or a new coloured dot?
- Does it use `Badge` for the role, or plain styled `Text`? (Either can be right — but it should say
  why.)
- Is the new avatar a **separate component**, or logic buried inside `ProfileCard`? Which will be
  easier to reuse in the capstone?
- Does the plan handle the missing-image case, or assume the URL always resolves?
- Is the sample data realistic, or "John Doe / Developer / Lorem ipsum"? `AGENTS.md` forbids the
  latter — does the plan comply?
- How many props does `ProfileCard` take? If it is over about eight, is it one component or two?

**Change at least one thing.** If the plan reinvents anything you already have, that is your change.

## Part 5 — Implement

**Suggested prompt:**

> Implement the approved plan. Render three cards in the playground slot: one ordinary, one with a
> very long name and a long bio, and one with no avatar image and no bio. Then run `npm run verify`.

Three cards side by side means the edge cases are visible every time you open the screen, instead of
being something you have to remember to test.

## Part 6 — Run locally

```bash
npm start
```

Things to inspect:

- **The long-name card.** Does the name truncate cleanly, or push the status pill off the edge?
- **The no-avatar card.** Is the fallback deliberate-looking, or does it read as broken?
- **The no-bio card.** Does the layout collapse gracefully, or leave a strange gap?
- Tap the button inside a card. Then tap the card *outside* the button. Do both do what you expect?
- Rotate the device. Does the layout hold?
- **Increase the system font size** (iOS: Settings → Display & Brightness → Text Size; Android:
  Settings → Display → Font size) to the largest setting and reopen the app. Almost everything breaks
  here on the first attempt.
- VoiceOver / TalkBack: what does the truncated name announce — the full name, or the ellipsis?

## Part 7 — Reiterate

There will be something. The large-font-size check almost always finds it.

**Suggested feedback (use what you actually saw):**

> Two problems on a physical device:
>
> 1. With the system font size at its largest, the name and the status pill collide — the pill gets
>    squeezed to a few pixels wide instead of the name truncating. The name should give way, and the
>    pill should keep its size.
> 2. The card with no bio has the same bottom padding as one with a bio, so it looks unbalanced next
>    to the others. Tighten the spacing when the bio is absent.
>
> Run `npm run verify` afterwards.

Then look again — including at large font sizes.

## Part 8 — Verify

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes, including the long-name and missing-avatar cases
- [ ] The app runs, all three sample cards render
- [ ] Human UX review on a native target: long names, missing avatar, missing bio, large system font,
      nested press behavior, screen reader announcement

```bash
npm run verify
```

## What changed in the repository

- New: `src/components/workshop/ProfileCard.tsx` (and probably `Avatar.tsx`)
- New: tests covering the hostile cases
- Modified: `src/app/playground.tsx` — Lesson 05 slot with three sample cards
- Modified: `docs/design/profile-card.md` — avatar fallback and nested-press decisions

## What you should understand before continuing

- Small composed components beat one large component with many props
- **AI-generated components reinvent by default.** Requiring an inventory in the plan is how you
  catch it while it is still a paragraph rather than a diff
- Layout is only real once you have tested it with hostile content
- Truncation is a display concern; the full value must stay available to assistive technology
- Nested pressables need a deliberate decision, or they produce surprising taps
- Large system font sizes break more layouts than small screens do

## Stretch exercise

Add a compact variant of `ProfileCard` for use in a dense list — avatar, name, status, no bio, no
button.

Then face the real question: is that a `variant` prop on `ProfileCard`, or a separate
`ProfileRow` component? Plan it both ways with Claude Code and compare the two plans. Ask Cowork
which it would rather maintain, and why. There is no universally right answer, and being able to
reason about the trade-off is more valuable than knowing one.
