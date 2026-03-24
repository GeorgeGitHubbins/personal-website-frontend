import React from 'react';
import ngoLinkLogo from '../assets/NGOLink_logo.png';
import globalShapersLogo from '../assets/GlobalShapersTheHague_logo.png';
import instantFlowsLogo from '../assets/Instantflows_logo.png';
import dataWiseLogo from '../assets/DataWise_logo.png';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="section">
      <h2>Volunteering & Projects:</h2>
      <div className="projects-grid">
        <div className="project-card">
          <a href="https://www.ngo-link.org" target="_blank" rel="noopener noreferrer">
            <img src={ngoLinkLogo} alt="NGO Link" />
          </a>
          <h3>NGO Link / Developer</h3>
          <p className="date">July 2025 - Present, The Hague</p>
          <p className="description">Actively developing the NGO Link infrastructure, a project parented by the Global Shapers of the Hague.</p>
        </div>
        <div className="project-card">
          <img src={globalShapersLogo} alt="Global Shapers" />
          <h3>Global Shapers / Active Member</h3>
          <p className="date">January 2025 - Present, The Hague</p>
          <p className="description">
            Dynamic community of young leaders. Contributing to existing projects like Circle Hub and Financial Literacy, 
            and proposing new initiatives.
          </p>
        </div>
        <div className="project-card">
          <img src={instantFlowsLogo} alt="InstantFlows" />
          <h3>InstantFlows</h3>
          <p className="description">Workflow automation and process optimization solutions.</p>
        </div>
        <div className="project-card">
          <img src={dataWiseLogo} alt="DataWise" />
          <h3>DataWise</h3>
          <p className="description">Data analysis and visualization projects.</p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
