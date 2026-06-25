import React, { useState, useMemo, useRef, useEffect } from 'react';

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

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  category?: 'Experience' | 'Education' | 'Tech' | 'Personal';
  timestamp: string;
}

// Helper functions declared outside of the React component body to comply with react-hooks/purity linter rules
let messageCounter = 0;
const generateUniqueId = (prefix: string): string => {
  messageCounter += 1;
  return `${prefix}-${messageCounter}-${Math.random().toString(36).substr(2, 9)}`;
};

const getTimestamp = (): string => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const CareerAssistant: React.FC = () => {
  // Tabs: 'chat' or 'faq'
  const [activeTab, setActiveTab] = useState<'chat' | 'faq'>('chat');
  
  // FAQ View State
  const [searchTerm, setSearchTerm] = useState('');

  // Chat View State
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'init',
      sender: 'assistant',
      text: "Hi! I'm George's AI Assistant. Ask me anything about his work experience, academic background, tech skills, or volunteer work! Or select one of the quick suggestions below.",
      category: 'Personal',
      timestamp: getTimestamp()
    }
  ]);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (activeTab === 'chat' && messages.length > 0) {
      chatBottomRef.current?.scrollIntoView?.({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

  // Filtered FAQ for the grid view
  const filteredFaq = useMemo(() => {
    if (!searchTerm.trim()) return faqData;
    const term = searchTerm.toLowerCase();
    return faqData.filter(item => 
      item.question.toLowerCase().includes(term) || 
      item.answer.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Determine dynamic suggestion chips based on the last assistant message category
  const currentSuggestions = useMemo(() => {
    const lastAssistantMsg = [...messages]
      .reverse()
      .find(m => m.sender === 'assistant');
    
    const cat = lastAssistantMsg?.category || 'Personal';

    switch (cat) {
      case 'Experience':
        return [
          "What technical skills does he have?",
          "What was his educational background?",
          "Is he involved in any community work?"
        ];
      case 'Education':
        return [
          "What is 'Complex Systems Engineering'?",
          "Did he study abroad?",
          "What is George's current role?"
        ];
      case 'Tech':
        return [
          "Has he ever started a company?",
          "What does 'Autonomous Evolution' mean?",
          "What is 'NGO Link'?"
        ];
      case 'Personal':
      default:
        return [
          "What is George's current role?",
          "What was his minor focus?",
          "What technical skills does he have?"
        ];
    }
  }, [messages]);

  // Smart Keyword Matching Algorithm
  const getBotResponse = (userInput: string): { text: string; category: 'Experience' | 'Education' | 'Tech' | 'Personal' } => {
    const cleanInput = userInput.toLowerCase().trim();
    
    let bestMatch: FAQItem | null = null;
    let highestScore = 0;

    faqData.forEach(item => {
      let score = 0;
      const q = item.question.toLowerCase();
      const a = item.answer.toLowerCase();
      const cat = item.category.toLowerCase();

      // Exact phrase match in question gets huge boost
      if (cleanInput === q) {
        score += 100;
      }
      if (q.includes(cleanInput) || cleanInput.includes(q)) {
        score += 40;
      }

      // Weights for specific keywords to align user intent with items
      const keywordWeights: { [key: string]: number } = {
        role: 25, current: 20, job: 25, position: 25, work: 15, doing: 15, amsterdam: 15, sia: 30, partners: 30,
        education: 20, study: 20, studies: 20, degree: 20, msc: 25, bsc: 25, university: 15, delft: 30, groningen: 30,
        abroad: 25, erasmus: 25, porto: 25, portugal: 20, exchange: 20,
        minor: 25, data: 15, wise: 25, decision: 15,
        complex: 25, systems: 20, engineering: 15, cosem: 30,
        skills: 20, technical: 15, tech: 15, stack: 20, python: 25, react: 25, typescript: 25, django: 25, programming: 15,
        startup: 20, company: 20, founder: 25, "co-founder": 25, instantflows: 30, business: 15,
        ngo: 30, link: 20, nonprofit: 20, volunteer: 15,
        community: 20, shapers: 25, global: 20, hague: 20, circle: 20, hub: 20,
        autonomous: 25, evolution: 20, website: 20, gemini: 30, cli: 30, ai: 20, update: 15
      };

      const words = cleanInput.replace(/[?.,!]/g, '').split(/\s+/);
      words.forEach(word => {
        if (word.length <= 2) return;
        
        if (q.includes(word)) score += 8;
        if (a.includes(word)) score += 3;
        if (cat.includes(word)) score += 2;
        
        if (keywordWeights[word]) {
          // Verify if this keyword is associated with the item's topic
          let associatedTopic = '';
          if (q.includes('role')) associatedTopic = 'role';
          else if (q.includes('educational') || q.includes('background')) associatedTopic = 'education';
          else if (q.includes('abroad') || q.includes('exchange')) associatedTopic = 'abroad';
          else if (q.includes('minor')) associatedTopic = 'minor';
          else if (q.includes('complex')) associatedTopic = 'complex';
          else if (q.includes('skills')) associatedTopic = 'skills';
          else if (q.includes('company') || q.includes('started')) associatedTopic = 'startup';
          else if (q.includes('ngo')) associatedTopic = 'ngo';
          else if (q.includes('community') || q.includes('shapers')) associatedTopic = 'community';
          else if (q.includes('autonomous') || q.includes('gemini')) associatedTopic = 'autonomous';

          const itemTopicKeywords: { [key: string]: string[] } = {
            'role': ['role', 'current', 'job', 'position', 'work', 'doing', 'sia', 'partners'],
            'education': ['education', 'study', 'studies', 'degree', 'msc', 'bsc', 'university', 'delft', 'groningen'],
            'abroad': ['abroad', 'erasmus', 'porto', 'portugal', 'exchange'],
            'minor': ['minor', 'data', 'wise'],
            'complex': ['complex', 'systems', 'engineering', 'cosem'],
            'skills': ['skills', 'technical', 'tech', 'stack', 'python', 'react', 'typescript', 'django', 'programming'],
            'startup': ['startup', 'company', 'founder', 'co-founder', 'instantflows'],
            'ngo': ['ngo', 'link', 'nonprofit', 'volunteer'],
            'community': ['community', 'shapers', 'global', 'hague', 'circle', 'hub'],
            'autonomous': ['autonomous', 'evolution', 'website', 'gemini', 'cli', 'ai']
          };

          if (associatedTopic && itemTopicKeywords[associatedTopic]?.includes(word)) {
            score += keywordWeights[word];
          }
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    });

    if (bestMatch && highestScore > 5) {
      return {
        text: (bestMatch as FAQItem).answer,
        category: (bestMatch as FAQItem).category
      };
    }

    // Secondary fallback matching on key topic groupings
    const cleanWordSet = cleanInput.replace(/[?.,!]/g, '').split(/\s+/);
    if (cleanWordSet.some(w => ['work', 'job', 'experience', 'career', 'sia', 'partners', 'takeaway', 'flink'].includes(w))) {
      return {
        text: "George is currently working as a Data Science Consultant at SIA Partners in Amsterdam, specializing in data solutions for infrastructure and digitalization. He previously co-founded InstantFlows and worked at Flink and Just Eat Takeaway.",
        category: 'Experience'
      };
    }
    if (cleanWordSet.some(w => ['study', 'studies', 'education', 'university', 'tu delft', 'groningen', 'msc', 'bsc', 'degree'].includes(w))) {
      return {
        text: "George holds an MSc in Complex Systems Engineering and Management from TU Delft, and a BSc in Industrial Engineering and Management from the University of Groningen (with an Erasmus minor at U.Porto).",
        category: 'Education'
      };
    }
    if (cleanWordSet.some(w => ['skill', 'skills', 'code', 'coding', 'tech', 'stack', 'languages', 'python', 'react', 'typescript'].includes(w))) {
      return {
        text: "George's core technology stack includes Python (Django), React, TypeScript, and Systems Engineering. He specializes in building data visualizations, agent-based simulations, and AI integrations.",
        category: 'Tech'
      };
    }

    // Default friendly response
    return {
      text: "I didn't quite catch a direct match for that query, but I can tell you all about George's Experience, Education, Technical Projects, or Volunteering background. What would you like to know?",
      category: 'Personal'
    };
  };

  // Send a message
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: generateUniqueId('user'),
      sender: 'user',
      text: text,
      timestamp: getTimestamp()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate conversational typing delay
    setTimeout(() => {
      const response = getBotResponse(text);
      const assistantMsg: ChatMessage = {
        id: generateUniqueId('assistant'),
        sender: 'assistant',
        text: response.text,
        category: response.category,
        timestamp: getTimestamp()
      };
      
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 750);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    handleSendMessage(chatInput);
    setChatInput('');
  };

  return (
    <div className="career-assistant-container section">
      <div className="career-assistant-header">
        <h2>AI Career Assistant (Static)</h2>
        
        {/* Toggle between Chat and FAQ mode */}
        <div className="career-assistant-tabs">
          <button 
            className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
            aria-label="Switch to AI Chat Mode"
          >
            💬 Interactive Chat
          </button>
          <button 
            className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
            aria-label="Switch to FAQ Search Mode"
          >
            🔍 Searchable FAQ Grid
          </button>
        </div>

        {/* Search input in the DOM only for FAQ mode to preserve RTL test compliance */}
        {activeTab === 'faq' && (
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Ask about George..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="clear-search-btn" 
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>
        )}
      </div>
      
      <p className="career-assistant-subtitle">
        A searchable knowledge base to answer common recruiter questions.
      </p>

      {/* --- CHAT VIEW CONTAINER --- */}
      {activeTab === 'chat' && (
        <div className="career-assistant-chat-view">
          <div className="chat-window card">
            <div className="chat-history">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`chat-message-row ${msg.sender === 'user' ? 'row-user' : 'row-assistant'}`}
                >
                  <div className={`chat-bubble ${msg.sender === 'user' ? 'bubble-user' : 'bubble-assistant'}`}>
                    {msg.sender === 'assistant' && msg.category && (
                      <div className="chat-bubble-category">
                        <span className={`badge badge-${msg.category.toLowerCase()} faq-category-badge`}>
                          {msg.category}
                        </span>
                      </div>
                    )}
                    <p className="chat-bubble-text">{msg.text}</p>
                    <span className="chat-bubble-time">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="chat-message-row row-assistant">
                  <div className="chat-bubble bubble-assistant typing-bubble">
                    <div className="typing-dots">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Suggestion Chips */}
            <div className="chat-suggestions-container">
              <span className="suggestions-label">Suggested:</span>
              <div className="chat-suggestions-list">
                {currentSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    className="suggestion-chip"
                    onClick={() => handleSendMessage(suggestion)}
                    disabled={isTyping}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form className="chat-input-form" onSubmit={handleFormSubmit}>
              <input
                type="text"
                className="chat-text-input"
                placeholder="Ask me a question (e.g. 'What is his current role?')"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isTyping}
                aria-label="Ask about George"
              />
              <button 
                type="submit" 
                className="chat-send-btn" 
                disabled={!chatInput.trim() || isTyping}
                aria-label="Send message"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- FAQ GRID VIEW CONTAINER --- */}
      {activeTab === 'faq' && (
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
      )}
    </div>
  );
};

export default CareerAssistant;
