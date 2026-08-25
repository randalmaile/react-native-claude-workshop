import { render, screen } from '@testing-library/react-native';

import HomeScreen from '@/app/index';
import { lessons } from '@/data/lessons';

describe('HomeScreen', () => {
  it('introduces the workshop', async () => {
    await render(<HomeScreen />);

    expect(screen.getByRole('header', { name: 'React Native + Claude Workshop' })).toBeOnTheScreen();
  });

  it('spells out every stage of the loop', async () => {
    await render(<HomeScreen />);

    for (const stage of ['Design', 'Plan', 'Implement', 'Test', 'Reiterate']) {
      expect(screen.getByText(stage)).toBeOnTheScreen();
    }
  });

  it('lists every lesson', async () => {
    await render(<HomeScreen />);

    expect(screen.getByText(`Lessons (${lessons.length})`)).toBeOnTheScreen();
    for (const lesson of lessons) {
      expect(screen.getByText(lesson.title)).toBeOnTheScreen();
    }
  });

  it('offers links to the playground and the capstone', async () => {
    await render(<HomeScreen />);

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(2);
    expect(screen.getByText('Component Playground')).toBeOnTheScreen();
    expect(screen.getByText('Capstone')).toBeOnTheScreen();
    // Every link explains where it goes, so the destination is not carried by the arrow alone.
    expect(links.every((link) => Boolean(link.props.accessibilityHint))).toBe(true);
  });
});
