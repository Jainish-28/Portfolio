import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// ===================================
// THEME TOGGLE
// ===================================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===================================
// NAVIGATION
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// SMOOTH SCROLLING
// ===================================
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

// ===================================
// BACK TO TOP BUTTON
// ===================================
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// PROJECT FILTERING
// ===================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.6s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===================================
// SUPABASE CONFIGURATION
// ===================================
// For static sites, we need to hardcode the credentials
// In production, you can use Vercel's environment variables with a build step
const supabaseUrl = 'https://zmoqbbbexruzfqvrvytc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptb3FiYmJleHJ1emZxdnJ2eXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NjQxMjQsImV4cCI6MjA4NTM0MDEyNH0.IyHdoarhuD_1Ntsoz826yaV4k2YBoMHcpv5G2HXc7WA';

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);

// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalBtnText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            // Debug: Log configuration being used
            console.log('🔧 Supabase Configuration:', {
                url: supabaseUrl,
                hasKey: !!supabaseAnonKey
            });
            console.log('📤 Attempting to insert:', formData);

            // Insert data into Supabase 'ContactMe' table
            const { data, error } = await supabase
                .from('ContactMe')
                .insert([formData]);

            if (error) {
                console.error('❌ Supabase Error Details:', {
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                    code: error.code,
                    fullError: error
                });
                throw new Error(error.message || 'Failed to save data to Supabase');
            }

            console.log('✅ Form successfully submitted:', data);

            // Show success message with SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Message Sent!',
                text: 'Thank you for your message! I will get back to you soon.',
                confirmButtonColor: '#6366f1',
                confirmButtonText: 'Great!'
            });

            // Reset form
            contactForm.reset();
        } catch (error) {
            console.error('💥 Submission error:', error);
            console.error('Error stack:', error.stack);

            // Specific help for different error types
            if (error.message.includes('Failed to fetch') || error.message.includes('ERR_NAME_NOT_RESOLVED')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Connection Error',
                    html: 'Could not connect to Supabase.<br><br><strong>Possible causes:</strong><br>1. Check if the Supabase Project URL is correct<br>2. Verify your internet connection<br>3. Check browser console for details',
                    confirmButtonColor: '#6366f1'
                });
            } else if (error.message.includes('JWT') || error.message.includes('apikey')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Authentication Error',
                    text: 'Invalid API key. Please verify your Supabase anon key in the dashboard.',
                    confirmButtonColor: '#6366f1'
                });
            } else if (error.message.includes('permission') || error.message.includes('policy')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Permission Error',
                    text: 'Row Level Security is blocking the insert. Please enable public insert policy on the ContactMe table.',
                    confirmButtonColor: '#6366f1'
                });
            } else if (error.message.includes('relation') || error.message.includes('does not exist')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Table Error',
                    text: 'The "ContactMe" table does not exist. Please create it in your Supabase dashboard.',
                    confirmButtonColor: '#6366f1'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: error.message,
                    footer: 'Check the browser console for more details',
                    confirmButtonColor: '#6366f1'
                });
            }
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// ===================================
// DOWNLOAD RESUME
// ===================================
const downloadResumeBtn = document.getElementById('download-resume');

if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Use window.location to get the correct base path
        const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
        const pdfPath = baseUrl + '/assets/images/CV_Jainish_J_Patel.pdf';

        // Create a temporary link element to trigger download
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = 'Jainish_Patel_Resume.pdf';

        // Trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log('Resume download initiated from:', pdfPath);
    });
}

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
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
const animateOnScroll = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-card');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===================================
// LAZY LOADING IMAGES
// ===================================
const images = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger load
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
} else {
    // Fallback for browsers that don't support IntersectionObserver
    images.forEach(img => {
        img.src = img.src;
    });
}

// ===================================
// TYPING EFFECT FOR HERO SUBTITLE (Optional Enhancement)
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ===================================
// SKILL PROGRESS BARS (Optional Enhancement)
// ===================================
function animateSkillBars() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.transform = 'scale(1)';
            tag.style.opacity = '1';
        }, index * 50);
    });
}

// Initialize skill bars on scroll
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

if (skillsSection) {
    window.addEventListener('scroll', () => {
        if (!skillsAnimated) {
            const skillsPosition = skillsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;

            if (skillsPosition < screenPosition) {
                animateSkillBars();
                skillsAnimated = true;
            }
        }
    });
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    highlightNavigation();
}));

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c👋 Hello! Thanks for checking out my portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository!', 'color: #8b5cf6; font-size: 14px;');

// ===================================
// INITIALIZE ON LOAD
// ===================================
window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('loaded');

    // Initial navigation highlight
    highlightNavigation();

    console.log('Portfolio loaded successfully! 🚀');
});
