import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section contact-section">
      <h2>Get in touch:</h2>
      <div className="contact-container">
        <p>I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
        <div className="contact-form-wrapper">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSdAF8z6BYhucXHl_oRF5kz4H2aHlpwQqe2abNNmvd7F5S2hAg/viewform?embedded=true" 
            width="640" 
            height="585" 
            title="Contact Form"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
