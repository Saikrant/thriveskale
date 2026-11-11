import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const LINKS = [
    { to: '/how-it-works', id: 'how-it-works', label: 'How it works' },
    { to: '/packages', id: 'packages', label: 'Packages' },
    { to: '/monthly', id: 'monthly', label: 'Monthly' },
    { to: '/faq', id: 'faq', label: 'FAQ' },
    { to: '/contact', id: 'contact', label: 'Contact' },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        if (!open) return undefined;
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    /* Clicking a link to the section already in the URL still scrolls to it. */
    const go = (link) => {
        setOpen(false);
        if (pathname === link.to) document.getElementById(link.id)?.scrollIntoView();
    };

    return (
        <header className="nav">
            <div className="container nav-inner">
                <Link to="/" className="nav-logo" onClick={() => setOpen(false)} aria-label="ThrivvSkale home">
                    thrivv<span>Skale</span>
                </Link>

                <button
                    type="button"
                    className="nav-toggle"
                    aria-expanded={open}
                    aria-controls="nav-menu"
                    onClick={() => setOpen((v) => !v)}
                >
                    <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
                    <span className="nav-toggle-bar" aria-hidden="true" />
                    <span className="nav-toggle-bar" aria-hidden="true" />
                    <span className="nav-toggle-bar" aria-hidden="true" />
                </button>

                <nav id="nav-menu" className={`nav-menu ${open ? 'is-open' : ''}`} aria-label="Main">
                    <ul className="nav-links">
                        {LINKS.map((link) => (
                            <li key={link.id}>
                                <Link to={link.to} onClick={() => go(link)}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                    <Link to="/contact" className="btn btn--primary nav-cta" onClick={() => go(LINKS[4])}>
                        Get a quote
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
