document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const menu = document.getElementById('site-nav');
  const closeMenu = ({ focus = false } = {}) => {
    header?.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.querySelector('b')?.replaceChildren('Menu');
    if (focus) menuButton?.focus();
  };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    header?.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('b')?.replaceChildren(open ? 'Close' : 'Menu');
  });
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header?.classList.contains('menu-open')) closeMenu({ focus: true });
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 1000) closeMenu(); });

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
  if ('IntersectionObserver' in window && !motion.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('reveal'); observer.unobserve(entry.target); }
    }), { threshold: 0.15 });
    document.querySelectorAll('.section-intro, .home-project, .service-row, .work-row').forEach(node => observer.observe(node));
  }
  document.addEventListener('click', event => {
    if (!header?.contains(event.target)) closeMenu();
  });
  header?.addEventListener('focusout', () => {
    requestAnimationFrame(() => { if (!header.contains(document.activeElement)) closeMenu(); });
  });

});
