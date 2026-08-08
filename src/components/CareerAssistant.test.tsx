import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CareerAssistant from './CareerAssistant';

describe('CareerAssistant Component', () => {
  it('renders the component heading and subtitle', () => {
    render(<CareerAssistant />);
    expect(screen.getByText('Chat Assistant (Static)')).toBeInTheDocument();
    expect(screen.getByText(/A searchable knowledge base/i)).toBeInTheDocument();
  });

  it('renders FAQ items in FAQ mode', () => {
    render(<CareerAssistant />);
    
    // Switch to FAQ mode
    const faqTabButton = screen.getByRole('button', { name: /Switch to FAQ Search Mode/i });
    fireEvent.click(faqTabButton);

    // Check for a couple of known questions
    expect(screen.getByText("What is George's current role?")).toBeInTheDocument();
    expect(screen.getByText("What is his educational background?")).toBeInTheDocument();
  });

  it('filters FAQ items based on search term in FAQ mode', () => {
    render(<CareerAssistant />);

    // Switch to FAQ mode
    const faqTabButton = screen.getByRole('button', { name: /Switch to FAQ Search Mode/i });
    fireEvent.click(faqTabButton);

    const searchInput = screen.getByPlaceholderText('Ask about George...');

    // Search for "Data Science"
    fireEvent.change(searchInput, { target: { value: 'Data Science' } });

    // Should show items related to Data Science
    expect(screen.getByText("What is George's current role?")).toBeInTheDocument();
    
    // Should NOT show items unrelated to Data Science (e.g., NGO Link if it doesn't mention Data Science)
    expect(screen.queryByText("What is 'NGO Link'?")).not.toBeInTheDocument();
  });

  it('shows no results message when no matches found in FAQ mode', () => {
    render(<CareerAssistant />);

    // Switch to FAQ mode
    const faqTabButton = screen.getByRole('button', { name: /Switch to FAQ Search Mode/i });
    fireEvent.click(faqTabButton);

    const searchInput = screen.getByPlaceholderText('Ask about George...');

    // Search for something non-existent
    fireEvent.change(searchInput, { target: { value: 'XYZNonExistent' } });

    expect(screen.getByText(/No answers found for "XYZNonExistent"/i)).toBeInTheDocument();
  });

  it('filters by category when searching for category name in FAQ mode', () => {
    render(<CareerAssistant />);

    // Switch to FAQ mode
    const faqTabButton = screen.getByRole('button', { name: /Switch to FAQ Search Mode/i });
    fireEvent.click(faqTabButton);

    const searchInput = screen.getByPlaceholderText('Ask about George...');

    // Search for "Personal"
    fireEvent.change(searchInput, { target: { value: 'Personal' } });

    expect(screen.getByText("Is he involved in any community work?")).toBeInTheDocument();
    expect(screen.queryByText("What is George's current role?")).not.toBeInTheDocument();
  });

  it('clears search when clear button is clicked in FAQ mode', () => {
    render(<CareerAssistant />);

    // Switch to FAQ mode
    const faqTabButton = screen.getByRole('button', { name: /Switch to FAQ Search Mode/i });
    fireEvent.click(faqTabButton);

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

  // --- NEW CHAT MODE TESTS ---

  it('renders Chat mode by default with initial assistant message and suggestions', () => {
    render(<CareerAssistant />);
    
    // Check for chat mode indicators
    expect(screen.getByText(/Hi! I'm George's Chat Assistant/i)).toBeInTheDocument();
    expect(screen.getByText('Suggested:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask me a question/i)).toBeInTheDocument();
  });

  it('simulates typing and responds to user message in Chat mode', async () => {
    render(<CareerAssistant />);

    const textInput = screen.getByPlaceholderText(/Ask me a question/i);
    const sendButton = screen.getByRole('button', { name: /Send message/i });

    // Type a custom message
    fireEvent.change(textInput, { target: { value: 'What is his current role?' } });
    fireEvent.click(sendButton);

    // User message should appear immediately
    expect(screen.getByText('What is his current role?')).toBeInTheDocument();

    // Response should be in the document after the delay
    await waitFor(() => {
      expect(screen.getByText(/Data Science Consultant/i)).toBeInTheDocument();
    }, { timeout: 1500 });
  });

  it('responds intelligently to suggestion chips', async () => {
    render(<CareerAssistant />);

    // Find the suggestion chip
    const suggestionChips = screen.getAllByRole('button');
    const roleChip = suggestionChips.find(chip => chip.textContent?.includes("George's current role"));
    expect(roleChip).toBeDefined();

    fireEvent.click(roleChip!);

    // User message (clicked chip text) should be displayed
    expect(screen.getAllByText("What is George's current role?").length).toBeGreaterThan(0);

    // Response should appear after the delay
    await waitFor(() => {
      expect(screen.getByText(/SIA Partners/i)).toBeInTheDocument();
    }, { timeout: 1500 });
  });
});
