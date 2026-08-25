# Lesson 02 — A Cowork Design Brief

## Why this matters

Most bad software is built correctly. The code compiles, the tests pass, and the thing is wrong,
because nobody decided what it should be before deciding how to build it.

This is amplified when you delegate implementation to an AI, because it will not stop and ask. Hand
Claude Code a vague requirement and you get a confident, well-typed, fully-tested component that
handles none of the cases you actually cared about — and you will not find out until you see it on a
device with real data.

This lesson has **no implementation**. That is the point. You are practising the part everyone skips.

## What you will learn

### React Native
- Thinking in component **states** rather than component appearance
- Identifying edge cases specific to mobile: narrow screens, long strings, missing images
- What a component's API needs to expose before you write a line of it

### Claude workflow
- Using Cowork for divergent design exploration
- Getting *options with trade-offs* rather than one confident answer
- The difference between a **durable brief** and a **one-time prompt**
- Writing a brief good enough that implementation raises no questions

## Before you start

Finish [Lesson 01](01-react-native-primitives.md). Read
[`docs/design/README.md`](../design/README.md) — especially "Writing a good brief".

You will need Cowork for this lesson. Claude Code stays closed.

## Part 1 — Explore / understand

The component you are designing is a **Profile Card**. You will implement it in Lesson 05.

Roughly, it shows:

- an avatar
- a name
- a role
- a short biography
- an optional status or tag
- one primary action

That is a list of parts, not a design. Before opening Cowork, sit with it for five minutes and write
down every question you cannot answer yet. Some starters:

- What is this card *for*? A directory? A team page? Search results? The answer changes everything.
- How long can a name be? What do you do about "Bartholomew Kuma-Featherstonehaugh III"?
- What if there is no avatar image? No bio? No role?
- Is the whole card pressable, or just the action?
- What is the status for — availability, seniority, something else?

Keep that list. You are going to compare it against what Cowork surfaces.

## Part 2 — Cowork

This is the main work of the lesson. Expect several rounds, not one prompt.

**Suggested Cowork prompt:**

> I am designing a reusable Profile Card for a React Native mobile app. It shows an avatar, a name, a
> role, a short biography, an optional status tag, and one primary action.
>
> Before proposing any layout, ask me what the card is for and where it appears. Then give me three
> genuinely different layout directions — not variations on one idea — and for each, tell me what it
> is good at and what it sacrifices.
>
> Then: what states does this component need, and what edge cases will break it on a narrow phone
> screen?

Push on the answers:

> What happens to direction 2 with a 45-character name and a four-line bio?

> The status tag is currently just a coloured dot. What does that communicate to someone who cannot
> distinguish the colours?

> Write the empty-state text for when a person has no biography. Give me three options with different
> tones.

**What to watch for:** if Cowork gives you one answer and moves on, you are using it like a search
engine. Ask for alternatives and trade-offs explicitly. The value here is in the options you
*rejected* and knowing why.

## Part 3 — Turn the direction into a clear brief

Choose one direction. Not the most impressive one — the one you can defend.

Now write the brief. Ask Cowork to draft it from your conversation:

> Write this up as a component design brief for `docs/design/profile-card.md`. Cover: purpose,
> anatomy (and which parts are optional), every state, content rules including maximum lengths and
> truncation behavior, what happens when data is missing, interaction behavior, accessibility
> requirements including what a screen reader should announce, and any questions I deliberately left
> open.
>
> Write it so an implementer could build from it without asking me a question.

Then **edit it yourself.** A brief you did not review is not a decision, it is a suggestion. Cut
anything you do not actually believe. Add anything from your Part 1 list that never came up.

Save it as `docs/design/profile-card.md` and commit it.

### Brief versus prompt — the distinction this lesson exists to teach

| | Design brief | One-time prompt |
| --- | --- | --- |
| **Example** | "Names truncate to one line with an ellipsis; the full name stays available to screen readers." | "Implement the ProfileCard from the brief and run the tests." |
| **Answers** | What did we decide, and why? | What should you do right now? |
| **Lifetime** | Useful in three months | Obsolete on completion |
| **Belongs in** | `docs/design/` — committed | The conversation, or `.prompts/` — gitignored |

The test: **if Claude Code executing it makes it obsolete, it was a prompt.**

Committing prompts is worse than not committing them, because a stale instruction file reads as
authoritative to the next person — or the next Claude session — and there is no way to tell it is
dead.

## Part 4 — Claude Code Plan mode

**No implementation this lesson.** But use Claude Code once, as a reviewer:

**Suggested Claude Code prompt:**

> Read `docs/design/profile-card.md`, `AGENTS.md`, and the existing components in
> `src/components/workshop/`.
>
> Do not plan an implementation and do not edit anything. Instead, tell me what questions you would
> have to ask me before you could build this. What does the brief leave ambiguous?

**STOP AND READ THE ANSWER CAREFULLY.**

Questions to ask yourself:

- Every question it raises is a hole in your brief. Is it a hole you left **deliberately**, or one
  you missed?
- Did it spot a conflict between two things you wrote?
- Did it notice anything about reuse — that the brief implies a component you already have?

Go back and fix the holes you did not mean to leave. **This round-trip is the most valuable ten
minutes in the lesson**: it is far cheaper to discover an ambiguity now than during implementation.

## Part 5 — Implement

Nothing. Resist the urge.

If you are itching to build it, that is a good sign the brief is clear. Lesson 05 is where it gets
built — and it will go faster because of what you did here.

## Part 6 — Run locally

Nothing to run. The app is unchanged.

## Part 7 — Reiterate

Iterate on the **brief**, which is exactly the same skill applied earlier and cheaper.

Re-read it and ask:

- Could someone build this without messaging me? If not, what would they ask?
- Does it say what happens when things are missing, long, or empty?
- Does it describe **behavior and reasoning**, or only appearance?
- Is anything in there a decision you have not actually made, phrased confidently?

**Suggested Cowork feedback:**

> Here is my edited brief. Critique it as an implementer who has to build this on Friday afternoon
> with no access to me. What is underspecified? Where would you have to guess?

## Part 8 — Verify

- [ ] `npm run typecheck` passes (unchanged, but confirm your baseline is still clean)
- [ ] `npm run lint` passes
- [ ] `npm test` passes
- [ ] Local runtime — *n/a, no code changed*
- [ ] Human review: you have read your own brief end to end and stand behind it
- [ ] `docs/design/profile-card.md` exists and is committed
- [ ] You did **not** commit any prompts

## What changed in the repository

- New: `docs/design/profile-card.md`

No source code. This is a real deliverable — it is the input to Lesson 05.

## What you should understand before continuing

- A component is defined by its **states and edge cases**, not its happy-path appearance
- Cowork is for divergence: options, trade-offs, critique, wording
- A brief records decisions; a prompt requests work. Only one of them belongs in Git
- Ambiguity found before implementation costs minutes; found after, it costs a rewrite
- An AI will never stop to ask you what you meant — so decide first

## Stretch exercise

Write the microcopy for three states you have not thought about yet: what the card shows while the
person's data is still loading, what it shows if loading failed, and what the action button says when
the action is unavailable. Get three tonal options for each from Cowork and pick one.

Notice how much harder the *unavailable* case is than the happy path — and that this is true of
nearly every component you will ever build.
