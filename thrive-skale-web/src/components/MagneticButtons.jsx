import { useEffect } from 'react';

const MagneticButtons = () => {
    useEffect(() => {
        // Only on desktop
        if (window.matchMedia('(max-width: 768px)').matches) return;

        const buttons = document.querySelectorAll('.cta-btn, .cta-link, button[class*="btn"]');
        const buttonData = new Map();

        const handleMouseMove = (e) => {
            buttons.forEach((btn) => {
                const rect = btn.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distX = e.clientX - centerX;
                const distY = e.clientY - centerY;
                const distance = Math.sqrt(distX * distX + distY * distY);

                if (distance < 80) {
                    const moveX = distX * 0.3;
                    const moveY = distY * 0.3;
                    const clampedX = Math.max(-10, Math.min(10, moveX));
                    const clampedY = Math.max(-10, Math.min(10, moveY));
                    btn.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
                    btn.style.transition = 'transform 0.2s ease-out';
                    buttonData.set(btn, true);
                } else if (buttonData.get(btn)) {
                    btn.style.transform = 'translate3d(0, 0, 0)';
                    btn.style.transition = 'transform 0.4s ease-out';
                    buttonData.set(btn, false);
                }
            });
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            buttons.forEach((btn) => {
                btn.style.transform = '';
                btn.style.transition = '';
            });
        };
    }, []);

    return null;
};

export default MagneticButtons;
