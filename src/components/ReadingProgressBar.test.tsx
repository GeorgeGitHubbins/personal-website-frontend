import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ReadingProgressBar from './ReadingProgressBar';

describe('ReadingProgressBar Component', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<ReadingProgressBar />);
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('initially has 0 width', () => {
    const { getByRole } = render(<ReadingProgressBar />);
    const progressBar = getByRole('progressbar');
    expect(progressBar.style.width).toBe('0%');
  });
});
