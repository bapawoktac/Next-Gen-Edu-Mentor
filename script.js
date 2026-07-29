/* ============================
   NAVBAR SCROLL EFFECT
   ============================ */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ============================
   MOBILE MENU TOGGLE
   ============================ */
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

/* ============================
   FAQ ACCORDION
   ============================ */
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

/* ============================
   SMOOTH SCROLL FOR INTERNAL LINKS
   ============================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ============================
   SCROLL REVEAL ANIMATIONS
   ============================ */
const revealElements = document.querySelectorAll(
    '.service-card, .feature-card, .testimonial-card, .faq-item, .about-card, .about-vision, .mentor-card, .cta-content'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 120;
        if (elementTop < windowHeight - revealPoint) {
            setTimeout(() => {
                element.classList.add('visible');
            }, index % 6 * 80);
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
revealOnScroll();

/* ============================
   STATS COUNTER ANIMATION (HERO)
   ============================ */
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const targetText = counter.innerText;
        const hasPlus = targetText.includes('+');
        const hasPercent = targetText.includes('%');
        const target = parseInt(targetText);
        if (isNaN(target)) return;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current) + (hasPercent ? '%' : hasPlus ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + (hasPercent ? '%' : hasPlus ? '+' : '');
            }
        };
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && !counter.dataset.animated) {
            counter.dataset.animated = 'true';
            updateCounter();
        }
    });
};

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

/* ============================
   SERVICE ICON HOVER ENHANCEMENT
   ============================ */
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(-5deg)';
        }
    });
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0)';
        }
    });
});

/* ============================
   BUTTON RIPPLE EFFECT
   ============================ */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${e.clientX - rect.left - size / 2}px;
            top: ${e.clientY - rect.top - size / 2}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
