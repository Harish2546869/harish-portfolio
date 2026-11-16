document.documentElement.classList.remove('no-js');
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  });
  menu.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
  });
}

const filters = document.querySelectorAll('.archive-filter');
const groups = document.querySelectorAll('.archive-group');
const prFilters = document.querySelectorAll('.pr-asset-filter');
const prFilterBar = document.querySelector('.pr-asset-filters');
let activePrType = 'all';
function applyPrType() {
  groups.forEach(group => {
    if (group.dataset.category !== 'pr-waale' || group.classList.contains('is-hidden')) return;
    const cards = [...group.querySelectorAll('.archive-item')];
    cards.forEach(card => {
      const path = card.getAttribute('href') || '';
      const isHoarding = /hoard|hording|poster|standee|51x48|10ft|20ft|3x6ft/i.test(path);
      const isOther = /website-ui|brand-identification/i.test(path);
      const type = isHoarding ? 'hoardings' : isOther ? 'other' : 'social';
      card.classList.toggle('is-hidden', activePrType !== 'all' && type !== activePrType);
    });
    const visibleCount = cards.filter(card => !card.classList.contains('is-hidden')).length;
    group.classList.toggle('is-empty-by-type', activePrType !== 'all' && visibleCount === 0);
    const count = group.querySelector('.archive-count');
    if (count) count.textContent = `${visibleCount} visuals`;
  });
}
filters.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  if (prFilterBar) prFilterBar.classList.toggle('is-visible', selected === 'pr-waale');
  activePrType = 'all';
  prFilters.forEach(item => item.setAttribute('aria-pressed', String(item.dataset.prType === 'all')));
  groups.forEach(group => {
    group.classList.toggle('is-hidden', selected !== 'all' && group.dataset.category !== selected);
    group.classList.remove('is-empty-by-type');
    group.querySelectorAll('.archive-item').forEach(card => card.classList.remove('is-hidden'));
    const count = group.querySelector('.archive-count');
    if (count) count.textContent = `${group.querySelectorAll('.archive-item').length} visuals`;
  });
  if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const visible = [...groups].filter(group => !group.classList.contains('is-hidden'));
    gsap.fromTo(visible, { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .35, stagger: .035, ease: 'power2.out', clearProps: 'transform,opacity,visibility' });
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
}));
prFilters.forEach(button => button.addEventListener('click', () => {
  activePrType = button.dataset.prType;
  prFilters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  applyPrType();
  if (window.ScrollTrigger) ScrollTrigger.refresh();
}));

const reveals = document.querySelectorAll('.reveal');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (window.gsap && window.ScrollTrigger && !reduced) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(reveals, { autoAlpha: 0, y: 22 });
  ScrollTrigger.batch(reveals, {
    start: 'top 88%', once: true,
    onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, duration: .6, stagger: .075, ease: 'power2.out', overwrite: true })
  });
  const hero = document.querySelector('.hero .eyebrow');
  if (hero) gsap.fromTo(hero, { x: -14, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .55, delay: .12, ease: 'power2.out' });
} else if ('IntersectionObserver' in window && !reduced) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .1 });
  reveals.forEach(item => observer.observe(item));
} else reveals.forEach(item => item.classList.add('visible'));

if (window.gsap && !reduced) {
  // Give case-study openings a calm, editorial entrance.
  const caseIntro = document.querySelector('.case-hero');
  if (caseIntro) {
    const introItems = caseIntro.querySelectorAll('.eyebrow, .case-title, .case-deck, .case-data > *');
    gsap.fromTo(introItems, { y: 18, autoAlpha: 0, filter: 'blur(5px)' }, {
      y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: .7,
      stagger: .085, delay: .08, ease: 'power3.out', clearProps: 'filter'
    });
  }

  // A soft pointer glow makes the work grid feel tactile without shifting its layout.
  const glowCards = document.querySelectorAll('.work-card, .archive-item, .contact-card');
  const desktopPointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (desktopPointer) glowCards.forEach(card => {
    card.addEventListener('pointermove', event => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
      card.classList.add('pointer-active');
    });
    card.addEventListener('pointerleave', () => card.classList.remove('pointer-active'));
  });

  const heroImage = document.querySelector('.hero-image img');
  const hero = document.querySelector('.hero');
  if (heroImage && hero) {
    gsap.fromTo(heroImage, { scale: 1.045 }, {
      scale: 1,
      duration: 1.35,
      delay: .12,
      ease: 'power3.out'
    });
    if (window.ScrollTrigger) {
      gsap.to(heroImage, {
        yPercent: -3,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .8 }
      });
    }
  }

  const cards = document.querySelectorAll('.work-card');
  const desktopPointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (desktopPointer) cards.forEach(card => {
    const rotateX = gsap.quickTo(card, 'rotationX', { duration: .35, ease: 'power2.out' });
    const rotateY = gsap.quickTo(card, 'rotationY', { duration: .35, ease: 'power2.out' });
    card.addEventListener('pointermove', event => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      rotateX(y * -3);
      rotateY(x * 3);
    });
    card.addEventListener('pointerleave', () => {
      rotateX(0);
      rotateY(0);
    });
  });
}
