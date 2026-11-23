import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InteractiveTimeline from './InteractiveTimeline';

// Mock the logo assets
vi.mock('../assets/SIA_logo.webp', () => ({ default: 'sia-logo.webp' }));
vi.mock('../assets/Flink_logo.webp', () => ({ default: 'flink-logo.webp' }));
vi.mock('../assets/Takeaway_logo.webp', () => ({ default: 'takeaway-logo.webp' }));
vi.mock('../assets/HagaZiekenhuis_logo.webp', () => ({ default: 'haga-logo.webp' }));
vi.mock('../assets/Boomerang_logo.webp', () => ({ default: 'boomerang-logo.webp' }));
vi.mock('../assets/JOR_logo.webp', () => ({ default: 'jor-logo.webp' }));
vi.mock('../assets/Huracan_logo.webp', () => ({ default: 'huracan-logo.webp' }));
vi.mock('../assets/Instantflows_logo.webp', () => ({ default: 'instantflows-logo.webp' }));
vi.mock('../assets/Aics_logo.webp', () => ({ default: 'aics-logo.webp' }));

describe('InteractiveTimeline Component', () => {
  it('renders heading and instructions', () => {
    render(<InteractiveTimeline />);
    expect(screen.getByText('Interactive Career Timeline')).toBeInTheDocument();
    expect(screen.getByText(/Drag to scroll. Click cards to inspect./i)).toBeInTheDocument();
  });

  it('renders experience cards on the timeline', () => {
    render(<InteractiveTimeline />);
    expect(screen.getAllByText('SIA Partners').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Huracán').length).toBeGreaterThan(0);
    expect(screen.getAllByText('InstantFlows').length).toBeGreaterThan(0);
  });

  it('renders selected detail pane initially', () => {
    render(<InteractiveTimeline />);
    expect(screen.getByText('SIA Partners /')).toBeInTheDocument();
    expect(screen.getByText(/Supported clients in infrastructure/i)).toBeInTheDocument();
  });

  it('changes selected item when a card is clicked', () => {
    render(<InteractiveTimeline />);
    
    // Find and click on "InstantFlows" card
    const instantflowsCards = screen.getAllByText('InstantFlows');
    const card = instantflowsCards.find(el => el.tagName === 'H4');
    expect(card).toBeDefined();
    if (card) {
      fireEvent.click(card);
    }
    
    expect(screen.getByText('InstantFlows /')).toBeInTheDocument();
    expect(screen.getByText(/Planning, organizing and leading a small team/i)).toBeInTheDocument();
  });
});
