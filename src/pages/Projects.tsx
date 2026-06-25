import React, { useState, useMemo } from 'react';
import { calculateReadingTime } from '../utils/readingTime';
import ngoLinkLogo from '../assets/NGOLink_logo.png';
import globalShapersLogo from '../assets/GlobalShapersTheHague_logo.png';

interface TechnicalProject {
  title: string;
  company?: string;
  logo?: string;
  date: string;
  description: string;
  tags: string[];
  link?: string;
  isFuture?: boolean;
  category: 'Infrastructure' | 'AI & Data' | 'System Design' | 'Other';
}

const technicalProjects: TechnicalProject[] = [
  {
    title: "NGO Link Infrastructure",
    company: "NGO Link",
    logo: ngoLinkLogo,
    date: "July 2025 - Present, The Hague",
    description: "Leading the development of the NGO Link platform, connecting NGOs with resources and volunteers. Building the core infrastructure and features to scale the project's impact.",
    tags: ["React", "TypeScript", "Architecture"],
    link: "https://www.ngo-link.org",
    category: "Infrastructure"
  },
  {
    title: "Personal Website (Autonomous Evolution)",
    date: "Continuous Development",
    description: "A React-based personal portfolio designed for continuous, autonomous evolution via Gemini CLI. The project explores the intersection of AI-driven development and personal branding.",
    tags: ["React", "Gemini CLI", "CI/CD"],
    category: "AI & Data"
  },
  {
    title: "Future Technical Ventures",
    date: "Coming Soon",
    description: "New projects focusing on data visualization, AI integration, and systems engineering are currently in the planning phase.",
    tags: [],
    isFuture: true,
    category: "Other"
  }
];

const selectedWorks = [
  {
    title: "Master Thesis - George Gittins",
    description: "Complex Systems Engineering and Management (CoSEM) Master Thesis at TU Delft",
    url: "https://drive.google.com/file/d/1TS-WS0NOCOxToiFm_OExkutYOhSU5BXa/preview",
    category: "Thesis"
  },
  {
    title: "CoSEM Research Challenges literature review article - George Gittins",
    description: "Perform research and analyse relevant literature",
    url: "https://drive.google.com/file/d/17RUkst9oBVvHwhyItcPCP7C1vbV2686v/preview",
    category: "Report"
  },
  {
    title: "Individual report Digital Platform Design - George Gittins",
    description: "Design an online platform that tackles Sustainable Development Goals",
    url: "https://drive.google.com/file/d/1SspTG_UQJmYK7RJ8xinw6-1IPu5UafAV/preview",
    category: "Report"
  },
  {
    title: "SEN1611_2022_2023_Group10_Report",
    description: "Design the architecture of a digital service",
    url: "https://drive.google.com/file/d/1YrsZNjUp3nV25Hd5BbJFvyT34mu4Dtuj/preview",
    category: "Report"
  },
  {
    title: "Sonae Group Case presentation",
    description: "Solve a logistical problem with truck deliveries for a large supermarket chain.",
    url: "https://drive.google.com/file/d/13Ees0246A3XRzWQB4ITxztXOm9HQf1UB/preview",
    category: "Presentation"
  },
  {
    title: "2.9 Valorization Plan - Group 4",
    description: "Develop a digital startup service, perform the necessary research and analysis",
    url: "https://drive.google.com/file/d/1xdDf52ojZyjpj2Fp1MfTSKyBRpKQtv6I/preview",
    category: "Report"
  },
  {
    title: "Agent-Based Simulation Report",
    description: "Analyse a complex system through agent-based simulation",
    url: "https://drive.google.com/file/d/1rgOrRTYZp2xZjif6RuDwokTAT5Z_BIY5/preview",
    category: "Simulation"
  },
  {
    title: "Final Report - Integration Project - George Gittins",
    description: "Graduation project on simulating and optimizing a Mars robot's pathfinding and locomotion",
    url: "https://drive.google.com/file/d/14jvXJaS3nJsaLAM_ZazR8ZfN-MIiJJj2/preview",
    category: "Report"
  },
  {
    title: "Product Analysis - Materials Selection - George Gittins",
    description: "Selecting materials for a specific purpose using specialized software",
    url: "https://drive.google.com/file/d/1LLzj4RLKg1AHHqUYUGK5ZRML41mCH_CF/preview",
    category: "Report"
  },
  {
    title: "CDP Report Forus",
    description: "Working in partnership with a startup to develop an advice for their organizational structure and data use",
    url: "https://drive.google.com/file/d/1Uar2ApiJ4cY_gLUOuVfzhZ7dZTgG7Q-_/preview",
    category: "Report"
  }
];

const academicCategories = ['All', 'Thesis', 'Report', 'Presentation', 'Simulation'];
const techCategories = ['All', 'Infrastructure', 'AI & Data', 'System Design', 'Other'];

interface ShareButtonsProps {
  title: string;
  shareUrl: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, shareUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {});
  };

  const encodedTitle = encodeURIComponent(`Check out George Gittins' project: ${title}`);
  const encodedUrl = encodeURIComponent(shareUrl);

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;

  return (
    <div className="share-btn-group">
      <span className="share-label">Share:</span>
      <a 
        href={linkedinUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="share-btn share-linkedin"
        title="Share on LinkedIn"
        aria-label={`Share ${title} on LinkedIn`}
      >
        <svg viewBox="0 0 24 24" className="share-icon"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </a>
      <a 
        href={twitterUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="share-btn share-twitter"
        title="Share on Twitter/X"
        aria-label={`Share ${title} on Twitter`}
      >
        <svg viewBox="0 0 24 24" className="share-icon"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <button 
        onClick={handleCopy} 
        className="share-btn share-copy"
        title="Copy Link"
        aria-label={`Copy link for ${title}`}
      >
        {copied ? (
          <span className="copied-tooltip">Copied!</span>
        ) : (
          <svg viewBox="0 0 24 24" className="share-icon"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
        )}
      </button>
    </div>
  );
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [techFilter, setTechFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [techSearchQuery, setTechSearchQuery] = useState<string>('');

  const filteredTechProjects = useMemo(() => {
    return technicalProjects.filter(project => {
      const matchesFilter = techFilter === 'All' || project.category === techFilter;
      const matchesSearch = 
        project.title.toLowerCase().includes(techSearchQuery.toLowerCase()) || 
        project.description.toLowerCase().includes(techSearchQuery.toLowerCase()) ||
        (project.company && project.company.toLowerCase().includes(techSearchQuery.toLowerCase())) ||
        project.tags.some(tag => tag.toLowerCase().includes(techSearchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [techSearchQuery, techFilter]);

  const filteredWorks = useMemo(() => {
    return selectedWorks.filter(work => {
      const matchesFilter = filter === 'All' || work.category === filter;
      const matchesSearch = work.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            work.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <>
      <section id="volunteering" className="section timeline-container">
        <h2>Volunteering & Community:</h2>
        <div className="card experience-card">
          <img src={globalShapersLogo} alt="Global Shapers" className="card-logo" loading="lazy" decoding="async" />
          <div className="card-details">
            <h3>Global Shapers / Active Member</h3>
            <p className="date">January 2025 - Present, The Hague</p>
            <p className="description">
              A dynamic community of young leaders, setting ambitious goals for personal growth and community impact. Focusing on integrating into the organization, contributing to existing projects like Circle Hub and Financial Literacy, and proposing new initiatives. I aim to take on leadership responsibilities, organize social events, and leverage the global network for meaningful connections and event participation.
            </p>
          </div>
        </div>
      </section>

      <section id="tech-projects" className="section timeline-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '20px' }}>
          <h2 style={{ margin: 0 }}>Technical Projects:</h2>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search projects..."
              value={techSearchQuery}
              onChange={(e) => setTechSearchQuery(e.target.value)}
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
              {techCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setTechFilter(cat)}
                  className={`filter-btn ${techFilter === cat ? 'active' : ''}`}
                  aria-label={`Filter by ${cat}`}
                  aria-pressed={techFilter === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {filteredTechProjects.length > 0 ? (
          filteredTechProjects.map((project, index) => (
            <div 
              key={index} 
              className="card experience-card" 
              style={project.isFuture ? { opacity: 0.7 } : {}}
            >
              {project.logo ? (
                project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <img src={project.logo} alt={project.title} className="card-logo" loading="lazy" decoding="async" />
                  </a>
                ) : (
                  <img src={project.logo} alt={project.title} className="card-logo" loading="lazy" decoding="async" />
                )
              ) : (
                <div className={`card-logo placeholder-logo ${project.isFuture ? 'muted' : ''}`}>
                  <span>{project.isFuture ? '?' : 'GG'}</span>
                </div>
              )}
              <div className="card-details">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ margin: 0 }}>{project.title}</h3>
                  {!project.isFuture && (
                    <span className={`badge badge-${project.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} style={{ fontSize: '0.7rem' }}>
                      {project.category}
                    </span>
                  )}
                </div>
                <p className="date">{project.date}</p>
                <p className="description">
                  {project.description}
                  <span className="reading-time" style={{ display: 'block', fontSize: '0.75rem', opacity: 0.6, marginTop: '5px' }}>
                    {calculateReadingTime(project.description)} min read
                  </span>
                </p>
                {project.tags.length > 0 && (
                  <div className="quick-facts" style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {project.tags.map(tag => (
                      <span key={tag} className="badge">{tag}</span>
                    ))}
                  </div>
                )}
                {!project.isFuture && (
                  <ShareButtons 
                    title={project.title} 
                    shareUrl={project.link || "https://ai.georgegittins.com/projects"} 
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>No projects found matching your criteria.</p>
            <button 
              onClick={() => {setTechFilter('All'); setTechSearchQuery('');}}
              className="filter-btn"
              style={{ marginTop: '10px' }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      <section className="section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '20px' }}>
          <h2 style={{ margin: 0 }}>Selected Academic Work:</h2>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="search-container" style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search work..."
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
            </div>

            <div className="filter-container" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {academicCategories.map(cat => (
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
        
        {filteredWorks.length > 0 ? (
          <div className="selected-works-grid">
            {filteredWorks.map((work, index) => (
              <div key={index} className="card work-card">
                <div className="card-details">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, paddingRight: '10px' }}>
                      <h3>{work.title}</h3>
                      <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '2px' }}>
                        Overview: {calculateReadingTime(work.description)} min read
                      </p>
                    </div>
                    <span className={`badge badge-${work.category.toLowerCase()}`} style={{ fontSize: '0.7rem' }}>
                      {work.category}
                    </span>
                  </div>
                  <p className="description" style={{ marginTop: '10px' }}>{work.description}</p>
                  <ShareButtons title={work.title} shareUrl={work.url} />
                </div>
                <div className="pdf-container">
                  <iframe 
                    src={work.url} 
                    width="100%" 
                    height="400px" 
                    title={work.title}
                    allow="autoplay"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>No academic work found matching "{searchQuery}"</p>
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
    </>
  );
};

export default Projects;

