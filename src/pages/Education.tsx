import React from 'react';
import tuDelftLogo from '../assets/TUDelft_Logo.png';
import uGroningenLogo from '../assets/UniversityofGroningen_logo.png';
import uPortoLogo from '../assets/UPorto_logo.png';
import ibLogo from '../assets/InternationalBaccalaureate_logo.png';
import aicsLogo from '../assets/Aics_logo.png';

const Education: React.FC = () => {
  return (
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
  );
};

export default Education;
