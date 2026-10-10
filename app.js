// Theme Toggle with LocalStorage Persistence
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

// Initial Theme Check
const savedTheme = localStorage.getItem('portfolio-theme') || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });
}

// Read More Functionality in About Section
const readMoreBtn = document.getElementById('readmore');
if (readMoreBtn) {
    readMoreBtn.addEventListener('click', function() {
        const content = document.getElementById('show');
        if (content) {
            content.classList.toggle('visible');
            const isVisible = content.classList.contains('visible');
            this.querySelector('.btn-text').textContent = isVisible ? 'Read Less' : 'Read More';
            this.setAttribute('aria-expanded', isVisible ? 'true' : 'false');
        }
    });
}

// Floating Navigation Scroll Effect
const nav = document.querySelector('.floating-nav');
window.addEventListener('scroll', () => {
    if (nav) {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
}, { passive: true });

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking any nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !nav.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth Scroll with Header Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 90;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Section Highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop - 180) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}, { passive: true });

// GSAP Animations (Check if GSAP & ScrollTrigger are available)
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.service-card, .project-card').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
            },
            opacity: 0,
            y: 40,
            duration: 0.7,
            ease: "power2.out"
        });
    });
}

// Contact Form Submission via EmailJS
const emailjsConfig = {
    serviceID: 'service_4y9eyj1',
    templateID: 'template_q6ybsrx',
    publicKey: 'OYJzx685j09nxokJF'
};

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        if (typeof emailjs !== 'undefined') {
            emailjs.sendForm(emailjsConfig.serviceID, emailjsConfig.templateID, this, emailjsConfig.publicKey)
                .then(() => {
                    const successMsg = document.querySelector('.form-success');
                    if (successMsg) {
                        successMsg.classList.add('visible');
                        setTimeout(() => {
                            successMsg.classList.remove('visible');
                        }, 4000);
                    }
                    this.reset();
                })
                .catch((error) => {
                    alert('Error sending message: ' + (error.text || JSON.stringify(error)));
                })
                .finally(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        } else {
            alert('Email service is not ready. Please try again later.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}