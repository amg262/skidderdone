document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.querySelector('.main-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            nav.classList.toggle('open');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
        });

        // Close nav when a link is clicked
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Header scroll effect
    var header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.style.borderBottomColor = 'rgba(232, 122, 30, 0.3)';
            } else {
                header.style.borderBottomColor = '';
            }
        });
    }

    // Dynamic copyright year
    var yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Form success message (Formspree redirects back with ?status=sent in hash)
    if (window.location.hash && window.location.hash.includes('status=sent')) {
        var form = document.querySelector('.contact-form');
        if (form) {
            var msg = document.createElement('div');
            msg.className = 'form-success';
            msg.textContent = 'Thanks! We received your quote request and will get back to you within 24 hours.';
            form.insertBefore(msg, form.firstChild);
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Clean the URL hash
            if (history.replaceState) {
                history.replaceState(null, '', window.location.pathname + '#contact');
            }
        }
    }
});
