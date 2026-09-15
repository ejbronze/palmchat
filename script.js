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

  const form = document.getElementById('contactForm');
  if (!form) return;
  const submitButton = document.getElementById('submitButton');
  const status = document.getElementById('formStatus');
  const fields = [...form.querySelectorAll('input[required],select[required],textarea[required]')];
  const messages = {
    name: 'Please enter your name.', organization: 'Please enter your organization.', role: 'Please share your role.',
    email: 'Please enter a valid email address.', inquiry: 'Please choose an area of interest.', timeline: 'Please choose an approximate timeline.',
    message: 'Please share at least 20 characters about your goals or context.'
  };
  if (new URLSearchParams(location.search).get('interest') === 'updates') {
    const inquiry = document.getElementById('inquiry');
    if (inquiry) inquiry.value = 'Something else';
    const message = document.getElementById('message');
    if (message) message.value = 'Please keep me informed when PalmChat resources become available.';
  }
  const validate = (field) => {
    let valid = field.checkValidity();
    if (field.id === 'message') valid = field.value.trim().length >= 20;
    if (['name','organization','role'].includes(field.id)) valid = field.value.trim().length >= 2;
    field.setAttribute('aria-invalid', String(!valid));
    const error = document.getElementById(`${field.id}Error`);
    if (error) error.textContent = valid ? '' : messages[field.id];
    return valid;
  };
  fields.forEach((field) => {
    field.addEventListener('blur', () => validate(field));
    field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validate(field); });
    field.addEventListener('change', () => { if (field.getAttribute('aria-invalid') === 'true') validate(field); });
  });
  const setStatus = (message, type = '') => {
    if (!status) return;
    status.textContent = message;
    status.className = `form-status${type ? ` ${type}` : ''}`;
  };
  const setLoading = (loading) => {
    if (!submitButton) return;
    submitButton.disabled = loading;
    submitButton.setAttribute('aria-busy', String(loading));
    const labels = submitButton.querySelectorAll('span');
    if (labels[0]) labels[0].hidden = loading;
    if (labels[1]) labels[1].hidden = !loading;
  };
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const invalid = fields.filter((field) => !validate(field));
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
