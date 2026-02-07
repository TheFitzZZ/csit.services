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

  function openMobileNav() {
    if (mobileNav) {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }
  function closeMobileNav() {
    if (mobileNav) {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (menuToggle) menuToggle.addEventListener('click', openMobileNav);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
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
