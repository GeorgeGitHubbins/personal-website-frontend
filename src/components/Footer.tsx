import React from 'react';
import linkedinIcon from '../assets/Linkedin_icon.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <section id="contact" className="section contact-section">
        <div className="contact-form-wrapper">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSdAF8z6BYhucXHl_oRF5kz4H2aHlpwQqe2abNNmvd7F5S2hAg/viewform?embedded=true" 
            width="640" 
            height="585" 
            title="Contact Form"
            style={{ border: 'none', maxWidth: '100%' }}
            sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals allow-storage-access-by-user-activation"
          >
            Loading…
          </iframe>
        </div>
      </section>

      <div className="footer-social">
        <a href="https://www.linkedin.com/in/george-h-gittins/" target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" className="small-icon" />
        </a>
        <a href="https://github.com/GeorgeGitHubbins" target="_blank" rel="noopener noreferrer" className="github-link">
          <svg className="small-icon">
            <use href="/icons.svg#github-icon"></use>
          </svg>
        </a>
      </div>

      <p>&copy; {new Date().getFullYear()} George Gittins. Built with React and Gemini CLI. <span style={{ opacity: 0.7, fontSize: '0.8rem' }}>(Last updated: {new Date(__BUILD_DATE__).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })})</span></p>
    </footer>
  );
};

export default Footer;
