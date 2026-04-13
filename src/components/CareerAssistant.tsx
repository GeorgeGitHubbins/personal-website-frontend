import React, { useState, useMemo } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'Experience' | 'Education' | 'Tech' | 'Personal';
}

const faqData: FAQItem[] = [
  {
    question: "What is George's current role?",
    answer: "George is currently a Data Science Consultant at SIA Partners in Amsterdam, where he supports clients in infrastructure, energy, and digitalization.",
    category: 'Experience'
  },
  {
    question: "What is his educational background?",
    answer: "George holds an MSc in Complex Systems Engineering and Management (CoSEM) from TU Delft and a BSc in International Relations and Organization from the University of Groningen.",
    category: 'Education'
  },
  {
    question: "Did he study abroad?",
    answer: "Yes, George did an Erasmus exchange at the University of Porto, focusing on Economics and Management.",
    category: 'Education'
  },
  {
    question: "What was his minor focus?",
    answer: "He completed a minor in 'Data Wise' at the University of Groningen, which focused on data-driven decision-making.",
    category: 'Education'
  },
  {
    question: "What is 'Complex Systems Engineering'?",
    answer: "It's a field focusing on designing and managing large-scale, interconnected systems (like energy grids or transport networks) using modeling, simulation, and data science.",
    category: 'Tech'
  },
  {
    question: "What technical skills does he have?",
    answer: "His tech stack includes React, TypeScript, Python (Django), Systems Engineering, and AI/LLM integration. He's also proficient in Data Visualization and Process Optimization.",
    category: 'Tech'
  },
  {
    question: "Has he ever started a company?",
    answer: "Yes, he was the Co-Founder of InstantFlows, where he led a team to develop an AI-powered research tool.",
    category: 'Experience'
  },
  {
    question: "What is 'NGO Link'?",
    answer: "NGO Link is a technical project George leads, focused on building infrastructure to connect NGOs with resources and volunteers.",
    category: 'Tech'
  },
  {
    question: "Is he involved in any community work?",
    answer: "Yes, he is an active member of Global Shapers (The Hague), contributing to projects like Circle Hub and Financial Literacy.",
    category: 'Personal'
  },
  {
    question: "What does he mean by 'Autonomous Evolution'?",
    answer: "This website is designed to be updated autonomously by AI (Gemini CLI) every few days, serving as a living experiment in AI-driven development.",
    category: 'Tech'
  }
];

const CareerAssistant: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaq = useMemo(() => {
    if (!searchTerm.trim()) return faqData;
    const term = searchTerm.toLowerCase();
    return faqData.filter(item => 
      item.question.toLowerCase().includes(term) || 
      item.answer.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  return (
    <div className="career-assistant-container section" style={{ marginTop: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
        <h2>AI Career Assistant (Static)</h2>
        <div className="search-wrapper" style={{ position: 'relative', flex: '1', maxWidth: '300px' }}>
          <input
            type="text"
            placeholder="Ask about George..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 15px',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              background: 'var(--card-bg)',
              color: 'var(--text-color)',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
          />
        </div>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
        A searchable knowledge base to answer common recruiter questions.
      </p>

      <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filteredFaq.length > 0 ? (
          filteredFaq.map((item, index) => (
            <div key={index} className="card" style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span className={`badge badge-${item.category.toLowerCase()}`} style={{ fontSize: '0.7rem', padding: '4px 8px' }}>
                  {item.category}
                </span>
              </div>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: 'var(--primary-color)' }}>{item.question}</h4>
              <p style={{ margin: '0', fontSize: '0.9rem', color: 'var(--text-secondary)', flex: '1' }}>{item.answer}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px', color: 'var(--text-muted)' }}>
            No answers found for "{searchTerm}". Try another keyword!
          </p>
        )}
      </div>
    </div>
  );
};

export default CareerAssistant;
