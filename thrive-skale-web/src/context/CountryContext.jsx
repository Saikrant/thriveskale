import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { COUNTRY_CONFIG, DEFAULT_COUNTRY, SUPPORTED_COUNTRIES } from '../utils/countryConfig';

/* ============================================================
   COUNTRY CONTEXT
   Provides country detection, switching, and config to the app.
   ============================================================ */

const STORAGE_KEY = 'thrivvskale_country';

const CountryContext = createContext(null);

/**
 * Hook to consume the country context.
 * Returns { country, config, switchCountry, isLoading }
 */
export const useCountry = () => {
    const ctx = useContext(CountryContext);
    if (!ctx) {
        throw new Error('useCountry must be used within a <CountryProvider>');
    }
    return ctx;
};

export const CountryProvider = ({ children }) => {
    const [country, setCountry] = useState(DEFAULT_COUNTRY);
    const isLoading = false;
    const [notification, setNotification] = useState(null);
    const notificationTimer = useRef(null);

    /* Site is India-only for now: no IP lookup and no country switcher. */
    useEffect(() => {
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    /* ---- Notification toast logic ---- */
    const showNotification = useCallback((message) => {
        // Clear existing timer
        if (notificationTimer.current) {
            clearTimeout(notificationTimer.current);
        }

        setNotification(message);

        notificationTimer.current = setTimeout(() => {
            setNotification(null);
            notificationTimer.current = null;
        }, 3000);
    }, []);

    /* ---- Manual switch ---- */
    const switchCountry = useCallback((code) => {
        if (!SUPPORTED_COUNTRIES.includes(code)) {
            console.error('[CountrySwitcher] Invalid country code:', code);
            return;
        }
        if (code === country) return;

        console.log('[CountrySwitcher] Switching to:', code);
        localStorage.setItem(STORAGE_KEY, code);
        setCountry(code);

        // Show notification toast
        const cfg = COUNTRY_CONFIG[code];
        showNotification(`${cfg.flag} Switched to ${cfg.name}`);
    }, [country, showNotification]);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (notificationTimer.current) clearTimeout(notificationTimer.current);
        };
    }, []);

    const config = COUNTRY_CONFIG[country];

    return (
        <CountryContext.Provider value={{ country, config, switchCountry, isLoading }}>
            {children}

            {/* Notification Toast */}
            {notification && (
                <div
                    className={`country-switch-notification ${notification ? 'show' : ''}`}
                    role="status"
                    aria-live="polite"
                >
                    <div className="notification-content">
                        <span className="notification-icon">✓</span>
                        <span className="notification-message">{notification}</span>
                    </div>
                </div>
            )}
        </CountryContext.Provider>
    );
};
