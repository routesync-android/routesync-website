// RouteSync Website JavaScript

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const topic = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !topic || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Create mailto link (since we don't have a backend)
        const subject = encodeURIComponent(`RouteSync Contact: ${topic}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:contact@routesync.de?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Thank you for your message! Your email client should open with the message pre-filled. If not, please email us directly at contact@routesync.de');
        
        // Reset form
        this.reset();
    });
}

// FAQ accordion functionality (if we want to make it expandable later)
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .faq-item, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Phone mockup interaction
const phoneMockup = document.querySelector('.phone-mockup');
if (phoneMockup) {
    phoneMockup.addEventListener('mouseenter', () => {
        phoneMockup.style.transform = 'scale(1.05) rotateY(5deg)';
    });
    
    phoneMockup.addEventListener('mouseleave', () => {
        phoneMockup.style.transform = 'scale(1) rotateY(0deg)';
    });
}

// Add loading state to download button
document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.textContent.includes('Download')) {
        btn.addEventListener('click', function(e) {
            if (this.href === '#' || this.href.includes('javascript:')) {
                e.preventDefault();
                
                // Simulate app store redirect (replace with actual Play Store URL)
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening Play Store...';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.pointerEvents = 'auto';
                    alert('App coming soon to Google Play Store!\n\nFor now, you can contact us at contact@routesync.de for early access.');
                }, 2000);
            }
        });
    }
});

// Add some Easter eggs for fun
let clickCount = 0;
const logo = document.querySelector('.nav-logo h2');
if (logo) {
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            logo.style.transform = 'rotate(360deg)';
            logo.style.transition = 'transform 1s ease';
            setTimeout(() => {
                logo.style.transform = 'rotate(0deg)';
                clickCount = 0;
            }, 1000);
        }
    });
}

// Performance optimization: Lazy load images when we add them
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('RouteSync website loaded successfully! 🚀');
    
    // Initialize language functionality
    initializeLanguages();
    
    // Preload critical resources
    const criticalLinks = document.querySelectorAll('link[rel="preload"]');
    criticalLinks.forEach(link => {
        const resource = document.createElement('link');
        resource.rel = 'prefetch';
        resource.href = link.href;
        document.head.appendChild(resource);
    });
});

// Language functionality - Simplified and bulletproof
function initializeLanguages() {
    console.log('Initializing languages...');
    
    // Check if translations are loaded
    if (typeof translations === 'undefined') {
        console.error('Translations not loaded! Check translations.js');
        return;
    }
    
    // Add click listeners to language buttons with detailed logging
    document.querySelectorAll('.lang-btn').forEach((btn, index) => {
        console.log(`Adding listener to button ${index}:`, btn.getAttribute('data-lang'));
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const lang = this.getAttribute('data-lang');
            console.log(`Language button clicked: ${lang}`);
            
            if (lang) {
                switchLanguage(lang);
            } else {
                console.error('No language attribute found');
            }
        });
    });
    
    // Apply default language
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    console.log(`Applying saved language: ${savedLang}`);
    switchLanguage(savedLang);
}

function switchLanguage(lang) {
    console.log(`Switching to language: ${lang}`);
    
    // Validate language exists
    if (!translations[lang]) {
        console.error(`Language ${lang} not found in translations`);
        lang = 'en'; // Fallback to English
    }
    
    let elementsUpdated = 0;
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = translations[lang][key];
        
        if (translation) {
            if (element.innerHTML.includes('<span class="highlight">') || translation.includes('<span class="highlight">')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
            elementsUpdated++;
        } else {
            console.warn(`Translation missing for key: ${key} in language: ${lang}`);
        }
    });
    
    console.log(`Updated ${elementsUpdated} elements for language ${lang}`);
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
            console.log(`Activated button for language: ${lang}`);
        }
    });
    
    // Save language preference
    localStorage.setItem('selectedLanguage', lang);
    
    console.log(`Language switch to ${lang} completed`);
}

// Debug function for manual testing
function testLanguage() {
    console.log('Manual test triggered');
    if (typeof translations !== 'undefined') {
        console.log('Translations available, switching to German');
        switchLanguage('de');
    } else {
        console.error('Translations not available!');
        alert('Translations not loaded - check console');
    }
}
