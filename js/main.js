/**
 * Portfolio Tech - Script Principal
 * Animations, navigation, effets interactifs
 */

(function() {
  'use strict';

  // ==========================================================================
  // Configuration
  // ==========================================================================

  const CONFIG = {
    scrollThreshold: 50,
    animationDelay: 80,
    observerThreshold: 0.1,
    spotlightSize: 600
  };

  // ==========================================================================
  // DOM Elements
  // ==========================================================================

  const elements = {
    header: document.getElementById('header'),
    nav: document.getElementById('nav'),
    menuBtn: document.getElementById('menu-btn'),
    spotlight: document.getElementById('spotlight')
  };

  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================

  function initHeaderScroll() {
    if (!elements.header) return;

    function onScroll() {
      if (window.scrollY > CONFIG.scrollThreshold) {
        elements.header.classList.add('header--scrolled');
      } else {
        elements.header.classList.remove('header--scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ==========================================================================
  // Mobile Menu
  // ==========================================================================

  function initMobileMenu() {
    if (!elements.menuBtn || !elements.nav) return;

    function toggleMenu() {
      const isOpen = elements.nav.classList.toggle('header__nav--open');
      elements.menuBtn.classList.toggle('header__menu-btn--open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    elements.menuBtn.addEventListener('click', toggleMenu);

    // Close on link click
    elements.nav.querySelectorAll('.header__link').forEach(link => {
      link.addEventListener('click', () => {
        if (elements.nav.classList.contains('header__nav--open')) {
          toggleMenu();
        }
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.nav.classList.contains('header__nav--open')) {
        toggleMenu();
      }
    });
  }

  // ==========================================================================
  // Scroll Animations (Intersection Observer)
  // ==========================================================================

  function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const staggerElements = document.querySelectorAll('.stagger-item');

    if (!fadeElements.length && !staggerElements.length) return;

    // Observer for fade-in elements
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in--visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: CONFIG.observerThreshold,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // Observer for stagger elements (cards, grid items)
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add visible class with staggered delay
          setTimeout(() => {
            entry.target.classList.add('stagger-item--visible');
          }, index * CONFIG.animationDelay);
          staggerObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: CONFIG.observerThreshold,
      rootMargin: '0px 0px -30px 0px'
    });

    staggerElements.forEach(el => staggerObserver.observe(el));
  }

  // ==========================================================================
  // Spotlight Effect (follows mouse)
  // ==========================================================================

  function initSpotlight() {
    if (!elements.spotlight) return;

    let mouseX = 0;
    let mouseY = 0;
    let spotX = 0;
    let spotY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateSpotlight() {
      // Smooth lerp
      spotX += (mouseX - spotX) * 0.1;
      spotY += (mouseY - spotY) * 0.1;

      elements.spotlight.style.left = spotX + 'px';
      elements.spotlight.style.top = spotY + 'px';

      requestAnimationFrame(animateSpotlight);
    }

    // Only on desktop
    if (window.matchMedia('(min-width: 768px)').matches) {
      animateSpotlight();
    }
  }

  // ==========================================================================
  // Smooth Scroll
  // ==========================================================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 100;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ==========================================================================
  // Magnetic Buttons (subtle effect)
  // ==========================================================================

  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn--primary, .social-link');

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ==========================================================================
  // Card Tilt Effect (subtle 3D)
  // ==========================================================================

  function initCardTilt() {
    const cards = document.querySelectorAll('.card, .bento-item');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ==========================================================================
  // Text Reveal Animation
  // ==========================================================================

  function initTextReveal() {
    const reveals = document.querySelectorAll('.text-reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('text-reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    reveals.forEach(el => observer.observe(el));
  }

  // ==========================================================================
  // Copy Email to Clipboard
  // ==========================================================================

  function initEmailCopy() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    emailLinks.forEach(link => {
      link.addEventListener('click', async (e) => {
        // Allow default mailto behavior, but also copy to clipboard
        const email = link.href.replace('mailto:', '');

        try {
          await navigator.clipboard.writeText(email);
          // Optional: show a toast notification
          showToast('Email copié !');
        } catch (err) {
          // Silently fail if clipboard API not available
        }
      });
    });
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-bg-elevated);
      color: var(--color-text);
      padding: 12px 24px;
      border-radius: 8px;
      border: 1px solid var(--color-border);
      font-size: 14px;
      z-index: 10000;
      animation: fadeInUp 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // ==========================================================================
  // Lazy Loading Images
  // ==========================================================================

  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('loading' in HTMLImageElement.prototype) {
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    } else {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  // ==========================================================================
  // Add Dynamic Styles
  // ==========================================================================

  function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }

      @keyframes fadeOut {
        to {
          opacity: 0;
          transform: translateX(-50%) translateY(-10px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================================================
  // Initialization
  // ==========================================================================

  function init() {
    addDynamicStyles();
    initHeaderScroll();
    initMobileMenu();
    initScrollAnimations();
    initSpotlight();
    initSmoothScroll();
    initMagneticButtons();
    initCardTilt();
    initTextReveal();
    initEmailCopy();
    initLazyLoading();

    // Add loaded class for page transitions
    document.body.classList.add('loaded');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
