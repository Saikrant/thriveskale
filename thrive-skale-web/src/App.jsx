import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Packages from './components/Packages';
import MonthlyPlans from './components/MonthlyPlans';
import AddOns from './components/AddOns';
import PaidDirectly from './components/PaidDirectly';
import Calculator from './components/Calculator';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThankYou from './components/ThankYou';
import { PrivacyPolicy, Terms } from './components/LegalPages';
import * as gtag from './utils/gtag';

/* Old URLs still land on the right part of the page. */
const PATH_TO_SECTION = {
    '/how-it-works': 'how-it-works',
    '/packages': 'packages',
    '/services': 'packages',
    '/pricing': 'packages',
    '/monthly': 'monthly',
    '/faq': 'faq',
    '/contact': 'contact',
};

const ScrollToSection = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const id = PATH_TO_SECTION[pathname];
        const el = id && document.getElementById(id);
        if (el) el.scrollIntoView();
        else window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const Home = () => (
    <main id="main">
        <ScrollToSection />
        <Hero />
        <HowItWorks />
        <Packages />
        <MonthlyPlans />
        <AddOns />
        <PaidDirectly />
        <Calculator />
        <FAQ />
        <Contact />
    </main>
);

function App() {
    const location = useLocation();

    useEffect(() => {
        gtag.pageview(location.pathname + location.search);
    }, [location]);

    return (
        <>
            <a className="skip-link" href="#main">Skip to content</a>
            <Navbar />
            <Routes>
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<Home />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
