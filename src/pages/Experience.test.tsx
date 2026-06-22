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
    expect(screen.getAllByText(/SIA Partners/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Huracán/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/InstantFlows/i).length).toBeGreaterThan(0);
  });

  it('filters items based on category selection', () => {
    renderWithRouter(<Experience />);
    
    // Click on "Data & Analytics" filter
    const filterBtn = screen.getByRole('button', { name: /Filter by Data & Analytics/i });
    fireEvent.click(filterBtn);
    
    // SIA Partners should still be there (it's in Data & Analytics)
    expect(screen.getAllByText(/SIA Partners/i).length).toBeGreaterThan(0);
    
    // Boomerang Beachclub should be gone from the detailed experience list
    const cards = document.querySelectorAll('.experience-card');
    const hasBoomerang = Array.from(cards).some(card => 
      card.textContent?.includes('Boomerang Beachclub')
    );
    expect(hasBoomerang).toBe(false);
  });

  it('filters items based on search query', () => {
    renderWithRouter(<Experience />);
    
    const searchInput = screen.getByPlaceholderText(/Search roles\.\.\./i);
    fireEvent.change(searchInput, { target: { value: 'SIA' } });
    
    expect(screen.getAllByText(/SIA Partners/i).length).toBeGreaterThan(0);
    
    // Huracán should be gone from the detailed experience list
    const cards = document.querySelectorAll('.experience-card');
    const hasHuracan = Array.from(cards).some(card => 
      card.textContent?.includes('Huracán')
    );
    expect(hasHuracan).toBe(false);
  });
});
