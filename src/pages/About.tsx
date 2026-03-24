import React from 'react';
import headshotImg from '../assets/George_profile.png';
import linkedinIcon from '../assets/Linkedin_icon.png';
import instagramIcon from '../assets/Instagram_icon.png';
import googleDriveIcon from '../assets/googledrive_icon.png';
import viteLogo from '../assets/vite_logo.png';

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
          </div>
        </div>
        <p className="highlight">I can make anything you want, you just have to describe it well enough.</p>
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
    </>
  );
};

export default About;
