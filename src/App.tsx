import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import ReadingProgressBar from './components/ReadingProgressBar';

// Pages
import About from './pages/About';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Projects from './pages/Projects';
import Playground from './pages/Playground';
import Blog from './pages/Blog';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <ReadingProgressBar />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="app">
        <Header />
        <main id="main-content" className="content">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
};

export default App;
