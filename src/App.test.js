import { render, screen } from '@testing-library/react';
import App from './App';
import CardWidget from './sections/CardWidget';
import TopContributors from './sections/TopContributors';
import RecentCommits from './sections/RecentCommits';


import { act } from 'react-dom/test-utils';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test('Title', () => {
  act(() => {
    render(<App />);
  }, container);

  expect(screen.getByText(/IcPulse/i)).toBeInTheDocument();
});

test('CardWidget', () => {
  render(<CardWidget name='CardWidgetName' value = '100' subtitle = 'test'/>);

  expect(screen.getByText(/CardWidgetName/i)).toBeInTheDocument();
  expect(screen.getByText(/100/i)).toBeInTheDocument();
  expect(screen.getByText(/test/i)).toBeInTheDocument();
});

test('TopContributors', () => {
  act(() => {
    render(<TopContributors />);
  }, container);

  expect(screen.getByText(/Contributors of the month/i)).toBeInTheDocument();
});

test('RecentCommits', () => {
  act(() => {
    render(<RecentCommits />);
  }, container);

  expect(screen.getByText(/Recent commits/i)).toBeInTheDocument();
});
