// ===== PORTFOLIO JAVASCRIPT =====

// ===== UTILITY FUNCTIONS =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ===== CUSTOM CURSOR =====
class CustomCursor {
    constructor() {
        this.cursor = $('.cursor');
        this.cursorDot = $('.cursor-dot');
        this.init();
    }

    init() {
        document.addEventListener('mousemove', this.updatePosition.bind(this));
        this.addHoverEffects();
    }

    updatePosition(e) {
        const { clientX, clientY } = e;
        
        this.cursor.style.left = `${clientX}px`;
        this.cursor.style.top = `${clientY}px`;
        this.cursorDot.style.left = `${clientX}px`;
        this.cursorDot.style.top = `${clientY}px`;
    }

    addHoverEffects() {
        const hoverElements = $$('a, button, .project-card, .about-image');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursor.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.backgroundColor = 'transparent';
            });
        });
    }
}

// ===== NAVIGATION =====
class Navigation {
    constructor() {
        this.navbar = $('.navbar');
        this.init();
    }

    init() {
        this.handleScroll();
        this.handleSmoothScrolling();
        this.handleActiveNavigation();
    }

    handleScroll() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 50) {
                this.navbar.style.background = 'rgba(10, 14, 39, 0.98)';
                this.navbar.style.backdropFilter = 'blur(15px)';
                this.navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            } else {
                this.navbar.style.background = 'rgba(10, 14, 39, 0.95)';
                this.navbar.style.backdropFilter = 'blur(10px)';
                this.navbar.style.boxShadow = 'none';
            }
        });
    }

    handleSmoothScrolling() {
        $$('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                const targetElement = $(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    handleActiveNavigation() {
        const sections = $$('section[id]');
        const navLinks = $$('.nav-links a');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
}

// ===== EXPERIENCE TABS =====
class ExperienceTabs {
    constructor() {
        this.tabs = $$('.job-tab');
        this.panels = $$('.job-panel');
        this.init();
    }

    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', this.handleTabClick.bind(this));
        });
    }

    handleTabClick(e) {
        const clickedTab = e.target;
        const targetPanelId = clickedTab.dataset.tab;

        // Remove active class from all tabs and panels
        this.tabs.forEach(tab => tab.classList.remove('active'));
        this.panels.forEach(panel => panel.classList.remove('active'));

        // Add active class to clicked tab and corresponding panel
        clickedTab.classList.add('active');
        $(`#${targetPanelId}`).classList.add('active');

        // Add smooth transition effect
        const activePanel = $(`#${targetPanelId}`);
        activePanel.style.opacity = '0';
        activePanel.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            activePanel.style.opacity = '1';
            activePanel.style.transform = 'translateY(0)';
        }, 100);
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.createObserver();
        this.observeElements();
        this.handleParallax();
    }

    createObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add stagger effect for multiple elements
                    if (entry.target.classList.contains('project-card')) {
                        this.addStaggerEffect(entry.target);
                    }
                }
            });
        }, options);
    }

    observeElements() {
        $$('.fade-in').forEach(el => {
            this.observer.observe(el);
        });
    }

    addStaggerEffect(element) {
        const children = element.querySelectorAll('.project-content > *');
        children.forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
            child.classList.add('fade-in-child');
        });
    }

    handleParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = $$('.hero-background');
            
            parallaxElements.forEach(element => {
                const speed = 0.3;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// ===== CODE TYPING ANIMATION =====
class TypingAnimation {
    constructor() {
        this.element = $('.code-content');
        this.text = '';
        this.index = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        if (this.element) {
            this.text = this.element.innerHTML;
            this.element.innerHTML = '';
            this.type();
        }
    }

    type() {
        const current = this.index;
        const fullText = this.text;

        if (!this.isDeleting && current < fullText.length) {
            this.element.innerHTML = fullText.substring(0, current + 1) + '<span class="cursor-blink">|</span>';
            this.index++;
            setTimeout(() => this.type(), 100);
        } else if (this.isDeleting && current > 0) {
            this.element.innerHTML = fullText.substring(0, current - 1) + '<span class="cursor-blink">|</span>';
            this.index--;
            setTimeout(() => this.type(), 50);
        } else {
            this.isDeleting = !this.isDeleting;
            setTimeout(() => this.type(), this.isDeleting ? 1000 : 2000);
        }
    }
}

// ===== PROJECT INTERACTIONS =====
class ProjectInteractions {
    constructor() {
        this.projectCards = $$('.project-card');
        this.init();
    }

    init() {
        this.addHoverEffects();
        this.addClickAnimations();
    }

    addHoverEffects() {
        this.projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                
                const image = card.querySelector('.project-image');
                if (image) {
                    image.style.transform = 'scale(1.1)';
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                
                const image = card.querySelector('.project-image');
                if (image) {
                    image.style.transform = 'scale(1)';
                }
            });
        });
    }

    addClickAnimations() {
        $$('.project-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(100, 255, 218, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                const rect = link.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                
                link.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeScrollEvents();
        this.preloadCriticalResources();
    }

    lazyLoadImages() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        $$('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    optimizeScrollEvents() {
        let ticking = false;

        function updateScrollEffects() {
            // Batch DOM updates
            requestAnimationFrame(() => {
                // Update scroll-based animations here
                ticking = false;
            });
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    preloadCriticalResources() {
        // Preload critical fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.as = 'font';
        fontLink.type = 'font/woff2';
        fontLink.crossOrigin = 'anonymous';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap';
        document.head.appendChild(fontLink);
    }
}

// ===== THEME MANAGER =====
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.applyTheme();
        this.createThemeToggle();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    createThemeToggle() {
        // This could be expanded to include a theme toggle button
        console.log('Theme system initialized:', this.theme);
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.addKeyboardNavigation();
        this.addAriaLabels();
        this.handleFocusManagement();
        this.addSkipToContent();
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    addAriaLabels() {
        $$('.project-link').forEach((link, index) => {
            if (!link.getAttribute('aria-label')) {
                link.setAttribute('aria-label', `Project link ${index + 1}`);
            }
        });

        $$('.social-link').forEach((link, index) => {
            if (!link.getAttribute('aria-label')) {
                link.setAttribute('aria-label', `Social media link ${index + 1}`);
            }
        });
    }

    handleFocusManagement() {
        const focusableElements = 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.activeElement.blur();
            }
        });
    }

    addSkipToContent() {
        const skipLink = document.createElement('a');
        skipLink.href = '#about';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-to-content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--accent-blue);
            color: var(--bg-primary);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.prepend(skipLink);
    }
}

// ===== ANIMATION SYSTEM =====
class AnimationSystem {
    constructor() {
        this.animations = new Map();
        this.init();
    }

    init() {
        this.registerAnimations();
        this.handleReducedMotion();
    }

    registerAnimations() {
        // Register common animations
        this.animations.set('fadeIn', {
            keyframes: [
                { opacity: 0, transform: 'translateY(30px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ],
            options: { duration: 600, easing: 'ease-out', fill: 'forwards' }
        });

        this.animations.set('slideUp', {
            keyframes: [
                { transform: 'translateY(50px)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 }
            ],
            options: { duration: 800, easing: 'ease-out', fill: 'forwards' }
        });
    }

    animate(element, animationName, delay = 0) {
        if (!this.animations.has(animationName)) return;

        const { keyframes, options } = this.animations.get(animationName);
        
        setTimeout(() => {
            element.animate(keyframes, options);
        }, delay);
    }

    handleReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable animations for users who prefer reduced motion
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        }
    }
}

// ===== INITIALIZATION =====
class PortfolioApp {
    constructor() {
        this.components = [];
        this.init();
    }

    init() {
        this.waitForDOMReady(() => {
            this.initializeComponents();
            this.handlePageLoad();
        });
    }

    waitForDOMReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }

    initializeComponents() {
        // Initialize all components
        this.components.push(
            new CustomCursor(),
            new Navigation(),
            new ExperienceTabs(),
            new ScrollAnimations(),
            new TypingAnimation(),
            new ProjectInteractions(),
            new PerformanceOptimizer(),
            new ThemeManager(),
            new AccessibilityEnhancer(),
            new AnimationSystem()
        );

        console.log('Portfolio initialized with', this.components.length, 'components');
    }

    handlePageLoad() {
        // Add loading states
        document.body.classList.add('loaded');
        
        // Initialize any additional page-specific functionality
        this.addEasterEggs();
    }

    addEasterEggs() {
        // Konami code easter egg
        let konamiCode = [];
        const correctCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            
            if (konamiCode.length > correctCode.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(correctCode)) {
                this.activateEasterEgg();
                konamiCode = [];
            }
        });
    }

    activateEasterEgg() {
        // Add special effects when konami code is entered
        document.body.style.filter = 'hue-rotate(180deg)';
        
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
        
        console.log('🎉 Easter egg activated! You found the secret code!');
    }
}

// ===== START APPLICATION =====
new PortfolioApp();

// ===== EXPORT FOR POTENTIAL MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PortfolioApp,
        CustomCursor,
        Navigation,
        ExperienceTabs,
        ScrollAnimations,
        TypingAnimation,
        ProjectInteractions,
        PerformanceOptimizer,
        ThemeManager,
        AccessibilityEnhancer,
        AnimationSystem
    };
}