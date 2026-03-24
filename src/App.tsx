import React from 'react';
import './App.css';

import headshotImg from './assets/image_2.png';
import siaLogo from './assets/image_3.png';
import globalShapersLogo from './assets/image_5.png';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="header">
        <h1>George Gittins</h1>
        <nav>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#volunteering">Volunteering</a>
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
          <h2>Occupation:</h2>
          <div className="card experience-card">
            <img src={siaLogo} alt="SIA Partners Logo" className="card-logo" />
            <div className="card-details">
              <h3>SIA Partners / Data Science Consultant</h3>
              <p className="date">November 2025 - Present, Amsterdam</p>
              <p>Supported clients in infrastructure, energy, and digitalization by designing data-driven systems and project structures meeting technical and operational requirements.</p>
            </div>
          </div>
        </section>

        <section id="education" className="section">
          <h2>Education:</h2>
          <div className="card">
            <h3>Technical University of Delft / MSc Complex Systems Engineering and Management</h3>
            <p className="date">August 2021 - August 2024, Delft</p>
            <p>My specialisation is in data, information and communication. The study focuses on project planning, design and management. I had to explore policies and markets, how they fail and how to succeed within them and develop my ability to handle the complexities of working with many stakeholders and variables.</p>
          </div>
        </section>

        <section id="volunteering" className="section">
          <h2>Volunteering:</h2>
          <div className="card experience-card">
            <img src={globalShapersLogo} alt="Global Shapers Logo" className="card-logo" />
            <div className="card-details">
              <h3>Global Shapers / Active Member</h3>
              <p className="date">January 2025 - Present, The Hague</p>
              <p>A dynamic community of young leaders, setting ambitious goals for personal growth and community impact. Focusing on integrating into the organization, contributing to existing projects like Circle Hub and Financial Literacy, and proposing new initiatives.</p>
            </div>
          </div>
          <div className="card">
            <h3>NGO Link / Developer</h3>
            <p className="date">July 2025 - Present, The Hague</p>
            <p>I am actively developing the NGO Link infrastructure, a project that is parented by the Global Shapers of the Hague.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="social-links">
          <a href="https://www.linkedin.com/in/george-h-gittins/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/georiginality/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://github.com/GeorgeGitHubbins" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <p>&copy; {new Date().getFullYear()} George Gittins. Built with React and Gemini CLI.</p>
      </footer>
    </div>
  );
};

export default App;
