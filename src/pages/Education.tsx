import React from 'react';
import tuDelftLogo from '../assets/TUDelft_Logo.png';
import uGroningenLogo from '../assets/UniversityofGroningen_logo.png';
import uPortoLogo from '../assets/UPorto_logo.png';
import ibLogo from '../assets/InternationalBaccalaureate_logo.png';
import dataWiseLogo from '../assets/DataWise_logo.png';

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
          <div className="description">
            <ul className="description-list">
              <li>Project planning, design and management</li>
              <li>Understanding markets, how they fail and how to succeed</li>
              <li>Handling the complexities of working with many stakeholders and variables</li>
              <li>Specialisation in data, information and communication</li>
            </ul>
          </div>
          <div className="quick-facts">
            <span className="badge">Systems Engineering</span>
            <span className="badge">Management</span>
            <span className="badge">Data Specialization</span>
          </div>
        </div>
      </div>

      <div className="card experience-card">
        <img src={uPortoLogo} alt="University of Porto" className="card-logo" />
        <div className="card-details">
          <h3>University of Porto / ERASMUS+ MSc Industrial Engineering and Management</h3>
          <div className="description">
            <ul className="description-list">
              <li>Modeling and Data Analytics</li>
              <li>Supply Chain Management and Entrepreneurship</li>
              <li>Industrial Ecology and Sustainable strategies</li>
            </ul>
          </div>
          <div className="quick-facts">
            <span className="badge">Industrial Engineering</span>
            <span className="badge">Modelling</span>
            <span className="badge">Analytics</span>
          </div>
        </div>
      </div>

      <div className="card experience-card">
        <img src={dataWiseLogo} alt="Data Wise" className="card-logo" />
        <div className="card-details">
          <h3>University of Groningen / Minor Data Wise: Data Science in Society</h3>
          <div className="description">
            <ul className="description-list">
              <li>Understanding the role of data and its impacts on society</li>
              <li>Collaborate with a company and provide them with a consulting report on their data use</li>
            </ul>
          </div>
          <div className="quick-facts">
            <span className="badge">Data Science</span>
            <span className="badge">Societal Impact</span>
          </div>
        </div>
      </div>

      <div className="card experience-card">
        <img src={uGroningenLogo} alt="University of Groningen" className="card-logo" />
        <div className="card-details">
          <h3>University of Groningen / BSc Industrial Engineering and Management</h3>
          <div className="description">
            <ul className="description-list">
              <li>Develop strong programming skills, e.g. Matlab, Python, R, Javascript, Excel</li>
              <li>Comprehend and control multivariable dynamic systems</li>
              <li>Optimize operations within various fields, e.g. manufacturing, project management</li>
            </ul>
          </div>
          <div className="quick-facts">
            <span className="badge">Programming</span>
            <span className="badge">Operations Optimization</span>
            <span className="badge">Multivariable Systems</span>
          </div>
        </div>
      </div>

      <div className="card experience-card">
        <img src={uGroningenLogo} alt="University of Groningen" className="card-logo" />
        <div className="card-details">
          <h3>University of Groningen / BSc Chemical Engineering</h3>
          <div className="description">
            <ul className="description-list">
              <li>Learn effective laboratory practices</li>
              <li>Understand the complex nature of molecules: Structure, Reactivity and Function</li>
            </ul>
          </div>
          <div className="quick-facts">
            <span className="badge">Laboratory Practice</span>
            <span className="badge">Molecular Chemistry</span>
          </div>
        </div>
      </div>

      <div className="card experience-card">
        <img src={ibLogo} alt="International Baccalaureate" className="card-logo" />
        <div className="card-details">
          <h3>International School of The Hague / International Baccalaureate</h3>
          <div className="description">
            <p style={{ margin: '0 0 10px 0' }}><strong>Higher Level:</strong> Physics, Chemistry, English Language and Literature</p>
            <p style={{ margin: 0 }}><strong>Standard Level:</strong> Geography, Mathematics, Dutch Language and Literature</p>
          </div>
          <div className="quick-facts">
            <span className="badge">Physics</span>
            <span className="badge">Chemistry</span>
            <span className="badge">Mathematics</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
