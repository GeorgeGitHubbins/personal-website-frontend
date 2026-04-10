import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Skills from './Skills';

describe('Skills Component', () => {
  it('renders the skills section heading', () => {
    render(<Skills />);
    expect(screen.getByText('Skills & Expertise')).toBeInTheDocument();
  });

  it('renders skill categories', () => {
    render(<Skills />);
    expect(screen.getByText('Engineering & Tech')).toBeInTheDocument();
    expect(screen.getByText('Data & Analytics')).toBeInTheDocument();
    expect(screen.getByText('Leadership & Strategy')).toBeInTheDocument();
  });

  it('renders specific skill badges', () => {
    render(<Skills />);
    expect(screen.getByText('Systems Engineering')).toBeInTheDocument();
    expect(screen.getByText('AI & LLMs')).toBeInTheDocument();
    expect(screen.getByText('Data Science')).toBeInTheDocument();
  });
});
