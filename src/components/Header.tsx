import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-top-row">
        <ThemeToggle />
        <h1>George Gittins</h1>
        <button
          className={`hamburger-menu-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="main-nav"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={closeMenu} aria-hidden="true" />
      )}

      <nav
        id="main-nav"
        className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}
        aria-label="Main Navigation"
      >
        <NavLink to="/" end aria-label="Home page" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/experience" aria-label="Work Experience page" onClick={closeMenu}>Work Experience</NavLink>
        <NavLink to="/education" aria-label="Education page" onClick={closeMenu}>Education</NavLink>
        <NavLink to="/projects" aria-label="Volunteering and Projects page" onClick={closeMenu}>Volunteering & Projects</NavLink>
        <NavLink to="/playground" aria-label="Project Playground page" onClick={closeMenu}>Playground</NavLink>
        <NavLink to="/blog" aria-label="Blog page" onClick={closeMenu}>Blog</NavLink>
        <a href="#contact" className="contact-nav-link" aria-label="Go to contact section" onClick={closeMenu}>Contact</a>
      </nav>
    </header>
  );
};

export default Header;

