import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LaunchHero from './components/LaunchHero';
import ProblemSolution from './components/ProblemSolution';
import Industries from './components/Industries';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import ThankYou from './components/ThankYou';
import ScrollNavigator from './components/ScrollNavigator';

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
import { CountryProvider } from './context/CountryContext';
import './components/CountrySwitcher.css';

// Helper component to handle scrolling based on route
const ScrollToSection = () => {
  const { pathname } = useLocation();

  // Prevent browser from restoring scroll on refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const pathMap = {
      '/': 'hero',
      '/why-us': 'reality-vision',
      '/services': 'services',
      '/pricing': 'pricing',
      '/industries': 'industries',
      '/contact': 'contact'
    };

    const sectionId = pathMap[pathname];
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        // Small delay to ensure layout is ready
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

const MainContent = ({ contactService, setContactService }) => (
  <>
    <AbstractWaves />
    <ScrollToSection />
    <Hero />
    <LaunchHero />
    <ProblemSolution />
    <Services onServiceSelect={setContactService} />
    <Industries />
    <Pricing />
    <Contact initialService={contactService} />
  </>
);

function App() {
  const [contactService, setContactService] = useState(null);

  return (
    <PageLoader>
      <CountryProvider>
        <div className="app">
          <SmoothScroll />
          <CustomCursor />
          <ScrollProgress />
          <ScrollAnimations />
          <MagneticButtons />
          <ParallaxManager />
          <TextReveal />
          <ScrollNavigator />
          <Navbar />
          <Routes>
            <Route path="/" element={<MainContent contactService={contactService} setContactService={setContactService} />} />
            <Route path="/why-us" element={<MainContent contactService={contactService} setContactService={setContactService} />} />
            <Route path="/services" element={<MainContent contactService={contactService} setContactService={setContactService} />} />
            <Route path="/industries" element={<MainContent contactService={contactService} setContactService={setContactService} />} />
            <Route path="/pricing" element={<MainContent contactService={contactService} setContactService={setContactService} />} />
            <Route path="/contact" element={<MainContent contactService={contactService} setContactService={setContactService} />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="*" element={<MainContent contactService={contactService} setContactService={setContactService} />} />
          </Routes >
          <Footer />
        </div >
      </CountryProvider >
    </PageLoader >
  );
}

export default App
