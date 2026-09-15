document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const backToTop = document.querySelector('.back-to-top');
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  const closeMenu = () => {
    if (!navToggle || !header) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
    header.classList.remove('is-open');
  };

  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    header?.classList.toggle('is-open', open);
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header?.classList.contains('is-open')) {
      closeMenu();
      navToggle?.focus();
    }
  });

  const updateTopButton = () => backToTop?.classList.toggle('is-visible', window.scrollY > 600);
  updateTopButton();
  window.addEventListener('scroll', updateTopButton, { passive: true });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  const caseCards = [...document.querySelectorAll('.case-card')];
  const filterStatus = document.getElementById('filterStatus');
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all';
    let visible = 0;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    caseCards.forEach((card) => {
      const matches = filter === 'all' || (card.dataset.category || '').split(' ').includes(filter);
      card.hidden = !matches;
      if (!matches) card.open = false;
      if (matches) visible += 1;
    });
    if (filterStatus) filterStatus.textContent = filter === 'all' ? `Showing all ${visible} projects.` : `Showing ${visible} ${button.textContent} ${visible === 1 ? 'project' : 'projects'}.`;
  }));

  const form = document.getElementById('contactForm');
  if (!form) return;
  const submitButton = document.getElementById('submitButton');
  const status = document.getElementById('formStatus');
  const fields = [...form.querySelectorAll('input[required], select[required], textarea[required]')];
  const messages = {
    name: 'Please enter your name.', organization: 'Please enter your organization.', role: 'Please share your role.',
    email: 'Please enter a valid email address.', inquiry: 'Please choose an area of support.', timeline: 'Please choose an approximate timeline.',
    message: 'Please share at least 20 characters about your goals or context.'
  };

  const validateField = (field) => {
    let valid = field.checkValidity();
    if (field.id === 'message') valid = field.value.trim().length >= 20;
    if (['name', 'organization', 'role'].includes(field.id)) valid = field.value.trim().length >= 2;
    field.setAttribute('aria-invalid', String(!valid));
    const error = document.getElementById(`${field.id}Error`);
    if (error) error.textContent = valid ? '' : messages[field.id];
    return valid;
  };
  fields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
    field.addEventListener('change', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  const setStatus = (message, type = '') => {
    if (!status) return;
    status.textContent = message;
    status.className = `form-status${type ? ` ${type}` : ''}`;
  };
  const setLoading = (loading) => {
    if (!submitButton) return;
    submitButton.disabled = loading;
    submitButton.classList.toggle('is-loading', loading);
    submitButton.setAttribute('aria-busy', String(loading));
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const invalid = fields.filter((field) => !validateField(field));
    if (invalid.length) {
      setStatus('Please review the highlighted fields before sending.', 'error');
      invalid[0].focus();
      return;
    }
    if (form.querySelector('[name="_gotcha"]')?.value) {
      form.reset();
      setStatus('Thanks for reaching out. Your message has been sent. I’ll be in touch soon.', 'success');
      return;
    }
    setLoading(true);
    setStatus('Sending your inquiry…');
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`Formspree returned ${response.status}`);
      form.reset();
      fields.forEach((field) => field.setAttribute('aria-invalid', 'false'));
      setStatus('Thanks for reaching out. Your message has been sent. I’ll be in touch soon.', 'success');
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setStatus('Your message could not be sent. Please try again or email ejaquez@palmchat.io.', 'error');
    } finally {
      setLoading(false);
    }
  });
});
