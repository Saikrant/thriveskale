import { useState } from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Industries from './components/Industries';
import Services from './components/Services';
import Contact from './components/Contact';

import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <div className="app">
      <SmoothScroll />
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Services />
      <Industries />
      <Contact />
      <Footer />
    </div>
  );
}

export default App
