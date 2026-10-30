import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';

/* PalmChat site generator. Edit content here (and the homepage journey in partials/home.html),
   then run `node scripts/build-pages.mjs`. Generated HTML is the production output. */

const root = new URL('../', import.meta.url);
const write = (path, content) => {
  const url = new URL(path, root);
  mkdirSync(new URL('./', url), { recursive: true });
  writeFileSync(url, content.trimStart());
};

const EMAIL = 'erjaquez@gmail.com';
const arrow = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12L12 4M6 4h6v6"/></svg>';

const menuItems = [
  ['Home', '/', 'start'],
  ['Services', '/services', 'where I help'],
  ['Work', '/work', 'recent work'],
  ['About', '/about', 'about Edwin'],
  ['Contact', '/contact', 'say hola'],
];
const footItems = [['Home', '/'], ['Services', '/services'], ['Work', '/work'], ['About', '/about'], ['Resources', '/resources'], ['Contact', '/contact']];

const rail = `<ol class="rail" id="rail" aria-label="Journey progress">
  <li><button data-go="0" class="on"><span>Start</span><i></i></button></li>
  <li><button data-go="1"><span>How I work</span><i></i></button></li>
  <li><button data-go="2"><span>Services</span><i></i></button></li>
  <li><button data-go="3"><span>Work</span><i></i></button></li>
  <li><button data-go="4"><span>Contact</span><i></i></button></li>
</ol>`;

function shell({ section, title, description, path, body, home = false }) {
  const canonical = `https://palmchat.io${path}`;
  const current = (href) => (href === '/' ? path === '/' : path === href || path.startsWith(href + '/'));
  const stops = menuItems.map(([label, href, note]) => `<li><a href="${href}"${current(href) ? ' aria-current="page"' : ''}>${label} <span class="label">${note}</span></a></li>`).join('');
  const foot = footItems.map(([label, href]) => `<a href="${href}"${current(href) ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${title}</title><meta name="description" content="${description}"><meta name="theme-color" content="#0B231E"><link rel="canonical" href="${canonical}">
<link rel="icon" href="/assets/brand/favicon-v3.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon-v3.png">
<link rel="preload" href="/assets/fonts/geist-v1.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/styles.css">
<meta property="og:type" content="website"><meta property="og:site_name" content="PalmChat Innovations"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="https://palmchat.io/assets/social/palmchat-preview-v3.png"><meta name="twitter:card" content="summary_large_image">
</head><body class="${section ? 'pg-' + section : ''}"><a class="skip-link" href="#main-content">Skip to content</a>
<header class="top pad"><a class="brand" href="/" aria-label="PalmChat Innovations home"><span class="mini" data-bird></span><span>PalmChat</span></a><button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav"><span class="ml">Menu</span><span class="bars" aria-hidden="true"></span></button></header>
<nav class="menu" id="site-nav" aria-label="Main navigation">
  <div class="menu-in pad">
    <div class="flight">
      <svg class="path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 6 C 30 12, 28 28, 18 34 S 30 58, 8 70 S 22 94, 14 100" vector-effect="non-scaling-stroke"/></svg>
      <span class="menu-bird" data-bird aria-hidden="true"></span>
      <ol class="stops">${stops}</ol>
    </div>
    <div class="menu-side">
      <strong>Professional learning, AI fluency, curriculum, and education products.</strong>
      <span>New York City. English, Español, Português. Remote and on site.</span>
      <span class="mail">${EMAIL}</span>
    </div>
  </div>
</nav>
${home ? rail + '\n' + body : `<main id="main-content">${body}</main>`}
<footer class="site-foot pad"><div class="wrapc"><a class="brand" href="/" aria-label="PalmChat Innovations home"><span class="mini" data-bird></span><span>PalmChat Innovations</span></a><nav aria-label="Footer">${foot}</nav><div class="meta"><span class="m">${EMAIL}</span><span>English, Español, Português</span><a href="/privacy">Privacy</a></div></div><div class="wrapc base"><span>© <span data-year>2026</span> PalmChat Innovations LLC</span><span>New York City</span></div></footer>
<script src="/script.js" defer></script>${home ? '<script src="/home.js" defer></script>' : ''}
</body></html>`;
}

const pageHero = ({ crumbs = [], title, dek, acts = '' }) => `<section class="page-hero pad"><div class="grid-bg" aria-hidden="true"></div><div class="ph-grid"><div>
<p class="crumb label">${crumbs.map(([l, h]) => (h ? `<a href="${h}">${l}</a>` : `<span>${l}</span>`)).join('<span aria-hidden="true">/</span>')}</p>
<h1>${title}</h1>${dek ? `<p class="dek">${dek}</p>` : ''}${acts ? `<div class="acts">${acts}</div>` : ''}</div>
<div class="ph-perch" aria-hidden="true"><svg data-frond="perch" viewBox="0 0 400 333"></svg><span class="anchor" data-assemble data-look><span data-bird style="display:block;width:100%;height:100%"></span></span></div></div></section>`;

const band = (heading = 'What are you trying to make sense of?') => `<section class="band pad"><div class="wrapc"><h2>${heading}</h2><a class="btn" href="/contact">Start a conversation</a></div></section>`;

/* ---------------- content ---------------- */
const services = [
  { slug: 'ai-emerging-technology', code: 'AI', name: 'AI and Emerging Technology', short: 'Learn new technology with purpose, care, and practical guardrails.', desc: 'AI fluency, prompt development, responsible use, classroom applications, and workflows, taught tool-agnostic so the skills outlast any one platform.', audience: 'Schools, adult-learning teams, and education organizations exploring responsible AI use.', problem: 'Teams need room to learn and experiment while keeping ethics, bias, access, privacy, and learning goals in view.', deliver: 'PalmChat creates hands-on experiences that help educators evaluate tools, develop prompts, discuss risks, and turn successful experiments into repeatable workflows.', formats: ['AI fluency workshops', 'Prompt-development labs', 'Leadership briefings', 'Ethics and guardrail sessions', 'Implementation planning'], leaves: 'Shared understanding, useful frameworks, practical examples, and clearer decisions about responsible adoption.' },
  { slug: 'professional-learning', code: 'PL', name: 'Professional Learning', short: 'Build confidence through relevant, hands-on learning.', desc: 'Workshops, coaching, facilitation, and implementation support that connect learning to everyday practice.', audience: 'Schools, district teams, education nonprofits, and teacher leaders.', problem: 'Educators and leaders need practical support that respects their expertise, time, and context.', deliver: 'PalmChat designs and facilitates learning that makes priorities actionable without adding unnecessary complexity. Participants make something, test it, and leave with an artifact they can use.', formats: ['Interactive workshops', 'Professional learning series', 'Coaching cycles', 'Train the trainer', 'Implementation support'], leaves: 'Clear next steps, usable resources, shared language, and a stronger foundation for sustained practice.' },
  { slug: 'computer-science', code: 'CS', name: 'Computer Science Program Design', short: 'Create coherent, sustainable computer science pathways.', desc: 'Program strategy, curriculum design, computational thinking integration, and implementation planning for K–12 learning.', audience: 'Schools and districts building or strengthening K–12 computer science experiences.', problem: 'Sustainable computer science requires more than a tool or an isolated course. It needs coherence, teacher support, and ownership.', deliver: 'PalmChat helps teams shape a clear program vision, connect curriculum to practice, and plan for implementation.', formats: ['Program planning', 'Curriculum mapping', 'Scope and sequence design', 'Teacher coaching', 'Computational thinking integration'], leaves: 'A practical roadmap, aligned learning experiences, and tools educators and leaders can carry forward.' },
  { slug: 'curriculum-product-development', code: 'ID', name: 'Curriculum and Product Development', short: 'Turn strong ideas into useful learning experiences.', desc: 'Instructional design, curriculum development, resource creation, and education product consulting, from first sketch to working prototype.', audience: 'Nonprofits, education companies, founders, and mission-driven product teams.', problem: 'Promising ideas need coherent learning flow, credible instructional design, and attention to the people who will use them.', deliver: 'PalmChat connects product strategy with curriculum thinking, stakeholder needs, usability, and implementation realities.', formats: ['Curriculum design', 'Learning experience design', 'Facilitator guides', 'Product consulting', 'Prototyping'], leaves: 'A clearer learning journey, stakeholder-ready materials, and a more usable, instructionally grounded experience.' },
];

const projects = [
  { slug: 'mouse-ai-fluency', name: 'AI Fluency Professional Learning', category: 'AI integration / professional learning', short: 'Building AI literacy through prompting, ethical use, bias, guardrails, and classroom application.', context: 'Educators were exploring generative AI while navigating fast-moving tools, uneven familiarity, and important questions about classroom use.', challenge: 'Participants needed a practical learning experience that moved beyond hype while making space for experimentation, ethics, bias, and responsible guardrails.', role: 'AI literacy learning designer and professional learning facilitator.', approach: 'Skills came before tools. Sessions combined hands-on prompting, evaluating output, and reflection on classroom relevance with attention to equity, bias, ethical use, and learning goals.', deliverables: ['AI fluency sessions', 'Prompting frameworks', 'Discussion guides', 'Ethical-use resources'], methods: ['Prompt development', 'Hands-on exploration', 'Ethics protocols', 'Educator coaching'], impact: 'Designed to help educators evaluate, use, and discuss AI with greater clarity and purpose.', demo: true, related: 'school-meal-platform' },
  { slug: 'school-meal-platform', name: 'School Meal Operations Platform', category: 'product development / experience design', short: 'An education platform PalmChat designed and built, bringing school operations, user workflows, administrative tools, and reporting into one streamlined experience.', context: 'This work brought together education product strategy, school operations technology, interface development, and role-based platform planning.', challenge: 'The work required a coherent product experience for school-based operations without exposing private workflows, business rules, student information, or proprietary requirements.', role: 'Education product strategist, user-experience designer, workflow designer, and full-stack product developer.', approach: 'Developed the platform at a capability level around user experience, administrative tools, reporting concepts, and operational problem-solving. Public details remain intentionally limited.', deliverables: ['Education product strategy', 'User experience design', 'Interface development', 'Role-based platform planning'], methods: ['Workflow design', 'Administrative-tool planning', 'Reporting concepts', 'Full-stack product development'], impact: 'Designed to support a more streamlined operational experience while protecting confidential product and school information.', note: 'This case study is intentionally anonymized. It does not include the company, actual screens, product branding, student information, internal workflows, business rules, database structure, proprietary requirements, or unreleased features.', related: 'mouse-ai-fluency' },
];

const background = [
  ['Background', 'K–8 computer science coaching', 'Coached educators and school leaders on computer science, computational thinking, and emerging technology through a university-based K–12 initiative in New York City public schools.'],
  ['Background', 'Founding a computer science program', 'Designed and launched a project-based computer science program from the ground up, serving more than 450 students in grades 4 through 8.'],
  ['Background', 'School leadership', 'Led staff development, coaching, and student culture systems as a school leader.'],
];
const rings = (withToday) => `<div class="trunk">${withToday ? `<div class="ring"><span class="label">Today</span><h3>PalmChat Innovations</h3><p>Professional learning, AI fluency, curriculum, and education product development for schools and education organizations.</p></div>` : ''}${background.map(([w, h, p]) => `<div class="ring past"><span class="label">${w}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>`;

const refiner = `<div class="demo" data-refiner>
  <div class="bar"><span class="label">refine a prompt</span><div class="drafts" role="tablist" aria-label="Prompt drafts"><button role="tab" aria-selected="true">v1</button><button role="tab" aria-selected="false" tabindex="-1">v2</button><button role="tab" aria-selected="false" tabindex="-1">v3</button></div></div>
  <div class="promptbox" aria-live="polite"></div>
  <div class="review"><span class="label">review</span><span class="review-text"></span></div>
  <div class="meter" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
</div>`;

/* ---------------- pages ---------------- */
write('index.html', shell({
  path: '/', home: true, section: 'home',
  title: 'PalmChat Innovations | Make new tech make sense',
  description: 'PalmChat Innovations designs professional learning, AI fluency, curriculum, and education products that help schools and education teams actually use new technology.',
  body: readFileSync(new URL('./partials/home.html', import.meta.url), 'utf8'),
}));

write('services/index.html', shell({
  path: '/services', section: 'services', title: 'Services | PalmChat Innovations',
  description: 'AI fluency, professional learning, computer science program design, and curriculum and product development from PalmChat Innovations.',
  body: `${pageHero({ crumbs: [['Home', '/'], ['Services']], title: 'Where I can help.', dek: 'Most engagements cross more than one of these. They usually start with a single conversation about what you are trying to implement and who needs to use it.' })}
<section class="blk pad"><div class="wrapc svc-list">${services.map((s) => `<a class="svc-row" href="/services/${s.slug}"><div><span class="label">${s.code}</span><h2>${s.name}</h2></div><div><p>${s.desc}</p><span class="for label">for ${s.audience.charAt(0).toLowerCase() + s.audience.slice(1)}</span></div><span class="go">${arrow}</span></a>`).join('')}</div></section>
<section class="blk pad"><div class="wrapc"><div class="blk-head"><h2>How engagements grow.</h2><p>Many partnerships start small. The goal is learning that keeps working after the first session.</p></div>
<ol class="growth"><li><span class="label">01</span><strong>One workshop</strong><p>A focused session that gives a team shared language and a first win.</p></li><li><span class="label">02</span><strong>A series</strong><p>Multi-session learning, so skills build over time and show up in practice.</p></li><li><span class="label">03</span><strong>Implementation</strong><p>Coaching, planning, and refinement while the work goes live.</p></li><li><span class="label">04</span><strong>Partnership</strong><p>An ongoing relationship across a year or more as needs change.</p></li></ol></div></section>
${band()}`,
}));

for (const s of services) {
  write(`services/${s.slug}.html`, shell({
    path: `/services/${s.slug}`, section: 'services', title: `${s.name} | PalmChat Innovations`,
    description: `${s.desc}`,
    body: `${pageHero({ crumbs: [['Home', '/'], ['Services', '/services'], [s.name]], title: s.name, dek: s.short, acts: `<a class="btn" href="/contact">Discuss an engagement</a>` })}
<section class="blk pad"><div class="wrapc rows">
<div class="row"><h2>What it is</h2><p>${s.desc}</p></div>
<div class="row"><h2>Who it is for</h2><p>${s.audience}</p></div>
<div class="row"><h2>The problem it addresses</h2><p>${s.problem}</p></div>
<div class="row"><h2>What PalmChat delivers</h2><p>${s.deliver}</p></div>
<div class="row"><h2>Possible formats</h2><ul class="plist">${s.formats.map((f) => `<li>${f}</li>`).join('')}</ul></div>
<div class="row"><h2>Designed to support</h2><p>${s.leaves}</p></div>
<nav class="next-links" aria-label="Other services"><span class="label">other services</span>${services.filter((x) => x.slug !== s.slug).map((x) => `<a class="link" href="/services/${x.slug}">${x.name}</a>`).join('')}</nav>
</div></section>
${band()}`,
  }));
}

write('work/index.html', shell({
  path: '/work', section: 'work', title: 'Work | PalmChat Innovations',
  description: 'Recent PalmChat Innovations work in AI fluency professional learning and education product development.',
  body: `${pageHero({ crumbs: [['Home', '/'], ['Work']], title: 'Recent work.', dek: 'Two very different projects with the same goal: something people can understand and use.' })}
<section class="blk pad"><div class="wrapc rows" style="border-top:0">${projects.map((p) => `<a class="case-row" href="/work/${p.slug}"><div><span class="label">${p.category}</span></div><div><h2>${p.name}</h2><p>${p.short}</p></div><span class="go">${arrow}</span></a>`).join('')}</div></section>
<section class="blk pad"><div class="wrapc"><div class="blk-head"><h2>Background.</h2><p>The experience behind the work, before PalmChat.</p></div>${rings(false)}</div></section>
${band()}`,
}));

for (const p of projects) {
  const rel = projects.find((x) => x.slug === p.related);
  write(`work/${p.slug}.html`, shell({
    path: `/work/${p.slug}`, section: 'work', title: `${p.name} | PalmChat Innovations`,
    description: `${p.short}`,
    body: `${pageHero({ crumbs: [['Home', '/'], ['Work', '/work'], [p.name]], title: p.name, dek: p.short })}
<section class="blk pad"><div class="wrapc case-grid">
<aside><div><span class="label">role</span><p>${p.role}</p></div><div><span class="label">context</span><p>${p.context}</p></div><div><span class="label">category</span><p>${p.category}</p></div></aside>
<div class="rows">
<div class="row"><h2>Challenge</h2><p>${p.challenge}</p></div>
<div class="row"><h2>Approach</h2><p>${p.approach}</p></div>
<div class="row"><h2>Deliverables</h2><ul class="plist">${p.deliverables.map((x) => `<li>${x}</li>`).join('')}</ul></div>
<div class="row"><h2>Tools and methods</h2><ul class="plist">${p.methods.map((x) => `<li>${x}</li>`).join('')}</ul></div>
<div class="row"><h2>Intended impact</h2><div><p>${p.impact}</p>${p.note ? `<p class="note"><strong>About this case study</strong>${p.note}</p>` : ''}</div></div>
${p.demo ? `<div class="row"><h2>Try the approach</h2><div class="demo-wrap"><p>An original example of the prompting skill at the center of this work. Step through three drafts of the same request.</p><div style="margin-top:20px">${refiner}</div></div></div>` : ''}
<nav class="next-links" aria-label="Related work"><span class="label">related</span><a class="link" href="/work/${rel.slug}">${rel.name}</a><a class="link" href="/work">All work</a></nav>
</div></div></section>
${band()}`,
  }));
}

write('about/index.html', shell({
  path: '/about', section: 'about', title: 'About Edwin Jaquez | PalmChat Innovations',
  description: 'Edwin Jaquez is an educator, computer science teacher, learning designer, and builder, and the founder of PalmChat Innovations.',
  body: `${pageHero({ crumbs: [['Home', '/'], ['About']], title: 'Educator first. Builder always.', dek: 'I am Edwin Jaquez, founder of PalmChat Innovations. I help people make sense of new technology, then put it to work.', acts: `<a class="btn" href="/contact">Start a conversation</a>` })}
<section class="blk pad"><div class="wrapc contact-grid">
<div class="bio"><p class="lead-line">I have taught computer science, led a school, coached teachers across New York City, and built software. PalmChat brings all of it into one place.</p>
<p>My work sits where education and technology meet: professional learning, AI fluency, curriculum, and the products and workflows that help people actually adopt something new.</p>
<p>The question I keep coming back to: how can people use this technology well, responsibly, and for long enough that it matters?</p>
<p>Why the bird? The cigua palmera is the Dominican Republic's national bird. Palmchats build their nests together in the crowns of royal palms. That is how I like to work.</p>
<p class="facts"><span><b>Based in</b> New York City</span><span><b>Works in</b> English, Español, Português</span></p></div>
${rings(true)}
</div></section>
${band()}`,
}));

write('contact/index.html', shell({
  path: '/contact', section: 'contact', title: 'Contact | PalmChat Innovations',
  description: 'Contact PalmChat Innovations about AI fluency, professional learning, computer science, curriculum, or education product work.',
  body: `${pageHero({ crumbs: [['Home', '/'], ['Contact']], title: 'What are you trying to make sense of?', dek: 'Tell me what you are implementing, who needs to use it, and what is in the way. A short email is a great start.' })}
<section class="blk pad"><div class="wrapc contact-grid">
<div><div class="mail-row" style="margin-top:0"><span class="addr" id="addr">${EMAIL}</span><button class="btn" type="button" data-copy="addr" data-out="copied">Copy email</button></div><p class="copied" id="copied" aria-live="polite"></p><p style="margin-top:18px"><a class="link" href="mailto:${EMAIL}">Email Edwin</a></p></div>
<dl class="dl"><div><dt>based in</dt><dd>New York City</dd></div><div><dt>available for</dt><dd>Remote and on-site engagements</dd></div><div><dt>works with</dt><dd>Schools, districts, nonprofits, education companies, and learning teams</dd></div><div><dt>languages</dt><dd>English, Español, Português</dd></div></dl>
</div></section>`,
}));

write('resources/index.html', shell({
  path: '/resources', section: 'resources', title: 'Resources | PalmChat Innovations',
  description: 'PalmChat resources on AI fluency, computer science, professional learning, and curriculum are in development.',
  body: `${pageHero({ crumbs: [['Home', '/'], ['Resources']], title: 'Resources are on the way.', dek: 'Practical frameworks, discussion tools, and learning materials on AI fluency, computer science, and professional learning. Have a topic in mind? Tell me what would help your team.', acts: `<a class="btn" href="mailto:${EMAIL}?subject=PalmChat%20resource%20updates">Request updates</a>` })}
${band()}`,
}));

write('privacy.html', shell({
  path: '/privacy', section: '', title: 'Privacy | PalmChat Innovations',
  description: 'Privacy information for the PalmChat Innovations website.',
  body: `${pageHero({ crumbs: [['Home', '/'], ['Privacy']], title: 'Privacy', dek: 'How information you share with PalmChat Innovations is handled.' })}
<section class="blk pad"><div class="wrapc legal"><h2>Email inquiries</h2><p>This website does not collect inquiries through a form. Email links open your email application so you can contact Edwin directly at ${EMAIL}. Please avoid including sensitive student or confidential information.</p><h2>How information is used</h2><p>Inquiry information is used to understand your request and respond. It is not presented publicly or used to create public claims without permission.</p><h2>Questions</h2><p>Email <a href="mailto:${EMAIL}">${EMAIL}</a>.</p></div></section>`,
}));

console.log('Generated PalmChat site.');
