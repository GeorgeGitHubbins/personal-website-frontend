import React, { useState } from 'react';

interface SkillCategory {
  name: string;
  skills: string[];
  className: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Engineering & Tech',
    skills: ['Systems Engineering', 'AI & LLMs', 'React', 'TypeScript', 'Django/Python', 'Project Architecture'],
    className: 'badge-tech'
  },
  {
    name: 'Data & Analytics',
    skills: ['Data Science', 'Data Visualization', 'Market Research', 'Process Optimization', 'Advanced Google Sheets'],
    className: 'badge-data'
  },
  {
    name: 'Leadership & Strategy',
    skills: ['Entrepreneurship', 'Product Strategy', 'Consultancy', 'Team Leadership', 'Operations'],
    className: 'badge-leadership'
  }
];

interface RadarDimension {
  label: string;
  value: number; // out of 100
  axisLabel: string;
}

const radarData: RadarDimension[] = [
  { label: "Systems Engineering", value: 95, axisLabel: "Systems Eng." },
  { label: "Data & Analytics", value: 90, axisLabel: "Data & ML" },
  { label: "Frontend Dev", value: 85, axisLabel: "Frontend Dev" },
  { label: "Backend & Cloud", value: 80, axisLabel: "Backend & Cloud" },
  { label: "Product & Strategy", value: 85, axisLabel: "Product & Strategy" },
  { label: "Consulting & Leadership", value: 90, axisLabel: "Consulting" }
];

const Skills: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const center = 150;
  const maxRadius = 100;
  const numAxes = radarData.length;

  // Helper to generate coordinates for a specific radius
  const getCoordinates = (radius: number) => {
    return Array.from({ length: numAxes }).map((_, i) => {
      const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // Helper to get coordinates for the data polygon
  const getDataPointsString = () => {
    return radarData.map((d, i) => {
      const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
      const r = (d.value / 100) * maxRadius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // Check if a specific axis/dimension is highlighted
  const isAxisHighlighted = (index: number) => {
    if (hoveredIndex === index) return true;
    if (hoveredCategory === 'Engineering & Tech' && (index === 0 || index === 2 || index === 3)) return true;
    if (hoveredCategory === 'Data & Analytics' && index === 1) return true;
    if (hoveredCategory === 'Leadership & Strategy' && (index === 4 || index === 5)) return true;
    return false;
  };

  // Check if any hover is active
  const isAnyHoverActive = hoveredIndex !== null || hoveredCategory !== null;

  // Check if a category is highlighted
  const isCategoryHighlighted = (catName: string) => {
    if (hoveredCategory === catName) return true;
    if (catName === 'Engineering & Tech' && (hoveredIndex === 0 || hoveredIndex === 2 || hoveredIndex === 3)) return true;
    if (catName === 'Data & Analytics' && hoveredIndex === 1) return true;
    if (catName === 'Leadership & Strategy' && (hoveredIndex === 4 || hoveredIndex === 5)) return true;
    return false;
  };

  return (
    <div className="skills-container">
      <h3>Skills & Expertise</h3>
      
      <div className="skills-section-layout">
        {/* Radar Chart Side */}
        <div className="skills-radar-chart-container">
          <svg className="radar-chart-svg" width="100%" height="100%" viewBox="0 0 300 300">
            <defs>
              <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="polyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2ecc71" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Glowing background */}
            <circle cx={center} cy={center} r={maxRadius} fill="url(#radarGlow)" />

            {/* Concentric grid rings */}
            {[20, 40, 60, 80, 100].map((r) => (
              <polygon 
                key={r} 
                points={getCoordinates((r / 100) * maxRadius)} 
                className="radar-grid-ring" 
              />
            ))}

            {/* Axis Lines */}
            {Array.from({ length: numAxes }).map((_, i) => {
              const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
              const x = center + maxRadius * Math.cos(angle);
              const y = center + maxRadius * Math.sin(angle);
              const highlighted = isAxisHighlighted(i);
              return (
                <line 
                  key={i} 
                  x1={center} 
                  y1={center} 
                  x2={x} 
                  y2={y} 
                  className={`radar-axis-line ${highlighted ? 'highlighted' : ''} ${isAnyHoverActive && !highlighted ? 'dimmed' : ''}`} 
                />
              );
            })}

            {/* Core Data Polygon */}
            <polygon 
              points={getDataPointsString()} 
              className="radar-data-polygon" 
              fill="url(#polyGrad)"
            />

            {/* Interactive Dimension Vertices */}
            {radarData.map((d, i) => {
              const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
              const r = (d.value / 100) * maxRadius;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              const highlighted = isAxisHighlighted(i);

              return (
                <g 
                  key={i}
                  className={`radar-vertex-group ${highlighted ? 'highlighted' : ''} ${isAnyHoverActive && !highlighted ? 'dimmed' : ''}`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <circle 
                    cx={x} 
                    cy={y} 
                    r={highlighted ? 8 : 4.5} 
                    className="radar-point" 
                    fill="var(--accent-color)"
                  />
                  {highlighted && (
                    <circle 
                      cx={x} 
                      cy={y} 
                      r={14} 
                      className="radar-point-pulse" 
                      fill="none" 
                      stroke="var(--accent-color)" 
                      strokeWidth="1.5"
                    />
                  )}
                </g>
              );
            })}

            {/* Labels */}
            {radarData.map((d, i) => {
              const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
              const labelRadius = maxRadius + 18;
              const x = center + labelRadius * Math.cos(angle);
              const y = center + labelRadius * Math.sin(angle);
              
              let textAnchor: "middle" | "start" | "end" = "middle";
              let dy = "0.35em";
              
              if (Math.abs(Math.cos(angle)) < 0.1) {
                textAnchor = "middle";
                dy = Math.sin(angle) < 0 ? "-0.2em" : "1.0em";
              } else {
                textAnchor = Math.cos(angle) > 0 ? "start" : "end";
                dy = "0.35em";
              }

              const highlighted = isAxisHighlighted(i);

              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  dy={dy}
                  className={`radar-label ${highlighted ? 'highlighted' : ''} ${isAnyHoverActive && !highlighted ? 'dimmed' : ''}`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {d.axisLabel}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Text Category List Side */}
        <div className="skills-list-container">
          {skillCategories.map((category) => {
            const highlighted = isCategoryHighlighted(category.name);
            const dimmed = isAnyHoverActive && !highlighted;

            return (
              <div 
                key={category.name} 
                className={`skills-category-card ${highlighted ? 'highlighted' : ''} ${dimmed ? 'dimmed' : ''}`}
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <h4>{category.name}</h4>
                <div className="skills-grid">
                  {category.skills.map((skill) => (
                    <span key={skill} className={`badge ${category.className}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
