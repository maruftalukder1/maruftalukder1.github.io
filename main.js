/* ═══════════════════════════════════════════════════════════
   THE DISPATCH — main.js
   Clean, premium editorial — all content + interactivity
   ═══════════════════════════════════════════════════════════ */
'use strict';

/* ── Image helper (picsum with seed = consistent images) ── */
const img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* ═══════════════════════════════════════════════════════════
   THEME
   ═══════════════════════════════════════════════════════════ */
let theme = localStorage.getItem('dispatch-theme') || 'dark';
const applyTheme = t => {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('dispatch-theme', t);
  theme = t;
};
applyTheme(theme);
document.getElementById('themeBtn').addEventListener('click', () =>
  applyTheme(theme === 'dark' ? 'light' : 'dark')
);

/* ═══════════════════════════════════════════════════════════
   GREETING (Dhaka UTC+6)
   ═══════════════════════════════════════════════════════════ */
function updateGreeting() {
  const now = new Date();
  const dhaka = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 6 * 3600000);
  const h = dhaka.getHours();
  const g = h >= 5 && h < 12 ? 'Good Morning' : h >= 12 && h < 17 ? 'Good Afternoon' : h >= 17 && h < 21 ? 'Good Evening' : 'Good Night';
  document.getElementById('greeting').textContent = g;
  document.getElementById('dateTime').textContent = dhaka.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });
}
updateGreeting();
setInterval(updateGreeting, 30000);

/* ═══════════════════════════════════════════════════════════
   BREAKING BAR
   ═══════════════════════════════════════════════════════════ */
document.getElementById('breakingClose').addEventListener('click', () => {
  document.getElementById('breakingBar').classList.add('dismissed');
});

/* ═══════════════════════════════════════════════════════════
   SEARCH
   ═══════════════════════════════════════════════════════════ */
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
document.getElementById('searchBtn').addEventListener('click', () => {
  searchOverlay.classList.add('open');
  setTimeout(() => searchInput.focus(), 150);
});
searchOverlay.addEventListener('click', e => {
  if (e.target === searchOverlay) searchOverlay.classList.remove('open');
});
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') searchOverlay.classList.remove('open');
});

/* ═══════════════════════════════════════════════════════════
   HERO GRID — 4 weighted stories with skeleton first
   ═══════════════════════════════════════════════════════════ */
const heroData = [
  {
    tag: 'Breaking', color: 'red',
    img: img('dohasummit2025', 900, 630),
    hl: 'Diplomatic Channels Reopen as Three-Nation Summit Yields Preliminary Ceasefire Framework',
    excerpt: 'Senior envoys from Egypt, Qatar, and the United States emerged from a 14-hour closed session announcing preliminary agreement on hostage release sequencing and humanitarian corridor access.',
    author: 'Sarah Reinholt', desk: 'Jerusalem Bureau', time: '6 min read',
  },
  {
    tag: 'Analysis', color: 'blue',
    img: img('beirutcoast', 600, 400),
    hl: "Lebanon's Economic Collapse and Its Northern Border Consequences",
    author: 'Chloé Bergmann', desk: 'Beirut', time: '7 min',
  },
  {
    tag: 'World', color: 'green',
    img: img('viennaiaea', 600, 400),
    hl: 'IAEA Inspectors Denied Access at Natanz for Third Consecutive Month',
    author: 'Dr. Nadia Farsi', desk: 'Iran Desk', time: '10 min',
  },
  {
    tag: 'Breaking', color: 'red',
    img: img('protestrally', 600, 400),
    hl: 'Tel Aviv Protest Movement Plans Largest Rally in Six Months',
    author: 'Yael Cohen', desk: 'Tel Aviv', time: '4 min',
  },
];

function renderHero() {
  const grid = document.getElementById('heroGrid');
  // Show skeletons first
  grid.innerHTML = Array(4).fill(0).map(() => `
    <div class="hero-card skeleton">
      <div class="hero-overlay">
        <div class="skel-line w40"></div>
        <div class="skel-line w80"></div>
        <div class="skel-line w60"></div>
      </div>
    </div>
  `).join('');

  // Replace with real content after simulated load
  setTimeout(() => {
    grid.innerHTML = heroData.map((s, i) => `
      <article class="hero-card" aria-label="${s.hl}">
        <img src="${s.img}" alt="${s.hl}" loading="${i === 0 ? 'eager' : 'lazy'}" />
        <div class="hero-overlay">
          <span class="hero-tag"><span class="tag-dot ${s.color}"></span>${s.tag}</span>
          <h${i === 0 ? 1 : 3} class="hero-headline">${s.hl}</h${i === 0 ? 1 : 3}>
          ${s.excerpt ? `<p class="hero-excerpt">${s.excerpt}</p>` : ''}
          <div class="hero-meta">${s.author} · ${s.desk} · ${s.time}</div>
        </div>
      </article>
    `).join('');
  }, 600);
}
renderHero();

/* ═══════════════════════════════════════════════════════════
   TICKER
   ═══════════════════════════════════════════════════════════ */
const tickerData = [
  { time: '21:08', text: 'Israeli cabinet convenes emergency session; PM briefed on northern sector' },
  { time: '20:54', text: 'Qatari PM says ceasefire parties "closer than ever" — reports suggest' },
  { time: '20:31', text: 'State Department reaffirms two-state commitment, urges "maximum restraint"' },
  { time: '20:12', text: 'French FM calls for emergency EU foreign policy summit' },
  { time: '19:58', text: 'Egyptian delegation returns from Doha; "significant common ground" cited' },
  { time: '19:22', text: 'UNIFIL: reduced fire exchanges along Blue Line; three incidents in 24h' },
  { time: '19:05', text: 'UN Security Council adjourns without resolution; U.S. veto expected Tuesday' },
];
const tickerEl = document.getElementById('tickerContent');
const allTickers = [...tickerData, ...tickerData];
tickerEl.innerHTML = allTickers.map(t =>
  `<span class="ticker-item"><span class="ticker-time">[${t.time}]</span>${t.text}</span>`
).join('');

/* ═══════════════════════════════════════════════════════════
   STORY FEED
   ═══════════════════════════════════════════════════════════ */
const stories = [
  {
    tag: 'breaking', img: img('dohaagreement', 480, 320),
    hl: 'Three-Way Doha Summit Yields Preliminary Ceasefire Accord; Ratification Pending',
    excerpt: "After 14 hours of closed-door negotiations, senior envoys announced a preliminary framework covering hostage release sequencing and humanitarian corridor access across four designated crossing points. Officials cautioned that core territorial provisions remain 'bracketed' — diplomatic language indicating agreement in principle subject to leadership ratification.",
    author: 'Sarah Reinholt', desk: 'Jerusalem Bureau', time: '6 min',
  },
  {
    tag: 'analysis', img: img('lebaneseeconomy', 480, 320),
    hl: "Lebanon's Economic Free Fall: Security Implications for Israel's Northern Border",
    excerpt: "With the Lebanese pound at its lowest recorded exchange rate and Banque du Liban reporting effective reserve depletion, the structural conditions for consolidation of non-state influence in the south have rarely been more favourable.",
    author: 'Chloé Bergmann', desk: 'Beirut Correspondent', time: '7 min',
  },
  {
    tag: 'analysis', img: img('natanzfacility', 480, 320),
    hl: 'IAEA Inspectors Denied Access at Natanz for Third Consecutive Month',
    excerpt: "The refusal to grant scheduled inspection access to centrifuge hall B-6 represents a pattern that senior IAEA officials describe as a 'systematic deviation' from the safeguards agreement — though the term 'violation' has been carefully avoided in official language.",
    author: 'Dr. Nadia Farsi', desk: 'Iran Desk · Reuters', time: '10 min',
  },
  {
    tag: 'breaking', img: img('israelprotest', 480, 320),
    hl: 'Tel Aviv Protest Movement Plans Largest Rally in Six Months for Saturday',
    excerpt: "Organisers of the hostage families coalition confirmed Saturday's demonstration will depart from Habima Square. Advance registration exceeded 58,000 as of this afternoon. Police have allocated two additional units to manage the Ayalon corridor.",
    author: 'Yael Cohen', desk: 'Tel Aviv Bureau', time: '4 min',
  },
  {
    tag: 'world', img: img('saudidiplomacy', 480, 320),
    hl: "Saudi Arabia Calls for 'Immediate Unconditional' Humanitarian Access",
    excerpt: 'The Saudi Foreign Ministry issued a statement Friday evening supporting ceasefire efforts and calling for all parties to ensure unimpeded access for international humanitarian organisations across all designated corridors.',
    author: 'Daniel Masri', desk: 'Gulf Correspondent', time: '5 min',
  },
];

function renderStories() {
  document.getElementById('storyFeed').innerHTML = stories.map(s => `
    <article class="story-card" role="article">
      <div class="sc-body">
        <span class="sc-tag ${s.tag}">${s.tag.toUpperCase()}</span>
        <h3 class="sc-headline">${s.hl}</h3>
        <p class="sc-excerpt">${s.excerpt}</p>
        <div class="sc-meta">
          <span>${s.author}</span>
          <span class="dot">·</span>
          <span>${s.desk}</span>
        </div>
      </div>
      <div class="sc-img">
        <img src="${s.img}" alt="${s.hl}" loading="lazy" />
        <span class="reading-time">${s.time}</span>
      </div>
    </article>
  `).join('');
}
renderStories();

/* ═══════════════════════════════════════════════════════════
   OPINION
   ═══════════════════════════════════════════════════════════ */
const opinions = [
  {
    hl: 'The Case for Immediate Unilateral De-escalation',
    thesis: 'When diplomatic frameworks reach ratification, unilateral military actions impose costs that exceed tactical gains. The 72-hour window is a test of strategic patience few leaders have passed.',
    name: 'Prof. Amira Mansour', org: 'Georgetown University', color: '#a78bfa', init: 'AM',
  },
  {
    hl: 'Why Deterrence Remains Israel\'s Core Security Doctrine',
    thesis: 'Forty years of evidence demonstrates that diplomatic agreements unaccompanied by credible deterrence do not hold. The question is which negotiating position commands respect at the table.',
    name: 'Brig. Gen. (Ret.) D. Cohen', org: 'IDC Herzliya', color: '#3b82f6', init: 'DC',
  },
  {
    hl: "France's Quiet Middle East Realignment",
    thesis: "Macron's overtures to Gulf monarchies and distancing from EU solidarity positions suggests a Gaullist recalibration driven by energy arithmetic and Francophone soft-power competition.",
    name: 'Dr. Sophie Renard', org: 'Sciences Po', color: '#22c55e', init: 'SR',
  },
  {
    hl: 'The Demographic Arithmetic of a One-State Outcome',
    thesis: 'Six demographic scenarios converge on one conclusion: the conditions for a viable two-state arrangement narrow significantly with each passing year. This is not advocacy — it is arithmetic.',
    name: 'Dr. Rami Khalidi', org: 'Columbia University', color: '#ef4444', init: 'RK',
  },
];

function renderOpinions() {
  document.getElementById('opinionFeed').innerHTML = opinions.map(o => `
    <article class="opinion-card" role="article">
      <div class="oc-disclaimer">⚑ Opinion</div>
      <h3 class="oc-headline">${o.hl}</h3>
      <p class="oc-thesis">${o.thesis}</p>
      <div class="oc-footer">
        <div class="oc-avatar" style="background:${o.color}">${o.init}</div>
        <div>
          <div class="oc-name">${o.name}</div>
          <div class="oc-org">${o.org}</div>
        </div>
      </div>
    </article>
  `).join('');
}
renderOpinions();

/* ═══════════════════════════════════════════════════════════
   MOST READ
   ═══════════════════════════════════════════════════════════ */
const mostRead = [
  { hl: 'Doha Framework: Full Text of the Accord, Annotated', meta: '18,420 reads' },
  { hl: "What IAEA Inspectors Found — and Didn't — at Natanz", meta: '12,880 reads' },
  { hl: 'The Demographic Arithmetic of a One-State Outcome', meta: '10,100 reads' },
  { hl: "Lebanon's Currency at Historic Low: A Visual Explainer", meta: '8,640 reads' },
  { hl: 'Who Are the Three Key Negotiators in the Doha Room?', meta: '7,220 reads' },
];

document.getElementById('mostRead').innerHTML = mostRead.map((r, i) => `
  <li class="mr-item">
    <span class="mr-rank">${i + 1}</span>
    <div>
      <div class="mr-hl">${r.hl}</div>
      <div class="mr-meta">${r.meta}</div>
    </div>
  </li>
`).join('');

/* ═══════════════════════════════════════════════════════════
   PULSE FEED
   ═══════════════════════════════════════════════════════════ */
const pulseData = [
  { time: '21:08', loc: 'JERUSALEM', hl: 'Security cabinet convenes; PM receives military briefing on northern sector' },
  { time: '20:54', loc: 'DOHA', hl: 'Second revised framework submitted; Qatari FM says parties "still talking"' },
  { time: '20:31', loc: 'WASHINGTON', hl: 'State Dept confirms U.S. "engaged at the highest diplomatic levels"' },
  { time: '20:12', loc: 'PARIS', hl: 'EU foreign ministers call joint humanitarian monitoring mechanism' },
  { time: '19:58', loc: 'CAIRO', hl: 'Egyptian FM returns from undisclosed regional meeting; no comment' },
  { time: '19:40', loc: 'RAMALLAH', hl: 'PA sources signal "conditional flexibility" on border security — unverified' },
  { time: '19:22', loc: 'BEIRUT', hl: 'UNIFIL confirms three fire exchanges; "below threshold of escalation"' },
  { time: '19:05', loc: 'NEW YORK', hl: 'UNSC procedural motion fails 7–8; U.S. veto expected Tuesday' },
];

document.getElementById('pulseFeed').innerHTML = pulseData.map(p => `
  <div class="pulse-item">
    <div class="pi-top">
      <span class="pi-time">[${p.time}]</span>
      <span style="opacity:.3;font-size:.5rem">·</span>
      <span class="pi-loc">${p.loc}</span>
    </div>
    <p class="pi-hl">${p.hl}</p>
  </div>
`).join('');

/* ═══════════════════════════════════════════════════════════
   HEADER HIDE ON SCROLL
   ═══════════════════════════════════════════════════════════ */
let lastY = 0;
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('hide', y > lastY && y > 120);
  lastY = y;

  // Back to top
  document.getElementById('btt').classList.toggle('show', y > 500);

  // Reading progress
  const max = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('readingProgress').style.width = `${(y / max) * 100}%`;
}, { passive: true });

document.getElementById('btt').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════════════════ */
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'none';
      revealIO.unobserve(e.target);
    }
  });
}, { threshold: 0.06 });

function initReveal() {
  document.querySelectorAll('.story-card, .opinion-card, .mr-item, .newsletter-cta').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity .45s ${i * .03}s ease, transform .45s ${i * .03}s ease`;
    revealIO.observe(el);
  });
}
// wait a tick so DOM is populated
setTimeout(initReveal, 700);

/* ═══════════════════════════════════════════════════════════
   NEWSLETTER
   ═══════════════════════════════════════════════════════════ */
document.getElementById('nlForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('.nl-btn');
  btn.textContent = '✓ Subscribed!';
  btn.style.background = '#22c55e';
  setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 3000);
});

/* ═══════════════════════════════════════════════════════════
   PAYWALL
   ═══════════════════════════════════════════════════════════ */
const pw = document.getElementById('paywallOverlay');
document.getElementById('paywallClose').addEventListener('click', () => pw.classList.remove('open'));
document.querySelector('.free-counter')?.addEventListener('click', () => pw.classList.add('open'));

/* ═══════════════════════════════════════════════════════════
   NAV ACTIVE
   ═══════════════════════════════════════════════════════════ */
const navIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.nav-a').forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-a[href="#${e.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.3 });
['news', 'opinion'].forEach(id => {
  const el = document.getElementById(id);
  if (el) navIO.observe(el);
});
