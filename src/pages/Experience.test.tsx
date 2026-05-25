import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Experience from './Experience';
import { BrowserRouter } from 'react-router-dom';

// Mock the assets
vi.mock('../assets/SIA_logo.png', () => ({ default: 'sia-logo.png' }));
vi.mock('../assets/Flink_logo.png', () => ({ default: 'flink-logo.png' }));
vi.mock('../assets/Takeaway_logo.png', () => ({ default: 'takeaway-logo.png' }));
vi.mock('../assets/HagaZiekenhuis_logo.png', () => ({ default: 'haga-logo.png' }));
vi.mock('../assets/Boomerang_logo.png', () => ({ default: 'boomerang-logo.png' }));
vi.mock('../assets/JOR_logo.png', () => ({ default: 'jor-logo.png' }));
vi.mock('../assets/Huracan_logo.png', () => ({ default: 'huracan-logo.png' }));
vi.mock('../assets/Instantflows_logo.png', () => ({ default: 'instantflows-logo.png' }));
vi.mock('../assets/Aics_logo.png', () => ({ default: 'aics-logo.png' }));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('Experience Page', () => {
  it('renders all experience items initially', () => {
    renderWithRouter(<Experience />);
    expect(screen.getByText(/SIA Partners/i)).toBeInTheDocument();
    expect(screen.getByText(/Huracán/i)).toBeInTheDocument();
    expect(screen.getByText(/InstantFlows/i)).toBeInTheDocument();
  });

  it('filters items based on category selection', () => {
    renderWithRouter(<Experience />);
    
    // Click on "Data & Analytics" filter
    const filterBtn = screen.getByRole('button', { name: /Filter by Data & Analytics/i });
    fireEvent.click(filterBtn);
    
    // SIA Partners should still be there (it's in Data & Analytics)
    expect(screen.getByText(/SIA Partners/i)).toBeInTheDocument();
    
    // Boomerang Beachclub should be gone (it's in Operations & Logistics)
    expect(screen.queryByText(/Boomerang Beachclub/i)).not.toBeInTheDocument();
  });

  it('filters items based on search query', () => {
    renderWithRouter(<Experience />);
    
    const searchInput = screen.getByPlaceholderText(/Search roles\.\.\./i);
    fireEvent.change(searchInput, { target: { value: 'SIA' } });
    
    expect(screen.getByText(/SIA Partners/i)).toBeInTheDocument();
    expect(screen.queryByText(/Huracán/i)).not.toBeInTheDocument();
  });
});
