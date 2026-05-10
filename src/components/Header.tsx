import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="header">
      <ThemeToggle />
      <h1>George Gittins</h1>
      <nav aria-label="Main Navigation">
        <NavLink to="/" end aria-label="Home page">Home</NavLink>
        <NavLink to="/experience" aria-label="Work Experience page">Work Experience</NavLink>
        <NavLink to="/education" aria-label="Education page">Education</NavLink>
        <NavLink to="/projects" aria-label="Volunteering and Projects page">Volunteering & Projects</NavLink>
        <NavLink to="/playground" aria-label="Project Playground page">Playground</NavLink>
        <a href="#contact" className="contact-nav-link" aria-label="Go to contact section">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
