import React from 'react';
import siaLogo from '../assets/SIA_logo.png';
import flinkLogo from '../assets/Flink_logo.png';
import takeawayLogo from '../assets/Takeaway_logo.png';
import hagaLogo from '../assets/HagaZiekenhuis_logo.png';
import boomerangLogo from '../assets/Boomerang_logo.png';
import jorLogo from '../assets/JOR_logo.png';
import huracanLogo from '../assets/Huracan_logo.png';
import instantFlowsLogo from '../assets/Instantflows_logo.png';
import aicsLogo from '../assets/Aics_logo.png';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="section">
      <h2>Work Experience:</h2>
      
      <div className="card experience-card">
        <img src={siaLogo} alt="SIA Partners" className="card-logo" />
        <div className="card-details">
          <h3>SIA Partners / Data Science Consultant</h3>
          <p className="date">November 2025 - Present, Amsterdam</p>
          <div className="description">
            Supported clients in infrastructure, energy, and digitalization by designing data-driven systems and project structures.
          </div>
          <div className="quick-facts" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge">Data Science</span>
            <span className="badge">Consultancy</span>
            <span className="badge">Energy</span>
            <span className="badge">Infrastructure</span>
          </div>
        </div>
      </div>

      <div className="card experience-card">
        <img src={huracanLogo} alt="Huracán Systems" className="card-logo" />
        <div className="card-details">
          <h3>Huracán / Systems Engineer</h3>
          <p className="date">October 2025 - November 2025, Amsterdam</p>
          <div className="description">
            Designing data-driven systems and project structures meeting technical and operational requirements for infrastructure and energy clients.
          </div>
          <div className="quick-facts" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge">Systems Engineering</span>
            <span className="badge">Project Architecture</span>
            <span className="badge">Data Management</span>
          </div>
        </div>
      </div>

      <div className="card experience-card">
        <img src={instantFlowsLogo} alt="InstantFlows" className="card-logo" />
        <div className="card-details">
          <h3>InstantFlows / Co-Founder</h3>
          <p className="date">September 2024 - October 2025, Delft</p>
          <div className="description">
            Planning, organizing and leading a small team to develop and market an AI-powered research tool.
          </div>
          <div className="quick-facts" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge">Entrepreneurship</span>
            <span className="badge">AI/LLMs</span>
            <span className="badge">Product Strategy</span>
          </div>
        </div>
      </div>

      <div className="card experience-card">
        <img src={jorLogo} alt="JOR Energy Consultancy" className="card-logo" />
        <div className="card-details">
          <h3>JOR Energy Consultancy / Data Analyst</h3>
          <p className="date">September 2022 - January 2025, Delft</p>
          <div className="description">
            Developed business cases, market research, and data visualizations. Rebuilt and maintained the company's Django-based website.
          </div>
          <div className="quick-facts" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge">Django</span>
            <span className="badge">Data Visualization</span>
            <span className="badge">Market Research</span>
          </div>
        </div>
      </div>

      <div className="card experience-card">
        <img src={flinkLogo} alt="Flink" className="card-logo" />
        <div className="card-details">
          <h3>Flink B. V. / Rider Operations Specialist</h3>
          <p className="date">November 2021 - September 2022, Amsterdam</p>
          <div className="description">
            <ul className="description-list">
              <li>Focused on improving processes, such as solving tickets and managing rider data.</li>
              <li>Responsible for ensuring a seamless experience for riders from onboarding to offboarding.</li>
              <li>Developed into a data analyst, building dashboards and serving as an internal consultant.</li>
            </ul>
          </div>
          <div className="quick-facts" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge">Operations</span>
            <span className="badge">Process Optimization</span>
            <span className="badge">Consulting</span>
          </div>
        </div>
      </div>

      <div className="card experience-card">
        <img src={takeawayLogo} alt="Just Eat Takeaway" className="card-logo" />
        <div className="card-details">
          <h3>Just Eat Takeaway.com N.V. / Driver (Captain) Coordinator</h3>
          <p className="date">June 2021 - August 2021, Groningen</p>
          <div className="description">
            <ul className="description-list">
              <li>Led a team of 14 driver captains, who serve as coaches and role models for new drivers.</li>
              <li>Selected and trained six new members for the driver captain team from the existing driver pool.</li>
            </ul>
          </div>
          <div className="quick-facts" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge">Leadership</span>
            <span className="badge">Team Coaching</span>
            <span className="badge">Training</span>
          </div>
        </div>
      </div>

      <div className="card experience-card">
        <img src={takeawayLogo} alt="Just Eat Takeaway" className="card-logo" />
        <div className="card-details">
          <h3>Just Eat Takeaway.com N.V. / Driver Coordinator</h3>
          <p className="date">April 2019 - August 2021, Groningen</p>
          <div className="description">
            <ul className="description-list">
              <li>Tracked performance for 80+ drivers and conducted bi-monthly feedback meetings.</li>
              <li>Optimized employee data, daily planning, and attendance using advanced Google Sheets skills.</li>
              <li>Improved coaching and performance tracking systems.</li>
            </ul>
          </div>
          <div className="quick-facts" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge">Data Optimization</span>
            <span className="badge">Performance Tracking</span>
            <span className="badge">Coordination</span>
          </div>
        </div>
      </div>

      <div className="card experience-card">
        <img src={takeawayLogo} alt="Just Eat Takeaway" className="card-logo" />
        <div className="card-details">
          <h3>Just Eat Takeaway.com N.V. / Driver</h3>
          <p className="date">August 2018 - April 2019, Groningen</p>
          <div className="description">
            Delivered food for the Scoober Logistics department of Thuisbezorgd.nl, riding an e-bike to restaurants and customers.
          </div>
          <div className="quick-facts" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge">Logistics</span>
            <span className="badge">Customer Service</span>
          </div>
        </div>
      </div>

      <div className="card experience-card">
        <img src={hagaLogo} alt="HagaZiekenhuis" className="card-logo" />
        <div className="card-details">
          <h3>Hagaziekenhuis / Household Maintenance</h3>
          <p className="date">June 2017 - August 2017, Den Haag</p>
          <div className="description">
            Organised, repaired and cleaned beds in the hospital, with sole responsibility for the children’s department standards.
          </div>
          <div className="quick-facts" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge">Responsibility</span>
            <span className="badge">Maintenance</span>
          </div>
        </div>
      </div>

      <div className="card experience-card">
        <img src={boomerangLogo} alt="Boomerang" className="card-logo" />
        <div className="card-details">
          <h3>Boomerang Beachclub / Waiter</h3>
          <p className="date">May 2015 - June 2017, Den Haag</p>
          <div className="description">
            Responsible for opening and closing operations, waiting tables, and ensuring customer satisfaction at a beach restaurant.
          </div>
          <div className="quick-facts" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge">Customer Satisfaction</span>
            <span className="badge">Hospitality</span>
          </div>
        </div>
      </div>

      <div className="card experience-card">
        <img src={aicsLogo} alt="Espritscholen (AICS)" className="card-logo" />
        <div className="card-details">
          <h3>Espritscholen (AICS) / Trainer (football)</h3>
          <p className="date">October 2010 - October 2011, Amsterdam</p>
          <div className="description">
            Organised after-school football training for middle school students aged 7 to 11.
          </div>
          <div className="quick-facts" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge">Sports Coaching</span>
            <span className="badge">Mentorship</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
