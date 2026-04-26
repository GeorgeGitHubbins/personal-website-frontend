import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="header">
      <ThemeToggle />
      <h1>George Gittins</h1>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/experience">Work Experience</NavLink>
        <NavLink to="/education">Education</NavLink>
        <NavLink to="/projects">Volunteering & Projects</NavLink>
        <a href="#contact" className="contact-nav-link">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
