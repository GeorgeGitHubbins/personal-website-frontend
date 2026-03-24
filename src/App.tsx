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
          <a href="#projects">Projects & Orgs</a>
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
            </div>
          </div>
          <div className="card experience-card">
            <img src={flinkLogo} alt="Flink" className="card-logo" />
            <div className="card-details">
              <h3>Flink</h3>
            </div>
          </div>
          <div className="card experience-card">
            <img src={takeawayLogo} alt="Just Eat Takeaway" className="card-logo" />
            <div className="card-details">
              <h3>Just Eat Takeaway.com</h3>
            </div>
          </div>
          <div className="card experience-card">
            <img src={hagaLogo} alt="HagaZiekenhuis" className="card-logo" />
            <div className="card-details">
              <h3>HagaZiekenhuis</h3>
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
            <img src={tuDelftLogo} alt="TU Delft" className="card-logo" />
            <div className="card-details">
              <h3>Technical University of Delft</h3>
              <p className="date">MSc Complex Systems Engineering and Management</p>
            </div>
          </div>
          <div className="card experience-card">
            <img src={uGroningenLogo} alt="University of Groningen" className="card-logo" />
            <div className="card-details">
              <h3>University of Groningen</h3>
            </div>
          </div>
          <div className="card experience-card">
            <img src={uPortoLogo} alt="University of Porto" className="card-logo" />
            <div className="card-details">
              <h3>Universidade do Porto</h3>
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
          <h2>Projects & Organizations:</h2>
          <div className="projects-grid">
            <div className="project-card">
              <img src={ngoLinkLogo} alt="NGO Link" />
              <h3>NGO Link</h3>
            </div>
            <div className="project-card">
              <img src={globalShapersLogo} alt="Global Shapers" />
              <h3>Global Shapers The Hague</h3>
            </div>
            <div className="project-card">
              <img src={instantFlowsLogo} alt="InstantFlows" />
              <h3>InstantFlows</h3>
            </div>
            <div className="project-card">
              <img src={dataWiseLogo} alt="DataWise" />
              <h3>DataWise</h3>
            </div>
          </div>
        </section>

        <section className="section logo-cloud">
          <h3>Tools & Resources:</h3>
          <div className="icon-row">
            <img src={googleDriveIcon} alt="Google Drive" className="small-icon" />
            <img src={viteLogo} alt="Vite" className="small-icon" />
            <img src={linkedinIcon} alt="LinkedIn" className="small-icon" />
            <img src={instagramIcon} alt="Instagram" className="small-icon" />
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
