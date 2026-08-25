# Design documentation

This directory holds **durable design decisions** made during the workshop — the ones the project
should keep knowing after the conversation that produced them is gone.

Most of these documents do not exist yet. They are written by you, during the lessons, usually with
help from Cowork after you have explored the options and chosen a direction.

## What belongs here

A document belongs here when it records **what was decided and why**:

- the states a component supports, and what each one looks like
- how a component behaves under hostile content — a 60-character name, a missing image, an empty list
- the exact wording of error, empty and success messages
- visual direction: the reasoning behind the palette, spacing and type choices
- patterns meant to be applied consistently, like how all forms report validation

Files that emerge from the lessons:

| File | Written in | Contents |
| --- | --- | --- |
| `profile-card.md` | Lesson 02 | The Profile Card brief: states, edge cases, chosen layout |
| `visual-direction.md` | Lesson 04 | Revised palette and token reasoning |
| `form-patterns.md` | Lesson 06 | Labels, helper text, validation and success copy |
| *(capstone brief)* | Lesson 11 | Whatever you name it — the People Directory direction |

## What does not belong here

> **Specs describe what the project should continue to know.
> Prompts describe work to do once.**

A prompt like *"implement the ProfileCard from the brief and run the tests"* is obsolete the moment
Claude Code finishes it. Committing it adds noise that later reads as authoritative — the worst kind
of stale documentation, because a future reader (or a future Claude) cannot tell it is dead.

Keep working prompts in the conversation. If you want them on disk, put them in `.prompts/`, which is
gitignored for exactly this purpose.

## Writing a good brief

Aim for something an implementer could build from **without asking you a question**:

1. **Purpose** — what the component is for, and where it appears.
2. **Anatomy** — the parts, and which are optional.
3. **States** — every one. Default, pressed, disabled, loading, error, empty. Say what changes.
4. **Content rules** — maximum lengths, truncation, what happens when data is missing.
5. **Behavior** — what happens on press, on long text, on a small screen.
6. **Accessibility** — the accessible name, the role, what a screen reader should announce.
7. **Open questions** — what you deliberately have not decided yet.

The test of a brief is not its length. It is whether it answers the question that will actually come
up during implementation: *"…and what happens if this is empty?"*
