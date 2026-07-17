import React from 'react';
import SystemsNodeGraph from '../components/SystemsNodeGraph';
import BreakfastFoosball from '../components/BreakfastFoosball';

const Playground: React.FC = () => {
  return (
    <div className="playground-container section">
      <h2>Project Playground</h2>
      <p className="career-assistant-subtitle">
        A dedicated space for small, interactive experiments and demonstrations of technical concepts.
      </p>

      <section className="playground-experiment" style={{ marginTop: '40px' }}>
        <BreakfastFoosball />
      </section>

      <section className="playground-experiment" style={{ marginTop: '50px' }}>
        <h3>Interactive System Design Principles</h3>
        <p style={{ marginBottom: '20px' }}>Explore the interconnected nature of complex systems. Click and drag nodes to interact with the system graph.</p>
        
        <SystemsNodeGraph />
      </section>
    </div>
  );
};

export default Playground;
