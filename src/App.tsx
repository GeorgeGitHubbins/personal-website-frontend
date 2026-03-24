import React from 'react';
import './App.css';

// Profiles & General
import headshotImg from './assets/George_profile.png';
import viteLogo from './assets/vite_logo.png';
import googleDriveIcon from './assets/googledrive_icon.png';
import linkedinIcon from './assets/Linkedin_icon.png';
import instagramIcon from './assets/Instagram_icon.png';

// Experience Logos
import siaLogo from './assets/SIA_logo.png';
import aicsLogo from './assets/Aics_logo.png';
import flinkLogo from './assets/Flink_logo.png';
import takeawayLogo from './assets/Takeaway_logo.png';
import boomerangLogo from './assets/Boomerang_logo.png';
import hagaLogo from './assets/HagaZiekenhuis_logo.png';
import jorLogo from './assets/JOR_logo.png';
import huracanLogo from './assets/Huracan_logo.png';

// Education Logos
import tuDelftLogo from './assets/TUDelft_Logo.png';
import uGroningenLogo from './assets/UniversityofGroningen_logo.png';
import uPortoLogo from './assets/UPorto_logo.png';
import ibLogo from './assets/InternationalBaccalaureate_logo.png';

// Project & Org Logos
import globalShapersLogo from './assets/GlobalShapersTheHague_logo.png';
import ngoLinkLogo from './assets/NGOLink_logo.png';
import instantFlowsLogo from './assets/Instantflows_logo.png';
import dataWiseLogo from './assets/DataWise_logo.png';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="header">
        <h1>George Gittins</h1>
        <nav>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#projects">Volunteering & Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="content">
        <section id="about" className="section hero-section">
          <div className="hero-content">
            <img src={headshotImg} alt="George Gittins" className="profile-img" />
            <div className="hero-text">
              <h2>Hi, I'm George!</h2>
              <p>Welcome to my website, a place where you can learn about me, what I'm up to, and have been up to.</p>
              <p>I am curious, highly-adaptable and motivated with a passion for system design, data and process improvement. Furthermore, I am communicative, able to solve problems on the go, proficient with technology and ambitious to grow and make an impact wherever I am.</p>
            </div>
          </div>
          <p className="highlight">I can make anything you want, you just have to describe it well enough.</p>
        </section>

        <section id="experience" className="section">
          <h2>Experience:</h2>
          <div className="card experience-card">
            <img src={siaLogo} alt="SIA Partners" className="card-logo" />
            <div className="card-details">
              <h3>SIA Partners / Data Science Consultant</h3>
              <p className="date">November 2025 - Present, Amsterdam</p>
              <p className="description">Supported clients in infrastructure, energy, and digitalization by designing data-driven systems and project structures meeting technical and operational requirements.</p>
            </div>
          </div>
          <div className="card experience-card">
            <img src={flinkLogo} alt="Flink" className="card-logo" />
            <div className="card-details">
              <h3>Flink</h3>
              <p className="date">Operations & Growth</p>
            </div>
          </div>
          <div className="card experience-card">
            <img src={takeawayLogo} alt="Just Eat Takeaway" className="card-logo" />
            <div className="card-details">
              <h3>Just Eat Takeaway.com</h3>
              <p className="date">Operations Support</p>
            </div>
          </div>
          <div className="card experience-card">
            <img src={hagaLogo} alt="HagaZiekenhuis" className="card-logo" />
            <div className="card-details">
              <h3>HagaZiekenhuis</h3>
              <p className="date">Data & Process Analysis</p>
            </div>
          </div>
          <div className="card experience-card">
            <img src={boomerangLogo} alt="Boomerang" className="card-logo" />
            <div className="card-details">
              <h3>Boomerang Agency</h3>
            </div>
          </div>
          <div className="card experience-card">
            <img src={jorLogo} alt="JOR" className="card-logo" />
            <div className="card-details">
              <h3>JOR IT Services</h3>
            </div>
          </div>
          <div className="card experience-card">
            <img src={huracanLogo} alt="Huracan" className="card-logo" />
            <div className="card-details">
              <h3>Huracán Systems</h3>
            </div>
          </div>
        </section>

        <section id="education" className="section">
          <h2>Education:</h2>
          <div className="card experience-card">
            <a href="http://cosem.nl" target="_blank" rel="noopener noreferrer">
              <img src={tuDelftLogo} alt="TU Delft" className="card-logo" />
            </a>
            <div className="card-details">
              <h3>Technical University of Delft / MSc Complex Systems Engineering and Management</h3>
              <p className="date">August 2021 - August 2024, Delft</p>
              <p className="description">
                My specialisation is in data, information and communication. The study focuses on project planning, design and management. 
                I had to explore policies and markets, how they fail and how to succeed within them and develop my ability to handle 
                the complexities of working with many stakeholders and variables.
              </p>
            </div>
          </div>
          <div className="card experience-card">
            <img src={uGroningenLogo} alt="University of Groningen" className="card-logo" />
            <div className="card-details">
              <h3>University of Groningen</h3>
              <p className="date">BSc International Business</p>
            </div>
          </div>
          <div className="card experience-card">
            <img src={uPortoLogo} alt="University of Porto" className="card-logo" />
            <div className="card-details">
              <h3>Universidade do Porto</h3>
              <p className="date">Exchange Program - Economics & Management</p>
            </div>
          </div>
          <div className="card experience-card">
            <img src={ibLogo} alt="International Baccalaureate" className="card-logo" />
            <div className="card-details">
              <h3>International Baccalaureate</h3>
              <img src={aicsLogo} alt="AICS" className="sub-logo" />
            </div>
          </div>
        </section>

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

        <section id="contact" className="section contact-section">
          <h2>Get in touch:</h2>
          <div className="contact-container">
            <p>I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
            <div className="contact-form-wrapper">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSdAF8z6BYhucXHl_oRF5kz4H2aHlpwQqe2abNNmvd7F5S2hAg/viewform?embedded=true" 
                width="640" 
                height="585" 
                title="Contact Form"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </section>

        <section className="section logo-cloud">
          <h3>Connect with me:</h3>
          <div className="icon-row">
            <a href="https://www.linkedin.com/in/george-h-gittins/" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="small-icon" />
            </a>
            <a href="https://www.instagram.com/georiginality/" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className="small-icon" />
            </a>
            <a href="https://github.com/GeorgeGitHubbins" target="_blank" rel="noopener noreferrer">
              <img src={googleDriveIcon} alt="GitHub" className="small-icon" />
            </a>
            <img src={viteLogo} alt="Vite" className="small-icon" title="Built with Vite" />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} George Gittins. Built with React and Gemini CLI.</p>
      </footer>
    </div>
  );
};

export default App;
