# React Native Claude Workshop

A local-first React Native workshop for learning Expo, VS Code, Claude Cowork, and Claude Code
through progressively harder component exercises.

Clone it, run it on a simulator or your own phone, and work through thirteen lessons that each teach
one React Native skill **and** one skill in working with Claude.

---

## What this repository is

A working Expo app plus a course that runs on top of it.

You will build real components — buttons, cards, forms, lists — on your own machine, and you will
practise a specific way of working with AI:

> **design in Cowork → plan in Claude Code → implement → test → look at it → reiterate**

The app in `src/` is deliberately small and unfinished. Empty slots in the Component Playground fill
in as you complete lessons. The capstone is left unsolved on purpose, because solving it is Lesson 11.

## What this repository is **not**

- **No cloud account required.** Not AWS, Cloudflare, Vercel, Firebase, or Supabase.
- **No backend.** All data is local mock data.
- **No database.**
- **No deployment or hosting setup.**
- **No app-store release pipeline, no EAS cloud builds.**
- **No API keys, no `.env` file.**

All of that is real work, and none of it is this workshop. You can add it later, once you have
something worth shipping. Everything here runs on your laptop.

---

## The core workflow

This is the point of the whole repository. Every lesson walks this path.

```text
                    COWORK
        design · UX · content · critique
                       │
                       ▼
        a durable brief / a clear direction
                       │
                       ▼
             CLAUDE CODE — PLAN
          inspect → reason → propose
              (no files change yet)
                       │
                       ▼
                 HUMAN REVIEW
        you read the plan and change it
                       │
                       ▼
           CLAUDE CODE — IMPLEMENT
                       │
                       ▼
                     TEST
     types + lint + automated tests + run the app
                       │
                       ▼
               HUMAN UX REVIEW
      look at it on a simulator or a real phone
                       │
                       ▼
                   REITERATE
         specific feedback → round again
```

**Cowork** is where you decide *what to build*. Explore layouts, argue with yourself about states,
get the wording right. No code. Deciding this in a design conversation is far cheaper than
discovering it halfway through an implementation.

**A durable brief** is the handoff. It records the decisions you made and why — what states the
component has, what happens to a 60-character name, what the error message says. It lives in
`docs/design/` and survives long after the conversation is gone.

**Plan mode** is Claude Code reading the repository and telling you what it intends to do *before it
touches anything*. It is the highest-leverage habit in this workshop.

**Human review** is you reading that plan properly. A plan is cheap to change; an implementation is
not. If you cannot say which files it will change and why, you are not ready to approve it.

**Implement** is the part everyone thinks is the whole job. It is maybe a fifth of it.

**Test** is two different things: the checks a machine can run (`npm run verify`) and running the
actual app. Both are required, and neither substitutes for the other.

**Human UX review** is the step nothing can do for you. Types passing tells you nothing about
whether the disabled button looks disabled. Open the app and look at it.

**Reiterate** is the normal case, not a failure. First attempts are drafts. The skill being taught
is giving *specific* feedback — "the loading state changes the button's width, so the row jumps"
beats "make it better" every single time.

---

## Cowork versus Claude Code

| Task | Cowork | Claude Code |
| --- | --- | --- |
| Explore UI directions | **Primary** | Secondary |
| UX critique | **Primary** | Secondary |
| Write microcopy | **Primary** | Secondary |
| Define component states | **Primary** | Collaborates |
| Inspect existing code | Secondary | **Primary** |
| Make an implementation plan | No | **Primary** |
| Write React Native code | No | **Primary** |
| Run tests | No | **Primary** |
| Debug an implementation | No | **Primary** |
| Review the actual UX | Human + Cowork | Human + Code |

This split is a **useful default, not a law**. Claude Code can discuss design and Cowork can reason
about code. The reason to keep them apart while learning is that they pull in different directions:
design work wants divergence and options, implementation wants a single decided path. Mixing them
tends to produce code that quietly encodes a design decision nobody actually made.

---

## Prerequisites

**Everyone needs:**

- **Node.js 20 or newer** — `node --version`
- **Git**
- **VS Code**
- **A Claude account with Claude Code access**, and the
  [Claude Code VS Code extension](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)
- **Cowork access**, for the design half of the workflow

**Then pick at least one way to run the app.** You do not need all of these — one is enough:

| Target | You need | Notes |
| --- | --- | --- |
| **iOS Simulator** | macOS + Xcode | The smoothest option if you have a Mac. |
| **Android Emulator** | Android Studio + a virtual device | Works on macOS, Windows and Linux. |
| **Your own phone** | The Expo Go app, on the same Wi-Fi | No Xcode or Android Studio needed at all. |
| **Web browser** | Nothing extra | Convenient, but see the warning below. |

> **Expo Go** is the fastest way in if you would rather not install Xcode or Android Studio: install
> it from the App Store or Play Store, run `npm start`, and scan the QR code. This project uses only
> standard Expo SDK 57 packages, so it runs in Expo Go without a custom development build.

---

## First-time setup

```bash
git clone https://github.com/randalmaile/react-native-claude-workshop.git
cd react-native-claude-workshop
npm install
```

Confirm everything is healthy before you change anything:

```bash
npm run verify
```

That runs the TypeScript compiler, ESLint and the test suite. On a clean clone it should pass. If it
does not, fix that before starting Lesson 00 — you want a known-good baseline to compare against.

---

## Run locally

```bash
npm start
```

Metro (the React Native bundler) starts and prints a QR code plus a menu of keyboard shortcuts. Leave
this running in a terminal while you work — it watches your files and hot-reloads the app on save.

Useful keys in that terminal: `i` iOS Simulator · `a` Android Emulator · `w` web · `r` reload ·
`j` open the debugger · `m` toggle the dev menu · `Ctrl+C` stop.

### Mac + iOS Simulator

```bash
npm run ios
```

Opens the Simulator and installs the app. Requires Xcode (from the Mac App Store) — open it once
after installing so it can finish setting up its command line tools.

### Android Emulator

```bash
npm run android
```

Requires Android Studio with at least one virtual device created in Device Manager. Start the
emulator first if it is not already running.

### Physical phone

1. Install **Expo Go** from the App Store or Play Store.
2. Put your phone and computer on the **same Wi-Fi network**.
3. Run `npm start`.
4. iOS: scan the QR code with the Camera app. Android: scan it from inside Expo Go.

This is the most honest way to review your work — real screen size, real touch targets, real
performance, real keyboard.

### Web fallback

```bash
npm run web
```

Genuinely useful: it is fast, and the browser devtools are excellent for inspecting layout.

> **But web is not proof.** React Native renders to real native views on a phone and to DOM elements
> in a browser, and they do not always agree. Touch feedback, keyboard avoidance, safe areas,
> scrolling, shadows and fonts all differ. **A component is not verified until you have seen it on a
> native target.** Web is a convenience during development, not a substitute for review.

---

## Claude Code in VS Code

Open the project folder in VS Code. If you accept the recommended extensions
(`.vscode/extensions.json`), you get Claude Code, Expo Tools and ESLint.

**Start a session:** open the Claude Code panel from the sidebar, or press `Cmd+Esc` / `Ctrl+Esc`.

Inside VS Code, Claude Code can read the whole repository, let you `@`-mention specific files and
line ranges, show you diffs before you accept them, work in Plan mode, run terminal commands, and run
your tests. Your Metro server can keep running in the integrated terminal the entire time — Claude
Code works alongside it, and Fast Refresh updates the app as files change.

```text
┌─────────────────────────────────────────────────────┐
│ VS CODE                                             │
│                                                     │
│  source files              Claude Code              │
│  src/app/index.tsx         plan / implementation    │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Integrated terminal                                 │
│ $ npm start        ← leave this running             │
└─────────────────────────────────────────────────────┘

                        ↓

                 device / simulator
```

### Plan mode

**Plan mode is on by default in this project.** `.claude/settings.json` sets
`permissions.defaultMode` to `"plan"`, so a new session starts by investigating and proposing rather
than editing.

In Plan mode Claude Code reads files, reasons about the change and writes out what it intends to do.
It does not modify anything until you approve. You can also toggle it manually with **`Shift+Tab`**,
which cycles permission modes, or set it for a session with `/config`.

**Read the plan.** Really read it. Before approving, you should be able to answer:

- Which files will change, and which will be created?
- Does it reuse what already exists, or quietly reinvent it?
- Does it handle the states I care about — disabled, loading, empty, error?
- Is it adding a dependency? Why? Is that justified?
- Did it understand the requirement, or a plausible-sounding neighbour of it?

Approving every plan unread turns Plan mode into a slower way of doing the wrong thing. The habit
this workshop is trying to build is *changing at least one thing about a plan before you accept it.*

---

## The development loop, concretely

A real cycle, end to end:

**1. Cowork — decide what it is**

> Design a reusable mobile profile card. It shows an avatar, a name, a role and a short bio, plus
> one primary action. What states does it need? What happens with a very long name, or when the
> avatar image is missing? Give me three layout directions and tell me the trade-offs.

**2. Write the brief** — capture the direction you chose in `docs/design/profile-card.md`.

**3. Claude Code — Plan mode**

> Read `AGENTS.md`, `docs/design/profile-card.md`, and the existing components in
> `src/components/`. Plan the implementation of the ProfileCard component, reusing what is already
> there. Do not edit any files yet.

**4. Human — review the plan.** It plans a new `Avatar`, but you already have image handling in the
lesson-01 card. You tell it to reuse that instead. *The plan changed because you read it.*

**5. Claude Code — implement**

> Implement the approved plan. Then run `npm run verify`.

**6. Human — run the app.** `npm start`, press `i`, and look at it. The four-line bio pushes the
action button off the bottom of the card.

**7. Claude Code — reiterate**

> The bio can be arbitrarily long and it is pushing the action button out of the card. Clamp it to
> three lines with an ellipsis, keeping the full text available to screen readers. Add a test with a
> long bio. Run `npm run verify` afterwards.

**8. Verify again** — checks pass, and you look at it on the simulator once more.

Notice that steps 4, 6 and 8 are yours. That is the workshop.

---

## Commands

| Command | What it does |
| --- | --- |
| `npm start` | Start Metro. Leave it running; press `i`, `a` or `w` to open a target. |
| `npm run ios` | Start Metro and open the iOS Simulator (macOS + Xcode). |
| `npm run android` | Start Metro and open the Android Emulator (Android Studio). |
| `npm run web` | Start Metro and open the app in a browser. |
| `npm run typecheck` | TypeScript, no emit. Catches type errors across the project. |
| `npm run lint` | ESLint via `expo lint`. |
| `npm test` | Run the Jest suite once. |
| `npm run test:watch` | Re-run tests as files change. Good while building a component. |
| `npm run verify` | **typecheck + lint + tests.** The gate before you call something done. |
| `npm run doctor` | Expo diagnostics — checks dependency versions and project config. |

`npm run verify` deliberately does **not** launch a simulator. No automated check in this repository
can see the screen, so visual review stays a human step.

---

## Lessons

Full index with prerequisites and difficulty: **[`docs/lessons/README.md`](docs/lessons/README.md)**

**Foundation**

- [00 — Environment and the Local Loop](docs/lessons/00-environment-and-local-loop.md)
- [01 — React Native Primitives](docs/lessons/01-react-native-primitives.md)
- [02 — A Cowork Design Brief](docs/lessons/02-cowork-design-brief.md)

**Components**

- [03 — Plan, then Implement a Button](docs/lessons/03-plan-implement-button.md)
- [04 — Component States and Design Tokens](docs/lessons/04-component-states-and-tokens.md)
- [05 — Component Composition](docs/lessons/05-component-composition.md)

**Application behavior**

- [06 — Forms and Validation](docs/lessons/06-forms-and-validation.md)
- [07 — Lists and UI States](docs/lessons/07-lists-and-ui-states.md)
- [08 — Navigation and Platform Differences](docs/lessons/08-navigation-and-platforms.md)

**Quality**

- [09 — Accessibility](docs/lessons/09-accessibility.md)
- [10 — Testing, Debugging and Reiteration](docs/lessons/10-testing-debugging-reiteration.md)

**Capstone**

- [11 — Capstone: Cowork to Code](docs/lessons/11-capstone-cowork-to-code.md)

**Optional advanced**

- [12 — Optional: Isolated Component Development](docs/lessons/12-optional-storybook.md)

---

## Project structure

```text
├── src/
│   ├── app/                    # Expo Router routes — every file here IS a route
│   │   ├── _layout.tsx         #   the navigation stack wrapping all screens
│   │   ├── index.tsx           #   "/"          the workshop home screen
│   │   ├── playground.tsx      #   "/playground" where your components go
│   │   └── capstone.tsx        #   "/capstone"   deliberately unsolved
│   ├── components/workshop/    # components used by the workshop's own screens
│   ├── data/                   # local mock data (no network, ever)
│   └── theme/                  # design tokens: colors, spacing, radius, typography
│
├── __tests__/                  # tests live outside src/app so they aren't routes
│
├── docs/
│   ├── design/                 # durable design decisions and component briefs
│   └── lessons/                # the course
│
├── assets/                     # app icon, splash image, adaptive icons
│
├── AGENTS.md                   # the rules Claude follows in this repository
├── CLAUDE.md                   # points at AGENTS.md (Expo's convention)
├── .claude/settings.json       # Plan mode default + the Expo Claude plugin
└── .vscode/                    # recommended extensions and editor settings
```

**Routes live in `src/app/`**, not a root-level `app/`. That is the current Expo Router convention
for the SDK 57 default template. Adding a file there adds a route — which is why tests live in
`__tests__/` instead.

**`@/` is an alias for `src/`.** `import { colors } from '@/theme'` beats `../../../theme`.

---

## Working with design briefs

`docs/design/` holds decisions the project should keep knowing. Cowork is good at helping you write
these — after you have explored options and picked one, ask it to write the direction up as a brief.

A brief is worth committing when it records **what was decided and why**: the states a component
supports, how it behaves with hostile content, the exact wording of an error message, the reasoning
behind a layout choice. Files like `profile-card.md`, `form-patterns.md` or `visual-direction.md`
emerge from the lessons — they are not pre-created here.

The rule:

> **If it will still be useful three months from now, it may be documentation.
> If it becomes obsolete the moment Claude Code finishes executing it, it is a prompt, not
> documentation.**

Do not commit every prompt you send. A repository full of stale instructions is worse than one with
none, because it *looks* authoritative. If you want to keep working prompts on disk, put them in
`.prompts/`, which is gitignored.

---

## Definition of done

For a normal component task, all of these — not most of them:

- [ ] The requirement is understood, including its edge cases
- [ ] A plan was produced **and read**
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes, and covers the new behavior
- [ ] The app runs
- [ ] **A human looked at it on a native target** — not only in a browser
- [ ] Edge cases were checked: long text, missing data, disabled, loading, error, empty
- [ ] Any needed reiteration was done, and verification re-run afterwards

The one that gets skipped is the human review. It is also the only one that catches "technically
correct, visually wrong".

---

## Common mistakes

**Claude writes DOM elements.** `<div>`, `<span>`, `<button>` — these do not exist in React Native.
It happens because there is vastly more React-for-web training data than React Native. `AGENTS.md`
forbids it; if you see one, say so directly.

**Adding libraries reflexively.** A date picker, a state manager, a styling framework. Ask what
React Native and Expo already provide first. Every dependency is permanent weight.

**Approving a plan without reading it.** This defeats the entire mechanism. If you cannot summarise
the plan, you have not read it.

**Assuming generated code is correct because it is confident and well-formatted.** It compiles. That
is a much lower bar than "works" or "is right".

**Only testing on web.** Fast and convenient, and it will not show you a broken keyboard avoidance,
a bad safe area, or a touch target that is too small.

**Hardcoding styles everywhere.** `#1F5C8B` scattered across nine components means restyling is nine
edits and a hunt. That is exactly the mess tokens prevent — for you *and* for Claude.

**Forgetting the states that are not the happy path.** Disabled, loading, error, empty, no-results.
They are most of the real work, and they are what gets skipped.

**Letting one Claude conversation run forever.** Context fills with stale decisions and abandoned
directions. Start fresh for new work.

**Saying "make it better".** Claude will change something, more or less at random. Describe what you
observed, what you expected, and on which device.

**Not re-running tests after iterating.** The fix for one thing routinely breaks another.

**Building a backend before the UI needs one.** You do not need a server to learn `FlatList`.

---

## When to start a fresh Claude conversation

Start a new conversation when you move to a genuinely new task — a new component, a new lesson, a
bug unrelated to what you were just doing.

Long conversations accumulate context that is no longer true: rejected approaches, superseded
decisions, half-finished attempts. That history competes with your actual instructions, and the model
has no way to know which parts you have mentally discarded.

The useful test: **anything the project should still know next month belongs in the repository, not
in a conversation.** Persistent rules go in `AGENTS.md`. Design decisions go in `docs/design/`. If
you find yourself re-explaining the same convention in every session, that is a signal to write it
into `AGENTS.md` — where it will be loaded automatically, forever, at no effort.

Conversation history is working memory. It is not documentation, and it should never become the only
place an important decision is recorded.

---

## License

MIT — see [LICENSE](LICENSE).
