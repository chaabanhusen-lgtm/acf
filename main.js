/* ==========================================================================
   AUDITING CENTRAL (PROJECT ANTIGRAVITY) - CORE INTERACTIVITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTelemetryClocks();
    initScrollReveal();
    initHeroTelemetryAnimate();
});

/**
 * 1. NAVIGATION & RESPONSIVE DRAWER CONTROLLER
 */
function initNavigation() {
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Sticky nav state on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hamburger trigger
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside or clicking links
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
}

/**
 * 2. MATHEMATICAL UTC & LOCAL TIME TELEMETRY ENGINE
 */
function initTelemetryClocks() {
    const navClockText = document.getElementById('utc-clock-val');
    
    // Define GMT Offsets for May (including daylight savings where active)
    // London: BST (UTC+1), New York: EDT (UTC-4), Dubai: GST (UTC+4)
    // Beirut: EEST (UTC+3), Kinshasa: WAT (UTC+1), São Paulo: BRT (UTC-3)
    const officeOffsets = {
        london: 1,
        newyork: -4,
        dubai: 4,
        beirut: 3,
        kinshasa: 1,
        saopaulo: -3
    };

    function updateTime() {
        const now = new Date();
        
        // Update UTC Navigation telemetry
        if (navClockText) {
            const utcString = now.toISOString().replace('T', ' ').substring(0, 19) + ' Z';
            navClockText.textContent = utcString;
        }

        // Update individual Office cards on Contact Page
        Object.keys(officeOffsets).forEach(city => {
            const clockEl = document.getElementById(`clock-${city}`);
            const statusEl = document.getElementById(`status-${city}`);
            
            if (clockEl) {
                // Calculate local time for the specific offset
                const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
                const localTime = new Date(utc + (3600000 * officeOffsets[city]));
                
                // Format: HH:MM:SS (24h)
                const hours = String(localTime.getHours()).padStart(2, '0');
                const minutes = String(localTime.getMinutes()).padStart(2, '0');
                const seconds = String(localTime.getSeconds()).padStart(2, '0');
                clockEl.textContent = `${hours}:${minutes}:${seconds}`;

                // Calculate open/closed status (Corporate hours: 08:00 - 18:00, Mon-Fri)
                if (statusEl) {
                    const day = localTime.getDay(); // 0 is Sunday, 6 is Saturday
                    const hour = localTime.getHours();
                    const isOpen = (day >= 1 && day <= 5) && (hour >= 8 && hour < 18);
                    
                    if (isOpen) {
                        statusEl.textContent = "Open / Compliance Active";
                        statusEl.className = "office-local-status status-open";
                    } else {
                        statusEl.textContent = "Closed / Standard Standby";
                        statusEl.className = "office-local-status status-closed";
                    }
                }
            }
        });
    }

    updateTime();
    setInterval(updateTime, 1000);
}

/**
 * 3. INTERSECTION OBSERVER FOR SLIDE/REVEAL ANIMATIONS
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('revealed'));
    }
}

/**
 * 4. DYNAMIC TELEMETRY PROGRESS BARS ON HERO LOAD
 */
function initHeroTelemetryAnimate() {
    setTimeout(() => {
        const fills = document.querySelectorAll('.telemetry-bar-fill');
        fills.forEach(fill => {
            const targetVal = fill.getAttribute('data-target-width') || '100%';
            fill.style.width = targetVal;
        });
    }, 400);
}
