/* ============================================
   CSIT.services — Modern Vanilla JS
   ============================================ */

(function () {
  'use strict';

  // ---- Header scroll effect ----
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Mobile nav toggle ----
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');
  let lastFocusedElement = null;
  let isMobileNavOpen = false;

  function setMobileNavState(isOpen) {
    if (!mobileNav) return;

    isMobileNavOpen = isOpen;

    mobileNav.classList.toggle('open', isOpen);
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
    if (isOpen) {
      mobileNav.removeAttribute('hidden');
    } else {
      mobileNav.setAttribute('hidden', '');
    }

    if (menuToggle) menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen) {
      lastFocusedElement = document.activeElement;
      const focusTarget = mobileClose || mobileNav.querySelector('a');
      if (focusTarget) {
        window.requestAnimationFrame(function () {
          focusTarget.focus();
        });
      }
    } else if (lastFocusedElement && lastFocusedElement.focus) {
      lastFocusedElement.focus();
    }
  }

  function openMobileNav() {
    setMobileNavState(true);
  }
  function closeMobileNav() {
    setMobileNavState(false);
  }

  if (menuToggle) menuToggle.addEventListener('click', openMobileNav);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMobileNav();
      return;
    }

    if (!isMobileNavOpen || e.key !== 'Tab' || !mobileNav) return;

    const focusable = mobileNav.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = header ? header.offsetHeight + 16 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // ---- Scroll-reveal (Intersection Observer) ----
  const reveals = document.querySelectorAll('.reveal, .reveal-children');
  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    // fallback: show all
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // ---- Remove preload class after load ----
  window.addEventListener('load', function () {
    document.body.classList.remove('is-preload');
  });
})();
