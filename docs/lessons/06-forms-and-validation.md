# Lesson 06 — Forms and Validation

## Why this matters

Forms are where mobile stops being "React with different tags". A keyboard appears and covers a third
of the screen, including — reliably, on the first attempt — the submit button. The wrong keyboard
appears for the field. Autocorrect mangles an email address. The user rotates the device mid-entry
and their input vanishes.

Forms are also where **words matter more than code**. "Invalid input" is technically a validation
message and practically useless. The difference between a form people complete and one they abandon
is mostly copy — which makes this the clearest lesson in the workshop for the Cowork/Claude Code
split. Cowork writes what the form says. Claude Code makes it work.

## What you will learn

### React Native
- `TextInput` and controlled component state
- `keyboardType`, `autoCapitalize`, `autoCorrect`, `textContentType`, `returnKeyType`
- Keyboard avoidance — keeping the focused field and the submit button visible
- Validation timing: on change, on blur, or on submit
- Disabled submit states, and why "disabled until valid" is often the wrong choice

### Claude workflow
- Cowork for labels, helper text, error messages and success copy
- Claude Code for state, validation logic and tests
- Recognising when a request is really a copywriting problem in disguise

## Before you start

Finish [Lesson 03](03-plan-implement-button.md) and [Lesson 04](04-component-states-and-tokens.md).
You will reuse the `Button`.

**There is no backend.** Submitting shows a success state locally and nothing leaves the device. If
you find yourself wanting an API, you have drifted out of scope — the interesting problems here are
all client-side.

## Part 1 — Explore / understand

You are building a contact form: **name**, **email**, **short message**.

Decide these before you plan anything, because they are product decisions and Claude will guess if
you do not:

1. **When do you validate?** On every keystroke is hostile — it tells someone their email is invalid
   while they are still typing the third character. On blur is gentler. On submit is safest and least
   helpful. Which per field?
2. **Is submit disabled until the form is valid?** It feels tidy. It is also a dead end: the user
   cannot press the button and cannot find out why. What is the alternative?
3. **What counts as a valid email?** Note that full RFC-compliant validation is a famously bad idea.
   What is good enough, and what does it wrongly reject?
4. **How long can the message be?** What happens at the limit — a hard stop, or a warning?
5. **Where does focus go** after the user finishes the name field?
6. **What does success look like?** Does the form clear? Stay? Show a message where?

## Part 2 — Cowork

This is a copy lesson. Give it real time.

**Suggested Cowork prompt:**

> I am writing a contact form for a mobile app: name, email, and a short message. Write the complete
> copy set:
>
> - Field labels
> - Placeholder text — and tell me where a placeholder is the wrong tool
> - Helper text where a field needs it
> - Validation messages for: empty required field, malformed email, message too short, message too
>   long
> - The success message after submitting
>
> The tone should be plain and human — not corporate, not chirpy. Every error message must say what
> is wrong **and** what to do about it. Give me two options for anything you think is a judgement
> call.

Then push:

> "Please enter a valid email address" tells me nothing I did not know. Rewrite it so it helps
> someone who typed `name@gmail` and cannot see what is missing.

> Does the name field need a placeholder at all, given it has a label? Argue against placeholders
> here.

The placeholder question is worth asking. Placeholders vanish when the user starts typing, are
frequently mistaken for pre-filled values, and often fail contrast. "Label plus placeholder" is
usually redundant, and "placeholder instead of label" is an accessibility problem.

## Part 3 — Turn the direction into a clear brief

Write `docs/design/form-patterns.md`. Make it about the pattern, not this one form:

- The approved copy set
- **When** validation fires per field, and why
- Whether submit is ever disabled, and the reasoning
- How errors are shown: position, styling, and what announces to a screen reader
- What success looks like and how long it lasts

This is a durable document. The next form in this app should follow it without re-litigating any of
it.

## Part 4 — Claude Code Plan mode

**Suggested Claude Code prompt:**

> Read `AGENTS.md`, `docs/design/form-patterns.md`, `src/components/workshop/Button.tsx` and
> `src/theme/index.ts`.
>
> Plan a `ContactForm` component in `src/components/workshop/`, rendered in the Lesson 06 playground
> slot. Local state only — no network, no storage. Use the approved copy exactly as written in the
> brief.
>
> In the plan, state: the keyboard configuration for each field, when validation runs for each field,
> how the submit button and the focused field stay visible when the keyboard is up, and what a screen
> reader announces when a field becomes invalid. Include tests.
>
> Do not edit any files yet.

**STOP AND REVIEW THE PLAN.**

Questions to ask yourself:

- **Keyboard avoidance** — is it addressed at all? A plan with no mention of it will produce a form
  whose submit button sits under the keyboard. Does it use `KeyboardAvoidingView`, and does it note
  that the behavior differs between iOS and Android?
- **Email field config** — `keyboardType="email-address"`, `autoCapitalize="none"`,
  `autoCorrect={false}`. Missing `autoCapitalize` alone makes the field genuinely annoying, because
  iOS will capitalise the first letter of every email address.
- **Validation timing** — does it match your brief, or did it default to validating on every
  keystroke?
- **Is submit disabled until valid?** If your brief said no and the plan says yes, it stopped reading
  the brief.
- **Error announcement** — showing red text is not enough. Is there `accessibilityLiveRegion` or an
  equivalent, so a screen reader user learns the submission failed?
- **Copy** — is it the exact copy from your brief, or paraphrased? Paraphrasing your approved copy is
  a quiet but real failure.
- Is it adding a form library? It should not be. Three fields need `useState`.

## Part 5 — Implement

**Suggested prompt:**

> Implement the approved plan. Use the copy from `docs/design/form-patterns.md` verbatim. Then run
> `npm run verify`.

## Part 6 — Run locally

**This lesson must be checked on a real device or simulator.** A browser will not show you any of the
interesting failures.

```bash
npm start
# press i or a — and if you have a phone, use Expo Go too
```

Things to inspect:

- Tap the message field. **Is the submit button still reachable, or is it under the keyboard?**
- Tap the email field. Is the keyboard the one with `@` on it? Does it try to capitalise?
- Type `name@gmail` and blur. Is the error helpful, or does it just say "invalid"?
- Submit an empty form. Do all errors appear at once? Does focus move to the first bad field?
- Fill it in correctly and submit. Is the success state obvious?
- Rotate the device mid-entry. Is your text still there?
- Turn on VoiceOver/TalkBack. Are the fields labelled? Is an error announced when it appears, or
  silently rendered?
- Bump the system font size to maximum. Do the labels and errors still fit?

## Part 7 — Reiterate

The keyboard will have caused something.

**Suggested feedback (use what you observed):**

> On an iPhone the keyboard covers the submit button when the message field is focused — I have to
> dismiss the keyboard to submit, and there is no visible way to do that. Fix it so the focused field
> and the submit button both stay visible, and check the behavior on Android too, since the default
> differs.
>
> Also, the email error appears the moment I focus away, even if the field is empty and I never typed
> anything. An untouched empty field should not be an error until submit.
>
> Run `npm run verify` afterwards.

That second one is subtle and very common. "Validate on blur" and "do not scold someone for a field
they have not filled in yet" are both correct, and reconciling them requires tracking whether a field
has been touched.

## Part 8 — Verify

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes — valid submission, each validation failure, disabled/error states
- [ ] The app runs
- [ ] Human UX review **on a native target**: keyboard does not cover the submit button, correct
      keyboard per field, errors are helpful, success is clear, screen reader announces errors

```bash
npm run verify
```

## What changed in the repository

- New: `src/components/workshop/ContactForm.tsx`
- New: `__tests__/contact-form.test.tsx`
- Modified: `src/app/playground.tsx` — Lesson 06 slot
- New: `docs/design/form-patterns.md`

## What you should understand before continuing

- `TextInput` is controlled the same way as on the web; everything *around* it is different
- Keyboard configuration per field is small effort and large payoff
- Keyboard avoidance is a real problem with platform-specific behavior, and it is invisible on web
- Validation timing is a UX decision, not an implementation detail
- Error messages should say what is wrong **and** what to do
- Errors must be announced, not merely displayed
- **Copy is design work.** Cowork writes it; Claude Code should use it verbatim

## Stretch exercise

Add a "message too long" state with a live character counter — then make it accessible, which is
harder than it looks. A counter that updates on every keystroke will either spam a screen reader
senseless or say nothing at all.

Ask Cowork what a screen reader user actually needs here: probably silence until they approach the
limit, then one clear warning. Then have Claude Code implement that and verify it with VoiceOver
turned on.
