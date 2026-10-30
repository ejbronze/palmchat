/* PalmChat shared behavior: the cigua palmera, generated palm fronds, the flight-path menu,
   the prompt refiner demo, and email copy. The homepage journey lives in home.js. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const SVGNS = 'http://www.w3.org/2000/svg';

  /* ---- the cigua palmera, drawn once and reused ---- */
  const BIRD = `<svg class="bird" viewBox="0 0 240 200" aria-hidden="true" focusable="false">
  <g class="body-g">
    <path class="shape" d="M78 116 L18 150 L26 162 L44 158 L36 170 L50 168 L88 130 Z" fill="#4A3820"/>
    <path class="shape" d="M74 112 C 72 80, 104 62, 140 66 C 168 70, 184 92, 176 120 C 168 148, 128 160, 98 150 C 82 144, 74 130, 74 112 Z" fill="#5A4528"/>
    <path class="shape" d="M154 78 C 180 92, 182 124, 162 142 C 142 158, 108 156, 96 144 C 128 140, 154 120, 154 78 Z" fill="#F4E7C6"/>
    <g class="detail" stroke="#7A5A2E" stroke-width="3.4" stroke-linecap="round">
      <path d="M150 100 l-3 8"/><path d="M162 108 l-3 8"/><path d="M140 118 l-3 8"/><path d="M154 124 l-3 8"/><path d="M128 132 l-3 7"/><path d="M142 138 l-3 6"/><path d="M164 92 l-2 7"/><path d="M118 142 l-3 5"/>
    </g>
    <g class="legs detail" stroke="#C9A35A" stroke-width="4" stroke-linecap="round" fill="none"><path d="M118 152 l2 22 m-10 0 h18"/><path d="M134 150 l4 22 m-10 2 h18"/></g>
    <g class="wing"><path class="shape" d="M120 88 C 98 92, 80 110, 66 134 C 96 134, 128 122, 146 102 C 144 92, 132 86, 120 88 Z" fill="#9AA637"/><g class="detail"><path d="M76 128 C 98 126, 122 116, 138 100" fill="none" stroke="#F2B632" stroke-width="3.4" stroke-linecap="round"/><path d="M86 118 C 104 114, 118 106, 130 96" fill="none" stroke="#6E7A22" stroke-width="3" stroke-linecap="round"/></g></g>
    <g class="head">
      <circle class="shape" cx="160" cy="70" r="27" fill="#5A4528"/>
      <path class="detail" d="M146 50 C 152 38, 166 36, 176 46" fill="none" stroke="#7A5A2E" stroke-width="4" stroke-linecap="round"/>
      <path class="shape" d="M183 62 L214 72 L184 84 Z" fill="#F2D27A"/><path class="detail" d="M184 73 L212 72" stroke="#B8902F" stroke-width="2"/>
      <g class="detail"><circle cx="170" cy="66" r="7.5" fill="#B3261E"/><g class="pupil"><circle cx="171" cy="66" r="3.4" fill="#0B231E"/><circle cx="173" cy="63.5" r="1.6" fill="#fff"/></g></g>
      <ellipse class="lid" cx="170" cy="66" rx="8.5" ry="8.5" fill="#5A4528"/>
    </g>
  </g>
</svg>`;
  document.querySelectorAll('[data-bird]').forEach((el) => { el.innerHTML = BIRD; });
  if (!reduce) document.querySelectorAll('[data-assemble] .bird').forEach((b) => b.classList.add('assemble'));

  /* ---- royal palm fronds, generated leaflet by leaflet ---- */
  function frond(svg, d, o) {
    const g = document.createElementNS(SVGNS, 'g');
    const back = document.createElementNS(SVGNS, 'g');
    const rach = document.createElementNS(SVGNS, 'path');
    rach.setAttribute('d', d); rach.setAttribute('fill', 'none'); rach.setAttribute('stroke', o.stem);
    rach.setAttribute('stroke-width', o.w); rach.setAttribute('stroke-linecap', 'round');
    svg.appendChild(g); g.appendChild(back); g.appendChild(rach);
    const L = rach.getTotalLength();
    let i = 0;
    for (let t = o.from || 0.04; t < 0.985; t += o.step || 0.026, i++) {
      const p = rach.getPointAtLength(t * L), q = rach.getPointAtLength(Math.min(L, t * L + 2));
      const a = Math.atan2(q.y - p.y, q.x - p.x), len = o.len * Math.sin(Math.PI * Math.min(1, t * 1.12)) + 12;
      for (const side of [-1, 1]) {
        const ang = a + side * 1.05 + (side > 0 ? 0.35 : -0.15), droop = side > 0 ? 0.42 : 0.16;
        const ex = p.x + Math.cos(ang) * len, ey = p.y + Math.sin(ang) * len + len * droop;
        const leaf = document.createElementNS(SVGNS, 'path');
        leaf.setAttribute('d', `M${p.x.toFixed(1)} ${p.y.toFixed(1)} Q${(p.x + Math.cos(ang) * len * 0.55).toFixed(1)} ${(p.y + Math.sin(ang) * len * 0.55).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`);
        leaf.setAttribute('fill', 'none'); leaf.setAttribute('stroke', o.cols[(i + (side > 0 ? 1 : 0)) % o.cols.length]);
        leaf.setAttribute('stroke-width', o.lw); leaf.setAttribute('stroke-linecap', 'round');
        if (o.sway && !reduce) { leaf.style.transformOrigin = `${p.x}px ${p.y}px`; leaf.style.animation = `sway ${2.8 + (i % 5) * 0.45}s ${-i * 0.12}s infinite ease-in-out alternate`; }
        (side < 0 ? back : g).appendChild(leaf);
      }
    }
  }
  const leaves = ['#2F7A58', '#3E8D63', '#9AA637', '#256B4C'];
  const fruit = (svg) => {
    const fr = document.createElementNS(SVGNS, 'g');
    fr.innerHTML = '<path d="M96 305 C 92 330, 100 350, 90 372" stroke="#7A5A2E" stroke-width="3" fill="none"/>' +
      [[92, 328, 7, '#E5492E'], [101, 338, 6, '#F2B632'], [88, 346, 6, '#E5492E'], [97, 356, 5, '#F2B632'], [90, 366, 5, '#E5492E'], [104, 326, 5, '#F2B632']]
        .map((c) => `<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="${c[3]}"/>`).join('');
    svg.appendChild(fr);
  };
  const presets = {
    hero: (s) => {
      frond(s, 'M-20 250 C 70 172, 170 124, 300 62', { stem: '#24493F', cols: ['#1C4F3C', '#24614A'], len: 44, w: 4, lw: 3.5, sway: true });
      frond(s, 'M0 330 C 110 286, 250 276, 404 304', { stem: '#5A4528', cols: leaves, len: 70, w: 8, lw: 5, sway: true });
      fruit(s);
    },
    perch: (s) => frond(s, 'M404 300 C 300 262, 160 250, -4 284', { stem: '#5A4528', cols: leaves, len: 62, w: 8, lw: 5, sway: true }),
    bg: (s) => frond(s, 'M10 390 C 70 250, 190 140, 395 80', { stem: '#9AA637', cols: ['#2F7A58', '#3E8D63', '#9AA637'], len: 96, w: 5, lw: 4, sway: true }),
  };
  document.querySelectorAll('svg[data-frond]').forEach((svg) => presets[svg.dataset.frond]?.(svg));

  /* ---- year ---- */
  document.querySelectorAll('[data-year]').forEach((n) => { n.textContent = new Date().getFullYear(); });

  /* ---- menu: a flight path through the site ---- */
  const menuBtn = document.querySelector('.menu-button');
  const menu = document.getElementById('site-nav');
  if (menuBtn && menu) {
    const label = menuBtn.querySelector('.ml');
    const mBird = menu.querySelector('.menu-bird');
    const stops = [...menu.querySelectorAll('.stops a')];
    const isOpen = () => document.body.classList.contains('menu-open');
    const perch = (a) => {
      if (!mBird) return;
      const fl = a.closest('.flight').getBoundingClientRect(), r = a.getBoundingClientRect();
      const x = Math.min(r.right - fl.left + 8, fl.width - 90), y = r.top - fl.top + r.height * 0.5 - 64;
      const b = mBird.firstElementChild;
      b.classList.add('flying'); mBird.style.transform = `translate(${x}px,${y}px)`;
      clearTimeout(perch.t); perch.t = setTimeout(() => b.classList.remove('flying'), reduce ? 0 : 750);
    };
    const set = (open, { focus = false } = {}) => {
      if (isOpen() === open) return;
      document.body.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      label.textContent = open ? 'Close' : 'Menu';
      root.style.overflow = open ? 'hidden' : '';
      stops.forEach((a, i) => { a.parentElement.style.transitionDelay = open ? `${0.2 + i * 0.06}s` : '0s'; });
      if (open) setTimeout(() => { const a = stops.find((s) => s.getAttribute('aria-current')) || stops[0]; perch(a); a.focus({ preventScroll: true }); }, 420);
      if (!open && focus) menuBtn.focus();
    };
    window.PalmChatMenu = { close: () => set(false) };
    menuBtn.addEventListener('click', () => set(!isOpen()));
    stops.forEach((a) => {
      a.addEventListener('mouseenter', () => perch(a));
      a.addEventListener('focus', () => perch(a));
      a.addEventListener('click', () => set(false));
    });
    document.addEventListener('keydown', (e) => {
      if (!isOpen()) return;
      if (e.key === 'Escape') set(false, { focus: true });
      if (e.key === 'Tab') {
        const f = [menuBtn, ...stops], i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
  }

  /* ---- prompt refiner: skills before tools, in three drafts ---- */
  const drafts = [
    ['Make a lesson plan about fractions.', 'Vague. You will get something generic and have nothing to check it against.', 2],
    ['Write a <mark>45-minute</mark> lesson for <mark>4th grade</mark> introducing <mark>equivalent fractions</mark> with a hands-on activity.', 'Better. It knows the grade, the time, and the goal. It still does not know your class.', 6],
    ['Write a 45-minute lesson for 4th grade introducing equivalent fractions with a hands-on activity. <mark>Six students are multilingual learners; two need extended time.</mark> <mark>Use fraction strips.</mark> <mark>End with a 3-question exit ticket.</mark> <mark>Flag anything you are unsure about.</mark>', 'Context, constraints, and a check on its own limits. Now your job is to read it critically and decide what stays human.', 10],
  ];
  document.querySelectorAll('[data-refiner]').forEach((el) => {
    const btns = [...el.querySelectorAll('.drafts button')], text = el.querySelector('.promptbox'), review = el.querySelector('.review-text'), bars = [...el.querySelectorAll('.meter i')];
    let cur = 0, auto = el.hasAttribute('data-auto');
    const show = (i) => {
      cur = i;
      btns.forEach((b, j) => { b.setAttribute('aria-selected', String(j === i)); b.tabIndex = j === i ? 0 : -1; });
      text.innerHTML = drafts[i][0]; review.textContent = drafts[i][1];
      bars.forEach((m, j) => m.classList.toggle('f', j < drafts[i][2]));
    };
    btns.forEach((b, i) => {
      b.addEventListener('click', () => { auto = false; show(i); });
      b.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { auto = false; const n = (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3; show(n); btns[n].focus(); }
      });
    });
    show(0);
    if (!reduce) setInterval(() => {
      if (!auto || document.hidden) return;
      const sc = el.closest('.scene'); if (sc && sc.getAttribute('aria-hidden') === 'true') return;
      const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
      show((cur + 1) % 3);
    }, 2600);
  });

  /* ---- copy email ---- */
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const addr = document.getElementById(btn.dataset.copy), out = document.getElementById(btn.dataset.out);
      const select = () => { const r = document.createRange(); r.selectNodeContents(addr); const s = getSelection(); s.removeAllRanges(); s.addRange(r); out.textContent = '> selected. copy it from here.'; };
      try { navigator.clipboard.writeText(addr.textContent.trim()).then(() => { out.textContent = '> copied. talk soon.'; }, select); } catch { select(); }
    });
  });

  /* ---- perched birds watch the cursor ---- */
  const lookers = [...document.querySelectorAll('[data-look] .bird')];
  if (lookers.length && !reduce) {
    addEventListener('pointermove', (e) => {
      lookers.forEach((b) => {
        const r = b.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
        const hx = r.left + r.width * 0.67, hy = r.top + r.height * 0.35, ang = Math.atan2(e.clientY - hy, e.clientX - hx);
        b.querySelector('.head').style.transform = `rotate(${Math.max(-16, Math.min(16, ang * 180 / Math.PI * 0.35))}deg)`;
        b.querySelector('.pupil').style.transform = `translate(${Math.cos(ang) * 1.8}px,${Math.sin(ang) * 1.8}px)`;
      });
    }, { passive: true });
  }

  window.PalmChat = { reduce };
})();
