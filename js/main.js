/**
 * ZANZSTAR TOURS AND TRAVEL
 * Main JavaScript File
 * Handles all interactive functionality
 */

// ==================== DOM Content Loaded ====================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoading();
    initHeader();
    initMobileMenu();
    initScrollAnimations();
    initTestimonialSlider();
    initFAQ();
    initBackToTop();
    initContactForm();
    initSmoothScroll();
});

// ==================== Loading Screen ====================
function initLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loading.classList.add('hidden');
                setTimeout(function() {
                    loading.style.display = 'none';
                }, 500);
            }, 500);
        });
        
        // Fallback: hide loading after 3 seconds even if load event doesn't fire
        setTimeout(function() {
            if (loading && !loading.classList.contains('hidden')) {
                loading.classList.add('hidden');
                setTimeout(function() {
                    loading.style.display = 'none';
                }, 500);
            }
        }, 3000);
    }
}

// ==================== Header Scroll Effect ====================
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let lastScroll = 0;
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolled down
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    // Initial check
    handleScroll();
    
    // Listen for scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// ==================== Mobile Menu ====================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuToggle || !navMenu) return;
    
    // Toggle menu on click
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('.nav-link, .btn-nav');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ==================== Scroll Animations ====================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animatedElements.length) return;
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(function(el) {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(function(el) {
            el.classList.add('animated');
        });
    }
}

// ==================== Testimonial Slider ====================
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!testimonials.length || !dots.length) return;
    
    let currentSlide = 0;
    let autoplayInterval;
    
    function showSlide(index) {
        // Hide all testimonials
        testimonials.forEach(function(testimonial) {
            testimonial.style.display = 'none';
            testimonial.style.opacity = '0';
        });
        
        // Remove active class from all dots
        dots.forEach(function(dot) {
            dot.classList.remove('active');
        });
        
        // Show current testimonial
        if (testimonials[index]) {
            testimonials[index].style.display = 'block';
            setTimeout(function() {
                testimonials[index].style.opacity = '1';
            }, 50);
        }
        
        // Add active class to current dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % testimonials.length;
        showSlide(next);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Click handlers for dots
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            stopAutoplay();
            showSlide(index);
            startAutoplay();
        });
    });
    
    // Initialize
    showSlide(0);
    startAutoplay();
    
    // Pause on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoplay);
        sliderContainer.addEventListener('mouseleave', startAutoplay);
    }
}

// ==================== FAQ Accordion ====================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Check if this item is already active
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(function(faq) {
                    faq.classList.remove('active');
                });
                
                // If it wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// ==================== Back to Top Button ====================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    function toggleVisibility() {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    // Initial check
    toggleVisibility();
    
    // Listen for scroll
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    
    // Scroll to top on click
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== Contact Form ====================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach(function(value, key) {
            data[key] = value;
        });
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Construct WhatsApp message
        const message = constructWhatsAppMessage(data);
        
        // Open WhatsApp with the message
        const whatsappUrl = 'https://wa.me/255656443740?text=' + encodeURIComponent(message);
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        showNotification('Thank you! Redirecting to WhatsApp...', 'success');
        
        // Reset form after a delay
        setTimeout(function() {
            contactForm.reset();
        }, 1000);
    });
    
    function validateForm(data) {
        if (!data.firstName || !data.lastName) {
            showNotification('Please enter your name.', 'error');
            return false;
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return false;
        }
        
        if (!data.subject) {
            showNotification('Please select a subject.', 'error');
            return false;
        }
        
        if (!data.message) {
            showNotification('Please enter your message.', 'error');
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function constructWhatsAppMessage(data) {
        let message = `Hello Zanzstar Tours!\n\n`;
        message += `*Name:* ${data.firstName} ${data.lastName}\n`;
        message += `*Email:* ${data.email}\n`;
        
        if (data.phone) {
            message += `*Phone:* ${data.phone}\n`;
        }
        
        message += `*Subject:* ${data.subject}\n`;
        
        if (data.travelDate) {
            message += `*Travel Date:* ${data.travelDate}\n`;
        }
        
        if (data.guests) {
            message += `*Guests:* ${data.guests}\n`;
        }
        
        message += `\n*Message:*\n${data.message}`;
        
        return message;
    }
}

// ==================== Notification System ====================
function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        max-width: 350px;
    `;
    
    // Add keyframes if not exists
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(function() {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ==================== Smooth Scroll ====================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== Gallery Lightbox (Optional Enhancement) ====================
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!galleryItems.length) return;
    
    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });
}

function openLightbox(src, alt) {
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${src}" alt="${alt}">
        </div>
    `;
    
    // Add styles
    lightbox.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    `;
    
    const image = lightbox.querySelector('img');
    image.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        border-radius: 8px;
    `;
    
    // Add to DOM
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Close handlers
    function closeLightbox() {
        lightbox.remove();
        document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// ==================== Lazy Loading Images ====================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (!images.length) return;
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback: load all images immediately
        images.forEach(function(img) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// ==================== Parallax Effect (Optional) ====================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.page-hero, .cta-section');
    
    if (!parallaxElements.length) return;
    
    // Only apply on desktop
    if (window.innerWidth <= 768) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(function(el) {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            el.style.backgroundPositionY = yPos + 'px';
        });
    }, { passive: true });
}

// ==================== Utility Functions ====================
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== Initialize Additional Features ====================
window.addEventListener('load', function() {
    initGallery();
    initLazyLoading();
    initParallax();
});

// ==================== Console Welcome Message ====================
console.log('%c Welcome to Zanzstar Tours & Travel! 🌴', 'color: #1a7a6c; font-size: 16px; font-weight: bold;');
console.log('%c Discover the best of Zanzibar with us!', 'color: #666; font-size: 12px;');
console.log('%c Contact: +255 656 443 740', 'color: #25d366; font-size: 12px;');
