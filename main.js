/**
 * JAHEL Foundation - Main JavaScript File
 * Handles mobile menu, animations, form validation, and other interactive features
 */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initBackToTop();
    initScrollAnimations();
    initDonateOptions();
    initContactForm();
    initTestimonialSlider();
    initSmoothScroll();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navToggle.innerHTML = mobileMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        // Scroll to top when button is clicked
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    // Add fade-in class to elements as they come into view
    const animatedElements = document.querySelectorAll('.fade-in');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => observer.observe(el));
    }
}

/**
 * Donate Options Selection
 */
function initDonateOptions() {
    const donateOptions = document.querySelectorAll('.donate-option');
    
    donateOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            donateOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });
}

/**
 * Contact Form Validation
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.querySelector('.donate-section .contact-form');
    
    // Contact form validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff4444';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Check privacy checkbox
            const privacyCheck = document.getElementById('privacyCheck');
            if (privacyCheck && !privacyCheck.checked) {
                isValid = false;
                alert('Please agree to the Privacy Policy and Terms of Service.');
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate successful submission
                setTimeout(() => {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
    
    // Newsletter form validation
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const nameInput = newsletterForm.querySelector('input[type="text"]');
            const consentCheck = document.getElementById('newsletterConsent');
            
            if (!emailInput.value.trim() || !nameInput.value.trim()) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!consentCheck || !consentCheck.checked) {
                alert('Please agree to receive newsletters and updates.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const items = slider.querySelectorAll('.testimonial-item');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    
    if (items.length === 0 || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    
    // Show first item
    showItem(currentIndex);
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    });
    
    // Auto-advance every 5 seconds
    let interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    slider.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            showItem(currentIndex);
        }, 5000);
    });
    
    function showItem(index) {
        items.forEach((item, i) => {
            item.style.display = i === index ? 'block' : 'none';
        });
    }
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
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
}

/**
 * Active Navigation Link Based on Scroll Position
 */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav a, .mobile-menu a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active nav link
initActiveNavLink();

/**
 * Utility Functions
 */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Console Welcome Message
 */
console.log('%c🌟 Welcome to JAHEL Foundation! 🌟', 'color: #8B5A96; font-size: 18px; font-weight: bold;');
console.log('%cInspiring Hope, Empowering Lives, Creating Lasting Impact', 'color: #FFD700; font-size: 14px;');
console.log('%cJosephine Adidi Humanitarian and Empowerment Legacy Foundation', 'color: #2E8B57; font-size: 12px;');
