import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="header">
      <ThemeToggle />
      <h1>George Gittins</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/experience">Work Experience</Link>
        <Link to="/education">Education</Link>
        <Link to="/projects">Volunteering & Projects</Link>
      </nav>
    </header>
  );
};

export default Header;
