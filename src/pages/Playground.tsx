import React, { useState } from 'react';

interface Principle {
  title: string;
  definition: string;
  example: string;
}

const principles: Principle[] = [
  {
    title: "Holism",
    definition: "The idea that systems should be viewed as wholes, not just as a collection of parts.",
    example: "When designing a car, you don't just optimize the engine; you consider how it affects the fuel system, weight distribution, and passenger safety."
  },
  {
    title: "Entropy",
    definition: "The tendency of systems to move towards disorder over time.",
    example: "Software systems require constant maintenance (refactoring) to prevent 'code rot' and maintain performance."
  },
  {
    title: "Emergence",
    definition: "Properties that arise from the interaction of system components that are not present in the parts themselves.",
    example: "The consciousness that emerges from the interaction of billions of neurons in the brain."
  },
  {
    title: "Feedback Loops",
    definition: "Circular processes where the output of a system is returned as input.",
    example: "A thermostat uses a negative feedback loop to maintain a stable temperature."
  },
  {
    title: "Equifinality",
    definition: "The principle that a system can reach the same final state from different initial conditions and by different paths.",
    example: "There are multiple ways to achieve a successful software launch, regardless of the initial choice of programming language."
  },
  {
    title: "Leverage Points",
    definition: "Places within a complex system where a small shift in one thing can produce big changes in everything.",
    example: "Changing the goal of a system (e.g., from 'maximizing profit' to 'maximizing sustainability') is a high-leverage point that reshapes all subordinate processes."
  }
];

const Playground: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState<number | null>(null);

  return (
    <div className="playground-container section">
      <h2>Project Playground</h2>
      <p className="career-assistant-subtitle">
        A dedicated space for small, interactive experiments and demonstrations of technical concepts.
      </p>

      <section className="playground-experiment">
        <h3>Interactive System Design Principles</h3>
        <p>Click on a principle to explore its definition and a real-world example.</p>
        
        <div className="principles-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '15px', 
          marginTop: '20px' 
        }}>
          {principles.map((p, index) => (
            <div 
              key={index} 
              className={`card principle-card ${activePrinciple === index ? 'active' : ''}`}
              onClick={() => setActivePrinciple(activePrinciple === index ? null : index)}
            >
              <h4 style={{ margin: 0 }}>{p.title}</h4>
            </div>
          ))}
        </div>

        {activePrinciple !== null && (
          <div className="principle-detail card" style={{ 
            marginTop: '20px', 
            padding: '25px', 
            textAlign: 'left',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <h4 style={{ color: 'var(--accent-color)', marginTop: 0 }}>{principles[activePrinciple].title}</h4>
            <p><strong>Definition:</strong> {principles[activePrinciple].definition}</p>
            <p style={{ marginTop: '10px' }}><strong>Example:</strong> {principles[activePrinciple].example}</p>
          </div>
        )}
      </section>

      <div style={{ marginTop: '60px', opacity: 0.6, textAlign: 'center' }}>
        <p>More experiments coming soon...</p>
      </div>
    </div>
  );
};

export default Playground;
