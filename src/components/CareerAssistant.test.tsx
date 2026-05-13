import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CareerAssistant from './CareerAssistant';

describe('CareerAssistant Component', () => {
  it('renders the component heading and subtitle', () => {
    render(<CareerAssistant />);
    expect(screen.getByText('AI Career Assistant (Static)')).toBeInTheDocument();
    expect(screen.getByText(/A searchable knowledge base/i)).toBeInTheDocument();
  });

  it('renders FAQ items initially', () => {
    render(<CareerAssistant />);
    // Check for a couple of known questions
    expect(screen.getByText("What is George's current role?")).toBeInTheDocument();
    expect(screen.getByText("What is his educational background?")).toBeInTheDocument();
  });

  it('filters FAQ items based on search term', () => {
    render(<CareerAssistant />);
    const searchInput = screen.getByPlaceholderText('Ask about George...');

    // Search for "Data Science"
    fireEvent.change(searchInput, { target: { value: 'Data Science' } });

    // Should show items related to Data Science
    expect(screen.getByText("What is George's current role?")).toBeInTheDocument();
    
    // Should NOT show items unrelated to Data Science (e.g., NGO Link if it doesn't mention Data Science)
    // Looking at the data, NGO Link mentions "infrastructure" and "features"
    expect(screen.queryByText("What is 'NGO Link'?")).not.toBeInTheDocument();
  });

  it('shows no results message when no matches found', () => {
    render(<CareerAssistant />);
    const searchInput = screen.getByPlaceholderText('Ask about George...');

    // Search for something non-existent
    fireEvent.change(searchInput, { target: { value: 'XYZNonExistent' } });

    expect(screen.getByText(/No answers found for "XYZNonExistent"/i)).toBeInTheDocument();
  });

  it('filters by category when searching for category name', () => {
    render(<CareerAssistant />);
    const searchInput = screen.getByPlaceholderText('Ask about George...');

    // Search for "Personal"
    fireEvent.change(searchInput, { target: { value: 'Personal' } });

    expect(screen.getByText("Is he involved in any community work?")).toBeInTheDocument();
    expect(screen.queryByText("What is George's current role?")).not.toBeInTheDocument();
  });

  it('clears search when clear button is clicked', () => {
    render(<CareerAssistant />);
    const searchInput = screen.getByPlaceholderText('Ask about George...');

    // Type something
    fireEvent.change(searchInput, { target: { value: 'George' } });
    expect(searchInput).toHaveValue('George');

    // Clear button should be visible
    const clearButton = screen.getByLabelText('Clear search');
    fireEvent.click(clearButton);

    // Search input should be empty
    expect(searchInput).toHaveValue('');
    // All items should be visible again
    expect(screen.getByText("What is George's current role?")).toBeInTheDocument();
  });
});
