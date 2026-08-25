# Lesson 07 — Lists and UI States

## Why this matters

"Show a list of things" sounds like one job. It is at least five:

```text
loading      →  we are fetching, nothing to show yet
populated    →  the normal case, and the only one anyone designs
empty        →  there is genuinely nothing here yet
no results   →  there are things, but none match this filter
error        →  something went wrong
```

**Empty and no-results are different states with different copy.** "Nothing here yet — add your first
teammate" is right for one and actively wrong for the other, where the correct message is "No one
matches 'zzz'" and a way to clear the filter. Conflating them is one of the most common bugs in
shipped software, and an AI will conflate them unless you are explicit, because the happy path is
what dominates its training data.

## What you will learn

### React Native
- `FlatList` and why it beats `.map()` inside a `ScrollView`
- `keyExtractor`, and what goes wrong with array indices as keys
- `ListEmptyComponent`, `ItemSeparatorComponent`, `contentContainerStyle`
- Client-side filtering, and keeping it fast enough to feel instant
- Modelling distinct UI states as data instead of tangled booleans

### Claude workflow
- Designing state copy in Cowork **before** implementing
- Making a plan enumerate every state explicitly
- Catching the empty/no-results conflation during plan review

## Before you start

Finish [Lesson 05](05-component-composition.md) — you will render your `ProfileCard` (or a compact
variant) as the list row.

No network. Mock data lives in `src/data/`, following the pattern in `lessons.ts`. A short
`setTimeout` is a fine way to simulate the loading state.

## Part 1 — Explore / understand

Look at how the home screen renders lessons in `src/app/index.tsx`: a plain `.map()` inside a
`ScrollView`. That is correct there — thirteen items, all rendered anyway.

Work out why it would be wrong for a list of 500 people. Then think about:

1. If `FlatList` only renders what is on screen, what happens to a row's local state when it scrolls
   away and back?
2. Your data needs a stable `id`. Why is the array index not good enough — what specifically breaks
   when the list is filtered?
3. When filtering, do you filter in render, or store filtered results in state? What goes wrong with
   the second one?
4. `loading`, `error`, `items`, `query` — as four independent booleans and values, how many
   combinations are impossible? How would you make those unrepresentable?

That last question is the one that separates a list that mostly works from one that always works.

## Part 2 — Cowork

The copy for the non-happy states is the design work here.

**Suggested Cowork prompt:**

> I am building a searchable list of people in a mobile app. I need copy and design direction for
> four states:
>
> 1. **Loading** — first load, nothing to show yet
> 2. **Empty** — the directory genuinely contains no one
> 3. **No results** — there are people, but none match the search
> 4. **Error** — loading failed
>
> For each: what does the user see, what does it say, and what can they do next? The empty and
> no-results messages must be clearly different — I have seen too many apps show "No people found"
> for both.
>
> Also: should the search field stay visible in the empty state? Argue it either way.

Then:

> Write the no-results message so it shows what was searched for, without breaking when someone
> pastes in 200 characters.

> Is a spinner the right loading state here, or should I show placeholder rows? What does each
> communicate?

## Part 3 — Turn the direction into a clear brief

Add a section to `docs/design/` — either extend `form-patterns.md` into something broader or create
`list-states.md`. Record:

- All four states with their exact copy
- What action each state offers the user
- Whether search stays visible in each state
- How the no-results message handles a very long query
- The loading treatment you chose, and why

## Part 4 — Claude Code Plan mode

**Suggested Claude Code prompt:**

> Read `AGENTS.md`, the list-state copy in `docs/design/`, `src/data/lessons.ts` for the mock data
> conventions, and `src/components/workshop/ProfileCard.tsx`.
>
> Plan a filterable people list rendered in the Lesson 07 playground slot:
>
> - Mock data in `src/data/` — at least 12 people, realistic content, no lorem ipsum
> - A `FlatList` rendering `ProfileCard` (or a compact variant) per person
> - A search field filtering by name and role
> - A simulated loading delay on first render
>
> In the plan, enumerate **every** UI state, show how state is modelled in code, and give the exact
> copy for each. Empty and no-results must be genuinely distinct. Include tests for each state.
>
> Do not edit any files yet.

**STOP AND REVIEW THE PLAN.**

Questions to ask yourself:

- **Are empty and no-results actually different**, with different copy and different actions? This is
  the thing this lesson exists to catch.
- How is state modelled? Independent booleans (`isLoading`, `hasError`, `isEmpty`) allow impossible
  combinations — loading *and* errored at once. A discriminated union does not. Which did it choose?
- Is the copy verbatim from your brief?
- `keyExtractor` — is it using a stable `id`, or the index?
- Is filtering derived during render, or duplicated into state? Duplicated state goes stale.
- Is the mock data realistic, or twelve variations on "John Doe, Developer"?
- Does it use `ListEmptyComponent`, or conditionally render a different tree? Both work — does it
  know which it is doing?
- Is it adding a search or fuzzy-match library? Twelve items need `Array.prototype.filter`.

## Part 5 — Implement

**Suggested prompt:**

> Implement the approved plan. Make it possible to reach every state from the playground UI without
> editing code — I need to be able to see the error and empty states on a device. Then run
> `npm run verify`.

That constraint matters. A state you can only reach by commenting out a line is a state you will
never actually review.

## Part 6 — Run locally

```bash
npm start
```

Things to inspect:

- **Watch the loading state on first render.** Does it flash so briefly it flickers? A loading state
  visible for 80ms is worse than none.
- Type a query that matches nothing. Is the message the no-results one, and does it show your query?
- Trigger the empty state. Is its message different from no-results?
- Trigger the error state. Can you recover from it?
- Scroll fast. Any blank rows, or stutter?
- Clear the search. Does the full list return immediately?
- Paste 200 characters into the search field. Does the no-results message survive?
- Large system font size: do the rows still work?
- VoiceOver/TalkBack: are the states announced when they change, or silently swapped?

## Part 7 — Reiterate

**Suggested feedback (use what you saw):**

> Two things:
>
> 1. The loading state flashes for a fraction of a second and reads as a glitch. Either hold it for a
>    minimum duration once shown, or do not show it for very fast loads — tell me which you chose and
>    why.
> 2. Searching for something with no matches shows the right message, but there is no way back except
>    manually clearing the field. Add a clear affordance in the no-results state.
>
> Run `npm run verify` afterwards.

## Part 8 — Verify

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes, with a test per state
- [ ] The app runs and **every state is reachable from the UI**
- [ ] Human UX review: loading does not flicker, empty ≠ no-results, error recoverable, scrolling
      smooth, long queries handled

```bash
npm run verify
```

## What changed in the repository

- New: `src/data/people.ts` — realistic mock data
- New: the list component and its state components
- New: tests covering all states
- Modified: `src/app/playground.tsx` — Lesson 07 slot
- New/modified: list-state copy in `docs/design/`

## What you should understand before continuing

- A list is five states, not one, and four of them are not the happy path
- **Empty and no-results are different**, with different copy and different recovery actions
- `FlatList` virtualises; `.map()` in a `ScrollView` does not
- Stable keys matter as soon as a list can be filtered or reordered
- Derive filtered data during render; do not duplicate it into state
- Model states so impossible combinations cannot be represented
- Loading states that flash are worse than no loading state at all

## Stretch exercise

Add a filter that can combine with search — a status filter, say. Now there are more states:
search-with-no-results, filter-with-no-results, and both-at-once-with-no-results.

Ask Cowork whether these need distinct messages or whether that is over-engineering, and make it
argue both sides. Then implement whichever you find convincing. Knowing when *not* to add a state is
as valuable as knowing when to.
