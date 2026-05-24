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

    // Analytics event tracking
    function trackEvent(gaAction, gaCategory, gaLabel, fbEvent, fbParams) {
        if (typeof gtag === 'function') {
            gtag('event', gaAction, { event_category: gaCategory, event_label: gaLabel });
        }
        if (typeof fbq === 'function' && fbEvent) {
            fbq('track', fbEvent, fbParams || {});
        }
    }

    // Phone click
    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
        link.addEventListener('click', function () {
            trackEvent('phone_call', 'contact', '262-345-SKID', 'Contact');
        });
    });

    // Email click
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
        link.addEventListener('click', function () {
            trackEvent('email_click', 'contact', link.getAttribute('href').replace('mailto:', ''), 'Contact');
        });
    });

    // "Get a Free Quote" CTA buttons
    document.querySelectorAll('.btn-primary[href="#contact"]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            trackEvent('cta_click', 'engagement', 'get_free_quote', 'Lead');
        });
    });

    // Quote form submission
    var contactForm = document.querySelector('#contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            var serviceEl = contactForm.querySelector('[name="service"]');
            var service = serviceEl ? (serviceEl.value || 'not_selected') : 'not_selected';
            trackEvent('form_submit', 'lead', service, 'Lead', {
                content_name: 'Quote Request',
                content_category: service
            });
        });
    }
});
