# Lessons

Thirteen lessons, meant to be worked through in order. Each one teaches a **React Native** skill and
a **Claude workflow** skill, because in practice you need both at once.

Every lesson follows the same shape: understand the problem → explore it in Cowork → write down the
direction → plan it in Claude Code → **review the plan** → implement → run the checks → look at it on
a device → reiterate → verify again.

## Groups

| Group | Lessons | What it builds |
| --- | --- | --- |
| **Foundation** | 00–02 | The local loop, React Native primitives, and designing before coding |
| **Components** | 03–05 | Reusable components, design tokens, and composition |
| **Application behavior** | 06–08 | Forms, lists and their states, navigation and platforms |
| **Quality** | 09–10 | Accessibility, testing, debugging and deliberate iteration |
| **Capstone** | 11 | The whole workflow, on a deliberately loose brief |
| **Optional advanced** | 12 | Dependency discipline, via isolated component development |

## The lessons

| # | Title | React Native concept | Claude concept | Difficulty | Prerequisite |
| --- | --- | --- | --- | --- | --- |
| [00](00-environment-and-local-loop.md) | Environment and the Local Loop | Metro, Fast Refresh, simulators and devices | Opening a session; verifying repository access | Intro | — |
| [01](01-react-native-primitives.md) | React Native Primitives | `View`, `Text`, `Pressable`, `Image`, `ScrollView`, `StyleSheet` | Asking Claude to explain rather than hide concepts | Easy | 00 |
| [02](02-cowork-design-brief.md) | A Cowork Design Brief | Component states and edge cases, before any code | Cowork for design; briefs versus one-time prompts | Easy | 01 |
| [03](03-plan-implement-button.md) | Plan, then Implement a Button | Props, `Pressable`, pressed state, accessibility roles | **Plan mode**; reading a plan critically; one reiteration | Moderate | 01 |
| [04](04-component-states-and-tokens.md) | Component States and Design Tokens | Semantic tokens; avoiding one-off styling | Why tokens make AI-assisted restyling reliable | Moderate | 03 |
| [05](05-component-composition.md) | Component Composition | Composition over large components; layout under pressure | Making Claude read the brief and plan for reuse | Moderate | 02, 03, 04 |
| [06](06-forms-and-validation.md) | Forms and Validation | `TextInput`, controlled state, keyboard handling | Cowork for microcopy, Claude Code for logic and tests | Moderate | 03, 04 |
| [07](07-lists-and-ui-states.md) | Lists and UI States | `FlatList`, keys, filtering, distinct UI states | Designing state copy in Cowork before implementing | Moderate | 05 |
| [08](08-navigation-and-platforms.md) | Navigation and Platform Differences | Expo Router, route params, safe areas, `Platform` | Describing platform-specific defects precisely | Challenging | 07 |
| [09](09-accessibility.md) | Accessibility | Roles, labels, hints, contrast, touch targets, text scaling | Cowork for UX critique, Claude Code for code audit | Challenging | 05, 06, 07 |
| [10](10-testing-debugging-reiteration.md) | Testing, Debugging and Reiteration | Testing behavior, not implementation details | Observed-vs-expected debugging; investigate before editing | Challenging | 06, 07, 09 |
| [11](11-capstone-cowork-to-code.md) | Capstone — Cowork to Code | Lists, detail routes, forms and states in one app | The complete loop, with two real reiterations | Challenging | 00–10 |
| [12](12-optional-storybook.md) | *Optional* — Isolated Component Development | When a component library outgrows a playground screen | Making Claude cost a dependency before installing it | Challenging | 11 |

## Before you start

Work through them in order — later lessons build on components you made earlier. Lesson 05 needs the
Button from 03 and the brief from 02; the capstone needs nearly everything.

Confirm your baseline is clean first:

```bash
npm install
npm run verify
```

Then begin with [Lesson 00](00-environment-and-local-loop.md).

## How to get the most out of this

**Do the human steps.** Reading the plan, running the app, spotting the defect — those are the
lessons. Approving everything unread and skipping to the end teaches you nothing that would survive
contact with a real project.

**Reiterate even when it looks fine.** Several lessons ask you to deliberately find something to
improve. That is practice for the skill that actually matters: describing a problem precisely enough
that it gets fixed properly the first time.

**Start fresh conversations between lessons.** Each lesson is a new task. Stale context from the last
one competes with the current instructions.
