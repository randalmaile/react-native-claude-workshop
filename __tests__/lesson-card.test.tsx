import { render, screen } from '@testing-library/react-native';

import { LessonCard } from '@/components/workshop/LessonCard';
import type { Lesson } from '@/data/lessons';

const lesson: Lesson = {
  id: '03',
  title: 'Plan, then Implement a Button',
  summary: 'Use Plan mode to design a reusable Button.',
  reactNativeFocus: 'Props, Pressable, pressed state',
  claudeFocus: 'Plan mode and reading a plan critically',
  difficulty: 'Moderate',
  group: 'Components',
  file: 'docs/lessons/03-plan-implement-button.md',
};

describe('LessonCard', () => {
  it('shows the lesson number, title and summary', async () => {
    await render(<LessonCard lesson={lesson} />);

    expect(screen.getByText('03')).toBeOnTheScreen();
    expect(screen.getByText('Plan, then Implement a Button')).toBeOnTheScreen();
    expect(screen.getByText('Use Plan mode to design a reusable Button.')).toBeOnTheScreen();
  });

  it('announces itself to a screen reader as a single lesson', async () => {
    await render(<LessonCard lesson={lesson} />);

    // Assistive tech should read one coherent sentence, not six loose fragments.
    expect(
      screen.getByLabelText('Lesson 03, Plan, then Implement a Button, Moderate'),
    ).toBeOnTheScreen();
  });

  it('renders whichever lesson it is given', async () => {
    await render(<LessonCard lesson={{ ...lesson, id: '09', title: 'Accessibility' }} />);

    expect(screen.getByText('Accessibility')).toBeOnTheScreen();
    expect(screen.queryByText('Plan, then Implement a Button')).not.toBeOnTheScreen();
  });
});
