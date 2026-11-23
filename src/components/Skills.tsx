import React, { useState } from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
    skills: ['Systems Engineering', 'Project Architecture'],
  },
  {
    name: 'Software Dev',
    score: 85,
    description: 'Building modern, responsive, and type-safe applications (React, TS, Python).',
    skills: ['React', 'TypeScript', 'Django/Python'],
  },
  {
    name: 'Data & AI',
    score: 90,
    description: 'Applying predictive modeling, advanced analytics, and LLM orchestration.',
    skills: ['Data Science', 'AI & LLMs', 'Data Visualization'],
  },
  {
    name: 'Operations',
    score: 85,
    description: 'Optimizing resource workflows, lean methodologies, and automated data sheets.',
    skills: ['Process Optimization', 'Operations', 'Advanced Google Sheets'],
  },
  {
    name: 'Strategy',
    score: 80,
    description: 'Formulating commercial strategy, product roadmaps, and validation criteria.',
    skills: ['Entrepreneurship', 'Product Strategy', 'Market Research'],
  },
  {
    name: 'Leadership',
    score: 90,
    description: 'Coordinating cross-functional teams, solving problems, and stakeholder advisory.',
    skills: ['Consultancy', 'Team Leadership'],
  },
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
      { name: 'Project Architecture', level: 85, description: 'Designing scalable system structures, clean API integrations, and code maps.' },
    ],
  },
  {
    name: 'Data & Analytics',
    className: 'badge-data',
    skills: [
      { name: 'Data Science', level: 90, description: 'Statistical modeling, quantitative analysis, and predictive scripting.' },
      { name: 'Data Visualization', level: 90, description: 'Creating interactive, executive-ready dashboard layouts and visual analytics.' },
      { name: 'Process Optimization', level: 85, description: 'Streamlining complex workflows, identifying bottlenecks, and operations design.' },
      { name: 'Market Research', level: 80, description: 'Analyzing market opportunities, user personas, and commercial feasibility.' },
      { name: 'Advanced Google Sheets', level: 95, description: 'Financial modeling, script automations, and custom database structures.' },
    ],
  },
  {
    name: 'Leadership & Strategy',
    className: 'badge-leadership',
    skills: [
      { name: 'Team Leadership', level: 90, description: 'Coordinating agile sprints, coaching, and public presentation.' },
      { name: 'Consultancy', level: 85, description: 'Advising organizations, structuring complex problems, and pitching solutions.' },
      { name: 'Product Strategy', level: 85, description: 'Defining roadmap milestones, UX research, and user value design.' },
      { name: 'Operations', level: 85, description: 'Managing standard operating procedures, deliverables, and resource allocation.' },
      { name: 'Entrepreneurship', level: 80, description: 'Launching ventures, business modeling, and building MVPs.' },
    ],
  },
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
  'Team Leadership': 5,
};

const Skills: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [hoveredAxisIndex, setHoveredAxisIndex] = useState<number | null>(null);
  const [selectedAxisIndex, setSelectedAxisIndex] = useState<number | null>(null);

  const centerX = 240;
  const centerY = 190;
  const maxRadius = 112;
  const totalAxes = radarAxes.length;

  const getCoordinates = (index: number, radius: number) => {
    const angle = (index * 2 * Math.PI) / totalAxes - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const getLabelPosition = (index: number, radius: number) => {
    const angle = (index * 2 * Math.PI) / totalAxes - Math.PI / 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    let textAnchor: 'middle' | 'start' | 'end' = 'middle';
    let dx = 0;
    let dy = 0;

    if (Math.abs(cos) < 0.1) {
      textAnchor = 'middle';
      dy = sin > 0 ? 15 : -8;
    } else if (cos > 0) {
      textAnchor = 'start';
      dx = 8;
      dy = Math.abs(sin) < 0.1 ? 3 : sin > 0 ? 8 : -2;
    } else {
      textAnchor = 'end';
      dx = -8;
      dy = Math.abs(sin) < 0.1 ? 3 : sin > 0 ? 8 : -2;
    }

    return {
      x: centerX + radius * cos + dx,
      y: centerY + radius * sin + dy,
      textAnchor,
    };
  };

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const activeAxisIndex = hoveredAxisIndex !== null ? hoveredAxisIndex : selectedAxisIndex;

  const isSkillHighlighted = (skillName: string) => {
    if (activeAxisIndex === null) return false;
    return radarAxes[activeAxisIndex].skills.includes(skillName);
  };

  const handleAxisSelect = (index: number) => {
    if (selectedAxisIndex === index) {
      setSelectedAxisIndex(null);
    } else {
      setSelectedAxisIndex(index);
      const sampleSkill = radarAxes[index].skills[0];
      const categoryIndex = skillCategories.findIndex((cat) =>
        cat.skills.some((skill) => skill.name === sampleSkill)
      );
      if (categoryIndex !== -1) {
        setActiveCategoryIndex(categoryIndex);
      }
    }
  };

  const polygonPoints = radarAxes
    .map((axis, index) => {
      const radius = (axis.score / 100) * maxRadius;
      const coords = getCoordinates(index, radius);
      return `${coords.x},${coords.y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-brand uppercase">
          <Compass className="size-3.5" />
          Competency Matrix
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Skills &amp; Expertise
        </h3>
        <p className="text-sm text-muted-foreground">
          Hover or tap on the radar dimensions or skill bars to explore how capabilities connect.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Radar Chart Card */}
        <Card className="lg:col-span-6">
          <CardContent className="flex flex-col gap-4">
            <svg
              className="mx-auto h-auto w-full max-w-[440px] select-none"
              viewBox="0 0 480 380"
              role="img"
              aria-label="George's Skills Radar Chart"
            >
              <defs>
                <linearGradient id="radar-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.08" />
                </linearGradient>
              </defs>

              {/* Concentric Grid */}
              {gridLevels.map((level, levelIdx) => {
                const radius = level * maxRadius;
                const points = Array.from({ length: totalAxes })
                  .map((_, i) => {
                    const coords = getCoordinates(i, radius);
                    return `${coords.x},${coords.y}`;
                  })
                  .join(' ');
                return (
                  <polygon
                    key={`grid-${levelIdx}`}
                    points={points}
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth={levelIdx === gridLevels.length - 1 ? 1.25 : 1}
                    strokeDasharray={levelIdx === gridLevels.length - 1 ? undefined : '3,3'}
                  />
                );
              })}

              {/* Axis Lines */}
              {Array.from({ length: totalAxes }).map((_, i) => {
                const coords = getCoordinates(i, maxRadius);
                return (
                  <line
                    key={`axis-line-${i}`}
                    x1={centerX}
                    y1={centerY}
                    x2={coords.x}
                    y2={coords.y}
                    stroke="var(--border)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Data Polygon */}
              <polygon
                points={polygonPoints}
                fill="url(#radar-glow)"
                stroke="var(--brand)"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Axis Labels */}
              {radarAxes.map((axis, i) => {
                const labelPos = getLabelPosition(i, maxRadius + 14);
                const isCurrent = activeAxisIndex === i;
                return (
                  <text
                    key={`label-${i}`}
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor={labelPos.textAnchor}
                    fontSize={12.5}
                    fontWeight={isCurrent ? '700' : '500'}
                    fill={isCurrent ? 'var(--brand)' : 'var(--muted-foreground)'}
                    className="cursor-pointer transition-colors"
                    onMouseEnter={() => setHoveredAxisIndex(i)}
                    onMouseLeave={() => setHoveredAxisIndex(null)}
                    onClick={() => handleAxisSelect(i)}
                  >
                    {axis.name}
                  </text>
                );
              })}

              {/* Vertices */}
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
                    fill={isCurrent ? 'var(--brand)' : 'var(--card)'}
                    stroke="var(--brand)"
                    strokeWidth="2.5"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredAxisIndex(i)}
                    onMouseLeave={() => setHoveredAxisIndex(null)}
                    onClick={() => handleAxisSelect(i)}
                    aria-label={`${axis.name}: score ${axis.score}`}
                  />
                );
              })}
            </svg>

            {/* Focus Detail Box */}
            <div className="rounded-lg border bg-muted/40 p-4">
              {activeAxisIndex !== null ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="text-sm font-semibold text-foreground">
                      {radarAxes[activeAxisIndex].name}
                    </h5>
                    <Badge variant="brand">{radarAxes[activeAxisIndex].score}%</Badge>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {radarAxes[activeAxisIndex].description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {radarAxes[activeAxisIndex].skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      <Sparkles className="size-3.5 text-brand" />
                      Core Strengths Overview
                    </h5>
                    <Badge variant="outline">Avg 87%</Badge>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Hover or click on any chart point or label to read details about George&apos;s core engineering, data, and leadership competencies.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <Badge variant="secondary">Systems Design</Badge>
                    <Badge variant="secondary">Software Dev</Badge>
                    <Badge variant="secondary">Data &amp; AI</Badge>
                    <Badge variant="secondary">Operations</Badge>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right: Category Browser Card */}
        <Card className="lg:col-span-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Capability Breakdown</CardTitle>
            <CardDescription>Switch domains to inspect proficiency and focus areas.</CardDescription>
            <div className="mt-3 grid grid-cols-1 gap-1 rounded-lg bg-muted p-1 sm:grid-cols-3">
              {skillCategories.map((category, idx) => {
                const isActive = activeCategoryIndex === idx;
                return (
                  <button
                    key={category.name}
                    type="button"
                    className={cn(
                      'cursor-pointer rounded-md px-2.5 py-1.5 text-xs font-medium transition-all',
                      isActive
                        ? 'active bg-background text-foreground shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                    onClick={() => setActiveCategoryIndex(idx)}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </CardHeader>

          <CardContent>
            {skillCategories.map((category, catIdx) => {
              const isActive = activeCategoryIndex === catIdx;
              return (
                <div
                  key={category.name}
                  style={{ display: isActive ? 'flex' : 'none' }}
                  className="flex-col gap-3.5"
                >
                  {category.skills.map((skill) => {
                    const isHighlighted = isSkillHighlighted(skill.name);
                    const relatedAxisIdx = skillToAxisMap[skill.name];

                    return (
                      <div
                        key={skill.name}
                        className={cn(
                          'rounded-lg border p-3 transition-all',
                          isHighlighted
                            ? 'border-brand/60 bg-brand/5 shadow-xs'
                            : 'border-transparent bg-muted/30 hover:border-border'
                        )}
                        onMouseEnter={() => setHoveredAxisIndex(relatedAxisIdx)}
                        onMouseLeave={() => setHoveredAxisIndex(null)}
                      >
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="font-medium text-foreground">{skill.name}</span>
                          <span className="font-mono text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-brand transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {skill.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Skills;
