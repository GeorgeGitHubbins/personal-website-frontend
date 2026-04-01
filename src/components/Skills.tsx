import React from 'react';

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

const Skills: React.FC = () => {
  return (
    <div className="skills-container">
      <h3>Skills & Expertise</h3>
      {skillCategories.map((category) => (
        <div key={category.name} className="skills-category">
          <h4>{category.name}</h4>
          <div className="skills-grid">
            {category.skills.map((skill) => (
              <span key={skill} className={`badge ${category.className}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
