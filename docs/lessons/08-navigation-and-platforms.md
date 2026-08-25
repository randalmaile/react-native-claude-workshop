# Lesson 08 — Navigation and Platform Differences

## Why this matters

Navigation is the first thing users judge and the first thing that feels wrong when built naively.
Android's back gesture and hardware back button, iOS's swipe-from-edge, the safe area around a
notch, where a header title sits — these are not styling details. They are what makes an app feel
native rather than like a website in a shell.

This is also where "it works on web" collapses most completely. A browser has none of these
constraints, so every problem in this lesson is invisible until you look at a real device.

## What you will learn

### React Native
- Expo Router: files in `src/app/` are routes
- Dynamic routes and route parameters
- Typed routes (this project enables `typedRoutes`)
- Safe areas, and why hardcoded top padding is always wrong
- Android hardware back and predictive back; iOS edge-swipe
- Using `Platform` only where behavior genuinely differs

### Claude workflow
- Describing platform-specific defects precisely enough to be fixed
- Insisting on the platform's own idioms over a custom reimplementation
- Reviewing a plan for unnecessary `Platform.OS` branching

## Before you start

Finish [Lesson 07](07-lists-and-ui-states.md) — you need the people list to navigate *from*.

**You need two targets for this lesson.** Any two: Simulator and web, Emulator and web, your phone
and a simulator. If you only have one native target, use it plus web and read the Android notes
carefully. Owning multiple devices is not required; noticing differences is.

## Part 1 — Explore / understand

Read `src/app/_layout.tsx`. It declares a `Stack` with three screens.

Then work out:

1. `src/app/index.tsx` is the route `/`, `playground.tsx` is `/playground`. What file gives you
   `/people/42`?
2. `_layout.tsx` names each screen in a `<Stack.Screen>`. What happens if you add a route file but no
   `Stack.Screen` entry?
3. The layout sets `headerStyle` and `contentStyle`. Which safe area is the header handling for you,
   and which one is still your problem?
4. `app.json` has `"typedRoutes": true`. What does that do to a typo in an `href`?

Test 4 right now: change a `NavLink` href to `/playgroundd` and run `npm run typecheck`. Then change
it back. That is a whole class of bug caught at compile time.

## Part 2 — Cowork

**Suggested Cowork prompt:**

> I am adding a detail screen to a React Native app — tapping a person in a list opens their profile.
>
> What are the native conventions I should follow on iOS and Android for this kind of push
> navigation? Cover the back affordance on each platform, header title behavior when a name is too
> long, and what should happen to scroll position when the user comes back to the list.
>
> Where do the two platforms genuinely differ, and where would a difference just be inconsistency for
> its own sake?

That last question is the useful one. Some platform differences are real conventions worth honouring;
others are just two teams having made different arbitrary choices, and matching them costs you a
maintainable codebase for no user benefit.

## Part 3 — Turn the direction into a clear brief

Short notes are enough. Record:

- The route structure — the URL shape for a person's detail screen
- What the detail screen shows, and what its header title is
- How a long name behaves in the header
- What is passed in the route versus looked up on the detail screen
- Which platform differences you will honour, and which you will deliberately ignore

That fourth point matters more than it looks. Passing a whole object through route params is a common
mistake — route params are strings, they end up in URLs, and they go stale. Pass an `id`.

## Part 4 — Claude Code Plan mode

**Suggested Claude Code prompt:**

> Read `AGENTS.md`, `src/app/_layout.tsx`, and the people list from Lesson 07.
>
> Plan a person detail screen: tapping a person in the list navigates to a route with their id, and
> the detail screen looks the person up from the mock data.
>
> In the plan, state: the route file path and its URL shape, how the id is passed and read, how the
> header title is set, what happens when the id does not match anyone, and every place you intend to
> branch on `Platform` — with a justification for each.
>
> Do not edit any files yet.

**STOP AND REVIEW THE PLAN.**

Questions to ask yourself:

- Does it pass an **id**, or serialise the whole person object into the route?
- Does it handle an unknown id? Someone will deep-link a stale URL eventually.
- Is it using Expo Router's `Link` / `router.push`, or reimplementing navigation state by hand?
- **Every `Platform.OS` branch needs a reason.** Is each one a genuine behavioural difference, or a
  cargo-culted `Platform.select` for padding that `useSafeAreaInsets` should be handling?
- Does it set the header title statically or from the person's data? What happens with a long name?
- Is it installing a navigation library? Expo Router is already here.
- Does the plan mention Android's hardware back at all?

## Part 5 — Implement

**Suggested prompt:**

> Implement the approved plan. Then run `npm run verify`, and tell me specifically what you could not
> verify without a device.

That last clause is worth asking for routinely. It makes the boundary explicit — Claude should tell
you that back-gesture behavior and safe areas are yours to check, because no automated check here can
see them.

## Part 6 — Run locally

**Run on both targets.** This is the lesson.

```bash
npm start
# press i for iOS Simulator, a for Android Emulator, w for web
```

Things to inspect **on each target**:

| Check | iOS | Android | Web |
| --- | --- | --- | --- |
| Back affordance | Swipe from left edge | Hardware/gesture back | Browser back button |
| Header back control | Chevron + label | Arrow only | — |
| Long name in header | Truncates how? | Truncates how? | — |
| Safe area at top | Notch / Dynamic Island | Status bar | — |
| Return to list | Scroll position kept? | Scroll position kept? | Kept? |
| Deep link | `npx uri-scheme open rnclaudeworkshop://people/3 --ios` | `--android` | Paste the URL |

Also:

- On Android, press the **hardware back button** from the detail screen. Does it go back, or exit the
  app?
- Rotate on both. Does the header survive?
- Try a person whose name is very long. Compare the header on both platforms.

Write down every difference you find, even ones you decide not to fix. That list is the actual
deliverable of Part 6.

## Part 7 — Reiterate

Pick a real difference you found.

**Suggested feedback:**

> Two platform issues from device testing:
>
> 1. On Android, a long name in the header is cut off mid-word with no ellipsis, while iOS truncates
>    it cleanly. Make Android match.
> 2. Coming back from the detail screen to the list resets the scroll position to the top on both
>    platforms. Preserve it.
>
> For the first one, tell me whether this needs a `Platform` branch or whether there is a
> cross-platform way to express it — I would rather not branch if we do not have to.
>
> Run `npm run verify` afterwards.

That final instruction is a good habit generally: ask whether a platform branch is *necessary* before
accepting one. Every branch doubles what you have to test forever.

## Part 8 — Verify

- [ ] `npm run typecheck` passes (typed routes catch bad hrefs here)
- [ ] `npm run lint` passes
- [ ] `npm test` passes
- [ ] The app runs **on at least two targets**
- [ ] Human UX review on each: back works natively, safe areas correct, long titles handled, Android
      hardware back behaves, unknown ids handled gracefully

```bash
npm run verify
```

## What changed in the repository

- New: a dynamic route for the person detail screen in `src/app/`
- Modified: `src/app/_layout.tsx` — the new screen registered
- Modified: the list rows now navigate
- New: tests for the detail screen, including the unknown-id case

## What you should understand before continuing

- Files in `src/app/` are routes; a dynamic segment is a filename convention
- Typed routes turn a broken link into a compile error
- Pass **ids** through routes, not serialised objects
- Safe areas come from the device, not from a constant you picked
- Android hardware back is real and needs to work
- **Use `Platform` only where behavior genuinely differs** — every branch is permanent test surface
- Web will not show you any of this

## Stretch exercise

Make the detail screen deep-linkable and test it cold — quit the app entirely, then open
`rnclaudeworkshop://people/3` from the terminal:

```bash
npx uri-scheme open rnclaudeworkshop://people/3 --ios
npx uri-scheme open rnclaudeworkshop://people/3 --android
```

Does the back button do something sensible when there is no screen to go back to? That case is
routinely broken in shipped apps, and it is a good example of a bug that only a specific real-world
entry path reveals.
