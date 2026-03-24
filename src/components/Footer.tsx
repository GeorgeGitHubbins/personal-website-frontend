import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} George Gittins. Built with React and Gemini CLI.</p>
    </footer>
  );
};

export default Footer;
