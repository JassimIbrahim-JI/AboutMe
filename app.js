// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    themeToggle.querySelector('i').classList.toggle('fa-moon');
    themeToggle.querySelector('i').classList.toggle('fa-sun');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Read More Functionality
document.getElementById('readmore').addEventListener('click', function() {
    const content = document.getElementById('show');
    content.classList.toggle('visible');
    this.querySelector('.btn-text').textContent = 
        content.classList.contains('visible') ? 'Read Less' : 'Read More';
});

const nav = document.querySelector('.floating-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});



// Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    Email.send({
        SecureToken: "5cbec1d0-cbd2-4e2d-bdae-dcd447904c97",
        To: 'jassim.ibrhm@gmail.com',
        From: this.email.value,
        Subject: "New Contact Form Submission",
        Body: `Name: ${this.name.value}<br>Email: ${this.email.value}<br>Message: ${this.message.value}`
    }).then(
        message => alert("Message sent successfully!"),
        error => alert("Error sending message. Please try again.")
    );
    this.reset();
});


// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active section highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 100; // Adjust based on your header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.service-card, .project-card').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8
    });
});

// Replace with your EmailJS service ID, template ID, and public key
const emailjsConfig = {
    serviceID: 'service_4y9eyj1',
    templateID: 'template_q6ybsrx',
    publicKey: 'OYJzx685j09nxokJF'
};

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    // Send email via EmailJS
    emailjs.sendForm(emailjsConfig.serviceID, emailjsConfig.templateID, this, emailjsConfig.publicKey)
        .then(() => {
            // Show success message
            const successMsg = document.querySelector('.form-success');
            successMsg.classList.add('visible');
            this.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMsg.classList.remove('visible');
            }, 3000);
        })
        .catch((error) => {
            alert('Error sending message: ' + JSON.stringify(error));
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
});