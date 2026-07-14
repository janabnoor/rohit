/* ==========================================================================
   Rohit Kumar - Portfolio Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    
    const updateScrollProgress = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        scrollProgress.style.width = `${scrollPercentage}%`;
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    // 2. Navigation Styling & Menu Toggle
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Nav on Scroll
    const checkHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', checkHeaderScroll);
    checkHeaderScroll();

    // Mobile Menu Toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
        });
    }

    // Close Mobile Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle && navMenu) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // 3. Active Link Highlighting on Scroll (Intersection Observer)
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Highlights as section occupies center screen
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 4. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animates once
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Skill Bar Progressive Load Animation
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    const skillObserverOptions = {
        root: null,
        threshold: 0.2
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progressValue = bar.getAttribute('data-progress');
                bar.style.width = progressValue;
                observer.unobserve(bar);
            }
        });
    }, skillObserverOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // 6. Premium Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('btn-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>Sending...</span> <svg class="send-icon spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
            
            formFeedback.className = 'form-feedback';
            formFeedback.textContent = '';

            // Simulate server request delay
            setTimeout(() => {
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                
                if (name && email) {
                    formFeedback.classList.add('success');
                    formFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully. Rohit will reach out shortly.`;
                    contactForm.reset();
                } else {
                    formFeedback.classList.add('error');
                    formFeedback.textContent = 'Oops! Please make sure all required fields are filled correctly.';
                }
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 1800);
        });
    }
});
