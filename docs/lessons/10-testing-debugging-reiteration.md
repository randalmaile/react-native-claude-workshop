# Lesson 10 — Testing, Debugging and Reiteration

## Why this matters

The most expensive habit in AI-assisted development is letting the model start editing before it
understands the problem.

Describe a bug, and the default behaviour is to produce a plausible fix immediately. Sometimes it is
right. Often it treats a symptom, and now you have the original bug plus a change nobody understands
sitting on top of it. Do that three times and the code is a sediment of guesses.

The discipline is simple and unnatural: **make it investigate and report before it changes anything.**

This lesson deliberately introduces real defects so you can practise on bugs whose causes are known.

## What you will learn

### React Native
- Testing behavior rather than implementation details
- Reproducing a bug with a failing test before fixing it
- Reading Metro output, red boxes and stack traces
- Common React Native bug shapes: stale state, layout under long content, missed state resets

### Claude workflow
- The **observed / expected / investigate first** debugging prompt
- Requiring a cause before accepting a fix
- `npm run verify` as the gate before anything is called done
- Recognising when a "fix" is a symptom patch

## Before you start

Finish Lessons [06](06-forms-and-validation.md), [07](07-lists-and-ui-states.md) and
[09](09-accessibility.md).

Start from a clean baseline:

```bash
npm run verify
git status
```

Commit or stash anything outstanding. You want to be able to tell your changes from the defects.

## Part 1 — Explore / understand

First, understand what makes a test useful.

Look at `__tests__/lesson-card.test.tsx`. It asserts on visible text and the accessible name. It
does **not** assert that the container has `borderRadius: 16`. Restyle the card and the test still
passes — because the behavior did not change. That is the property you want.

A test that asserts on styles fails every time someone changes a colour, and passes when the button
stops working. It is worse than no test, because it costs maintenance and provides no safety.

> **One important detail in this project:** React Native Testing Library v14 made `render`,
> `fireEvent` and `userEvent` **async**. You must `await render(...)`. If you forget, `screen` stays
> empty and every query fails with "`render` function has not been called" — which looks like a
> broken component and is not. If Claude writes a synchronous `render`, that is the cause.

### Introduce the defects

Now break things on purpose. Ask Claude Code:

> Introduce these four defects into the codebase, one small change each. Do not fix anything, do not
> add comments marking them, and do not tell me which files you changed:
>
> 1. Make the Button's `onPress` fire even when it is disabled
> 2. Make the list's no-results state show the empty-state copy instead
> 3. Make the contact form accept an email address with no domain
> 4. Make the form fail to reset one of its fields after a successful submit
>
> Then run `npm test` and tell me which tests fail.

**Then start a fresh conversation.** You want to debug these without the model already knowing where
it hid them — which is the situation you are actually in with real bugs.

Note which tests caught a defect and which did not. Gaps are as informative as failures.

## Part 2 — Cowork

Cowork's role here is deciding what *should* happen — several of these are UX questions, not code
questions.

**Suggested Cowork prompt:**

> I am reviewing bugs in a mobile app. For each, tell me what the correct behavior is and why, and
> what a user experiences when it is wrong:
>
> 1. A disabled button still triggers its action when tapped
> 2. A search with no matches shows "Nothing here yet — add your first teammate"
> 3. A form accepts `someone@gmail` as a valid email
> 4. After submitting successfully, one field keeps its old value
>
> For 3 specifically: what *should* the validation rule be? I know full RFC-compliant email
> validation is a bad idea, so where is the sensible line?

Number 4 is more interesting than it looks. Ask whether the form should clear at all after submit —
sometimes keeping the values is correct, and "it did not reset" is only a bug if resetting was the
intent.

## Part 3 — Turn the direction into a clear brief

For each defect, write three lines:

```text
Observed:   The submit button is greyed out but tapping it still submits the form.
Expected:   A disabled button should not fire onPress at all.
Reproduce:  Playground → Lesson 06 → leave name empty → tap Submit.
```

Precision here is the entire skill. "The button is broken" cannot be investigated. The above can be.

## Part 4 — Claude Code Plan mode

**Do these one at a time.** Batching bugs is how unrelated changes get tangled together.

**Suggested Claude Code prompt:**

> There is a bug in the Button component.
>
> **Observed:** the button is visibly disabled, but tapping it still fires `onPress`.
> **Expected:** a disabled button does not fire `onPress`, and announces as disabled.
> **Reproduce:** Playground → Lesson 06 → leave the name empty → tap Submit.
>
> Investigate first. Do not change any code until you can tell me the specific cause — which line,
> and why it produces this behavior. Then propose a fix and a test that fails before the fix and
> passes after.

**STOP AND REVIEW.**

Questions to ask yourself:

- **Did it identify a cause, or jump to a fix?** "I'll add a guard in `onPress`" is a patch. "The
  `disabled` prop is passed to the style callback but never to `Pressable`'s `disabled` prop" is a
  cause.
- Does the proposed fix address that cause, or wrap it?
- Does the test fail *before* the fix? A test written after a fix, never seen red, proves nothing.
- Is the fix scoped to this bug, or does it also refactor three other things?
- For bug 3: is the new email rule reasonable, or a monstrous regex that will reject real addresses?

If it proposes a fix without a cause, push back:

> You have not told me the cause. Which line produces this behavior, and why? Do not change code yet.

That push-back is the most useful sentence in this lesson. Get comfortable saying it.

## Part 5 — Implement

**Suggested prompt:**

> Add the failing test first and show me it failing. Then apply the fix and show me the test passing.
> Then run `npm run verify`.

Red, then green. Seeing the test fail is what proves it is testing the thing you think it is.

Repeat Parts 4 and 5 for each remaining defect, one at a time, ideally in a fresh conversation each.

## Part 6 — Run locally

```bash
npm start
```

Automated tests confirm the specific case you thought of. Only the app confirms the behavior.

Things to inspect:

- Tap the disabled button on a **real device**. Nothing should happen — no flash, no feedback.
- Search for nonsense. Is the message now the no-results one, with a way back?
- Type `someone@gmail` and blur. Rejected? Now type a legitimately unusual address —
  `first.last+tag@sub.domain.co.uk`. Still accepted? A validation fix that rejects real addresses is
  a worse bug than the one you started with.
- Submit successfully. Are **all** fields reset?
- Screen reader: does the disabled button announce as disabled?

## Part 7 — Reiterate

Fixes cause new problems. That is what this part is for.

**Suggested feedback:**

> The email validation now correctly rejects `someone@gmail`, but it also rejects
> `first.last+tag@sub.domain.co.uk`, which is a perfectly valid address. Loosen it so it catches the
> obvious mistakes without rejecting legitimate addresses — and add both as test cases so we do not
> regress in either direction.
>
> Run `npm run verify` afterwards.

Both directions matter. A test suite that only checks that bad input is rejected will happily accept
a rule that rejects everything.

## Part 8 — Verify

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes, with a regression test per defect
- [ ] Every test was seen **failing** before its fix
- [ ] The app runs and all four defects are gone
- [ ] Human UX review on a native target
- [ ] No new defects introduced by the fixes

```bash
npm run verify
```

**`npm run verify` is the gate.** It runs typecheck, lint and tests together. From here on, nothing
is "done" until it passes — and passing it still does not mean the UI is right.

## What changed in the repository

- Modified: Button, list state handling, form validation and reset logic
- New: a regression test per defect, each seen failing first

## What you should understand before continuing

- **Investigate before editing.** Demand a cause, not a plausible patch
- Observed / expected / reproduce is the format that makes a bug fixable
- A test that has never failed proves nothing
- Test behavior, not implementation — style assertions are liability
- Fix one bug at a time
- Validation fixes need tests in **both** directions
- `npm run verify` is the code-level gate; the device is still the real one
- In RNTL v14, `render` and the event helpers are async

## Stretch exercise

Ask Claude Code to introduce **one** defect without telling you anything about it — not what kind,
not where. Then find it using only `npm run verify` and the running app.

If `verify` passes and the app is still broken, you have found a gap in your test coverage, which is
the most valuable thing this exercise can produce. Write the test that would have caught it.
