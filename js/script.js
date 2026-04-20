document.addEventListener('DOMContentLoaded', () => {
    // Basic mobile menu toggle logic
    const navLinks = document.querySelector('.nav-links');
    // For Shopify style, we could add a simple scroll effect to the header
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
