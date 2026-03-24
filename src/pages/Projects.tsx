import React from 'react';
import ngoLinkLogo from '../assets/NGOLink_logo.png';
import globalShapersLogo from '../assets/GlobalShapersTheHague_logo.png';

const Projects: React.FC = () => {
  const selectedWorks = [
    {
      title: "CoSEM Research Challenges literature review article - George Gittins",
      description: "Perform research and analyse relevant literature",
      url: "https://drive.google.com/file/d/17RUkst9oBVvHwhyItcPCP7C1vbV2686v/preview"
    },
    {
      title: "Individual report Digital Platform Design - George Gittins",
      description: "Design an online platform that tackles Sustainable Development Goals",
      url: "https://drive.google.com/file/d/1SspTG_UQJmYK7RJ8xinw6-1IPu5UafAV/preview"
    },
    {
      title: "SEN1611_2022_2023_Group10_Report",
      description: "Design the architecture of a digital service",
      url: "https://drive.google.com/file/d/1YrsZNjUp3nV25Hd5BbJFvyT34mu4Dtuj/preview"
    },
    {
      title: "Sonae Group Case presentation",
      description: "Solve a logistical problem with truck deliveries for a large supermarket chain.",
      url: "https://drive.google.com/file/d/13Ees0246A3XRzWQB4ITxztXOm9HQf1UB/preview"
    },
    {
      title: "2.9 Valorization Plan - Group 4",
      description: "Develop a digital startup service, perform the necessary research and analysis",
      url: "https://drive.google.com/file/d/1xdDf52ojZyjpj2Fp1MfTSKyBRpKQtv6I/preview"
    },
    {
      title: "Agent-Based Simulation Report",
      description: "Analyse a complex system through agent-based simulation",
      url: "https://drive.google.com/file/d/1rgOrRTYZp2xZjif6RuDwokTAT5Z_BIY5/preview"
    },
    {
      title: "Final Report - Integration Project - George Gittins",
      description: "Graduation project on simulating and optimizing a Mars robot's pathfinding and locomotion",
      url: "https://drive.google.com/file/d/14jvXJaS3nJsaLAM_ZazR8ZfN-MIiJJj2/preview"
    },
    {
      title: "Product Analysis - Materials Selection - George Gittins",
      description: "Selecting materials for a specific purpose using specialized software",
      url: "https://drive.google.com/file/d/1LLzj4RLKg1AHHqUYUGK5ZRML41mCH_CF/preview"
    },
    {
      title: "CDP Report Forus",
      description: "Working in partnership with a startup to develop an advice for their organizational structure and data use",
      url: "https://drive.google.com/file/d/1Uar2ApiJ4cY_gLUOuVfzhZ7dZTgG7Q-_/preview"
    }
  ];

  return (
    <>
      <section id="projects" className="section">
        <h2>Volunteering:</h2>
        <div className="card experience-card">
          <img src={globalShapersLogo} alt="Global Shapers" className="card-logo" />
          <div className="card-details">
            <h3>Global Shapers / Active Member</h3>
            <p className="date">January 2025 - Present, The Hague</p>
            <p className="description">
              A dynamic community of young leaders, setting ambitious goals for personal growth and community impact. Focusing on integrating into the organization, contributing to existing projects like Circle Hub and Financial Literacy, and proposing new initiatives. I aim to take on leadership responsibilities, organize social events, and leverage the global network for meaningful connections and event participation.
            </p>
          </div>
        </div>

        <div className="card experience-card">
          <a href="https://www.ngo-link.org" target="_blank" rel="noopener noreferrer">
            <img src={ngoLinkLogo} alt="NGO Link" className="card-logo" />
          </a>
          <div className="card-details">
            <h3>NGO Link / Developer</h3>
            <p className="date">July 2025 - Present, The Hague</p>
            <p className="description">
              I am actively developing the NGO Link infrastructure, a project that is parented by the Global Shapers of the Hague. I recommend checking out the page by clicking on the NGO Link logo.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Selected Work:</h2>
        <div className="selected-works-grid">
          {selectedWorks.map((work, index) => (
            <div key={index} className="card work-card">
              <div className="card-details">
                <h3>{work.title}</h3>
                <p className="description" style={{ marginBottom: '15px' }}>{work.description}</p>
                <div className="pdf-container">
                  <iframe 
                    src={work.url} 
                    width="100%" 
                    height="400px" 
                    title={work.title}
                    allow="autoplay"
                  ></iframe>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
