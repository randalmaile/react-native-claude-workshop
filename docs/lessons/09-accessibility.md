# Lesson 09 — Accessibility

## Why this matters

There is a version of accessibility work that is pure theatre: add `accessibilityLabel` to
everything, watch the linter go quiet, ship something a screen reader user still cannot operate.

Real accessibility on mobile mostly comes from **choosing the right component and the right
behavior**. A `Pressable` with `accessibilityRole="button"` announces correctly, is reachable by
switch control, and responds to the screen reader's activate gesture — because it *is* a button, not
because a label was bolted on. Native platforms give you an enormous amount for free, and most
accessibility bugs come from working around that machinery rather than using it.

This lesson audits everything you have already built. Expect to find things.

## What you will learn

### React Native
- `accessibilityRole`, `accessibilityLabel`, `accessibilityHint` — what each is for
- `accessibilityState` for disabled, busy, selected, checked
- Grouping with `accessible` so a card announces as one unit
- Contrast, touch targets, and dynamic type
- Announcing changes: `accessibilityLiveRegion` and `AccessibilityInfo`
- Why the correct component usually beats the correct label

### Claude workflow
- Cowork for UX-level accessibility critique
- Claude Code for a code-level audit against a checklist
- Turning a screen reader session into specific, fixable feedback
- Writing tests that query by role and accessible name

## Before you start

Finish Lessons [05](05-component-composition.md), [06](06-forms-and-validation.md) and
[07](07-lists-and-ui-states.md). You are auditing what those produced.

**Turn on a screen reader before you begin.** You cannot do this lesson without one.

| Platform | How | Tip |
| --- | --- | --- |
| iOS device | Settings → Accessibility → VoiceOver | Triple-click the side button to toggle |
| iOS Simulator | Settings → Accessibility → VoiceOver | Also: Accessibility Inspector in Xcode |
| Android | Settings → Accessibility → TalkBack | Volume-key shortcut to toggle |

Spend five minutes just navigating your own app with the screen on. It is uncomfortable and it is the
single most informative thing in this lesson.

## Part 1 — Explore / understand

With the screen reader on, swipe through every screen and write down:

1. Does anything announce as "button" when it is not, or fail to announce as a button when it is?
2. Does the disabled `Button` announce as dimmed/disabled, or just look grey?
3. Does a `ProfileCard` announce as one coherent unit, or as six separate fragments?
4. In the form, is each field labelled? When validation fails, does anything get announced, or does
   red text appear silently?
5. Does the truncated name announce the full name, or the ellipsis?
6. Can you reach everything by swiping, or do you have to know where to tap?

Then, screen reader off:

7. Set the system font to its largest and open every screen. What breaks?
8. Screenshot a screen and desaturate it. Is any information lost?
9. Are any touch targets smaller than 44pt / 48dp?

Look at `SectionTitle.tsx` and `LessonCard.tsx` for examples of deliberate choices: the `header` role
on section titles, and `accessible` grouping on the card with a composed label.

## Part 2 — Cowork

Cowork is for the UX critique — the judgement half of the work.

**Suggested Cowork prompt:**

> I am auditing a React Native app for accessibility. Here is what my screen reader session found:
>
> [paste your Part 1 notes]
>
> For each issue: how serious is it for someone actually relying on assistive technology, and what is
> the right fix — not the quickest one? I specifically want to know where the answer is "use a
> different component or change the behavior" rather than "add a label".
>
> Also: is there anything my swipe-through would not have revealed?

Then push on judgement calls:

> A profile card contains a name, a role, a status and a button. Should the card be one accessibility
> element with a composed label, or should each part be reachable separately? Argue both, and tell me
> what decides it.

> The truncated name shows an ellipsis visually. What should VoiceOver read?

That first one has no universal answer. It depends on whether the card is a target or a container,
and reasoning it through is more valuable than a rule.

## Part 3 — Turn the direction into a clear brief

Write `docs/design/accessibility.md`. Not a copy of the WCAG checklist — the decisions *for this
project*:

- Which components are grouped as single accessibility elements, and why
- The composed-label pattern: what order information is announced in
- How disabled and loading states are conveyed
- Minimum touch target size
- The rule about colour: never the sole carrier of meaning
- How errors and state changes get announced
- What is deliberately out of scope, and why

The "deliberately out of scope" section is a real part of the document. Writing down that you
considered something and chose not to do it is more honest than silence, and it stops the same
question being reopened every month.

## Part 4 — Claude Code Plan mode

**Suggested Claude Code prompt:**

> Read `AGENTS.md`, `docs/design/accessibility.md`, and every component in
> `src/components/workshop/`.
>
> Audit them against the brief. For each issue: the file, what is wrong, who it affects, and the fix
> you propose. Order by real impact, not by how easy it is to fix.
>
> Where the right fix is a different component or a behavior change rather than an added attribute,
> say so explicitly. Then plan the changes and the tests that would catch each regression.
>
> Do not edit any files yet.

**STOP AND REVIEW THE PLAN.**

Questions to ask yourself:

- **Is it mostly adding `accessibilityLabel`?** That is the failure mode this lesson exists to
  prevent. Labels are the right fix sometimes — not usually.
- Does it use `accessibilityState={{ disabled, busy }}` for the Button, or only styling?
- Does its audit match what you found with the screen reader on? If it missed something you heard,
  that is worth noting — static analysis cannot hear.
- Does it propose labels that duplicate visible text? A `Text` saying "Save" inside a button labelled
  "Save" announces twice.
- Are the proposed tests querying by **role and accessible name**, or by `testID`? Role-based queries
  test the accessibility tree; `testID` bypasses it entirely.
- Does it address contrast and touch targets, or only screen reader semantics?
- Does it consider dynamic type?

## Part 5 — Implement

**Suggested prompt:**

> Implement the approved plan, highest impact first. Where you change or add tests, query by role and
> accessible name rather than `testID`, so the tests exercise the accessibility tree. Then run
> `npm run verify`.

## Part 6 — Run locally

**Re-run the audit with the screen reader on.** The code changed; your Part 1 findings are now
hypotheses.

```bash
npm start
```

Things to inspect:

- Every issue from Part 1 — is it actually fixed *as heard*, not as read in the diff?
- Does anything now announce twice, or read a label that contradicts what is on screen?
- Disabled button: announces as disabled?
- Form: is a validation error announced when it appears?
- List: is the state change from loading to populated announced?
- Tab through with a keyboard on web, and try switch control on iOS if you can.
- Largest system font, again, on every screen.

## Part 7 — Reiterate

Something will be subtly wrong. Over-labelling is the usual result of a first accessibility pass.

**Suggested feedback (use what you heard):**

> Two things from the screen reader pass:
>
> 1. The profile card now announces the person's name twice — once from the card's composed label and
>    again from the name `Text` inside it. Fix the duplication without losing the grouping.
> 2. The submit button announces "Submit, button, dimmed" while loading, but never says anything is
>    in progress. It should announce as busy.
>
> Run `npm run verify` afterwards, and remind me what still needs checking by hand.

## Part 8 — Verify

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes, with role-and-name based queries
- [ ] The app runs
- [ ] **Screen reader pass completed on a real device or simulator**
- [ ] Contrast checked, touch targets at least 44pt/48dp
- [ ] Largest system font size checked on every screen
- [ ] No information conveyed by colour alone

```bash
npm run verify
```

## What changed in the repository

- Modified: components across `src/components/workshop/` — roles, states, grouping, targets
- Modified/new: tests querying by role and accessible name
- New: `docs/design/accessibility.md`

## What you should understand before continuing

- **Correct semantics beat added labels.** The right component announces correctly by default
- `accessibilityRole` says what a thing is; `accessibilityLabel` says what it is called;
  `accessibilityHint` says what happens if you activate it
- State — disabled, busy, selected — belongs in `accessibilityState`, not only in styling
- Grouping with `accessible` is a real design decision with a real trade-off
- Over-labelling causes duplicate announcements, which is its own bug
- Contrast, touch targets and dynamic type are accessibility too, and no screen reader will tell you
  about them
- Tests that query by role verify accessibility as a side effect — which is why they are worth
  preferring

## Stretch exercise

Turn on the screen reader and complete the contact form **with the display off** (iOS: VoiceOver's
screen curtain, a three-finger triple tap). No peeking.

You will find something. Almost everyone does — usually that it is possible to submit the form and
have no idea whether it worked. Fix whatever you find, then do it again.
