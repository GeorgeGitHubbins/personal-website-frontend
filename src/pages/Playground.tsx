import React from 'react';
import SystemsNodeGraph from '../components/SystemsNodeGraph';

const Playground: React.FC = () => {
  return (
    <div className="playground-container section">
      <h2>Project Playground</h2>
      <p className="career-assistant-subtitle">
        A dedicated space for small, interactive experiments and demonstrations of technical concepts.
      </p>

      <section className="playground-experiment" style={{ marginTop: '40px' }}>
        <h3>Interactive System Design Principles</h3>
        <p style={{ marginBottom: '20px' }}>Explore the interconnected nature of complex systems. Click and drag nodes to interact with the system graph.</p>
        
        <SystemsNodeGraph />
      </section>

      <div style={{ marginTop: '60px', opacity: 0.6, textAlign: 'center' }}>
        <p>More experiments coming soon...</p>
      </div>
    </div>
  );
};

export default Playground;
