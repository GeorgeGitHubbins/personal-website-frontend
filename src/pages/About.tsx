import React from 'react';
import headshotImg from '../assets/George_profile.png';

const About: React.FC = () => {
  return (
    <>
      <section id="about" className="section hero-section">
        <div className="hero-content">
          <img src={headshotImg} alt="George Gittins" className="profile-img" />
          <div className="hero-text">
            <h2>Hi, I'm George!</h2>
            <p>Welcome to my website, a place where you can learn about me, what I'm up to, and have been up to.</p>
            <p>I am curious, highly-adaptable and motivated with a passion for system design, data and process improvement. Furthermore, I am communicative, able to solve problems on the go, proficient with technology and ambitious to grow and make an impact wherever I am.</p>
            <p>I can make anything you want, you just have to describe it well enough.</p>
            
            <div className="quick-facts" style={{ marginTop: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <span className="badge">Data Science Consultant</span>
              <span className="badge">Systems Engineer</span>
              <span className="badge">Co-Founder</span>
              <span className="badge">MSc Complex Systems</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
