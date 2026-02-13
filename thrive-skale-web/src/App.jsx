import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Industries from './components/Industries';
import Services from './components/Services';
import Contact from './components/Contact';

import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import AbstractWaves from './components/AbstractWaves';

// Global enhancements
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ScrollAnimations from './components/ScrollAnimations';
import MagneticButtons from './components/MagneticButtons';
import ParallaxManager from './components/ParallaxManager';
import TextReveal from './components/TextReveal';
import PageLoader from './components/PageLoader';

// Helper component to handle scrolling based on route
const ScrollToSection = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const pathMap = {
      '/': 'hero',
      '/why-us': 'reality-vision',
      '/services': 'services',
      '/industries': 'industries',
      '/contact': 'contact'
    };

    const sectionId = pathMap[pathname];
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        // We use a small timeout to ensure components are rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
};

function App() {
  const [contactService, setContactService] = useState(null);

  const MainContent = () => (
    <>
      <AbstractWaves />
      <ScrollToSection />
      <Hero />
      <ProblemSolution />
      <Services onServiceSelect={setContactService} />
      <Industries />
      <Contact initialService={contactService} />
    </>
  );

  return (
    <PageLoader>
      <div className="app">
        <SmoothScroll />
        <CustomCursor />
        <ScrollProgress />
        <ScrollAnimations />
        <MagneticButtons />
        <ParallaxManager />
        <TextReveal />
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/why-us" element={<MainContent />} />
          <Route path="/services" element={<MainContent />} />
          <Route path="/industries" element={<MainContent />} />
          <Route path="/contact" element={<MainContent />} />
        </Routes>
        <Footer />
      </div>
    </PageLoader>
  );
}

export default App
