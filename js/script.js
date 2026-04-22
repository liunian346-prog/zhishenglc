document.addEventListener('DOMContentLoaded', () => {
    // 1. Page Loader / Loading State
    const loader = document.getElementById('page-loader');
    if (!loader) {
        const newLoader = document.createElement('div');
        newLoader.id = 'page-loader';
        newLoader.setAttribute('aria-hidden', 'true');
        newLoader.innerHTML = '<div class="spinner" role="status"><span class="sr-only">Loading...</span></div>';
        document.body.appendChild(newLoader);
    }

    window.addEventListener('load', () => {
        const activeLoader = document.getElementById('page-loader');
        if (activeLoader) {
            setTimeout(() => {
                activeLoader.style.opacity = '0';
                setTimeout(() => activeLoader.remove(), 500);
            }, 300);
        }
    });

    // 2. Header shadow on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // 3. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
            document.body.style.overflow = isExpanded ? 'hidden' : '';
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // 4. Staggered Reveal Animations (Intersection Observer)
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const revealsInParent = Array.from(parent.querySelectorAll('.reveal'));
                const index = revealsInParent.indexOf(entry.target);

                if (index !== -1 && revealsInParent.length > 1) {
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }

                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Interactive Card Expansion (Accordion-style)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.querySelector('.card-expandable')) {
            card.addEventListener('click', (e) => {
                // Prevent toggle if clicking a link/button inside
                if (e.target.closest('a') || e.target.closest('button')) return;

                const isExpanded = card.classList.toggle('expanded');
                card.setAttribute('aria-expanded', isExpanded);

                // If on mobile, scroll the card into view when expanded
                if (isExpanded && window.innerWidth < 768) {
                    setTimeout(() => {
                        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 400);
                }
            });
        }
    });

    // 6. Contact Form Simulation with Feedback
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;

            // Simulate API request
            setTimeout(() => {
                window.showToast('Inquiry sent successfully! Our team will contact you within 24 hours.', 'success');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1800);
        });
    }

    // 7. Global Feedback System (Toast)
    window.showToast = (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.setAttribute('role', 'alert');
        toast.innerText = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('visible'), 10);
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    };

    // 8. Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
