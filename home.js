/* PalmChat homepage journey: one pinned stage. Scrolling plays five scenes that dissolve
   into each other while the cigua palmera flies between perches. Normal scrolling drives it;
   reduced motion gets a calm stacked page instead. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const journey = document.getElementById('journey');
  const stage = document.getElementById('stage');
  if (!journey || !stage) return;
  const scenes = [...stage.querySelectorAll('.scene')], N = scenes.length;
  root.style.setProperty('--scenes', N);

  // every perch gets a position on the journey timeline
  const perches = [...stage.querySelectorAll('[data-perch]')].map((el) => ({ el, sc: scenes.indexOf(el.closest('.scene')) }));
  const perScene = {};
  perches.forEach((p) => (perScene[p.sc] = perScene[p.sc] || []).push(p));
  Object.entries(perScene).forEach(([s, list]) => list.forEach((p, j) => { p.P = +s - 0.26 + ((j + 0.5) * 0.52) / list.length; }));
  perches.sort((a, b) => a.P - b.P);

  if (reduce) root.classList.add('static');

  const range = () => ({ top: journey.offsetTop, span: journey.offsetHeight - innerHeight });
  const goTo = (i) => {
    if (root.classList.contains('static')) { scenes[i].scrollIntoView(); return; }
    const { top, span } = range();
    const P = i === 0 ? 0 : i === N - 1 ? N - 1 : perScene[i][0].P;
    window.scrollTo({ top: top + span * (clamp(P, 0, N - 1) / (N - 1)), behavior: reduce ? 'auto' : 'smooth' });
  };
  document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault(); window.PalmChatMenu?.close(); goTo(+b.dataset.go);
  }));
  if (root.classList.contains('static')) return;

  const flyer = document.getElementById('flyer'), fBird = flyer.querySelector('.bird');
  const head = fBird.querySelector('.head'), pupil = fBird.querySelector('.pupil');
  const rail = [...document.querySelectorAll('#rail button')];
  const beats = [...stage.querySelectorAll('.beat')], svcs = [...stage.querySelectorAll('#svc article')];
  const grid = document.getElementById('grid'), bgFrond = document.getElementById('bgFrond');

  /* trail canvas */
  const cv = document.getElementById('trail'), cx = cv.getContext('2d');
  let dpr = 1, trail = [];
  const sizeCanvas = () => { dpr = Math.min(2, devicePixelRatio || 1); cv.width = stage.clientWidth * dpr; cv.height = stage.clientHeight * dpr; };
  sizeCanvas();

  /* the bird watches the cursor */
  const look = { x: 0, y: 0, on: false };
  addEventListener('pointermove', (e) => { look.x = e.clientX; look.y = e.clientY; look.on = true; }, { passive: true });

  let target = 0, prog = 0, flapping = false, first = true;
  const readTarget = () => { const { top, span } = range(); target = clamp((scrollY - top) / span, 0, 1) * (N - 1); };
  addEventListener('scroll', readTarget, { passive: true });
  addEventListener('resize', () => { sizeCanvas(); readTarget(); });
  readTarget(); prog = target;

  // read a perch's resting layout, ignoring the scene's own transition transform
  const perchRect = (p) => {
    const s = stage.getBoundingClientRect(), sc = scenes[p.sc], tf = sc.style.transform;
    sc.style.transform = 'none'; const r = p.el.getBoundingClientRect(); sc.style.transform = tf;
    return { x: r.left - s.left, y: r.top - s.top, w: r.width };
  };

  function frame(now) {
    prog += (target - prog) * 0.14;
    if (Math.abs(target - prog) < 0.0005) prog = target;

    // scenes dissolve into each other
    scenes.forEach((sc, i) => {
      const d = prog - i, a = Math.abs(d), op = clamp(1 - (a - 0.3) / 0.22);
      sc.style.opacity = op;
      sc.style.transform = `translateY(${(-d * 60).toFixed(1)}px) scale(${(1 - Math.max(0, a - 0.3) * 0.12).toFixed(4)})`;
      sc.style.filter = a > 0.3 ? `blur(${((a - 0.3) * 24).toFixed(1)}px)` : 'none';
      const vis = op > 0.5;
      sc.setAttribute('aria-hidden', String(!vis));
      if (vis) sc.removeAttribute('inert'); else sc.setAttribute('inert', '');
    });

    // scene-local state
    const local = (k) => clamp((prog - k + 0.26) / 0.52);
    const bi = Math.min(2, Math.floor(local(1) * 3));
    beats.forEach((b, i) => { b.classList.toggle('on', i === bi); b.classList.toggle('done', i < bi); });
    const si = Math.min(3, Math.floor(local(2) * 4));
    svcs.forEach((s, i) => s.classList.toggle('on', i === si));
    const ri = Math.round(prog);
    rail.forEach((b, i) => { b.classList.toggle('on', i === ri); if (i === ri) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });

    // ambient layers drift with the journey
    grid.style.transform = `translate3d(0,${(-prog * 40) % 64}px,0)`;
    bgFrond.style.transform = `translate3d(${-prog * 6}vw,${-prog * 4}vh,0) rotate(${-prog * 7}deg)`;
    stage.style.setProperty('--glow-x', `${75 - prog * 12}%`);
    stage.style.setProperty('--glow-y', `${40 + Math.sin(prog * 1.3) * 14}%`);

    // the bird flies between perches
    let a = perches[0], b = perches[0], t = 0;
    if (prog >= perches[perches.length - 1].P) { a = b = perches[perches.length - 1]; }
    else if (prog > perches[0].P) {
      for (let i = 0; i < perches.length - 1; i++) {
        if (prog >= perches[i].P && prog < perches[i + 1].P) { a = perches[i]; b = perches[i + 1]; t = (prog - a.P) / (b.P - a.P); break; }
      }
    }
    const tt = ease(clamp((t - 0.22) / 0.56));
    const ra = perchRect(a), rb = a === b ? ra : perchRect(b);
    const w = ra.w + (rb.w - ra.w) * tt;
    const arc = Math.sin(Math.PI * tt) * Math.min(160, Math.hypot(rb.x - ra.x, rb.y - ra.y) * 0.35);
    const bx = ra.x + (rb.x - ra.x) * tt, by = ra.y + (rb.y - ra.y) * tt - arc;
    const flying = tt > 0.02 && tt < 0.98;
    const face = flying ? (rb.x < ra.x ? 'l' : 'r') : ((tt >= 0.98 ? b : a).el.dataset.face || 'r');
    flyer.classList.toggle('face-l', face === 'l');
    flyer.style.width = `${w}px`; flyer.style.height = `${w / 1.2}px`;
    const tilt = flying ? Math.max(-14, Math.min(14, (rb.y - ra.y) * 0.02)) * (face === 'l' ? -1 : 1) : 0;
    flyer.style.transform = `translate3d(${bx.toFixed(1)}px,${by.toFixed(1)}px,0) rotate(${tilt}deg)`;
    if (flying !== flapping) { flapping = flying; fBird.classList.toggle('flying', flying); }

    // a trail of light where the bird has been
    if (flying) trail.push({ x: bx + w * 0.45, y: by + w * 0.42, life: 1 });
    cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.clearRect(0, 0, cv.width, cv.height);
    trail = trail.filter((p) => (p.life -= 0.018) > 0);
    for (const p of trail) { cx.fillStyle = `rgba(242,182,50,${(p.life * 0.55).toFixed(3)})`; const s = 1.5 + p.life * 2.5; cx.fillRect(p.x - s / 2, p.y - s / 2, s, s); }

    // head and eye follow the cursor while perched
    if (look.on && !flying) {
      const hx = bx + w * 0.67, hy = by + w * 0.29;
      const ang = Math.atan2(look.y - hy, (look.x - hx) * (face === 'l' ? -1 : 1));
      head.style.transform = `rotate(${Math.max(-16, Math.min(16, ang * 180 / Math.PI * 0.35))}deg)`;
      pupil.style.transform = `translate(${Math.cos(ang) * 1.8}px,${Math.sin(ang) * 1.8}px)`;
    } else if (!flying) { head.style.transform = `rotate(${Math.sin(now / 900) * 3}deg)`; }

    if (first) { first = false; fBird.classList.add('assemble'); }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
