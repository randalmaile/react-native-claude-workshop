# Lesson 12 — *Optional, Advanced* — Isolated Component Development

> **This lesson is OPTIONAL and installs nothing.**
>
> It is as much about **dependency discipline** as about tooling. The exercise is to investigate a
> significant dependency properly and then make a real decision — including, quite possibly, the
> decision not to adopt it.

## Why this matters

You now have a Playground screen with a dozen components on it. It works. At some point it stops
working — you scroll past six components to reach the one you are editing, you cannot see all of a
component's states at once, and demonstrating an error state means temporarily breaking the app.

That is the problem tools like Storybook exist to solve: developing each component in isolation, with
every state visible, independent of the app around it.

The question this lesson asks is not "how do I install Storybook". It is **"is this worth it here,
and how would I decide?"** — which is a question you will face many times about many dependencies,
and getting it right matters far more than any individual tool.

## What you will learn

### React Native
- When a component library outgrows a playground screen
- What isolated component development actually buys you
- The real cost of adding significant tooling to a React Native project

### Claude workflow
- Making Claude **investigate current documentation** rather than recall it
- Requiring an honest cost analysis, not an enthusiastic one
- Approving in stages: investigate → plan → cost → approve → only then install
- Being comfortable rejecting a good plan

## Before you start

Finish [Lesson 11](11-capstone-cowork-to-code.md). You need a real component library to reason about
— this exercise is meaningless in the abstract.

```bash
npm run verify
git status
```

Clean tree. If you do adopt anything, you want to be able to back it out cleanly.

## Part 1 — Explore / understand

Assess your own situation honestly, before asking anything:

1. How many components are in `src/components/workshop/`?
2. How long does it take to get to the one you are working on in the Playground?
3. Can you see all states of a component at once, or do you have to interact to reach some?
4. How do you currently demonstrate an error state? Is it awkward?
5. How often do you actually develop a component in isolation, versus in the screen that uses it?

Question 5 is the one that decides it. If you always build components in the context that uses them,
isolation tooling solves a problem you do not have.

**Write down your answers before Part 2.** They are your evidence, and you will need them to push
back on an over-eager recommendation.

## Part 2 — Cowork

Use Cowork for the judgement question, deliberately framed to resist a sales pitch.

**Suggested Cowork prompt:**

> I have a React Native app (Expo SDK 57) with about ten reusable components, developed on a single
> "playground" screen inside the app.
>
> At what point does isolated component development — Storybook or similar — start earning its keep,
> and what are the honest signs it is not worth it yet?
>
> Argue **against** adopting it for a project this size, as strongly as you can. Then tell me what
> would have to change for the answer to flip.

Asking for the argument against is the technique. Ask "should I use Storybook?" and you will get a
list of benefits, because that is what the question invites.

Then:

> What could I get most of the value from with no new dependencies — just better organisation of the
> playground screen I already have?

That is frequently the actual answer, and it is the option nobody proposes because it is not
exciting.

## Part 3 — Turn the direction into a clear brief

Write down, before opening Claude Code:

- The specific problem you are trying to solve — in terms of your Part 1 answers
- What "solved" would look like
- What you are **not** willing to pay: build complexity, slower installs, maintenance burden, a
  second configuration to keep in sync
- What would make you reject the proposal outright

Deciding your rejection criteria *before* seeing the proposal is the point. Afterwards, a
well-written plan is persuasive regardless of whether it is right.

## Part 4 — Claude Code Plan mode

Four stages, and **you approve each one separately**.

### Stage 1 — Investigate

**Suggested Claude Code prompt:**

> Do not install anything and do not edit any files.
>
> Investigate the current state of isolated component development for React Native with Expo SDK 57.
> Check the **current** official documentation — Expo's and the tool's own — rather than relying on
> what you remember, and tell me the publication dates of what you find.
>
> I want to know: what the current recommended tool is, if any; whether it supports Expo Router
> projects; what it requires in terms of configuration, native setup and Metro changes; and how
> actively maintained it is.
>
> If the current recommendation has changed, or the tooling is in flux, say so plainly.

The date instruction matters. JavaScript tooling moves fast, and confidently recalled setup
instructions for a version that no longer exists are worse than no answer.

### Stage 2 — Plan

> Based on what you found, plan what adding this to *this* project would involve. Every file created
> or modified, every dependency added — including transitive weight — and every configuration change.

### Stage 3 — Cost

> Now give me the honest costs. Not the benefits — the costs.
>
> How many dependencies, and how much does that add to install time and `node_modules` size? What
> configuration now has to be maintained in parallel with the app's? What breaks on the next Expo SDK
> upgrade? What is the ongoing maintenance burden? What does someone cloning this repository now have
> to understand that they did not before?
>
> Then tell me honestly: for a project with ten components and one developer, is this worth it?

### Stage 4 — Decide

**STOP AND THINK PROPERLY.**

Questions to ask yourself:

- Does this solve a problem from my Part 1 list, or a hypothetical one?
- Does the cost analysis read as genuinely honest, or as a formality before the recommendation?
- Does it hit any of my Part 3 rejection criteria?
- Is the tooling stable, or currently mid-migration?
- Could I get most of the benefit by reorganising the playground screen?
- What happens to this on the next SDK upgrade — and who fixes it?

**"No" is a completely legitimate outcome, and for most projects at this size it is the right one.**

If you decide against: write down why, in `docs/design/` or a note in the repository. A recorded
decision stops the question being reopened every three months, and it tells the next person that it
was considered rather than overlooked.

## Part 5 — Implement

**Only if you decided yes.**

> Implement the approved plan. After each stage, run `npm run verify` and confirm the app still
> builds and runs — I want to know immediately if the tooling has broken the app itself.

Commit separately from any component work, so it can be reverted cleanly:

```bash
git add -A && git commit -m "chore: add isolated component development tooling"
```

**If you decided no**, the deliverable is the written decision. That is a real output, and arguably a
more valuable one.

## Part 6 — Run locally

If you installed something:

```bash
npm run verify   # does the app still pass its checks?
npm start        # does the app itself still run?
```

Then run the new tooling. Things to inspect:

- Does the app still build and run **unchanged**? Tooling that breaks the app has failed immediately.
- Does the isolated environment actually render your components correctly?
- How long does a cold start take now? How long does `npm install` take?
- Did `npm run verify` get slower?

## Part 7 — Reiterate

**Suggested feedback:**

> The setup works, but `npm install` on a clean clone is now noticeably slower, and there is a second
> Metro configuration to keep in sync with the app's.
>
> Given that, is there a lighter-weight way to get the same benefit? Compare honestly against just
> reorganising the playground screen with a component picker — I would rather have less machinery.

If you decided not to adopt, reiterate on the alternative instead:

> Plan a lighter-weight improvement to the playground screen with no new dependencies: a picker to
> show one component at a time, with all of its states visible at once. Do not edit yet.

That version is often the better lesson — it is the same problem, solved for a fraction of the cost.

## Part 8 — Verify

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes
- [ ] The **app itself** still runs, unchanged
- [ ] Human review: the tooling earns its cost, or you documented why you declined
- [ ] The decision is written down either way

```bash
npm run verify
```

## What changed in the repository

**If you adopted something:** new dependencies and configuration, in their own commit.

**If you did not:** a short written decision in `docs/design/`, and possibly a reorganised playground
screen with no new dependencies.

Both are successful outcomes.

## What you should understand before continuing

- **Every dependency is permanent weight** — installs, upgrades, configuration, and one more thing
  the next person must learn
- Ask an AI to argue *against* a tool, or you will get a brochure
- Make it check current documentation and report the dates; tooling changes faster than training data
- Investigate → plan → cost → approve → install. Never skip to the end
- The cheapest solution is often reorganising what you already have
- **"No" is a decision worth documenting**, not a failure to act
- A good plan for the wrong thing is still the wrong thing

## Stretch exercise

Pick any dependency you have installed reflexively in a past project and run this same four-stage
process on it retrospectively: investigate, plan, cost, decide.

Would you still add it, knowing what it actually cost? Most developers find at least one they would
not. That instinct — pausing before `npm install` — is worth more than any specific tool.
