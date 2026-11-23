import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Bot, MessageSquare, Search, Send, Sparkles, User, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
  category: 'Experience' | 'Education' | 'Tech' | 'Personal';
}

const faqData: FAQItem[] = [
  {
    question: "What is George's current role?",
    answer:
      'George is currently a Data Science Consultant at SIA Partners in Amsterdam, where he supports clients in infrastructure, energy, and digitalization.',
    category: 'Experience',
  },
  {
    question: 'What is his educational background?',
    answer:
      'George holds an MSc in Complex Systems Engineering and Management (CoSEM) from TU Delft and a BSc in Industrial Engineering and Management from the University of Groningen.',
    category: 'Education',
  },
  {
    question: 'Did he study abroad?',
    answer:
      'Yes, George did an Erasmus exchange at the University of Porto, focusing on Industrial Engineering and Management.',
    category: 'Education',
  },
  {
    question: 'What was his minor focus?',
    answer:
      "He completed a minor in 'Data Wise' at the University of Groningen, which focused on data-driven decision-making.",
    category: 'Education',
  },
  {
    question: "What is 'Complex Systems Engineering'?",
    answer:
      "It's a field focusing on designing and managing large-scale, interconnected systems (like energy grids or transport networks) using modeling, simulation, and data science.",
    category: 'Tech',
  },
  {
    question: 'What technical skills does he have?',
    answer:
      "His tech stack includes React, TypeScript, Python (Django), Systems Engineering, and AI/LLM integration. He's also proficient in Data Visualization and Process Optimization.",
    category: 'Tech',
  },
  {
    question: 'Has he ever started a company?',
    answer:
      'Yes, he was the Co-Founder of InstantFlows, where he led a team to develop an AI-powered research tool.',
    category: 'Experience',
  },
  {
    question: "What is 'NGO Link'?",
    answer:
      'NGO Link is a technical project George leads, focused on building infrastructure to connect NGOs with resources and volunteers.',
    category: 'Tech',
  },
  {
    question: 'Is he involved in any community work?',
    answer:
      'Yes, he is an active member of Global Shapers (The Hague), contributing to projects like Circle Hub and Financial Literacy.',
    category: 'Personal',
  },
  {
    question: "What does he mean by 'Autonomous Evolution'?",
    answer:
      'This website is designed to be updated autonomously by AI (Gemini CLI) every few days, serving as a living experiment in AI-driven development.',
    category: 'Tech',
  },
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  category?: 'Experience' | 'Education' | 'Tech' | 'Personal';
  timestamp: string;
}

let messageCounter = 0;
const generateUniqueId = (prefix: string): string => {
  messageCounter += 1;
  return `${prefix}-${messageCounter}-${Math.random().toString(36).substring(2, 11)}`;
};

const getTimestamp = (): string => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const CareerAssistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'faq'>('chat');
  const [searchTerm, setSearchTerm] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'init',
      sender: 'assistant',
      text: "Hi! I'm George's Chat Assistant. Ask me anything about his work experience, academic background, tech skills, or volunteer work! Or select one of the quick suggestions below.",
      category: 'Personal',
      timestamp: getTimestamp(),
    },
  ]);

  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'chat' && chatHistoryRef.current) {
      chatHistoryRef.current.scrollTo?.({
        top: chatHistoryRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping, activeTab]);

  const filteredFaq = useMemo(() => {
    if (!searchTerm.trim()) return faqData;
    const term = searchTerm.toLowerCase();
    return faqData.filter(
      (item) =>
        item.question.toLowerCase().includes(term) ||
        item.answer.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const currentSuggestions = useMemo(() => {
    const lastAssistantMsg = [...messages].reverse().find((m) => m.sender === 'assistant');
    const cat = lastAssistantMsg?.category || 'Personal';

    switch (cat) {
      case 'Experience':
        return [
          'What technical skills does he have?',
          'What was his educational background?',
          'Is he involved in any community work?',
        ];
      case 'Education':
        return [
          "What is 'Complex Systems Engineering'?",
          'Did he study abroad?',
          "What is George's current role?",
        ];
      case 'Tech':
        return [
          'Has he ever started a company?',
          "What does 'Autonomous Evolution' mean?",
          "What is 'NGO Link'?",
        ];
      case 'Personal':
      default:
        return [
          "What is George's current role?",
          'What was his minor focus?',
          'What technical skills does he have?',
        ];
    }
  }, [messages]);

  const getBotResponse = (
    userInput: string
  ): { text: string; category: 'Experience' | 'Education' | 'Tech' | 'Personal' } => {
    const cleanInput = userInput.toLowerCase().trim();
    let bestMatch: FAQItem | null = null;
    let highestScore = 0;

    faqData.forEach((item) => {
      let score = 0;
      const q = item.question.toLowerCase();
      const a = item.answer.toLowerCase();
      const cat = item.category.toLowerCase();

      if (cleanInput === q) score += 100;
      if (q.includes(cleanInput) || cleanInput.includes(q)) score += 40;

      const keywordWeights: { [key: string]: number } = {
        role: 25, current: 20, job: 25, position: 25, work: 15, doing: 15, amsterdam: 15, sia: 30, partners: 30,
        education: 20, study: 20, studies: 20, degree: 20, msc: 25, bsc: 25, university: 15, delft: 30, groningen: 30,
        abroad: 25, erasmus: 25, porto: 25, portugal: 20, exchange: 20,
        minor: 25, data: 15, wise: 25, decision: 15,
        complex: 25, systems: 20, engineering: 15, cosem: 30,
        skills: 20, technical: 15, tech: 15, stack: 20, python: 25, react: 25, typescript: 25, django: 25, programming: 15,
        startup: 20, company: 20, founder: 25, 'co-founder': 25, instantflows: 30, business: 15,
        ngo: 30, link: 20, nonprofit: 20, volunteer: 15,
        community: 20, shapers: 25, global: 20, hague: 20, circle: 20, hub: 20,
        autonomous: 25, evolution: 20, website: 20, gemini: 30, cli: 30, ai: 20, update: 15,
      };

      const words = cleanInput.replace(/[?.,!]/g, '').split(/\s+/);
      words.forEach((word) => {
        if (word.length <= 2) return;
        if (q.includes(word)) score += 8;
        if (a.includes(word)) score += 3;
        if (cat.includes(word)) score += 2;

        if (keywordWeights[word]) {
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
            role: ['role', 'current', 'job', 'position', 'work', 'doing', 'sia', 'partners'],
            education: ['education', 'study', 'studies', 'degree', 'msc', 'bsc', 'university', 'delft', 'groningen'],
            abroad: ['abroad', 'erasmus', 'porto', 'portugal', 'exchange'],
            minor: ['minor', 'data', 'wise'],
            complex: ['complex', 'systems', 'engineering', 'cosem'],
            skills: ['skills', 'technical', 'tech', 'stack', 'python', 'react', 'typescript', 'django', 'programming'],
            startup: ['startup', 'company', 'founder', 'co-founder', 'instantflows'],
            ngo: ['ngo', 'link', 'nonprofit', 'volunteer'],
            community: ['community', 'shapers', 'global', 'hague', 'circle', 'hub'],
            autonomous: ['autonomous', 'evolution', 'website', 'gemini', 'cli', 'ai'],
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
        category: (bestMatch as FAQItem).category,
      };
    }

    const cleanWordSet = cleanInput.replace(/[?.,!]/g, '').split(/\s+/);
    if (cleanWordSet.some((w) => ['work', 'job', 'experience', 'career', 'sia', 'partners', 'takeaway', 'flink'].includes(w))) {
      return {
        text: 'George is currently working as a Data Science Consultant at SIA Partners in Amsterdam, specializing in data solutions for infrastructure and digitalization. He previously co-founded InstantFlows and worked at Flink and Just Eat Takeaway.',
        category: 'Experience',
      };
    }
    if (cleanWordSet.some((w) => ['study', 'studies', 'education', 'university', 'tu delft', 'groningen', 'msc', 'bsc', 'degree'].includes(w))) {
      return {
        text: 'George holds an MSc in Complex Systems Engineering and Management from TU Delft, and a BSc in Industrial Engineering and Management from the University of Groningen (with an Erasmus minor at U.Porto).',
        category: 'Education',
      };
    }
    if (cleanWordSet.some((w) => ['skill', 'skills', 'code', 'coding', 'tech', 'stack', 'languages', 'python', 'react', 'typescript'].includes(w))) {
      return {
        text: "George's core technology stack includes Python (Django), React, TypeScript, and Systems Engineering. He specializes in building data visualizations, agent-based simulations, and AI integrations.",
        category: 'Tech',
      };
    }

    return {
      text: "I didn't quite catch a direct match for that query, but I can tell you all about George's Experience, Education, Technical Projects, or Volunteering background. What would you like to know?",
      category: 'Personal',
    };
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: generateUniqueId('user'),
      sender: 'user',
      text,
      timestamp: getTimestamp(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(text);
      const assistantMsg: ChatMessage = {
        id: generateUniqueId('assistant'),
        sender: 'assistant',
        text: response.text,
        category: response.category,
        timestamp: getTimestamp(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-brand uppercase">
            <Sparkles className="size-3.5" />
            Interactive Knowledge Base
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Chat Assistant (Static)
          </h2>
          <p className="text-sm text-muted-foreground">
            A searchable knowledge base to answer common recruiter questions.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="inline-flex w-fit items-center gap-1 rounded-lg bg-muted p-1">
          <button
            type="button"
            className={cn(
              'inline-flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
              activeTab === 'chat'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            )}
            onClick={() => setActiveTab('chat')}
            aria-label="Switch to Chat Mode"
          >
            <MessageSquare className="size-3.5" />
            Interactive Chat
          </button>
          <button
            type="button"
            className={cn(
              'inline-flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
              activeTab === 'faq'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            )}
            onClick={() => setActiveTab('faq')}
            aria-label="Switch to FAQ Search Mode"
          >
            <Search className="size-3.5" />
            Searchable FAQ Grid
          </button>
        </div>
      </div>

      {/* Chat Mode */}
      {activeTab === 'chat' && (
        <Card className="overflow-hidden py-0">
          <div
            ref={chatHistoryRef}
            className="flex h-[420px] flex-col gap-4 overflow-y-auto bg-muted/25 p-4 sm:p-6"
          >
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={cn('flex items-end gap-2.5', isUser ? 'justify-end' : 'justify-start')}
                >
                  {!isUser && (
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-card text-brand shadow-xs">
                      <Bot className="size-4" />
                    </div>
                  )}

                  <div
                    className={cn(
                      'flex max-w-[80%] flex-col gap-1.5 rounded-2xl px-4 py-3 text-sm shadow-xs sm:max-w-[72%]',
                      isUser
                        ? 'rounded-br-sm bg-brand text-brand-foreground'
                        : 'rounded-bl-sm border bg-card text-card-foreground'
                    )}
                  >
                    {!isUser && msg.category && (
                      <Badge variant="secondary" className="w-fit text-[11px]">
                        {msg.category}
                      </Badge>
                    )}
                    <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                    <span
                      className={cn(
                        'self-end text-[10px]',
                        isUser ? 'text-brand-foreground/75' : 'text-muted-foreground'
                      )}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {isUser && (
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <User className="size-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-end gap-2.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-card text-brand shadow-xs">
                  <Bot className="size-4" />
                </div>
                <div className="rounded-2xl rounded-bl-sm border bg-card px-4 py-3 shadow-xs">
                  <div className="typing-dots">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="flex flex-col gap-2 border-t bg-card px-4 py-3 sm:px-6">
            <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              Suggested:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentSuggestions.map((suggestion, idx) => (
                <Button
                  key={idx}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-auto rounded-full py-1 text-xs"
                  onClick={() => handleSendMessage(suggestion)}
                  disabled={isTyping}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            className="flex items-center gap-2 border-t bg-card p-3 sm:px-6 sm:py-4"
            onSubmit={handleFormSubmit}
          >
            <Input
              type="text"
              placeholder="Ask me a question (e.g. 'What is his current role?')"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={isTyping}
              aria-label="Ask about George"
              className="flex-1"
            />
            <Button
              type="submit"
              variant="brand"
              disabled={!chatInput.trim() || isTyping}
              aria-label="Send message"
            >
              <Send className="size-4" />
              Send
            </Button>
          </form>
        </Card>
      )}

      {/* FAQ Grid Mode */}
      {activeTab === 'faq' && (
        <div className="flex flex-col gap-5">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Ask about George..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-9 pl-9"
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {filteredFaq.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredFaq.map((item, index) => (
                <Card key={index} className="h-full gap-3 py-5 transition-colors hover:border-brand/50">
                  <CardHeader className="gap-2 pb-0">
                    <Badge variant="secondary" className="w-fit">
                      {item.category}
                    </Badge>
                    <CardTitle className="text-base">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {item.answer}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed py-12 text-center">
              <CardContent className="flex flex-col items-center gap-3">
                <Search className="size-8 text-muted-foreground/60" />
                <p className="text-sm text-muted-foreground">
                  No answers found for &quot;{searchTerm}&quot;. Try another keyword!
                </p>
                <Button variant="outline" size="sm" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default CareerAssistant;
