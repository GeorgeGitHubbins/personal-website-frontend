import React, { useState, useMemo } from 'react';
import InteractiveTimeline from '../components/InteractiveTimeline';
import { experienceData } from '../data/experienceData';

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
      <InteractiveTimeline />

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
