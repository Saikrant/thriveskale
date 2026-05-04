import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { COUNTRY_CONFIG, DEFAULT_COUNTRY, SUPPORTED_COUNTRIES } from '../utils/countryConfig';

/* ============================================================
   COUNTRY CONTEXT
   Provides country detection, switching, and config to the app.
   ============================================================ */

const STORAGE_KEY = 'thrivvskale_country';
const GEO_API_URL = 'https://ipapi.co/json/';
const GEO_TIMEOUT_MS = 3000;

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
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState(null);
    const notificationTimer = useRef(null);
    const hasDetected = useRef(false);

    /* ---- Auto-detect on mount ---- */
    useEffect(() => {
        if (hasDetected.current) return;
        hasDetected.current = true;

        (async () => {
            try {
                // Step 1: Check localStorage
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved && SUPPORTED_COUNTRIES.includes(saved)) {
                    console.log('[CountrySwitcher] Using saved preference:', saved);
                    setCountry(saved);
                    setIsLoading(false);
                    return;
                }

                // Step 2: IP geolocation with timeout
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), GEO_TIMEOUT_MS);

                const response = await fetch(GEO_API_URL, { signal: controller.signal });
                clearTimeout(timeout);

                if (!response.ok) throw new Error('Geolocation API returned ' + response.status);

                const data = await response.json();
                const detected = data.country_code === 'IN' ? 'IN' : 'US';

                console.log('[CountrySwitcher] Detected country:', detected);
                localStorage.setItem(STORAGE_KEY, detected);
                setCountry(detected);
            } catch (err) {
                console.warn('[CountrySwitcher] Auto-detection failed, defaulting to US:', err.message);
                setCountry(DEFAULT_COUNTRY);
            } finally {
                setIsLoading(false);
            }
        })();
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
    }, [country]);

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
