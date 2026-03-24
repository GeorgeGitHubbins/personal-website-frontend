import React from 'react';
import siaLogo from '../assets/SIA_logo.png';
import flinkLogo from '../assets/Flink_logo.png';
import takeawayLogo from '../assets/Takeaway_logo.png';
import hagaLogo from '../assets/HagaZiekenhuis_logo.png';
import boomerangLogo from '../assets/Boomerang_logo.png';
import jorLogo from '../assets/JOR_logo.png';
import huracanLogo from '../assets/Huracan_logo.png';
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
          <p className="description">Supported clients in infrastructure, energy, and digitalization by designing data-driven systems and project structures meeting technical and operational requirements.</p>
        </div>
      </div>

      <div className="card experience-card">
        <img src={huracanLogo} alt="Huracán Systems" className="card-logo" />
        <div className="card-details">
          <h3>Huracán / Systems Engineer</h3>
          <p className="date">October 2025 - November 2025, Amsterdam</p>
          <p className="description">Supported clients in infrastructure, energy, and digitalization by designing data-driven systems and project structures meeting technical and operational requirements.</p>
        </div>
      </div>

      <div className="card experience-card">
        <img src={jorLogo} alt="JOR Energy Consultancy" className="card-logo" />
        <div className="card-details">
          <h3>JOR Energy Consultancy / Data Analyst</h3>
          <p className="date">September 2022 - January 2025, Delft</p>
          <p className="description">Remote student job where I helped develop business cases, researched relevant markets, came up with potential solutions and supported these with data; tables, dashboards, and graphics. Additionally, I rebuilt and maintained the Django-based website.</p>
        </div>
      </div>

      <div className="card experience-card">
        <img src={flinkLogo} alt="Flink" className="card-logo" />
        <div className="card-details">
          <h3>Flink B. V. / Rider Operations Specialist</h3>
          <p className="date">November 2021 - September 2022, Amsterdam</p>
          <p className="description">The role focused on improving processes, such as solving tickets and managing the data we had on Flink’s riders. It was my responsibility to ensure the best experience for every rider from onboarding to offboarding. Over time, my role within the team developed into a data analyst, dashboard builder, and internal consultant. I was able to utilise much of what I had learned from previous jobs.</p>
        </div>
      </div>

      <div className="card experience-card">
        <img src={takeawayLogo} alt="Just Eat Takeaway" className="card-logo" />
        <div className="card-details">
          <h3>Just Eat Takeaway.com N.V. / Driver (Captain) Coordinator</h3>
          <p className="date">June 2021 - August 2021, Groningen</p>
          <p className="description">In the final months of my Bachelor’s degree, I earned a new responsibility as the team leader of the driver captains. The driver captains perform as coaches for new and current drivers and are expected to be role model employees. My responsibility was to manage the group of 14 captains and my first task was to select and train six new members of the driver captain team from our current driver pool.</p>
        </div>
      </div>

      <div className="card experience-card">
        <img src={takeawayLogo} alt="Just Eat Takeaway" className="card-logo" />
        <div className="card-details">
          <h3>Just Eat Takeaway.com N.V. / Driver Coordinator</h3>
          <p className="date">April 2019 - August 2021, Groningen</p>
          <p className="description">After a year of delivering for Takeaway, I was promoted to coordinator. I received a part-time contract that I combined with my full-time bachelor’s study. My new duties involved tracking the performance of delivery drivers and scheduling bi-monthly meetings with each of my team’s 80+ drivers to give and receive feedback. I used this opportunity to improve my sheet skills; optimising our employee base, daily planning, attendance, and the coaching and performance Google sheets.</p>
        </div>
      </div>

      <div className="card experience-card">
        <img src={takeawayLogo} alt="Just Eat Takeaway" className="card-logo" />
        <div className="card-details">
          <h3>Just Eat Takeaway.com N.V. / Driver</h3>
          <p className="date">August 2018 - April 2019, Groningen</p>
          <p className="description">For a year I worked as a delivery driver for the Scoober Logistics department of Thuisbezorgd.nl. This involved riding on an e-bike to and from various restaurants and customers.</p>
        </div>
      </div>

      <div className="card experience-card">
        <img src={hagaLogo} alt="HagaZiekenhuis" className="card-logo" />
        <div className="card-details">
          <h3>Hagaziekenhuis / Household Maintenance</h3>
          <p className="date">June 2017 - August 2017, Den Haag</p>
          <p className="description">For three months I worked at a hospital; I organised bedrooms, and repaired and cleaned beds. After a month I was given the sole responsibility of maintaining the children’s department of the hospital. This involved keeping 3 floors of hospital rooms up to quality standards.</p>
        </div>
      </div>

      <div className="card experience-card">
        <img src={boomerangLogo} alt="Boomerang" className="card-logo" />
        <div className="card-details">
          <h3>Boomerang Beachclub / Waiter</h3>
          <p className="date">May 2015 - June 2017, Den Haag</p>
          <p className="description">I worked at a beach restaurant for three consecutive summers, with the responsibility of opening up shop as well as shutting off, waiting tables, and satisfying customer need.</p>
        </div>
      </div>

      <div className="card experience-card">
        <img src={aicsLogo} alt="Espritscholen (AICS)" className="card-logo" />
        <div className="card-details">
          <h3>Espritscholen (AICS) / Trainer (football)</h3>
          <p className="date">October 2010 - October 2011, Amsterdam</p>
          <p className="description">I organised after-school football training for students between the ages of 7 and 11 at my middle school.</p>
        </div>
      </div>
    </section>
  );
};

export default Experience;
