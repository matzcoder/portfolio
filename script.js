/* =====================================================
   P R Matthew Portfolio - Main Script
   ===================================================== */

/* ---------- Preloader ---------- */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) { pre.classList.add('hidden'); setTimeout(() => pre.remove(), 600); }
});

/* ---------- Theme Toggle ---------- */
const THEME_KEY = 'portfolio-theme';
function applyTheme(t) {
  document.body.classList.toggle('light-mode', t === 'light');
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.innerHTML = t === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    btn.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  });
}
document.querySelectorAll('.theme-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const next = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
});
applyTheme(localStorage.getItem(THEME_KEY) || 'dark');

/* ---------- Navbar Scroll ---------- */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
  const btt = document.querySelector('.back-to-top');
  if (btt) btt.classList.toggle('visible', window.scrollY > 400);
});

/* ---------- Mobile Menu ---------- */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open'); mobileMenu.classList.remove('open');
  }));
}

/* ---------- Active Nav Link ---------- */
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });
})();

/* ---------- Back to Top ---------- */
const btt = document.querySelector('.back-to-top');
if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Typing Animation ---------- */
function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const words = [
    'Software Engineer',
    'Web Developer',
    'Digital Marketer',
    'Cybersecurity Enthusiast',
    'Problem Solver'
  ];
  let wi = 0, ci = 0, deleting = false;
  function tick() {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    if (!deleting && ci > word.length)       { deleting = true; setTimeout(tick, 1400); return; }
    if (deleting && ci < 0)                  { deleting = false; wi = (wi + 1) % words.length; ci = 0; setTimeout(tick, 400); return; }
    setTimeout(tick, deleting ? 55 : 100);
  }
  tick();
}
initTyping();

/* ---------- Animated Counters ---------- */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.getAttribute('data-count');
    const suffix = el.getAttribute('data-suffix') || '';
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    function update() {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start) + suffix;
      if (start < target) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

/* ---------- AOS (scroll reveal) ---------- */
function initAOS() {
  const items = document.querySelectorAll('[data-aos]');
  const delays = { '0': 0, '100': 100, '200': 200, '300': 300, '400': 400 };
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => e.target.classList.add('aos-animate'), +delay);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(i => { i.style.transitionDuration = (i.getAttribute('data-aos-duration') || '700') + 'ms'; obs.observe(i); });
}

/* ---------- Skill Bars ---------- */
function initSkillBars() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.getAttribute('data-width') + '%';
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skill-category, .resume-block').forEach(el => obs.observe(el));
}

/* ---------- Counter observer ---------- */
function initCounters() {
  const statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
  }, { threshold: 0.4 });
  obs.observe(statsSection);
}

/* ---------- Cert Filter ---------- */
function initCertFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.cert-card');
  if (!buttons.length) return;
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      const success = document.querySelector('.form-success');
      if (success) { success.style.display = 'block'; setTimeout(() => success.style.display = 'none', 4000); }
    }, 1600);
  });
}

/* ---------- Floating particles (hero) ---------- */
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 60 + 20;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%; top:${Math.random() * 100}%;
      animation-duration:${Math.random() * 8 + 6}s;
      animation-delay:${Math.random() * -12}s;
    `;
    container.appendChild(p);
  }
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initSkillBars();
  initCounters();
  initCertFilter();
  initContactForm();
  initParticles();
});
