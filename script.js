// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeNavigation();
    initializeGallery();
    initializeScrollAnimations();
    initializeContactForm();
});

// ============================================
// HEADER & STICKY BEHAVIOR
// ============================================

function initializeHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Set active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// GALLERY & LIGHTBOX
// ============================================

function initializeGallery() {
    // Lightbox functionality is handled inline in HTML with onclick
    // This function is here for future enhancements
}

function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    lightboxImage.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close lightbox when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Close lightbox on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Animate various elements on scroll
    const animateElements = document.querySelectorAll(
        '.service-card, .reason-item, .review-card, .info-card, .trust-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                showFormSuccess();
                form.reset();
                
                // Scroll to show success message
                setTimeout(() => {
                    const formMessage = document.getElementById('formMessage');
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        });
        
        // Real-time validation on input
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('focus', function() {
                clearFieldError(this);
            });
        });
    }
}

function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    
    let isValid = true;
    
    // Clear all previous errors
    clearAllErrors();
    
    // Validate full name
    if (!fullName || fullName.length < 2) {
        showFieldError('fullName', 'Please enter your full name');
        isValid = false;
    }
    
    // Validate phone
    if (!phone || !isValidPhone(phone)) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate email
    if (!email || !isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate service selection
    if (!service) {
        showFieldError('service', 'Please select a service');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    let isValid = true;
    
    switch(field.id) {
        case 'fullName':
            if (!field.value.trim() || field.value.trim().length < 2) {
                showFieldError('fullName', 'Please enter your full name');
                isValid = false;
            }
            break;
        case 'phone':
            if (!field.value.trim() || !isValidPhone(field.value)) {
                showFieldError('phone', 'Please enter a valid phone number');
                isValid = false;
            }
            break;
        case 'email':
            if (!field.value.trim() || !isValidEmail(field.value)) {
                showFieldError('email', 'Please enter a valid email address');
                isValid = false;
            }
            break;
        case 'service':
            if (!field.value) {
                showFieldError('service', 'Please select a service');
                isValid = false;
            }
            break;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function showFieldError(fieldId, message) {
    const errorElement = document.getElementById('error' + fieldId.charAt(0).toUpperCase() + fieldId.slice(1));
    const field = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    if (field) {
        field.style.borderColor = '#e74c3c';
    }
}

function clearFieldError(field) {
    const errorId = 'error' + field.id.charAt(0).toUpperCase() + field.id.slice(1);
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }
    
    field.style.borderColor = '';
}

function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('input, select, textarea');
    
    errorMessages.forEach(msg => {
        msg.classList.remove('show');
        msg.textContent = '';
    });
    
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

function showFormSuccess() {
    const formMessage = document.getElementById('formMessage');
    
    formMessage.textContent = '✓ Thank you! We\'ll call you soon with your quote.';
    formMessage.classList.remove('error');
    formMessage.classList.add('success');
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.remove('success');
        formMessage.textContent = '';
    }, 5000);
}

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

document.addEventListener('scroll', function() {
    let currentSection = '';
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just a hash or empty
        if (href === '#' || href === '') {
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images when they come into view
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// PRINT STYLES
// ============================================

if (window.matchMedia('print').matches) {
    document.querySelector('header')?.style.display = 'none';
    document.querySelector('footer')?.style.display = 'none';
}

console.log('5 Star Maids LLC website initialized successfully');
