// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinkItems = document.querySelectorAll('.nav-links a');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// ACTIVE SECTION HIGHLIGHT IN NAVBAR
// ============================================
const sections = document.querySelectorAll('section, #hero');
const navLinksArray = document.querySelectorAll('.nav-link');

function setActiveLink() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 150; // Offset for navbar

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Special case for hero when at top of page
    if (window.scrollY < 100) {
        currentSection = 'hero';
    }

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Update active link on scroll
window.addEventListener('scroll', setActiveLink);
// Set initial active link
setActiveLink();

// ============================================
// CTA MODAL FUNCTIONALITY
// ============================================
const modal = document.getElementById('ctaModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.querySelector('.modal-close');
const modalBackdrop = document.querySelector('.modal-backdrop');
const ctaForm = document.getElementById('ctaForm');
const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('userEmail');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');

// Open modal
function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    userNameInput.focus();
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    resetForm();
}

// Reset form
function resetForm() {
    ctaForm.reset();
    clearErrors();
}

// Clear error messages
function clearErrors() {
    nameError.textContent = '';
    emailError.textContent = '';
    userNameInput.classList.remove('error');
    userEmailInput.classList.remove('error');
}

// Email validation regex
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form validation
function validateForm() {
    let isValid = true;
    clearErrors();

    // Validate name
    const name = userNameInput.value.trim();
    if (name === '') {
        nameError.textContent = 'Name is required';
        userNameInput.classList.add('error');
        isValid = false;
    } else if (name.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        userNameInput.classList.add('error');
        isValid = false;
    }

    // Validate email
    const email = userEmailInput.value.trim();
    if (email === '') {
        emailError.textContent = 'Email is required';
        userEmailInput.classList.add('error');
        isValid = false;
    } else if (!isValidEmail(email)) {
        emailError.textContent = 'Please enter a valid email address';
        userEmailInput.classList.add('error');
        isValid = false;
    }

    return isValid;
}

// Real-time validation
userNameInput.addEventListener('input', () => {
    if (userNameInput.value.trim().length > 0) {
        userNameInput.classList.remove('error');
        nameError.textContent = '';
    }
});

userEmailInput.addEventListener('input', () => {
    if (userEmailInput.value.trim().length > 0) {
        userEmailInput.classList.remove('error');
        emailError.textContent = '';
    }
});

// Open modal when CTA button is clicked
openModalBtn.addEventListener('click', openModal);

// Close modal with close button
closeModalBtn.addEventListener('click', closeModal);

// Close modal when clicking backdrop
modalBackdrop.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Form submission
ctaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        const name = userNameInput.value.trim();
        const email = userEmailInput.value.trim();
        
        // Success animation
        const submitButton = ctaForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = '✓ Success!';
        submitButton.style.background = 'linear-gradient(135deg, #10B981, #059669)';
        
        // Show success message
        setTimeout(() => {
            alert(`Welcome aboard, ${name}! 🎉\n\nWe've sent a confirmation email to ${email}.\n\nThis is a demo - in production, this would create your account.`);
            closeModal();
            
            // Reset button
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = '';
            }, 300);
        }, 500);
    }
});

// Also add modal triggers to all pricing buttons
const planButtons = document.querySelectorAll('.plan-button');
planButtons.forEach(button => {
    button.addEventListener('click', function() {
        openModal();
    });
});

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================
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

// Observe all cards and sections for animation
const animateElements = document.querySelectorAll('.card, .benefit-item, .testimonial-card, .pricing-card');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ============================================
// NAVBAR SCROLL EFFECTS
// ============================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// PARALLAX EFFECT FOR HERO SECTION
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
    }
});

// ============================================
// CARD HOVER EFFECTS
// ============================================
const cards = document.querySelectorAll('.card, .testimonial-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// RIPPLE EFFECT FOR BUTTONS
// ============================================
function createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Apply ripple to all buttons
document.querySelectorAll('button, .plan-button').forEach(button => {
    button.addEventListener('click', function(e) {
        createRipple(e, this);
    });
});

// ============================================
// CONSOLE GREETING
// ============================================
console.log('%c🎨 CreativeStudio Landing Page', 'font-size: 20px; color: #7C3AED; font-weight: bold;');
console.log('%cBuilt with ❤️ using vanilla HTML, CSS, and JavaScript', 'font-size: 14px; color: #EC4899;');
console.log('%c✨ Features: Sticky Nav • Active Highlighting • Modal Form • Smooth Scrolling', 'font-size: 12px; color: #3B82F6;');
