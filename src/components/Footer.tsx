import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} George Gittins. Built with React and Gemini CLI.</p>
      <p><small><Link to="/games" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.5 }}>Play a Game</Link></small></p>
    </footer>
  );
};

export default Footer;
