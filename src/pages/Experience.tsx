import React, { useState, useMemo } from 'react';
import siaLogo from '../assets/SIA_logo.png';
import flinkLogo from '../assets/Flink_logo.png';
import takeawayLogo from '../assets/Takeaway_logo.png';
import hagaLogo from '../assets/HagaZiekenhuis_logo.png';
import boomerangLogo from '../assets/Boomerang_logo.png';
import jorLogo from '../assets/JOR_logo.png';
import huracanLogo from '../assets/Huracan_logo.png';
import instantFlowsLogo from '../assets/Instantflows_logo.png';
import aicsLogo from '../assets/Aics_logo.png';

interface ExperienceItem {
  company: string;
  role: string;
  logo: string;
  date: string;
  location: string;
  description: string | React.ReactNode;
  tags: { label: string; className?: string }[];
  categories: string[];
}

const experienceData: ExperienceItem[] = [
  {
    company: "SIA Partners",
    role: "Data Science Consultant",
    logo: siaLogo,
    date: "November 2025 - Present",
    location: "Amsterdam",
    description: "Supported clients in infrastructure, energy, and digitalization by designing data-driven systems and project structures.",
    tags: [
      { label: "Data Science", className: "badge-data" },
      { label: "Consultancy", className: "badge-leadership" },
      { label: "Energy" },
      { label: "Infrastructure" }
    ],
    categories: ["Data & Analytics", "Leadership & Strategy"]
  },
  {
    company: "Huracán",
    role: "Systems Engineer",
    logo: huracanLogo,
    date: "October 2025 - November 2025",
    location: "Amsterdam",
    description: "Designing data-driven systems and project structures meeting technical and operational requirements for infrastructure and energy clients.",
    tags: [
      { label: "Systems Engineering", className: "badge-tech" },
      { label: "Project Architecture" },
      { label: "Data Management", className: "badge-data" }
    ],
    categories: ["Engineering & Tech", "Data & Analytics"]
  },
  {
    company: "InstantFlows",
    role: "Co-Founder",
    logo: instantFlowsLogo,
    date: "September 2024 - October 2025",
    location: "Delft",
    description: "Planning, organizing and leading a small team to develop and market an AI-powered research tool.",
    tags: [
      { label: "Entrepreneurship" },
      { label: "AI/LLMs" },
      { label: "Product Strategy" }
    ],
    categories: ["Leadership & Strategy", "Engineering & Tech"]
  },
  {
    company: "JOR Energy Consultancy",
    role: "Data Analyst",
    logo: jorLogo,
    date: "September 2022 - January 2025",
    location: "Delft",
    description: "Developed business cases, market research, and data visualizations. Rebuilt and maintained the company's Django-based website.",
    tags: [
      { label: "Django" },
      { label: "Data Visualization" },
      { label: "Market Research" }
    ],
    categories: ["Data & Analytics", "Engineering & Tech"]
  },
  {
    company: "Flink B. V.",
    role: "Rider Operations Specialist",
    logo: flinkLogo,
    date: "November 2021 - September 2022",
    location: "Amsterdam",
    description: (
      <ul className="description-list">
        <li>Focused on improving processes, such as solving tickets and managing rider data.</li>
        <li>Responsible for ensuring a seamless experience for riders from onboarding to offboarding.</li>
        <li>Developed into a data analyst, building dashboards and serving as an internal consultant.</li>
      </ul>
    ),
    tags: [
      { label: "Operations" },
      { label: "Process Optimization" },
      { label: "Consulting" }
    ],
    categories: ["Operations & Logistics", "Data & Analytics"]
  },
  {
    company: "Just Eat Takeaway.com N.V.",
    role: "Driver (Captain) Coordinator",
    logo: takeawayLogo,
    date: "June 2021 - August 2021",
    location: "Groningen",
    description: (
      <ul className="description-list">
        <li>Led a team of 14 driver captains, who serve as coaches and role models for new drivers.</li>
        <li>Selected and trained six new members for the driver captain team from the existing driver pool.</li>
      </ul>
    ),
    tags: [
      { label: "Leadership" },
      { label: "Team Coaching" },
      { label: "Training" }
    ],
    categories: ["Leadership & Strategy"]
  },
  {
    company: "Just Eat Takeaway.com N.V.",
    role: "Driver Coordinator",
    logo: takeawayLogo,
    date: "April 2019 - August 2021",
    location: "Groningen",
    description: (
      <ul className="description-list">
        <li>Tracked performance for 80+ drivers and conducted bi-monthly feedback meetings.</li>
        <li>Optimized employee data, daily planning, and attendance using advanced Google Sheets skills.</li>
        <li>Improved coaching and performance tracking systems.</li>
      </ul>
    ),
    tags: [
      { label: "Data Optimization" },
      { label: "Performance Tracking" },
      { label: "Coordination" }
    ],
    categories: ["Operations & Logistics", "Data & Analytics"]
  },
  {
    company: "Just Eat Takeaway.com N.V.",
    role: "Driver",
    logo: takeawayLogo,
    date: "August 2018 - April 2019",
    location: "Groningen",
    description: "Delivered food for the Scoober Logistics department of Thuisbezorgd.nl, riding an e-bike to restaurants and customers.",
    tags: [
      { label: "Logistics" },
      { label: "Customer Service" }
    ],
    categories: ["Operations & Logistics"]
  },
  {
    company: "Hagaziekenhuis",
    role: "Household Maintenance",
    logo: hagaLogo,
    date: "June 2017 - August 2017",
    location: "Den Haag",
    description: "Organised, repaired and cleaned beds in the hospital, with sole responsibility for the children’s department standards.",
    tags: [
      { label: "Responsibility" },
      { label: "Maintenance" }
    ],
    categories: ["Operations & Logistics"]
  },
  {
    company: "Boomerang Beachclub",
    role: "Waiter",
    logo: boomerangLogo,
    date: "May 2015 - June 2017",
    location: "Den Haag",
    description: "Responsible for opening and closing operations, waiting tables, and ensuring customer satisfaction at a beach restaurant.",
    tags: [
      { label: "Customer Satisfaction" },
      { label: "Hospitality" }
    ],
    categories: ["Operations & Logistics"]
  },
  {
    company: "Espritscholen (AICS)",
    role: "Trainer (football)",
    logo: aicsLogo,
    date: "October 2010 - October 2011",
    location: "Amsterdam",
    description: "Organised after-school football training for middle school students aged 7 to 11.",
    tags: [
      { label: "Sports Coaching" },
      { label: "Mentorship" }
    ],
    categories: ["Leadership & Strategy"]
  }
];

const categories = ['All', 'Engineering & Tech', 'Data & Analytics', 'Leadership & Strategy', 'Operations & Logistics'];

const Experience: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredExperience = useMemo(() => {
    return experienceData.filter(item => {
      const matchesFilter = filter === 'All' || item.categories.includes(filter);
      const matchesSearch = 
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.label.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <section id="experience" className="section timeline-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '20px' }}>
        <h2 style={{ margin: 0 }}>Work Experience:</h2>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              background: 'var(--card-bg)',
              color: 'var(--text-color)',
              fontSize: '0.9rem',
              minWidth: '200px'
            }}
          />

          <div className="filter-container" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                aria-label={`Filter by ${cat}`}
                aria-pressed={filter === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {filteredExperience.length > 0 ? (
        filteredExperience.map((item, index) => (
          <div key={index} className="card experience-card">
            <img src={item.logo} alt={item.company} className="card-logo" loading="lazy" decoding="async" />
            <div className="card-details">
              <h3>{item.company} / {item.role}</h3>
              <p className="date">{item.date}, {item.location}</p>
              <div className="description">
                {item.description}
              </div>
              <div className="quick-facts">
                {item.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className={`badge ${tag.className || ''}`}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No experience found matching your criteria.</p>
          <button 
            onClick={() => {setFilter('All'); setSearchQuery('');}}
            className="filter-btn"
            style={{ marginTop: '10px' }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default Experience;
