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
    answer: "George holds an MSc in Complex Systems Engineering and Management (CoSEM) from TU Delft and a BSc in Industrial Engineering and Management from the University of Groningen.",
    category: 'Education'
  },
  {
    question: "Did he study abroad?",
    answer: "Yes, George did an Erasmus exchange at the University of Porto, focusing on Industrial Engineering and Management.",
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
    <div className="career-assistant-container section">
      <div className="career-assistant-header">
        <h2>AI Career Assistant (Static)</h2>
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Ask about George..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <p className="career-assistant-subtitle">
        A searchable knowledge base to answer common recruiter questions.
      </p>

      <div className="faq-grid">
        {filteredFaq.length > 0 ? (
          filteredFaq.map((item, index) => (
            <div key={index} className="card faq-card">
              <div className="faq-card-header">
                <span className={`badge badge-${item.category.toLowerCase()} faq-category-badge`}>
                  {item.category}
                </span>
              </div>
              <h4 className="faq-question">{item.question}</h4>
              <p className="faq-answer">{item.answer}</p>
            </div>
          ))
        ) : (
          <p className="faq-no-results">
            No answers found for "{searchTerm}". Try another keyword!
          </p>
        )}
      </div>
    </div>
  );
};

export default CareerAssistant;
