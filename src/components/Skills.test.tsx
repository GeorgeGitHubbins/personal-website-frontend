import { render, screen, fireEvent } from '@testing-library/react';
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

  it('allows clicking tabs to filter displayed categories', () => {
    render(<Skills />);
    
    // Tab buttons
    const techTab = screen.getByRole('button', { name: 'Engineering & Tech' });
    const dataTab = screen.getByRole('button', { name: 'Data & Analytics' });
    const leadershipTab = screen.getByRole('button', { name: 'Leadership & Strategy' });

    expect(techTab).toHaveClass('active');
    expect(dataTab).not.toHaveClass('active');

    // Click Data tab
    fireEvent.click(dataTab);
    expect(techTab).not.toHaveClass('active');
    expect(dataTab).toHaveClass('active');

    // Click Leadership tab
    fireEvent.click(leadershipTab);
    expect(dataTab).not.toHaveClass('active');
    expect(leadershipTab).toHaveClass('active');
  });

  it('allows clicking radar axis labels to select them and show focused details', () => {
    render(<Skills />);
    
    // Initial state: Core Strengths Overview should be displayed
    expect(screen.getByText('Core Strengths Overview')).toBeInTheDocument();
    
    // Find Systems Design radar label (from multiple elements, get the first one which is the label)
    const systemsDesignLabels = screen.getAllByText('Systems Design');
    const systemsDesignLabel = systemsDesignLabels[0];
    fireEvent.click(systemsDesignLabel);
    
    // It should now show focus details for Systems Design
    expect(screen.getByText('Engineering complex, multi-stakeholder systems and architectural frameworks.')).toBeInTheDocument();
    
    // It should also render related skills inside the tags list
    expect(screen.getAllByText('Systems Engineering')).toHaveLength(2); // One in list, one in focused tag list
  });
});
