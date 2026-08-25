/**
 * The workshop curriculum.
 *
 * This is plain local data — no network, no database. The home screen renders it,
 * and `docs/lessons/README.md` mirrors it in prose.
 */

export type LessonGroup =
  | 'Foundation'
  | 'Components'
  | 'Application behavior'
  | 'Quality'
  | 'Capstone'
  | 'Optional advanced';

export type LessonDifficulty = 'Intro' | 'Easy' | 'Moderate' | 'Challenging';

export type Lesson = {
  /** Two-digit lesson number, e.g. "03". Also used as the React list key. */
  id: string;
  title: string;
  /** One sentence describing what the learner builds or practises. */
  summary: string;
  /** The main React Native idea this lesson teaches. */
  reactNativeFocus: string;
  /** The main Claude-workflow skill this lesson teaches. */
  claudeFocus: string;
  difficulty: LessonDifficulty;
  group: LessonGroup;
  /** Path to the lesson file, relative to the repository root. */
  file: string;
};

export const lessons: Lesson[] = [
  {
    id: '00',
    title: 'Environment and the Local Loop',
    summary:
      'Get the app running on your own machine and confirm Claude Code can read the repository.',
    reactNativeFocus: 'Metro, Fast Refresh, simulators and devices',
    claudeFocus: 'Opening a session and verifying repository access',
    difficulty: 'Intro',
    group: 'Foundation',
    file: 'docs/lessons/00-environment-and-local-loop.md',
  },
  {
    id: '01',
    title: 'React Native Primitives',
    summary:
      'Build a small content card from View, Text, Pressable and friends — no DOM elements anywhere.',
    reactNativeFocus: 'View, Text, Pressable, Image, ScrollView, StyleSheet',
    claudeFocus: 'Asking Claude to explain rather than hide unfamiliar concepts',
    difficulty: 'Easy',
    group: 'Foundation',
    file: 'docs/lessons/01-react-native-primitives.md',
  },
  {
    id: '02',
    title: 'A Cowork Design Brief',
    summary:
      'Explore a reusable Profile Card in Cowork, choose a direction, and write a durable brief.',
    reactNativeFocus: 'Component states and edge cases, before any code',
    claudeFocus: 'Cowork for design exploration; briefs versus one-time prompts',
    difficulty: 'Easy',
    group: 'Foundation',
    file: 'docs/lessons/02-cowork-design-brief.md',
  },
  {
    id: '03',
    title: 'Plan, then Implement a Button',
    summary:
      'Use Plan mode to design a reusable Button with primary, secondary, disabled and loading states.',
    reactNativeFocus: 'Props, Pressable, pressed state, accessibility roles',
    claudeFocus: 'Plan mode, reading a plan critically, one deliberate reiteration',
    difficulty: 'Moderate',
    group: 'Components',
    file: 'docs/lessons/03-plan-implement-button.md',
  },
  {
    id: '04',
    title: 'Component States and Design Tokens',
    summary:
      'Revise the visual direction in Cowork, then build small stateful components on tokens.',
    reactNativeFocus: 'Semantic tokens, avoiding one-off styling',
    claudeFocus: 'Why tokens make AI-assisted restyling reliable',
    difficulty: 'Moderate',
    group: 'Components',
    file: 'docs/lessons/04-component-states-and-tokens.md',
  },
  {
    id: '05',
    title: 'Component Composition',
    summary:
      'Implement the Profile Card from Lesson 02 by composing the pieces you have already built.',
    reactNativeFocus: 'Composition over large components; layout under pressure',
    claudeFocus: 'Making Claude read the design brief and plan for reuse',
    difficulty: 'Moderate',
    group: 'Components',
    file: 'docs/lessons/05-component-composition.md',
  },
  {
    id: '06',
    title: 'Forms and Validation',
    summary:
      'Build a local-only contact form with real validation, error copy and a disabled submit state.',
    reactNativeFocus: 'TextInput, controlled state, keyboard handling',
    claudeFocus: 'Cowork for microcopy, Claude Code for logic and tests',
    difficulty: 'Moderate',
    group: 'Application behavior',
    file: 'docs/lessons/06-forms-and-validation.md',
  },
  {
    id: '07',
    title: 'Lists and UI States',
    summary:
      'Render mock data in a FlatList and handle loading, empty, no-results and populated states.',
    reactNativeFocus: 'FlatList, keys, filtering, distinct UI states',
    claudeFocus: 'Designing state copy in Cowork before implementing',
    difficulty: 'Moderate',
    group: 'Application behavior',
    file: 'docs/lessons/07-lists-and-ui-states.md',
  },
  {
    id: '08',
    title: 'Navigation and Platform Differences',
    summary:
      'Add routes and parameters with Expo Router, and notice where platforms genuinely differ.',
    reactNativeFocus: 'Expo Router, route params, safe areas, Platform',
    claudeFocus: 'Describing platform-specific defects precisely',
    difficulty: 'Challenging',
    group: 'Application behavior',
    file: 'docs/lessons/08-navigation-and-platforms.md',
  },
  {
    id: '09',
    title: 'Accessibility',
    summary:
      'Audit what you have built with a screen reader, then fix the semantics rather than paper over them.',
    reactNativeFocus: 'Roles, labels, hints, contrast, touch targets, text scaling',
    claudeFocus: 'Cowork for UX critique, Claude Code for code-level audit',
    difficulty: 'Challenging',
    group: 'Quality',
    file: 'docs/lessons/09-accessibility.md',
  },
  {
    id: '10',
    title: 'Testing, Debugging and Reiteration',
    summary:
      'Reproduce real defects, make Claude investigate before it edits, and gate the work on npm run verify.',
    reactNativeFocus: 'Testing behavior, not implementation details',
    claudeFocus: 'Observed-versus-expected debugging; investigate before changing code',
    difficulty: 'Challenging',
    group: 'Quality',
    file: 'docs/lessons/10-testing-debugging-reiteration.md',
  },
  {
    id: '11',
    title: 'Capstone — Cowork to Code',
    summary:
      'Take a deliberately loose brief through the whole workflow and ship a People Directory.',
    reactNativeFocus: 'Assembling lists, detail routes, forms and states into one app',
    claudeFocus: 'The complete loop, including two meaningful reiterations',
    difficulty: 'Challenging',
    group: 'Capstone',
    file: 'docs/lessons/11-capstone-cowork-to-code.md',
  },
  {
    id: '12',
    title: 'Optional — Isolated Component Development',
    summary:
      'Decide whether a tool like Storybook earns its place, and practise dependency discipline.',
    reactNativeFocus: 'When a component library outgrows a playground screen',
    claudeFocus: 'Making Claude investigate and cost a dependency before installing it',
    difficulty: 'Challenging',
    group: 'Optional advanced',
    file: 'docs/lessons/12-optional-storybook.md',
  },
];
