import React, { useState } from 'react';

interface SkillDetail {
  name: string;
  level: number;
  description: string;
}

interface SkillCategory {
  name: string;
  className: string;
  skills: SkillDetail[];
}

interface RadarAxis {
  name: string;
  score: number;
  description: string;
  skills: string[];
}

const radarAxes: RadarAxis[] = [
  {
    name: 'Systems Design',
    score: 95,
    description: 'Engineering complex, multi-stakeholder systems and architectural frameworks.',
    skills: ['Systems Engineering', 'Project Architecture']
  },
  {
    name: 'Software Dev',
    score: 85,
    description: 'Building modern, responsive, and type-safe applications (React, TS, Python).',
    skills: ['React', 'TypeScript', 'Django/Python']
  },
  {
    name: 'Data & AI',
    score: 90,
    description: 'Applying predictive modeling, advanced analytics, and LLM orchestration.',
    skills: ['Data Science', 'AI & LLMs', 'Data Visualization']
  },
  {
    name: 'Operations & Process',
    score: 85,
    description: 'Optimizing resource workflows, lean methodologies, and automated data sheets.',
    skills: ['Process Optimization', 'Operations', 'Advanced Google Sheets']
  },
  {
    name: 'Business Strategy',
    score: 80,
    description: 'Formulating commercial strategy, product roadmaps, and validation criteria.',
    skills: ['Entrepreneurship', 'Product Strategy', 'Market Research']
  },
  {
    name: 'Consultancy & Leadership',
    score: 90,
    description: 'Coordinating cross-functional teams, solving problems, and stakeholder advisory.',
    skills: ['Consultancy', 'Team Leadership']
  }
];

const skillCategories: SkillCategory[] = [
  {
    name: 'Engineering & Tech',
    className: 'badge-tech',
    skills: [
      { name: 'Systems Engineering', level: 95, description: 'Engineering complex socio-technical systems, requirement management, and validation.' },
      { name: 'AI & LLMs', level: 90, description: 'Developing agentic workflows, prompt engineering, and client-side LLM integrations.' },
      { name: 'React', level: 85, description: 'Developing highly responsive, state-managed Single Page Applications.' },
      { name: 'TypeScript', level: 85, description: 'Building type-safe, maintainable, and structured enterprise-scale frontend code.' },
      { name: 'Django/Python', level: 80, description: 'Implementing robust and secure REST APIs, services, and script tools.' },
      { name: 'Project Architecture', level: 85, description: 'Designing scalable system structures, clean API integrations, and code maps.' }
    ]
  },
  {
    name: 'Data & Analytics',
    className: 'badge-data',
    skills: [
      { name: 'Data Science', level: 90, description: 'Statistical modeling, quantitative analysis, and predictive scripting.' },
      { name: 'Data Visualization', level: 90, description: 'Creating interactive, beautiful dashboard layouts, plots, and dashboards.' },
      { name: 'Process Optimization', level: 85, description: 'Streamlining complex workflows, identifying bottlenecks, and operations design.' },
      { name: 'Market Research', level: 80, description: 'Analyzing market opportunities, user personas, and commercial feasibility.' },
      { name: 'Advanced Google Sheets', level: 95, description: 'Financial modeling, script automations, and custom database structures.' }
    ]
  },
  {
    name: 'Leadership & Strategy',
    className: 'badge-leadership',
    skills: [
      { name: 'Team Leadership', level: 90, description: 'Coordinating agile sprints, coaching, and public presentation.' },
      { name: 'Consultancy', level: 85, description: 'Advising organizations, structuring complex problems, and pitching solutions.' },
      { name: 'Product Strategy', level: 85, description: 'Defining roadmap milestones, UX research, and user value design.' },
      { name: 'Operations', level: 85, description: 'Managing standard operating procedures, deliverables, and resource allocation.' },
      { name: 'Entrepreneurship', level: 80, description: 'Launching ventures, business modeling, and building MVPs.' }
    ]
  }
];

const skillToAxisMap: { [key: string]: number } = {
  'Systems Engineering': 0,
  'Project Architecture': 0,
  'React': 1,
  'TypeScript': 1,
  'Django/Python': 1,
  'Data Science': 2,
  'AI & LLMs': 2,
  'Data Visualization': 2,
  'Process Optimization': 3,
  'Operations': 3,
  'Advanced Google Sheets': 3,
  'Entrepreneurship': 4,
  'Product Strategy': 4,
  'Market Research': 4,
  'Consultancy': 5,
  'Team Leadership': 5
};

const Skills: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [hoveredAxisIndex, setHoveredAxisIndex] = useState<number | null>(null);
  const [selectedAxisIndex, setSelectedAxisIndex] = useState<number | null>(null);

  // SVG dimensions
  const centerX = 200;
  const centerY = 185;
  const maxRadius = 115;
  const totalAxes = radarAxes.length;

  // Calculate coordinates helper
  const getCoordinates = (index: number, radius: number) => {
    const angle = (index * 2 * Math.PI / totalAxes) - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  // Label position helper
  const getLabelPosition = (index: number, radius: number) => {
    const angle = (index * 2 * Math.PI / totalAxes) - Math.PI / 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    
    let textAnchor: 'middle' | 'start' | 'end' = 'middle';
    let dx = 0;
    let dy = 0;
    
    if (Math.abs(cos) < 0.1) {
      textAnchor = 'middle';
      dy = sin > 0 ? 14 : -6;
    } else if (cos > 0) {
      textAnchor = 'start';
      dx = 6;
      dy = Math.abs(sin) < 0.1 ? 3 : (sin > 0 ? 8 : -2);
    } else {
      textAnchor = 'end';
      dx = -6;
      dy = Math.abs(sin) < 0.1 ? 3 : (sin > 0 ? 8 : -2);
    }
    
    return {
      x: centerX + radius * cos + dx,
      y: centerY + radius * sin + dy,
      textAnchor,
    };
  };

  // Concentric grid levels
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Active indices (hover takes priority over selected)
  const activeAxisIndex = hoveredAxisIndex !== null ? hoveredAxisIndex : selectedAxisIndex;

  // Check if a specific skill is highlighted (because its related axis is selected/hovered)
  const isSkillHighlighted = (skillName: string) => {
    if (activeAxisIndex === null) return false;
    const axis = radarAxes[activeAxisIndex];
    return axis.skills.includes(skillName);
  };

  // Handle vertex click
  const handleAxisSelect = (index: number) => {
    if (selectedAxisIndex === index) {
      setSelectedAxisIndex(null);
    } else {
      setSelectedAxisIndex(index);
      
      // Auto-switch right side tab to correspond to the clicked axis if appropriate
      const sampleSkill = radarAxes[index].skills[0];
      const categoryIndex = skillCategories.findIndex(cat => 
        cat.skills.some(skill => skill.name === sampleSkill)
      );
      if (categoryIndex !== -1) {
        setActiveCategoryIndex(categoryIndex);
      }
    }
  };

  // Points string for the data polygon
  const polygonPoints = radarAxes.map((axis, index) => {
    const radius = (axis.score / 100) * maxRadius;
    const coords = getCoordinates(index, radius);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  return (
    <div className="skills-container">
      <h3>Skills & Expertise</h3>
      
      <div className="skills-helper-text">
        <span>💡 Hover or tap on the radar chart dimensions or skill bars to explore connections.</span>
      </div>

      <div className="skills-dashboard">
        {/* Left Side: Radar Chart */}
        <div className="skills-radar-container">
          <svg className="radar-svg" viewBox="-45 -20 490 410" role="img" aria-label="George's Skills Radar Chart">
            <defs>
              <linearGradient id="radar-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1abc9c" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Concentric Grid Hexagons */}
            {gridLevels.map((level, levelIdx) => {
              const radius = level * maxRadius;
              const points = Array.from({ length: totalAxes }).map((_, i) => {
                const coords = getCoordinates(i, radius);
                return `${coords.x},${coords.y}`;
              }).join(' ');
              
              return (
                <polygon
                  key={`grid-${levelIdx}`}
                  points={points}
                  className="radar-grid-line"
                />
              );
            })}

            {/* Radiating Axis Lines */}
            {Array.from({ length: totalAxes }).map((_, i) => {
              const coords = getCoordinates(i, maxRadius);
              return (
                <line
                  key={`axis-line-${i}`}
                  x1={centerX}
                  y1={centerY}
                  x2={coords.x}
                  y2={coords.y}
                  className="radar-axis-line"
                />
              );
            })}

            {/* Data Polygon */}
            <polygon
              points={polygonPoints}
              className="radar-polygon"
              fill="url(#radar-glow)"
            />

            {/* Axis Labels & Interaction */}
            {radarAxes.map((axis, i) => {
              const labelPos = getLabelPosition(i, maxRadius + 12);
              const isCurrent = activeAxisIndex === i;
              
              return (
                <text
                  key={`label-${i}`}
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor={labelPos.textAnchor}
                  className={`radar-label ${isCurrent ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredAxisIndex(i)}
                  onMouseLeave={() => setHoveredAxisIndex(null)}
                  onClick={() => handleAxisSelect(i)}
                >
                  {axis.name}
                </text>
              );
            })}

            {/* Polygon Vertex Dots */}
            {radarAxes.map((axis, i) => {
              const radius = (axis.score / 100) * maxRadius;
              const coords = getCoordinates(i, radius);
              const isCurrent = activeAxisIndex === i;
              
              return (
                <circle
                  key={`vertex-${i}`}
                  cx={coords.x}
                  cy={coords.y}
                  r={isCurrent ? 7 : 5}
                  className={`radar-vertex ${isCurrent ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredAxisIndex(i)}
                  onMouseLeave={() => setHoveredAxisIndex(null)}
                  onClick={() => handleAxisSelect(i)}
                  aria-label={`${axis.name}: score ${axis.score}`}
                />
              );
            })}
          </svg>

          {/* Radar Focus Card */}
          <div className="radar-focus-card">
            {activeAxisIndex !== null ? (
              <>
                <h5>
                  <span>{radarAxes[activeAxisIndex].name}</span>
                  <span className="focus-score">{radarAxes[activeAxisIndex].score}%</span>
                </h5>
                <p>{radarAxes[activeAxisIndex].description}</p>
                <div className="focus-skills">
                  {radarAxes[activeAxisIndex].skills.map((skill) => (
                    <span key={skill} className="focus-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h5>
                  <span>Core Strengths Overview</span>
                  <span className="focus-score">Avg 87%</span>
                </h5>
                <p>Hover or click on any chart point or label to read details about George's core engineering, data, and leadership competencies.</p>
                <div className="focus-skills">
                  <span className="focus-skill-tag">Systems Design</span>
                  <span className="focus-skill-tag">Software Dev</span>
                  <span className="focus-skill-tag">Data & AI</span>
                  <span className="focus-skill-tag">Operations</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Side: Skill Category Browser */}
        <div className="skill-browser-container">
          <div className="skills-tab-bar">
            {skillCategories.map((category, idx) => (
              <button
                key={category.name}
                className={`skill-tab-button ${activeCategoryIndex === idx ? 'active' : ''} ${
                  idx === 0 ? 'tab-tech' : idx === 1 ? 'tab-data' : 'tab-leadership'
                }`}
                onClick={() => setActiveCategoryIndex(idx)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="skill-meters-list">
            {skillCategories.map((category, catIdx) => {
              const isActive = activeCategoryIndex === catIdx;
              return (
                <div 
                  key={category.name} 
                  style={{ display: isActive ? 'flex' : 'none', flexDirection: 'column', gap: '18px' }}
                >
                  {category.skills.map((skill) => {
                    const isHighlighted = isSkillHighlighted(skill.name);
                    const relatedAxisIdx = skillToAxisMap[skill.name];
                    
                    return (
                      <div
                        key={skill.name}
                        className={`skill-meter-wrapper ${isHighlighted ? 'highlighted' : ''}`}
                        onMouseEnter={() => setHoveredAxisIndex(relatedAxisIdx)}
                        onMouseLeave={() => setHoveredAxisIndex(null)}
                      >
                        <div className="skill-meter-header">
                          <span className="skill-meter-name">{skill.name}</span>
                          <span className="skill-meter-percentage">{skill.level}%</span>
                        </div>
                        <div className="skill-meter-bar">
                          <div
                            className={`skill-meter-fill ${
                              catIdx === 0
                                ? 'tech-fill'
                                : catIdx === 1
                                ? 'data-fill'
                                : 'leadership-fill'
                            }`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <p className="skill-meter-description">{skill.description}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
