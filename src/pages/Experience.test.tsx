import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Experience from './Experience';
import { BrowserRouter } from 'react-router-dom';

// Mock the assets
vi.mock('../assets/SIA_logo.webp', () => ({ default: 'sia-logo.webp' }));
vi.mock('../assets/Flink_logo.webp', () => ({ default: 'flink-logo.webp' }));
vi.mock('../assets/Takeaway_logo.webp', () => ({ default: 'takeaway-logo.webp' }));
vi.mock('../assets/HagaZiekenhuis_logo.webp', () => ({ default: 'haga-logo.webp' }));
vi.mock('../assets/Boomerang_logo.webp', () => ({ default: 'boomerang-logo.webp' }));
vi.mock('../assets/JOR_logo.webp', () => ({ default: 'jor-logo.webp' }));
vi.mock('../assets/Huracan_logo.webp', () => ({ default: 'huracan-logo.webp' }));
vi.mock('../assets/Instantflows_logo.webp', () => ({ default: 'instantflows-logo.webp' }));
vi.mock('../assets/Aics_logo.webp', () => ({ default: 'aics-logo.webp' }));

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
