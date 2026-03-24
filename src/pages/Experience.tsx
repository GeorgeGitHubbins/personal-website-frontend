import React from 'react';
import siaLogo from '../assets/SIA_logo.png';
import flinkLogo from '../assets/Flink_logo.png';
import takeawayLogo from '../assets/Takeaway_logo.png';
import hagaLogo from '../assets/HagaZiekenhuis_logo.png';
import boomerangLogo from '../assets/Boomerang_logo.png';
import jorLogo from '../assets/JOR_logo.png';
import huracanLogo from '../assets/Huracan_logo.png';

const Experience: React.FC = () => {
  return (
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
  );
};

export default Experience;
