# Lesson 11 — Capstone: Cowork to Code

## Why this matters

Every previous lesson handed you a shaped problem. This one does not.

> **Build a small mobile "People Directory" from local mock data.**

That is the whole brief, and it is deliberately underspecified — because that is what real work looks
like. Nobody hands you a component specification. Someone says "we need a way to look people up",
and turning that into something buildable *is the job*.

This is also where you find out whether the workflow stuck. Under time pressure, the temptation is to
skip straight to "Claude, build me a directory app" and iterate on whatever comes out. That will
produce something. It will not produce something you understand or can defend.

## What you will learn

### React Native
- Assembling lists, detail routes, forms and states into one coherent app
- Making a small app feel finished rather than assembled
- Handling data flow across screens without reaching for a state library

### Claude workflow
- Running the complete loop end to end, unprompted
- Changing a plan because you disagree with it
- Two substantive reiterations driven by device review
- Judging afterwards which decisions belonged to Cowork, to Claude Code, and to you

## Before you start

Finish Lessons 00–10. You will use nearly everything: `Button`, `Badge`, `StatusPill`, `ProfileCard`,
the form patterns, list states, routing and the accessibility brief.

```bash
npm run verify
git status
```

Start clean. Then work on a branch:

```bash
git checkout -b capstone
```

**Constraints:**

- Local mock data only. No backend, no database, no network.
- No new dependencies without justifying the cost first.
- Everything already in `docs/design/` still applies.

## The requirements

Non-negotiable:

- A **list** of people from local mock data
- **Search or filtering**, with a real no-results state
- **Cards** used consistently
- A **detail view** for a single person
- **One form or interactive control** that changes something
- A considered **empty state**
- **Accessible** semantics, verified with a screen reader
- **Tests** covering behavior

Everything else — what it looks like, how it is organised, what the form does, what a "person" even
has — is yours.

---

## Stage A — Cowork discovery

Do not design yet. Understand the problem.

**Suggested Cowork prompt:**

> I am building a small mobile People Directory. Before we discuss any visual design, help me work
> out what it is actually for.
>
> Who uses a directory like this, and what are they usually trying to do? What is the most common
> task — finding a specific person they can already name, or discovering someone who does a
> particular thing? How do those two goals pull the design in different directions?
>
> Ask me questions rather than assuming.

The find-versus-discover distinction genuinely changes the app. If people mostly search for someone
they can name, search dominates and browsing barely matters. If they are looking for "someone who
knows Kubernetes", filtering by skill matters more than the search field.

**Pick one.** Write down which and why. Every later decision hangs off it.

## Stage B — Cowork UX and design

Now the design work.

**Suggested Cowork prompt:**

> Based on the primary task we settled on, give me three genuinely different directions for the
> directory's list screen — not variations on one idea. For each: what it optimises for, what it
> sacrifices, and how it behaves on a small phone.
>
> Then, for the direction you think fits best, what does the detail screen need? What information
> earns its place, and what would just be clutter?

Push on specifics:

> How should the list handle 200 people versus 8? Does the design still work at both ends?

> What is the one interactive control on the detail screen? Give me options that are useful rather
> than decorative.

Do not settle for the first coherent answer. Ask what it would do differently with half the screen.

## Stage C — Content

Realistic content, because fake content hides real problems.

**Suggested Cowork prompt:**

> Write mock data for 14 people for this directory. Realistic names from a range of cultures,
> plausible roles, and one-sentence bios that sound like people wrote them about themselves.
>
> Include deliberately awkward cases: someone with a very long name, someone with a very short one, a
> single-word name, a name with a particle like "van der", someone with no bio, and someone whose
> role title is unusually long.
>
> Then write all the interface copy: the search placeholder, the empty state, the no-results state,
> and the detail screen labels.

The awkward cases matter more than the ordinary ones. Fourteen people called "Sarah Chen, Engineer"
will make any layout look fine.

## Stage D — Durable brief

Commit the decisions to `docs/design/`. Name it for what it is —
`docs/design/people-directory.md`.

Include:

- The primary task, and why you chose it
- The chosen direction and what you rejected
- Screen-by-screen anatomy
- Every state, with its copy
- Content rules — lengths, truncation, missing data
- The interactive control and what it does
- Accessibility requirements
- **Open questions you are deliberately leaving open**

Commit it before you write any code.

```bash
git add docs/design/people-directory.md
git commit -m "docs: people directory design brief"
```

## Stage E — Claude Code Plan mode

**Suggested Claude Code prompt:**

> Read `AGENTS.md`, `docs/design/people-directory.md`, everything else in `docs/design/`, and all
> existing components in `src/components/workshop/`.
>
> Before planning: list the existing components and say for each whether the directory should use it,
> and why or why not.
>
> Then plan the People Directory: mock data, list screen, detail route, the interactive control, all
> UI states, and tests. Replace the placeholder content in `src/app/capstone.tsx`.
>
> Give me the plan in stages I can approve separately, so we are not doing all of it in one step. Do
> not edit any files yet.

Staged plans matter here. This is much larger than a Button — a single monolithic approval means a
diff too big to review honestly.

## Stage F — Human plan review

**You must change at least one thing.** Not as a formality — find something you genuinely disagree
with.

Read for:

- **Reuse.** Does it use your `ProfileCard`, or write a new row component? If a new one, is the
  reason good?
- **State modelling.** Discriminated union, or a pile of booleans allowing impossible combinations?
- **Data flow.** Does the detail screen receive an id and look the person up, or get an object passed
  through route params?
- **Scope.** Is it planning things you did not ask for? Is it missing things you did?
- **States.** Are empty and no-results distinct?
- **Dependencies.** Any? Justified?
- **Copy.** Verbatim from your brief, or paraphrased?
- **Tests.** Behavior, or implementation details?

Write down what you changed and why. Stage K asks about it.

## Stage G — Implementation

Approve one stage at a time.

**Suggested prompt:**

> Implement stage 1 of the approved plan, with the changes we agreed. Then run `npm run verify` and
> show me the diff summary before moving on.

**Read each diff.** If you find yourself skimming, the stages are too big — say so and ask for
smaller ones.

Commit as you go:

```bash
git add -A && git commit -m "feat: people directory list screen"
```

## Stage H — Automated verification

```bash
npm run verify
```

All three must pass. If tests are thin — only the happy path, or asserting on styles — say so now:

> The tests cover the populated list but not the empty, no-results or error states. Add tests for
> each, querying by role and accessible name.

## Stage I — Device review

**On a real device or simulator. Not only web.**

```bash
npm start
```

Work through it as a user, not as its author:

- Find a specific person by name
- Search for something with no matches — and get back
- Open a detail screen. Go back. Is your scroll position kept?
- Use the interactive control. Is the result obvious?
- Reach the empty state
- Android hardware back, from every screen
- **Largest system font size**, on every screen
- **Screen reader**, on every screen
- The awkward data: the long name, the missing bio, the single-word name
- Rotate the device

Write down everything you find, including things you decide not to fix.

## Stage J — Reiteration

**At least two meaningful revisions.** Not typo fixes — things you found by using it.

Meaningful means: it changes behavior or design, and you found it by looking at the running app.

**Suggested feedback (first round):**

> Two problems from device testing:
>
> 1. At the largest system font size the detail screen's role label and status collide, and the
>    status gets clipped. The role should wrap; the status should keep its size.
> 2. Returning from a detail screen resets the list scroll position, so finding my place after
>    checking three people in a row is tedious. Preserve it.
>
> Run `npm run verify` afterwards.

**Then look again**, and do a second round on what that revealed.

**Suggested feedback (second round):**

> Better. But now the preserved scroll position also persists after I clear the search, so I land in
> the middle of the full list with no context. When the filter changes, scroll back to the top.
>
> Also, VoiceOver announces the detail screen's status as just a colour name rather than what it
> means. Fix the accessible name. Run `npm run verify` afterwards.

That second round is realistic: the first fix created the second problem. This is the normal shape of
iterative development, and noticing it is the skill.

## Stage K — Final verification

```bash
npm run verify
```

Then manually test every major flow one more time, on a native target:

- [ ] Browse the list
- [ ] Search — with results
- [ ] Search — no results, and recover
- [ ] Empty state
- [ ] Open a detail screen and return
- [ ] Use the interactive control
- [ ] Back navigation on both platforms if available
- [ ] Screen reader over every screen
- [ ] Largest system font on every screen
- [ ] The awkward data cases

```bash
git add -A && git commit -m "feat: people directory capstone"
```

---

## Part 8 — Verify

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes, covering every state
- [ ] The app runs on a native target
- [ ] Human UX review completed on every screen
- [ ] At least two meaningful reiterations, each followed by re-verification
- [ ] `docs/design/people-directory.md` committed
- [ ] No prompts committed

## What changed in the repository

- New: `docs/design/people-directory.md`
- New: mock data in `src/data/`
- New: directory components and a detail route in `src/app/`
- Modified: `src/app/capstone.tsx` — the placeholder replaced by your app
- New: tests across all states

## Reflect

The most valuable part of this lesson. Write the answers down.

1. **Which decisions were genuinely better in Cowork?** Where did exploring options first change what
   you built — versus where was it ceremony?
2. **Which were better in Claude Code?** Where did reading the actual code beat reasoning about it in
   the abstract?
3. **Which were unavoidably yours?** What could neither tool have decided for you, and how did you
   know?
4. **Where did the workflow slow you down?** Be honest. If a stage added nothing for a small change,
   say so — knowing when to compress the loop matters as much as knowing the loop.
5. **What did you catch in plan review** that would have been expensive to catch later?
6. **What did only the device reveal?** Everything on that list is a permanent argument against
   shipping on green checks alone.

## What you should understand before continuing

- A loose problem must be narrowed by a human before it can be delegated
- Deciding the primary task first makes every later decision easier
- Staged plans keep diffs reviewable; monolithic approvals do not
- Reiteration is where quality comes from — and fixes create new problems
- `npm run verify` passing is necessary and nowhere near sufficient
- The human steps — narrowing, reviewing, looking — are the ones that cannot be delegated

## Stretch exercise

Hand your capstone to someone else — a colleague, a friend, anyone who has not seen it — and watch
them use it for five minutes **without explaining anything**.

Say nothing. Write down every hesitation, every wrong tap, every moment they look for something that
is not there.

That list will be more useful than anything in this lesson, and no amount of AI assistance can
generate it.
