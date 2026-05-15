const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    const expanded = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', expanded.toString());
});

window.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// Close menu with Escape and support keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.focus();
        }
    }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        event.preventDefault();
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        window.scrollTo({ top: target.offsetTop - 84, behavior: 'smooth' });
    });
});

const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset + 120;
    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (!link) return;
        if (scrollPosition >= top && scrollPosition < top + height) {
            navItems.forEach((item) => item.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const values = Object.fromEntries(formData);
        if (!values.name || !values.email || !values.subject || !values.message) {
            showMessage('Please complete every field before sending.', false);
            return;
        }
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        setTimeout(() => {
            showMessage('Message sent successfully. I will reply soon.', true);
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1300);
    });
}

function showMessage(text, success = true) {
    const message = document.createElement('div');
    message.className = `toast ${success ? 'toast-success' : 'toast-error'}`;
    message.textContent = text;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 4200);
}

// Add focus-visible class for keyboard outlines
function handleFirstTab(e) {
    if (e.key === 'Tab') {
        document.documentElement.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}
window.addEventListener('keydown', handleFirstTab);
