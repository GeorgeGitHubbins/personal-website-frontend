import React from 'react';
import tuDelftLogo from '../assets/TUDelft_Logo.png';
import uGroningenLogo from '../assets/UniversityofGroningen_logo.png';
import uPortoLogo from '../assets/UPorto_logo.png';
import ibLogo from '../assets/InternationalBaccalaureate_logo.png';
import dataWiseLogo from '../assets/DataWise_logo.png';
import instantFlowsLogo from '../assets/Instantflows_logo.png';

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
          <ul className="description-list">
            <li>Project planning, design and management</li>
            <li>Understanding markets, how they fail and how to succeed</li>
            <li>Handling the complexities of working with many stakeholders and variables</li>
            <li>Specialisation in data, information and communication</li>
          </ul>
        </div>
      </div>

      <div className="card experience-card">
        <img src={uPortoLogo} alt="University of Porto" className="card-logo" />
        <div className="card-details">
          <h3>University of Porto / ERASMUS+ MSc Industrial Engineering and Management</h3>
          <ul className="description-list">
            <li>Modeling and Data Analytics</li>
            <li>Supply Chain Management and Entrepreneurship</li>
            <li>Industrial Ecology and Sustainable strategies</li>
          </ul>
        </div>
      </div>

      <div className="card experience-card">
        <img src={uGroningenLogo} alt="University of Groningen" className="card-logo" />
        <div className="card-details">
          <h3>University of Groningen / BSc Industrial Engineering and Management</h3>
          <ul className="description-list">
            <li>Develop strong programming skills, e.g. Matlab, Python, R, Javascript, Excel</li>
            <li>Comprehend and control multivariable dynamic systems</li>
            <li>Optimize operations within various fields, e.g. manufacturing, project management</li>
          </ul>
        </div>
      </div>

      <div className="card experience-card">
        <img src={uGroningenLogo} alt="University of Groningen" className="card-logo" />
        <div className="card-details">
          <h3>University of Groningen / BSc Chemical Engineering</h3>
          <ul className="description-list">
            <li>Learn effective laboratory practices</li>
            <li>Understand the complex nature of molecules: Structure, Reactivity and Function</li>
          </ul>
        </div>
      </div>

      <div className="card experience-card">
        <img src={ibLogo} alt="International Baccalaureate" className="card-logo" />
        <div className="card-details">
          <h3>International School of The Hague / International Baccalaureate</h3>
          <p className="description"><strong>Higher Level:</strong> Physics, Chemistry, English Language and Literature</p>
          <p className="description"><strong>Standard Level:</strong> Geography, Mathematics, Dutch Language and Literature</p>
        </div>
      </div>

      <h2 style={{ marginTop: '40px' }}>Academic Projects:</h2>

      <div className="card academic-project-card">
        <img src={instantFlowsLogo} alt="InstantFlows" className="card-logo" />
        <div className="card-details">
          <h3>InstantFlows / Co-Founder & AI Research Tool Developer</h3>
          <p className="date">September 2024 - October 2025, Delft</p>
          <p className="description">
            Emerging from research at TU Delft, I led a team to develop an AI-powered tool for literature review and research synthesis.
          </p>
          <ul className="description-list">
            <li>Developed AI research tool architecture</li>
            <li>Led product strategy and stakeholder engagement</li>
            <li>Optimized research workflows for academic use</li>
          </ul>
        </div>
      </div>

      <div className="card academic-project-card">
        <img src={dataWiseLogo} alt="Data Wise" className="card-logo" />
        <div className="card-details">
          <h3>University of Groningen / Minor Data Wise: Data Science in Society</h3>
          <ul className="description-list">
            <li>Understanding the role of data and its impacts on society</li>
            <li>Collaborate with a company and provide them with a consulting report on their data use</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Education;
