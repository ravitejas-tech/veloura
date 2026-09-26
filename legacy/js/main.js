/* Veloura: interactions */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- nav ---------- */
  const nav = $('#nav');
  const menuBtn = $('#menuBtn');
  const navLinks = $('#navLinks');

  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') !== 'true';
    menuBtn.setAttribute('aria-expanded', String(open));
    navLinks.classList.toggle('open', open);
  });
  $$('a', navLinks).forEach((a) =>
    a.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    })
  );

  /* ---------- bag + toast ---------- */
  const bagCount = $('#bagCount');
  const toast = $('#toastBag');
  let bag = 0;
  let toastTimer;

  const addToBag = (qty, message) => {
    bag += qty;
    bagCount.textContent = bag;
    bagCount.classList.remove('bump');
    void bagCount.offsetWidth; // restart animation
    bagCount.classList.add('bump');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  };

  $$('.add-btn').forEach((btn) =>
    btn.addEventListener('click', () => {
      const name = btn.closest('.card').querySelector('h3').textContent;
      addToBag(1, `✦ ${name} added to your bag`);
      btn.classList.add('added');
      btn.textContent = '✓';
      setTimeout(() => {
        btn.classList.remove('added');
        btn.textContent = '+';
      }, 1400);
    })
  );

  /* ---------- scroll reveal ---------- */
  const revealIO = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        revealIO.unobserve(e.target);
      }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  $$('.reveal').forEach((el) => {
    // stagger siblings that reveal together
    const siblings = $$(':scope > .reveal', el.parentElement);
    const i = siblings.indexOf(el);
    if (i > 0) el.style.transitionDelay = `${Math.min(i, 6) * 90}ms`;
    revealIO.observe(el);
  });

  /* ---------- hero: stat counter ---------- */
  const counter = $('[data-count]');
  if (counter) {
    const target = +counter.dataset.count;
    const run = () => {
      if (reduceMotion) return (counter.textContent = `${target.toLocaleString()}+`);
      const start = performance.now();
      const dur = 1800;
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        counter.textContent = `${Math.round(target * eased).toLocaleString()}${p === 1 ? '+' : ''}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    setTimeout(run, 900); // after the proof row has faded in
  }

  /* ---------- hero: pointer parallax ---------- */
  const heroArt = $('#heroArt');
  if (heroArt && finePointer && !reduceMotion) {
    const layers = $$('[data-depth]', heroArt);
    let tx = 0, ty = 0, cx = 0, cy = 0, raf;
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      layers.forEach((l) => {
        const d = +l.dataset.depth;
        l.style.translate = `${cx * d * 22}px ${cy * d * 22}px`;
      });
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(loop) : null;
    };
    window.addEventListener('pointermove', (e) => {
      if (window.scrollY > window.innerHeight) return;
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(loop);
    });
  }

  /* ---------- ribbons & gallery: duplicate for seamless loop ---------- */
  [...$$('.ribbon-track'), $('#momentsTrack')].forEach((track) => {
    if (!track) return;
    const clone = track.innerHTML;
    track.insertAdjacentHTML('beforeend', clone);
    $$(':scope > *', track)
      .slice(track.children.length / 2)
      .forEach((c) => c.setAttribute('aria-hidden', 'true'));
  });

  /* ---------- occasions: expanding panels ---------- */
  const panels = $$('.panel');
  const openPanel = (panel) => panels.forEach((p) => p.classList.toggle('is-open', p === panel));
  panels.forEach((panel) => {
    if (finePointer) panel.addEventListener('mouseenter', () => openPanel(panel));
    panel.addEventListener('click', () => openPanel(panel));
    panel.addEventListener('focus', () => openPanel(panel));
  });

  /* ---------- lavender edit: filters ---------- */
  const chips = $$('.chip');
  const cards = $$('#bento .card');
  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      chips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-selected', String(active));
      });
      const f = chip.dataset.filter;
      cards.forEach((card) => {
        const cats = card.dataset.cat.split(' ');
        const show = f === 'all' || cats.includes('all') || cats.includes(f);
        if (show) {
          card.classList.remove('is-hidden');
          card.classList.add('is-hiding');
          requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove('is-hiding')));
        } else {
          card.classList.add('is-hiding');
          setTimeout(() => card.classList.contains('is-hiding') && card.classList.add('is-hidden'), 350);
        }
      });
    })
  );

  /* ---------- build a box ---------- */
  const gift = $('#gift');
  const giftItems = $('#giftItems');
  const picks = $$('.pick');
  const summaryCount = $('#summaryCount');
  const summaryTotal = $('#summaryTotal');
  const addBoxBtn = $('#addBox');
  const noteInput = $('#note');
  const tagText = $('#tagText');
  const defaultNote = noteInput.placeholder;
  const giftGlow = $('#giftGlow');
  const confetti = $('#confetti');
  const BOX_FEE = 12; // wrapping + ribbon + card
  const CONFETTI_COLORS = ['#cdb4f0', '#ae91de', '#efb7cc', '#f6d79a', '#ffffff', '#a7c4b5'];
  const giftCards = new Map(); // pick button -> card element
  let chosen = [];

  const rand = (min, max) => min + Math.random() * (max - min);

  const burst = (count, spreadX, height) => {
    if (reduceMotion) return;
    const ribbon = getComputedStyle(gift).getPropertyValue('--ribbon').trim();
    const colors = [...CONFETTI_COLORS, ribbon];
    for (let i = 0; i < count; i++) {
      const star = i % 7 === 0;
      const el = document.createElement(star ? 'b' : 'i');
      if (star) el.textContent = '✦';
      const w = star ? rand(12, 20) : rand(6, 11);
      const round = !star && Math.random() < 0.35;
      el.style.cssText = [
        `--w:${w}px`,
        `--h:${round ? w : w * rand(1.4, 2.2)}px`,
        `--br:${round ? '50%' : '2px'}`,
        `--c:${colors[Math.floor(Math.random() * colors.length)]}`,
        `--dx:${rand(-spreadX, spreadX)}px`,
        `--dy:${-rand(height * 0.45, height)}px`,
        `--fall:${rand(180, 320)}px`,
        `--rot:${rand(-900, 900)}deg`,
        `--dur:${rand(1.3, 2.1)}s`,
      ].join(';');
      el.addEventListener('animationend', () => el.remove());
      confetti.appendChild(el);
    }
  };

  const celebrate = (big = false) => {
    burst(big ? 90 : 34, big ? 320 : 190, big ? 380 : 280);
    giftGlow.classList.remove('flash');
    void giftGlow.offsetWidth;
    giftGlow.classList.add('flash');
    gift.classList.remove('hop');
    void gift.offsetWidth;
    gift.classList.add('hop');
  };

  // fan the cards like a hand: spread and tilt shrink as more are added
  const layoutCards = () => {
    const n = chosen.length;
    const mid = (n - 1) / 2;
    const maxSpread = window.innerWidth < 600 ? 170 : 240;
    const step = n > 1 ? Math.min(64, maxSpread / (n - 1)) : 0;
    const tilt = n > 1 ? Math.min(12, 36 / (n - 1)) : 0;
    chosen.forEach((p, i) => {
      const card = giftCards.get(p);
      const off = i - mid;
      card.style.setProperty('--x', `${off * step}px`);
      card.style.setProperty('--r', `${off * tilt}deg`);
      card.style.setProperty('--y', `${off * off * 5}px`);
      card.style.zIndex = String(i + 1);
    });
    giftItems.classList.toggle("many", n >= 4); // captions would only peek out between cards
  };

  const addCard = (pick) => {
    const card = document.createElement('figure');
    card.className = 'gift-card is-new';
    card.innerHTML = `<img src="${pick.dataset.img}" alt="${pick.dataset.name}" /><figcaption>${pick.dataset.name}</figcaption>`;
    card.addEventListener('animationend', () => card.classList.remove('is-new'), { once: true });
    giftCards.set(pick, card);
    giftItems.appendChild(card);
  };

  const removeCard = (pick) => {
    const card = giftCards.get(pick);
    giftCards.delete(pick);
    card.classList.remove('is-new');
    card.classList.add('is-leaving');
    setTimeout(() => card.remove(), 500);
  };

  // warm the cache so a card never pops up blank
  picks.forEach((p) => { new Image().src = p.dataset.img; });

  const renderBox = () => {
    const n = chosen.length;
    layoutCards();
    gift.classList.toggle('is-open', n > 0);
    const total = chosen.reduce((s, p) => s + +p.dataset.price, 0);
    summaryTotal.textContent = n ? `$${total + BOX_FEE}` : '$0';
    summaryCount.textContent = n
      ? `${n} ${n === 1 ? 'treasure' : 'treasures'} · includes $${BOX_FEE} hand-wrapping`
      : 'Your box is empty. Add a little something.';
    addBoxBtn.disabled = n === 0;
  };

  picks.forEach((pick) =>
    pick.addEventListener('click', () => {
      const on = pick.getAttribute('aria-pressed') !== 'true';
      pick.setAttribute('aria-pressed', String(on));
      if (on) {
        chosen = [...chosen, pick];
        addCard(pick);
        celebrate();
      } else {
        chosen = chosen.filter((p) => p !== pick);
        removeCard(pick);
      }
      renderBox();
    })
  );

  $$('.swatch').forEach((sw) =>
    sw.addEventListener('click', () => {
      $$('.swatch').forEach((s) => s.classList.toggle('is-active', s === sw));
      gift.style.setProperty('--ribbon', sw.dataset.ribbon);
    })
  );

  noteInput.addEventListener('input', () => {
    tagText.textContent = noteInput.value.trim() || defaultNote;
  });

  // finale: everything tucks into the box, the lid snaps shut, confetti everywhere
  addBoxBtn.addEventListener('click', () => {
    const count = chosen.length;
    addBoxBtn.disabled = true;
    chosen.forEach(removeCard);
    picks.forEach((p) => p.setAttribute('aria-pressed', 'false'));
    chosen = [];
    setTimeout(renderBox, 350);
    setTimeout(() => {
      celebrate(true);
      addToBag(1, `✦ Your custom box (${count} ${count === 1 ? 'item' : 'items'}) is in the bag`);
    }, 900);
  });

  /* ---------- story: sticky image swap ---------- */
  const storyImgs = $$('.story-frame img');
  const storyBar = $('#storyBar');
  const steps = $$('.story-step');
  const setStep = (i) => {
    steps.forEach((s, j) => s.classList.toggle('is-active', j === i));
    storyImgs.forEach((img, j) => img.classList.toggle('is-active', j === i));
    storyBar.style.width = `${((i + 1) / steps.length) * 100}%`;
  };
  const stepIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && setStep(+e.target.dataset.step)),
    { rootMargin: '-45% 0px -45% 0px' }
  );
  steps.forEach((s) => stepIO.observe(s));
  setStep(0);

  /* ---------- lavender field parallax ---------- */
  const fieldBg = $('#fieldBg');
  if (fieldBg && !reduceMotion) {
    const field = fieldBg.parentElement;
    let ticking = false;
    const update = () => {
      const r = field.getBoundingClientRect();
      const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      fieldBg.style.transform = `translate3d(0, ${progress * -12}%, 0) scale(1.05)`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- newsletter ---------- */
  const form = $('#letterForm');
  const msg = $('#formMsg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = 'Hmm, that address looks a little off.';
      return;
    }
    msg.textContent = 'Sealed with love. Check your inbox for 10% off ✦';
    form.reset();
  });
})();
