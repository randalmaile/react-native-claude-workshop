import { render, screen, userEvent } from '@testing-library/react-native';

import PlaygroundScreen from '@/app/playground';

describe('PlaygroundScreen', () => {
  it('counts taps, and says so in words a person would use', async () => {
    const user = userEvent.setup();
    await render(<PlaygroundScreen />);

    expect(screen.getByText('Tapped 0 times.')).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Add one to the counter' }));
    expect(screen.getByText('Tapped once.')).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Add one to the counter' }));
    expect(screen.getByText('Tapped 2 times.')).toBeOnTheScreen();
  });

  it('lists the component slots that lessons will fill in', async () => {
    await render(<PlaygroundScreen />);

    expect(screen.getByText('Lesson 03')).toBeOnTheScreen();
    expect(screen.getByText('Button')).toBeOnTheScreen();
    expect(screen.getByText('Profile card')).toBeOnTheScreen();
  });
});
