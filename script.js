document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const backToTop = document.querySelector('.back-to-top');
  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  const caseStudies = [...document.querySelectorAll('.case-study')];
  const yearNode = document.getElementById('year');
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const submitButton = document.getElementById('submitButton');

  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if (header) header.classList.toggle('is-open', !expanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        if (header) header.classList.remove('is-open');
      });
    });
  }

  const setActiveNav = () => {
    const scrollY = window.scrollY + 120;
    let currentId = sections[0]?.id || '';

    sections.forEach((section) => {
      if (scrollY >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('is-active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  };

  if (sections.length) {
    setActiveNav();
    window.addEventListener('scroll', setActiveNav, { passive: true });
  }

  if (backToTop) {
    const toggleBackToTop = () => {
      const shouldShow = window.scrollY > 420;
      backToTop.classList.toggle('is-visible', shouldShow);
    };

    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (filterButtons.length && caseStudies.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const activeFilter = button.dataset.filter || 'all';

        filterButtons.forEach((item) => {
          item.classList.toggle('is-active', item === button);
        });

        caseStudies.forEach((study) => {
          const categories = (study.dataset.category || '').split(' ');
          const matches = activeFilter === 'all' || categories.includes(activeFilter);
          study.hidden = !matches;
        });
      });
    });
  }

  if (form) {
    const fields = {
      name: form.querySelector('#name'),
      organization: form.querySelector('#organization'),
      role: form.querySelector('#role'),
      email: form.querySelector('#email'),
      timeline: form.querySelector('#timeline'),
      message: form.querySelector('#message')
    };

    const validators = {
      name: (value) => value.trim().length >= 2,
      organization: (value) => value.trim().length >= 2,
      role: (value) => value.trim().length >= 2,
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      timeline: (value) => value.trim().length > 0,
      message: (value) => value.trim().length >= 20
    };

    const setFieldState = (field, isValid) => {
      if (field) field.setAttribute('aria-invalid', String(!isValid));
    };

    const validateFormFields = () => {
      let allValid = true;
      Object.entries(fields).forEach(([key, field]) => {
        if (!field) return;
        const isValid = validators[key] ? validators[key](field.value) : true;
        setFieldState(field, !isValid);
        if (!isValid) allValid = false;
      });
      return allValid;
    };

    const setStatus = (message, type) => {
      if (!statusEl) return;
      statusEl.textContent = message;
      statusEl.className = 'form-status';
      if (type) statusEl.classList.add(`is-${type}`);
    };

    Object.values(fields).forEach((field) => {
      if (!field) return;
      field.addEventListener('blur', () => {
        const key = field.id;
        if (!validators[key]) return;
        const isValid = validators[key](field.value);
        setFieldState(field, !isValid);

        if (!isValid) {
          const messageMap = {
            name: 'Please enter your name.',
            organization: 'Please enter your organization name.',
            role: 'Please share your role.',
            email: 'Please enter a valid email address.',
            timeline: 'Please choose an approximate timeline.',
            message: 'Please share a bit more detail so we can help.'
          };
          setStatus(messageMap[key], 'error');
        } else if (statusEl && statusEl.classList.contains('is-error')) {
          setStatus('', '');
        }
      });
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const valid = validateFormFields();

      if (!valid) {
        setStatus('Please complete all required fields before sending your request.', 'error');
        const firstInvalid = Object.values(fields).find((field) => field && field.getAttribute('aria-invalid') === 'true');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.add('is-loading');
      }

      setStatus('Sending your inquiry…', 'loading');

      try {
        const data = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: {
            Accept: 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          Object.values(fields).forEach((field) => {
            if (field) field.setAttribute('aria-invalid', 'false');
          });
          setStatus('Thanks for reaching out. Your message has been sent, and PalmChat will follow up soon.', 'success');
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        setStatus('Something went wrong while sending the form. Please email ejaquez@palmchat.io directly.', 'error');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.classList.remove('is-loading');
        }
      }
    });
  }
});
