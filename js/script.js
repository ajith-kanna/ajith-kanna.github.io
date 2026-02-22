/**
 * ============================================================
 * PORTFOLIO ENHANCEMENTS — Vanilla JS Module
 * ============================================================
 * Architecture note for Angular/React extraction:
 *
 * Each feature is encapsulated in its own init function with
 * a clear dependency signature. To port to React:
 *   - initScrollReveal  → useScrollReveal() custom hook (useEffect + IntersectionObserver)
 *   - initCounters      → useCountUp() custom hook with IntersectionObserver
 *   - initHeroReveal    → useHeroReveal() hook or component-level useEffect
 *   - initProgressBar   → useReadingProgress() hook → CSS variable → inline style on div
 *   - initThemeToggle   → useTheme() hook with localStorage persistence
 *
 * For Angular: each init function maps cleanly to an @Injectable service
 * or a directive (e.g., CountUpDirective, ThemeService).
 * ============================================================
 */

'use strict';

/* ─────────────────────────────────────────────
   FEATURE 1: DYNAMIC IMPACT STAT COUNTERS
   ─────────────────────────────────────────────
   Reads data-count-target, data-count-prefix, data-count-suffix
   from any element. Animates from 0 → target using requestAnimationFrame
   with an ease-out curve. Fires once per element via IntersectionObserver.

   React extraction: wrap in a useCountUp(target, suffix, prefix, duration) hook.
   The hook returns { displayValue } and internally manages the rAF loop.
   Angular extraction: CountUpDirective with @Input() target, suffix, prefix.
*/
function initCounters() {
  const DURATION_MS = 1200; // animation duration in milliseconds

  /**
   * Easing function: ease-out cubic — fast start, gradual deceleration.
   * Gives the counter a natural "landing" feel.
   * @param {number} t - progress from 0.0 to 1.0
   * @returns {number} - eased progress
   */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /**
   * Animate a single counter element.
   * @param {HTMLElement} el - element with data-count-* attributes
   */
  function animateCounter(el) {
    const target  = parseFloat(el.dataset.countTarget) || 0;
    const prefix  = el.dataset.countPrefix  || '';
    const suffix  = el.dataset.countSuffix  || '';
    // Use integer steps unless the target itself is fractional
    const isFloat = target % 1 !== 0;

    let startTime = null;

    function tick(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / DURATION_MS, 1); // clamp 0–1
      const eased    = easeOutCubic(progress);
      const current  = target * eased;

      // Format: integers as whole numbers, floats to 1 decimal place
      el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Ensure final value is exact (avoids floating-point drift)
        el.textContent = prefix + (isFloat ? target.toFixed(1) : target) + suffix;
      }
    }

    requestAnimationFrame(tick);
  }

  // Observe every element that has a data-count-target attribute
  const counterEls = document.querySelectorAll('[data-count-target]');
  if (!counterEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        // Fire only once per element
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5, // element must be 50% visible before counting starts
  });

  counterEls.forEach((el) => observer.observe(el));
}


/* ─────────────────────────────────────────────
   FEATURE 2: STAGGERED HERO HEADING REVEAL
   ─────────────────────────────────────────────
   Adds .revealed to #hero-heading after a short page-load delay.
   CSS transitions on .hero-line-inner handle the actual animation.
   The overflow:hidden on .hero-line creates the "rising from below" mask.

   React extraction: in a Hero component, use useEffect(() => {
     const t = setTimeout(() => setRevealed(true), 120);
     return () => clearTimeout(t);
   }, []); Then toggle a 'revealed' className on the h1.
*/
function initHeroReveal() {
  const heading = document.getElementById('hero-heading');
  if (!heading) return;

  // Short delay ensures browser has painted the page first.
  // 120ms is imperceptible to users but prevents the animation
  // from firing before the viewport has fully rendered.
  setTimeout(() => {
    heading.classList.add('revealed');
  }, 120);
}


/* ─────────────────────────────────────────────
   FEATURE 5: READING PROGRESS BAR
   ─────────────────────────────────────────────
   Sets --scroll-pct on <html> as a number 0–100.
   The #progress-bar element's width is driven by that CSS variable.
   Using a CSS variable (not direct style) means no forced reflow —
   the browser can batch the paint.

   React extraction: useReadingProgress() hook returns scrollPct (0–100).
   Apply as style={{ '--scroll-pct': scrollPct }} on a wrapper div,
   or directly as width on the progress bar element.
*/
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  let ticking = false; // rAF throttle flag

  function updateProgress() {
    const scrollTop    = window.scrollY || document.documentElement.scrollTop;
    const docHeight    = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollable   = docHeight - windowHeight;

    // Guard against divide-by-zero on short pages
    const pct = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;

    // Write to CSS custom property on :root — avoids direct DOM style mutation on the bar
    document.documentElement.style.setProperty('--scroll-pct', pct.toFixed(2));
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    // requestAnimationFrame throttle — runs at most once per frame (~60fps)
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true }); // passive: true tells browser this won't call preventDefault → better scroll perf
}


/* ─────────────────────────────────────────────
   FEATURE 6: SYSTEM-AWARE DARK MODE TOGGLE
   ─────────────────────────────────────────────
   Priority order (highest → lowest):
     1. User's manual choice (localStorage 'theme')
     2. OS-level prefers-color-scheme
     3. Light (default)

   The theme is applied by setting data-theme on <html>.
   CSS variables keyed to [data-theme="dark"] handle the visual swap.
   CSS also has a @media (prefers-color-scheme: dark) block for
   the zero-JS / initial-render case, preventing flash of wrong theme.

   React extraction: useTheme() hook exposing { theme, toggleTheme }.
   Reads/writes localStorage, syncs with matchMedia, returns theme string.
   Apply data-theme to document.documentElement in a useEffect.
*/
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const root   = document.documentElement;
  if (!toggle) return;

  // Icons: using simple Unicode glyphs — no external dependency
  const ICONS = { light: '☽', dark: '○' };
  const LABELS = {
    light: 'Switch to dark mode',
    dark:  'Switch to light mode',
  };

  /**
   * Determine the initial theme.
   * Checks localStorage first, then OS preference.
   * @returns {'light'|'dark'}
   */
  function getInitialTheme() {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    // Fall back to OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Apply a theme: update the data-theme attribute and toggle button UI.
   * @param {'light'|'dark'} theme
   */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    toggle.textContent   = ICONS[theme];
    toggle.setAttribute('aria-label', LABELS[theme]);
    localStorage.setItem('theme', theme);
  }

  // Init on page load
  applyTheme(getInitialTheme());

  // Manual toggle
  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Also respond if the user changes their OS preference while on the page
  // but ONLY if they haven't made a manual choice this session
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // If user has stored a manual preference, respect it — don't override
    const stored = localStorage.getItem('theme');
    if (!stored) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}


/* ─────────────────────────────────────────────
   EXISTING: SCROLL REVEAL
   ─────────────────────────────────────────────
   Unchanged logic, kept modular for clarity.
   React extraction: useScrollReveal() hook or a ScrollReveal wrapper component
   that attaches an IntersectionObserver to a ref.
*/
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target); // fire once
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  revealEls.forEach((el) => observer.observe(el));
}


/* ─────────────────────────────────────────────
   BOOT — run all modules after DOM is ready
   ─────────────────────────────────────────────
   DOMContentLoaded ensures all elements exist before we query them.
   Each init is independent — failure in one won't block others.
*/
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();   // Theme first — prevents flash of wrong theme on toggle
  initProgressBar();   // Attach scroll listener early
  initScrollReveal();  // Attach intersection observers
  initCounters();      // Attach counter observers
  initHeroReveal();    // Trigger hero heading animation
});