# Lesson 00 — Environment and the Local Loop

## Why this matters

Before you build anything, you need to trust your feedback loop. When you change a line of code, how
long until you see the result, and are you certain you are looking at the change you just made?

Almost every frustrating hour in mobile development traces back to a broken loop — a stale bundle, a
simulator running old code, an editor saving to a file nobody is watching. Ten minutes spent proving
the loop works now will save you hours of debugging things that were never broken.

The same is true of Claude Code. Before you ask it to do anything real, confirm it can actually see
your repository.

## What you will learn

### React Native
- What Metro is and why it must stay running
- How Fast Refresh updates the app without losing state
- Getting the app onto a simulator, an emulator, or your own phone
- Reading Metro's terminal output when something goes wrong

### Claude workflow
- Starting a Claude Code session in VS Code
- Confirming Claude can read the repository
- Finding `AGENTS.md` and understanding why it exists
- Asking for a small, safe, verifiable change as your first request

## Before you start

You need Node 20+, Git, VS Code, and at least one way to run the app (see the README's
[Prerequisites](../../README.md#prerequisites) table). You do not need Xcode *and* Android Studio —
one target is enough, and Expo Go on your own phone needs neither.

```bash
git clone https://github.com/randalmaile/react-native-claude-workshop.git
cd react-native-claude-workshop
npm install
npm run verify
```

`npm run verify` should pass on a clean clone. If it does not, stop and fix that first — you want a
known-good baseline so that the next failure you see is genuinely yours.

## Part 1 — Explore / understand

Open the folder in VS Code. Accept the recommended extensions when prompted.

Look around before running anything:

- `package.json` — every command available to you lives in `scripts`
- `src/app/` — three screens and a layout. **Every file here is a route.**
- `AGENTS.md` — the rules Claude follows in this repository
- `docs/lessons/` — where you are now

Open `src/app/index.tsx` and skim it. You will not understand all of it yet — that is Lesson 01. For
now just notice that there is no HTML anywhere: no `<div>`, no `<p>`, no `<button>`.

## Part 2 — Cowork

This lesson is about your environment, so there is little to design. But it is worth starting the
habit of using Cowork to build understanding rather than to generate code.

**Suggested Cowork prompt:**

> I am starting a React Native workshop using Expo. Explain the relationship between Metro, Expo Go,
> the iOS Simulator and Fast Refresh — what each one is responsible for, and what it looks like when
> each one breaks. I know web development but not mobile.

Notice what this gets you: a mental model. Ask follow-up questions until the pieces fit together.
This is the kind of thing Cowork is genuinely good at, and it is worth the ten minutes.

## Part 3 — Turn the direction into a clear brief

Nothing to commit this lesson. But write yourself two or three lines somewhere — a scratch file, a
notebook — answering:

- Which target am I running on? (Simulator / Emulator / my phone)
- How do I start it, from a cold terminal?
- How will I know a change actually landed?

You will repeat these steps dozens of times. Knowing them cold is the point.

## Part 4 — Claude Code Plan mode

Start a Claude Code session in VS Code (`Cmd+Esc` / `Ctrl+Esc`, or the sidebar panel).

This project starts sessions in **Plan mode** — `.claude/settings.json` sets
`permissions.defaultMode` to `"plan"`. So the first thing Claude does is investigate, not edit.

**Suggested Claude Code prompt:**

> Read `package.json` and `AGENTS.md`. Tell me what npm scripts this project has and what each one
> does, and summarise the three rules from `AGENTS.md` you think are most likely to trip up an AI
> writing React Native. Do not change any files.

**STOP AND REVIEW THE RESPONSE.**

Questions to ask yourself:

- Did it list the *actual* scripts from this repository, or generic Expo ones? (`typecheck`,
  `verify` and `doctor` are specific to this project — if they are missing, it did not really read
  the file.)
- Does its summary of `AGENTS.md` match what you read yourself?
- Did it respect "do not change any files"?

This is a deliberately low-stakes way to confirm Claude Code is actually reading your repository
rather than pattern-matching on what an Expo project usually contains.

## Part 5 — Implement

First, make a change **by hand**. This matters — you need to see the loop work without any AI in it.

Open `src/app/index.tsx`, find the home screen title, and change it to something obviously different:

```tsx
React Native + Claude Workshop   →   Hello from my machine
```

Save. Watch the app update. Then change it back and save again.

Now ask Claude Code for a similarly tiny change.

**Suggested prompt:**

> In `src/app/capstone.tsx`, add one more requirement to the `REQUIREMENTS` list: "A clear loading
> state while data is being prepared". Change nothing else.

Approve the plan, let it edit, and watch the Capstone screen update in the running app.

## Part 6 — Run locally

Leave Metro running in the VS Code integrated terminal the whole time:

```bash
npm start
```

Then press `i` for the iOS Simulator, `a` for the Android Emulator, or scan the QR code with Expo Go
on your phone.

Things to inspect:

- The home screen lists all thirteen lessons
- Tapping **Component Playground** navigates, and the back gesture returns you
- The tap counter on the Playground screen increments
- Your handmade title change appeared **without the app restarting** — that is Fast Refresh
- Your Claude-made change to the Capstone screen appeared too

Try breaking it on purpose: delete a closing `}` in `index.tsx` and save. Read the error Metro prints
and the red screen in the app. Then undo it. Knowing what a syntax error looks like *here* is worth
more than reading about it.

## Part 7 — Reiterate

Ask for one refinement, and pay attention to how much more precise you have to be than you expect:

**Suggested feedback:**

> That new capstone requirement reads a little vague next to the others, which all name something
> concrete. Reword it to match their specificity and tone.

Compare the result to the surrounding items. Did it actually match the register of the list, or just
substitute synonyms?

## Part 8 — Verify

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes
- [ ] The app runs on your chosen target
- [ ] You saw both changes appear live, without a manual restart

```bash
npm run verify
```

## What changed in the repository

- One line added to `REQUIREMENTS` in `src/app/capstone.tsx`, then reworded.

That is all. The output of this lesson is not code — it is a loop you trust.

## What you should understand before continuing

- Metro must keep running; it is the bundler and the file watcher
- Fast Refresh updates the running app on save, usually preserving component state
- Claude Code reads your real files, and you can and should verify that it did
- `AGENTS.md` gives Claude persistent project rules, so you do not re-explain them every session
- Plan mode means investigate first, edit after approval

## Stretch exercise

Run the app on a **second** target — if you used the Simulator, try Expo Go on your phone. Compare
them: text size, the header, the safe area at the top, how the tap feedback feels under a real
finger. Note anything that differs. Lesson 08 comes back to exactly this.
