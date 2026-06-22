import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { experienceData, type ExperienceItem } from '../data/experienceData';

interface TimelinePosition {
  startYear: number;
  endYear: number;
  track: number; // Vertical level (0, 1, or 2)
}

// Maps each experience to a precise start/end year and layout track
const getTimelinePosition = (company: string, role: string): TimelinePosition => {
  const comp = company.toLowerCase();
  const r = role.toLowerCase();

  if (comp.includes("sia partners")) {
    return { startYear: 2025.83, endYear: 2026.5, track: 0 };
  }
  if (comp.includes("huracán") || comp.includes("huracan")) {
    return { startYear: 2025.75, endYear: 2025.83, track: 2 };
  }
  if (comp.includes("instantflows")) {
    return { startYear: 2024.67, endYear: 2025.75, track: 1 };
  }
  if (comp.includes("jor energy")) {
    return { startYear: 2022.67, endYear: 2025.0, track: 0 };
  }
  if (comp.includes("flink")) {
    return { startYear: 2021.83, endYear: 2022.67, track: 2 };
  }
  if (comp.includes("just eat takeaway")) {
    if (r.includes("captain")) {
      return { startYear: 2021.42, endYear: 2021.58, track: 1 };
    }
    if (r.includes("driver coordinator")) {
      return { startYear: 2019.25, endYear: 2021.58, track: 0 };
    }
    return { startYear: 2018.58, endYear: 2019.25, track: 2 };
  }
  if (comp.includes("hagaziekenhuis") || comp.includes("hospital")) {
    return { startYear: 2017.42, endYear: 2017.58, track: 1 };
  }
  if (comp.includes("boomerang")) {
    return { startYear: 2015.33, endYear: 2017.42, track: 0 };
  }
  if (comp.includes("aics") || comp.includes("espritscholen") || comp.includes("school")) {
    return { startYear: 2010.75, endYear: 2011.75, track: 0 };
  }

  return { startYear: 2015.0, endYear: 2016.0, track: 1 };
};

const InteractiveTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Timeline setup values
  const startYearRange = 2010;
  const endYearRange = 2027;
  const totalYears = endYearRange - startYearRange;
  const sidePadding = 80;

  // Track vertical coordinates within a 310px height container
  const trackY = [45, 140, 235]; 
  const centerAxisY = 140;
  const cardWidth = 190;
  const cardHeight = 65;

  // States
  const [zoomLevel, setZoomLevel] = useState<number>(170); // Pixels per year
  const [selectedItem, setSelectedItem] = useState<ExperienceItem>(experienceData[0]);
  const [hoveredItem, setHoveredItem] = useState<ExperienceItem | null>(null);
  
  // Dragging states
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeftState, setScrollLeftState] = useState<number>(0);

  // Calculate full timeline track width
  const trackWidth = totalYears * zoomLevel + sidePadding * 2;

  // Helper to convert decimal year to X coordinate
  const getX = useCallback((year: number) => {
    return (year - startYearRange) * zoomLevel + sidePadding;
  }, [zoomLevel, sidePadding]);

  // List of years to draw vertical markers
  const yearsList = useMemo(() => {
    const list = [];
    for (let y = startYearRange; y <= endYearRange; y++) {
      list.push(y);
    }
    return list;
  }, [startYearRange, endYearRange]);

  // Handle Drag-to-Scroll Mouse Events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    // Position within container
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeftState(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity
    containerRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Center on a specific experience item
  const centerOnItem = useCallback((item: ExperienceItem, smooth: boolean = true) => {
    if (!containerRef.current) return;
    const pos = getTimelinePosition(item.company, item.role);
    const middleYear = (pos.startYear + pos.endYear) / 2;
    const itemX = getX(middleYear);
    const viewportWidth = containerRef.current.clientWidth;
    const targetScrollLeft = itemX - viewportWidth / 2;

    if (typeof containerRef.current.scrollTo === 'function') {
      containerRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: smooth ? 'smooth' : 'auto',
      });
    } else {
      containerRef.current.scrollLeft = targetScrollLeft;
    }
  }, [getX]);

  // Select item and scroll to center it
  const handleSelect = (item: ExperienceItem) => {
    setSelectedItem(item);
    centerOnItem(item, true);
  };

  // Set default initial scroll position to the latest experience
  useEffect(() => {
    // Wait a brief tick for the DOM to render and establish container width
    const timer = setTimeout(() => {
      if (experienceData.length > 0) {
        centerOnItem(experienceData[0], false);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [centerOnItem]); // Also re-center when zoom level changes

  // Keyboard navigation
  const navigateTimeline = (direction: 'prev' | 'next') => {
    const currentIndex = experienceData.findIndex(
      (item) => item.company === selectedItem.company && item.role === selectedItem.role
    );
    if (currentIndex === -1) return;

    let targetIndex = currentIndex;
    if (direction === 'prev' && currentIndex < experienceData.length - 1) {
      targetIndex = currentIndex + 1; // In list, older experiences are at the end
    } else if (direction === 'next' && currentIndex > 0) {
      targetIndex = currentIndex - 1; // Newer experiences are at the beginning
    }

    if (targetIndex !== currentIndex) {
      handleSelect(experienceData[targetIndex]);
    }
  };

  // Smooth-scroll down to the detailed experience card on the page
  const scrollToDetailedCard = (companyName: string) => {
    const cards = document.querySelectorAll('.experience-card');
    for (let i = 0; i < cards.length; i++) {
      const cardHeader = cards[i].querySelector('h3');
      if (cardHeader && cardHeader.textContent?.toLowerCase().includes(companyName.toLowerCase())) {
        cards[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Apply temporary premium highlight effect
        cards[i].classList.add('glow-highlight');
        setTimeout(() => {
          cards[i].classList.remove('glow-highlight');
        }, 2200);
        break;
      }
    }
  };

  return (
    <div className="timeline-section-container card" style={{ padding: '25px', marginBottom: '35px', overflow: 'hidden' }}>
      <div className="timeline-header-controls">
        <div className="timeline-title-area">
          <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Interactive Career Timeline</h3>
          <p className="timeline-subtitle" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '5px 0 0 0' }}>
            ↔ Drag to scroll. Click cards to inspect. Double-click to jump to complete details below.
          </p>
        </div>
        
        {/* Navigation & Zoom controls */}
        <div className="timeline-actions">
          <div className="timeline-nav-buttons">
            <button 
              className="timeline-ctrl-btn" 
              onClick={() => navigateTimeline('prev')}
              title="Older experience"
              aria-label="Older experience"
            >
              ← Older
            </button>
            <button 
              className="timeline-ctrl-btn" 
              onClick={() => navigateTimeline('next')}
              title="Newer experience"
              aria-label="Newer experience"
            >
              Newer →
            </button>
          </div>

          <div className="timeline-zoom-controls">
            <button 
              className="timeline-ctrl-btn zoom-btn" 
              onClick={() => setZoomLevel(prev => Math.max(110, prev - 30))}
              title="Zoom out"
              aria-label="Zoom out"
            >
              🔍−
            </button>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minWidth: '35px', textAlign: 'center' }}>
              {Math.round((zoomLevel / 170) * 100)}%
            </span>
            <button 
              className="timeline-ctrl-btn zoom-btn" 
              onClick={() => setZoomLevel(prev => Math.min(260, prev + 30))}
              title="Zoom in"
              aria-label="Zoom in"
            >
              🔍+
            </button>
          </div>
        </div>
      </div>

      {/* Main Draggable Timeline Viewport */}
      <div 
        ref={containerRef}
        className={`timeline-viewport ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        style={{
          width: '100%',
          height: '310px',
          overflowX: 'auto',
          position: 'relative',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          marginTop: '20px',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          background: 'var(--pdf-bg)',
          scrollbarWidth: 'thin'
        }}
      >
        <div 
          className="timeline-scroll-track"
          style={{
            width: `${trackWidth}px`,
            height: '100%',
            position: 'relative'
          }}
        >
          {/* SVG Background Layer: Gridlines, axes, connections */}
          <svg 
            className="timeline-svg-bg"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            {/* Horizontal Center Axis */}
            <line
              x1={sidePadding}
              y1={centerAxisY}
              x2={trackWidth - sidePadding}
              y2={centerAxisY}
              stroke="var(--border-color)"
              strokeWidth="2"
              strokeDasharray={4}
              opacity={0.6}
            />

            {/* Glowing Accent Main Axis Line */}
            <line
              x1={getX(2010.75)}
              y1={centerAxisY}
              x2={getX(2026.5)}
              y2={centerAxisY}
              stroke="var(--accent-color)"
              strokeWidth="3"
              opacity={0.3}
            />

            {/* Year Lines and Faint Grid */}
            {yearsList.map((year) => {
              const xVal = getX(year);
              return (
                <g key={`year-grid-${year}`}>
                  <line
                    x1={xVal}
                    y1={20}
                    x2={xVal}
                    y2={280}
                    stroke="var(--border-color)"
                    strokeWidth="1"
                    opacity={0.25}
                  />
                  <text
                    x={xVal}
                    y={295}
                    textAnchor="middle"
                    fill="var(--text-muted)"
                    fontSize="11"
                    fontWeight="500"
                  >
                    {year}
                  </text>
                </g>
              );
            })}

            {/* Connections & Capsules for each Experience Item */}
            {experienceData.map((item, index) => {
              const pos = getTimelinePosition(item.company, item.role);
              const startX = getX(pos.startYear);
              const endX = getX(pos.endYear);
              const middleX = (startX + endX) / 2;
              const targetY = trackY[pos.track];
              
              const isSelected = selectedItem.company === item.company && selectedItem.role === item.role;
              const isHovered = hoveredItem?.company === item.company && hoveredItem?.role === item.role;
              const isActive = isSelected || isHovered;

              return (
                <g key={`timeline-item-svg-${index}`}>
                  {/* Vertical dotted connector line to center axis */}
                  <line
                    x1={middleX}
                    y1={centerAxisY}
                    x2={middleX}
                    y2={targetY + (pos.track === 0 ? cardHeight : 0)}
                    stroke={isActive ? "var(--accent-color)" : "var(--border-color)"}
                    strokeWidth={isActive ? "2" : "1.5"}
                    strokeDasharray={isActive ? "none" : "3,3"}
                    opacity={isActive ? 0.9 : 0.4}
                    style={{ transition: 'stroke 0.2s, stroke-width 0.2s, opacity 0.2s' }}
                  />

                  {/* Horizontal Duration Capsule */}
                  <rect
                    x={startX}
                    y={targetY + (pos.track === 0 ? cardHeight - 3 : -3)}
                    width={Math.max(10, endX - startX)}
                    height="6"
                    rx="3"
                    fill={isActive ? "var(--accent-color)" : "var(--border-color)"}
                    opacity={isActive ? 0.8 : 0.35}
                    style={{ transition: 'fill 0.2s, opacity 0.2s' }}
                  />
                  
                  {/* Join Node Circle */}
                  <circle
                    cx={middleX}
                    cy={centerAxisY}
                    r={isSelected ? 6 : (isHovered ? 5 : 4)}
                    fill={isActive ? "var(--accent-color)" : "var(--border-color)"}
                    stroke="var(--pdf-bg)"
                    strokeWidth="1.5"
                    opacity={isActive ? 1.0 : 0.7}
                    style={{ transition: 'r 0.2s, fill 0.2s' }}
                  />
                </g>
              );
            })}
          </svg>

          {/* HTML Interactive Cards Layer */}
          {experienceData.map((item, index) => {
            const pos = getTimelinePosition(item.company, item.role);
            const startX = getX(pos.startYear);
            const endX = getX(pos.endYear);
            const middleX = (startX + endX) / 2;
            const topY = trackY[pos.track];
            
            const isSelected = selectedItem.company === item.company && selectedItem.role === item.role;
            const isHovered = hoveredItem?.company === item.company && hoveredItem?.role === item.role;

            return (
              <div
                key={`timeline-card-${index}`}
                className={`timeline-html-card ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleSelect(item)}
                onDoubleClick={() => scrollToDetailedCard(item.company)}
                style={{
                  position: 'absolute',
                  left: `${middleX - cardWidth / 2}px`,
                  top: `${topY}px`,
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: isSelected ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                  background: 'var(--card-bg)',
                  boxShadow: isSelected 
                    ? '0 4px 15px rgba(52, 152, 219, 0.25)' 
                    : (isHovered ? '0 3px 8px var(--card-shadow-hover)' : '0 2px 4px var(--card-shadow)'),
                  cursor: 'pointer',
                  zIndex: isSelected ? 100 : (isHovered ? 90 : 10),
                  transition: 'all 0.2s ease-out, border-color 0.1s',
                  boxSizing: 'border-box',
                  overflow: 'hidden'
                }}
              >
                <img 
                  src={item.logo} 
                  alt={item.company}
                  draggable={false}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    objectFit: 'contain',
                    marginRight: '8px',
                    flexShrink: 0,
                    background: 'var(--logo-bg)',
                    border: '1px solid var(--logo-border)'
                  }}
                />
                <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ 
                    margin: 0, 
                    fontSize: '0.8rem', 
                    fontWeight: 700, 
                    color: 'var(--text-color)', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis' 
                  }}>
                    {item.company}
                  </h4>
                  <p style={{ 
                    margin: '2px 0 0 0', 
                    fontSize: '0.7rem', 
                    color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis' 
                  }}>
                    {item.role}
                  </p>
                  <p style={{ 
                    margin: '1px 0 0 0', 
                    fontSize: '0.65rem', 
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.date.split('-')[0].trim()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Experience Detail Pane (Glassmorphic & Fluid) */}
      {selectedItem && (
        <div 
          className="timeline-detail-pane card"
          style={{
            marginTop: '25px',
            padding: '20px',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderLeft: '4px solid var(--accent-color)',
            borderRadius: '10px',
            boxShadow: '0 4px 12px var(--card-shadow)',
            animation: 'fadeIn 0.3s ease-out',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img 
                src={selectedItem.logo} 
                alt={selectedItem.company} 
                style={{
                  width: '45px',
                  height: '45px',
                  objectFit: 'contain',
                  borderRadius: '6px',
                  background: 'var(--logo-bg)',
                  border: '1px solid var(--logo-border)',
                  padding: '2px'
                }}
              />
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-color)' }}>
                  {selectedItem.company} / <span style={{ color: 'var(--accent-color)' }}>{selectedItem.role}</span>
                </h4>
                <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  📅 {selectedItem.date} | 📍 {selectedItem.location}
                </p>
              </div>
            </div>

            <button
              onClick={() => scrollToDetailedCard(selectedItem.company)}
              className="filter-btn"
              style={{
                fontSize: '0.8rem',
                padding: '6px 12px',
                background: 'var(--accent-color)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                boxShadow: '0 2px 6px rgba(52, 152, 219, 0.3)'
              }}
            >
              Scroll to Full Details ↓
            </button>
          </div>

          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }} className="timeline-detail-desc">
            {typeof selectedItem.description === 'string' ? (
              <p style={{ margin: 0 }}>{selectedItem.description}</p>
            ) : (
              // If description is ReactNode (ul/li), render a clean text approximation or clone it
              <div style={{ margin: 0 }} className="timeline-detail-node">
                {selectedItem.description}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
            {selectedItem.tags.map((tag, i) => (
              <span key={i} className={`badge ${tag.className || ''}`} style={{ fontSize: '0.75rem' }}>
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveTimeline;
