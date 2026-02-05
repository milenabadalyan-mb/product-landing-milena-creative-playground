// Mobile Menu Toggle
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

// Smooth scrolling for navigation links
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

// Intersection Observer for scroll animations
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

// CTA Button click handler
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    // Add a ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(124, 58, 237, 0.5)';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.marginLeft = '-50px';
    ripple.style.marginTop = '-50px';
    ripple.style.animation = 'ripple 0.6s';
    
    ctaButton.style.position = 'relative';
    ctaButton.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
    // Scroll to pricing section
    const pricingSection = document.querySelector('#pricing');
    if (pricingSection) {
        pricingSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// Add ripple animation to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(4);
        }
    }
`;
document.head.appendChild(style);

// Pricing button handlers
const planButtons = document.querySelectorAll('.plan-button');
planButtons.forEach(button => {
    button.addEventListener('click', function() {
        const planName = this.closest('.pricing-card').querySelector('.plan-name').textContent;
        alert(`Thank you for your interest in the ${planName} plan! This is a demo - in production, this would redirect to the signup page.`);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
    }
});

// Add hover effect to cards
const cards = document.querySelectorAll('.card, .testimonial-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(31, 41, 55, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// GALLERY FILTERING
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Filter gallery items
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ============================================
// LIGHTBOX FUNCTIONALITY
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxCategory = document.querySelector('.lightbox-category');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxCounter = document.querySelector('.lightbox-counter');

let currentImageIndex = 0;
let visibleImages = [];

// Update visible images array based on current filter
function updateVisibleImages() {
    visibleImages = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
}

// Open lightbox
function openLightbox(index) {
    updateVisibleImages();
    currentImageIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Update lightbox content
function updateLightboxContent() {
    if (visibleImages.length === 0) return;
    
    const currentItem = visibleImages[currentImageIndex];
    const img = currentItem.querySelector('img');
    const overlay = currentItem.querySelector('.gallery-overlay');
    const category = overlay.querySelector('.gallery-category').textContent;
    const title = overlay.querySelector('h3').textContent;
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCategory.textContent = category;
    lightboxTitle.textContent = title;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${visibleImages.length}`;
}

// Navigate to previous image
function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    updateLightboxContent();
}

// Navigate to next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    updateLightboxContent();
}

// Add click event to gallery items
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        updateVisibleImages();
        const visibleIndex = visibleImages.indexOf(item);
        openLightbox(visibleIndex);
    });
});

// Lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPreviousImage);
lightboxNext.addEventListener('click', showNextImage);

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// ============================================
// KEYBOARD NAVIGATION FOR LIGHTBOX
// ============================================
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPreviousImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
});

// Console message for developers
console.log('%c🎨 CreativeStudio Landing Page', 'font-size: 20px; color: #7C3AED; font-weight: bold;');
console.log('%cBuilt with ❤️ using vanilla HTML, CSS, and JavaScript', 'font-size: 14px; color: #EC4899;');
console.log('%c✨ Features: Gallery • Lightbox • Filters • Keyboard Navigation', 'font-size: 12px; color: #3B82F6;');