/**
 * MGPS PPF Premium — JavaScript
 * FAQ Accordion + Smooth Scroll + Form Handler
 * v2.0
 */

(function () {
    'use strict';

    /* ========================================
       FAQ Accordion
       ======================================== */
    function initFAQ() {
        var items = document.querySelectorAll('.mgps-faq-item');
        if (!items.length) return;

        items.forEach(function (item) {
            var btn = item.querySelector('.mgps-faq-question');
            if (!btn) return;

            btn.addEventListener('click', function () {
                var isOpen = item.classList.contains('mgps-faq-item--open');

                // Diğer açık olanları kapat
                items.forEach(function (other) {
                    if (other !== item) {
                        other.classList.remove('mgps-faq-item--open');
                        var otherBtn = other.querySelector('.mgps-faq-question');
                        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    }
                });

                // Tıklananı aç/kapat
                if (isOpen) {
                    item.classList.remove('mgps-faq-item--open');
                    btn.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('mgps-faq-item--open');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    /* ========================================
       Smooth Scroll (TEKLİF AL butonları)
       ======================================== */
    function initSmoothScroll() {
        document.addEventListener('click', function (e) {
            var link = e.target.closest('a[href^="#"]');
            if (!link) return;

            var targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;

            var target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    /* ========================================
       Form Handler (basit frontend validasyon)
       ======================================== */
    function initForm() {
        var form = document.getElementById('mgps-ppf-form');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basit validasyon
            var name = form.querySelector('#mgps-name');
            var email = form.querySelector('#mgps-email');
            var phone = form.querySelector('#mgps-phone');

            if (!name.value.trim() || !email.value.trim() || !phone.value.trim()) {
                // Boş alanları vurgula
                [name, email, phone].forEach(function (input) {
                    if (!input.value.trim()) {
                        input.style.borderColor = '#DC3545';
                        input.addEventListener('input', function handler() {
                            input.style.borderColor = '';
                            input.removeEventListener('input', handler);
                        });
                    }
                });
                return;
            }

            // Email format kontrolü
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                email.style.borderColor = '#DC3545';
                email.addEventListener('input', function handler() {
                    email.style.borderColor = '';
                    email.removeEventListener('input', handler);
                });
                return;
            }

            // Başarı mesajı göster
            var success = document.getElementById('mgps-form-success');
            if (success) {
                success.style.display = 'flex';
            }

            // Formu sıfırla
            form.reset();

            // 5 saniye sonra başarı mesajını gizle
            setTimeout(function () {
                if (success) {
                    success.style.display = 'none';
                }
            }, 5000);
        });
    }

    /* ========================================
       Init
       ======================================== */
    function init() {
        initFAQ();
        initSmoothScroll();
        initForm();
    }

    // DOM hazır olduğunda başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
