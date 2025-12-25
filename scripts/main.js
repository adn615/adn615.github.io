// Flag JS-enabled for CSS animations
document.body.classList.add('has-js');

// Typewriter effect for hero description
const typeTargets = document.querySelectorAll('.type-target');
typeTargets.forEach(target => {
    const fullText = target.getAttribute('data-text') || target.textContent;
    target.textContent = '';
    let index = 0;
    const speed = 30;
    target.classList.add('typewriter-active');

    const type = () => {
        if (index <= fullText.length) {
            target.textContent = fullText.slice(0, index);
            index += 1;
            setTimeout(type, speed);
        } else {
            target.classList.remove('typewriter-active');
        }
    };

    type();
});

// Theme toggle handling
const themeToggle = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');
const applyTheme = (mode) => {
    if (mode === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
};

applyTheme(storedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    const nextTheme = isDark ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
});

// Mobile menu functionality
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Portfolio gallery modal functionality
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalVideo = document.getElementById('modal-video');
const modalCaption = document.getElementById('modal-caption');
const closeModal = document.querySelector('.close-modal');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Function to open image modal
function openImageModal(imgSrc, title) {
    modalImg.style.display = 'block';
    modalVideo.style.display = 'none';
    modalImg.src = imgSrc;
    modalCaption.innerHTML = `<h3>${title}</h3>`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Function to open video modal
function openVideoModal(title) {
    modalImg.style.display = 'none';
    modalVideo.style.display = 'block';
    modalVideo.src = 'https://www.youtube.com/embed/VKv25uQeZPo';
    modalCaption.innerHTML = `<h3>${title}</h3>`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Function to close modal
function closeModalFunc() {
    modal.style.display = 'none';
    modalImg.src = '';
    modalVideo.src = '';
    document.body.style.overflow = 'auto';
}

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('img').alt;

        if (title === 'CASA COLORI Villa') {
            openVideoModal(title);
        } else {
            openImageModal(imgSrc, title);
        }
    });
});

// Watch video button functionality
const watchVideoBtn = document.querySelector('.watch-video-btn');
if (watchVideoBtn) {
    watchVideoBtn.addEventListener('click', () => {
        openVideoModal('CASA COLORI Villa');
    });
}

// Close modal functionality
closeModal.addEventListener('click', closeModalFunc);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalFunc();
    }
});

// Contact form handling (prevent default for now)
const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! This is a demo form - in a real implementation, this would send the data to a server.');
    contactForm.reset();
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe sections for animation
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Image loading animation
const portfolioImages = document.querySelectorAll('.portfolio-item img');
portfolioImages.forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });

    // If image is already cached/loaded
    if (img.complete) {
        img.classList.add('loaded');
    }
});

// Header background change on scroll
const header = document.querySelector('.header');
const backToTopBtn = document.querySelector('.back-to-top');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down - hide header slightly
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up - show header
        header.style.transform = 'translateY(0)';
        // Add shadow on scroll
        if (scrollTop > 0) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }

    if (backToTopBtn) {
        if (scrollTop > 260) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

window.dispatchEvent(new Event('scroll'));

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
