/* ============================================================================
   Sorol Wash: page behaviour. The engine (scrollcraft.js) is untouched; this
   file reads each act's --sc-p and owns everything bespoke:
     1. the Detailing Docket (selection state -> WhatsApp message)
     2. the scroll-then-drag before/after wipe
     3. the act 4 rail (RTL-correct, second half of the pin)
   ========================================================================== */
(function () {
  'use strict';

  /* ---- 1. owner config: change these and nothing else ---------------------- */
  var SOROL_CONFIG = {
    businessName: 'Sorol Wash',
    whatsappNumber: '972535254992',   // WhatsApp number, international format, no +
    phoneDisplay: '053-525-4992',     // phone number as shown to visitors
    instagramUrl: 'https://instagram.com/sorol_wash', // TODO: real Instagram URL
    instagramHandle: '@sorol_wash',
    serviceAreaLabel: 'הגעה עד הבית והמשרד · אזור השרון והמרכז' // TODO: real service area
  };

  /* Before/after pairs. `before: null` renders the labelled placeholder. Drop a
     real photo path into `before` (same framing as `after`) and it goes live. */
  var BA_PAIRS = [
    { before: 'assets/ba-swift-before.webp', after: 'assets/ba-swift-after.webp',
      alt: 'סוזוקי סוויפט שחורה ונקייה אחרי השבחת הצבע והדיטיילינג', beforeAlt: 'סוזוקי סוויפט שחורה לפני הטיפול, עם שפשופים בצבע' },
    { before: 'assets/ba-tucson-interior-before.webp', after: 'assets/ba-tucson-interior-after.webp',
      alt: 'מושבים אחוריים נקיים ביונדאי אחרי הטיפול', beforeAlt: 'מושב אחורי ביונדאי לפני הטיפול, עם כתמים' }
  ];

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function clamp(v, a, b) { return Math.min(b === undefined ? 1 : b, Math.max(a === undefined ? 0 : a, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function pOf(el) { return parseFloat(el.style.getPropertyValue('--sc-p')) || 0; }

  /* ---- contact wiring ------------------------------------------------------ */
  $$('[data-ig]').forEach(function (a) { a.href = SOROL_CONFIG.instagramUrl; });
  $$('[data-ig-handle]').forEach(function (n) { n.textContent = SOROL_CONFIG.instagramHandle; });
  $$('[data-phone]').forEach(function (a) {
    a.textContent = SOROL_CONFIG.phoneDisplay;
    a.href = 'tel:' + SOROL_CONFIG.phoneDisplay.replace(/[^0-9+]/g, '');
  });
  var areaEl = $('#areaLabel'), footArea = $('#footArea');
  if (areaEl) areaEl.textContent = SOROL_CONFIG.serviceAreaLabel;
  if (footArea) footArea.textContent = SOROL_CONFIG.serviceAreaLabel;
  if (/^9725?0{7,}$/.test(SOROL_CONFIG.whatsappNumber)) {
    console.warn('[Sorol Wash] SOROL_CONFIG.whatsappNumber is still the placeholder. WhatsApp links will not reach a real chat.');
  }

  /* ---- 2. the docket: selection state -> WhatsApp message ------------------ */
  var pills = $$('.pill');
  var catToggles = $$('[data-cat-toggle]');
  var selected = new Set();
  var chipsEl = $('#chips');

  function labelOf(pill) { return pill.querySelector('span').textContent.trim(); }
  function idsInCat(cat) {
    return pills.filter(function (p) { return p.dataset.cat === String(cat); })
                .map(function (p) { return p.dataset.id; });
  }

  /* Optional booking-form fields. All of them are optional; the parking-area line is always present so the
     customer can type it in WhatsApp if they skipped the field. */
  function field(id) { var el = document.getElementById(id); return el ? el.value.replace(/\s+/g, ' ').trim() : ''; }

  function buildWhatsAppUrl(labels) {
    var base = 'https://wa.me/' + SOROL_CONFIG.whatsappNumber;
    var lines = labels.length > 0
      ? ['היי ' + SOROL_CONFIG.businessName + ', אשמח לתאם הגעה ולשמוע פרטים עבור השירותים הבאים שסימנתי באתר:']
          .concat(labels.map(function (s) { return '• ' + s; }))
      : ['היי ' + SOROL_CONFIG.businessName + ', אשמח לתאם שטיפה ודיטיילינג לרכב שלי עד הבית.'];
    var name = field('f-name'), area = field('f-area');
    if (name) lines.push('שם: ' + name);
    lines.push('אזור חניה: ' + area);
    return base + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  function countText(n) {
    if (n === 0) return 'לא נבחרו שירותים: תיאום כללי';
    if (n === 1) return 'נבחר שירות אחד לרכב שלך';
    return 'נבחרו ' + n + ' שירותים לרכב שלך';
  }

  var ICON_X = '<svg class="ico ico--stroke" aria-hidden="true"><use href="#i-x"/></svg>';
  var CAT_NAMES = { 1: 'מעטפת חוץ וגלגלים', 2: 'פנים וקיטור', 3: 'פוליש ודיטיילינג' };

  /* The closing card lists every service as a toggle, grouped by category, so a visitor can add or
     remove any service from either place. It mirrors the menu; it does not hold a separate list. */
  function renderChips() {
    if (!chipsEl) return;
    chipsEl.textContent = '';
    [1, 2, 3].forEach(function (c) {
      var group = document.createElement('div');
      group.className = 'chips__group';
      var label = document.createElement('p');
      label.className = 'chips__label';
      label.textContent = CAT_NAMES[c];
      group.appendChild(label);
      var row = document.createElement('div');
      row.className = 'chips__row';
      pills.filter(function (p) { return p.dataset.cat === String(c); }).forEach(function (p) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip';
        b.setAttribute('data-toggle', p.dataset.id);
        b.setAttribute('aria-pressed', selected.has(p.dataset.id) ? 'true' : 'false');
        b.textContent = labelOf(p);
        row.appendChild(b);
      });
      group.appendChild(row);
      chipsEl.appendChild(group);
    });
  }

  function render() {
    var labels = [];
    pills.forEach(function (p) {
      var on = selected.has(p.dataset.id);
      p.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on) labels.push(labelOf(p));
    });
    catToggles.forEach(function (t) {
      var ids = idsInCat(t.dataset.catToggle);
      var all = ids.every(function (i) { return selected.has(i); });
      t.setAttribute('aria-pressed', all ? 'true' : 'false');
      t.textContent = all ? 'בטל את כל הקטגוריה' : 'בחר את כל הקטגוריה';
    });
    [1, 2, 3].forEach(function (c) {
      var n = idsInCat(c).filter(function (i) { return selected.has(i); }).length;
      var b = $('[data-count-cat="' + c + '"]');
      if (b) { b.hidden = n === 0; b.textContent = n === 0 ? '' : 'נבחרו ' + n; }
    });
    var text = countText(labels.length);
    ['#docketCount', '#plateCount'].forEach(function (s) { var n = $(s); if (n) n.textContent = text; });
    var url = buildWhatsAppUrl(labels);
    $$('[data-wa]').forEach(function (a) { a.href = url; });
    renderChips();
  }

  function toggleCategory(cat) {
    var ids = idsInCat(cat);
    var all = ids.every(function (i) { return selected.has(i); });
    ids.forEach(function (i) { if (all) selected.delete(i); else selected.add(i); });
    render();
  }

  pills.forEach(function (p) {
    p.addEventListener('click', function () {
      var id = p.dataset.id;
      if (selected.has(id)) selected.delete(id); else selected.add(id);
      render();
    });
  });
  catToggles.forEach(function (t) {
    t.addEventListener('click', function () { toggleCategory(t.dataset.catToggle); });
  });
  ['f-name', 'f-area'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', render);
  });
  if (chipsEl) {
    chipsEl.addEventListener('click', function (e) {
      var t = e.target.closest('[data-toggle]');
      if (!t) return;
      var id = t.getAttribute('data-toggle');
      if (selected.has(id)) selected.delete(id); else selected.add(id);
      render();
    });
  }
  render();

  /* ---- docket visibility: on for acts 2 to 4, off for act 1 and act 5 ------ */
  var docket = $('#docket'), howEl = $('#how'), closeEl = $('#close');
  function updateDocket() {
    var vh = window.innerHeight;
    var howTop = howEl.getBoundingClientRect().top;
    var closeTop = closeEl.getBoundingClientRect().top;
    var on = howTop < vh * 0.5 && closeTop > vh * 0.75;
    docket.classList.toggle('is-on', on);
  }

  /* ---- 3. before/after wipe: plays itself once on entry, then belongs to the visitor -------- */
  var peak = $('#peak'), stage = $('#peakStage');
  var frame = $('#baFrame'), handle = $('#baHandle');
  var afterImg = $('#baAfter'), beforeImg = $('#baBeforeImg'), ph = $('#baPh');
  var tabs = $$('.tab');
  var split = 50, userControlled = reduce;

  function setSplit(v) {
    split = clamp(v, 3, 97);
    frame.style.setProperty('--split', split.toFixed(2));
    handle.setAttribute('aria-valuenow', String(Math.round(split)));
  }
  function takeOver() {
    if (userControlled) return;
    userControlled = true;
    frame.dataset.userControlled = 'true';
  }
  function splitFromEvent(e) {
    var r = frame.getBoundingClientRect();
    setSplit(((e.clientX - r.left) / r.width) * 100);
  }
  var dragging = false;
  frame.addEventListener('pointerdown', function (e) {
    takeOver(); dragging = true;
    try { frame.setPointerCapture(e.pointerId); } catch (_) {}
    splitFromEvent(e);
  });
  frame.addEventListener('pointermove', function (e) { if (dragging) splitFromEvent(e); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (ev) {
    frame.addEventListener(ev, function () { dragging = false; });
  });
  handle.addEventListener('keydown', function (e) {
    var step = e.shiftKey ? 12 : 4, v = null;
    if (e.key === 'ArrowLeft') v = split - step;
    else if (e.key === 'ArrowRight') v = split + step;
    else if (e.key === 'Home') v = 3;
    else if (e.key === 'End') v = 97;
    if (v !== null) { e.preventDefault(); takeOver(); setSplit(v); }
  });

  BA_PAIRS.forEach(function (p) { var i = new Image(); i.src = p.after; if (p.before) { var j = new Image(); j.src = p.before; } });
  function setPair(i, focusTab) {
    var pair = BA_PAIRS[i];
    tabs.forEach(function (t, k) {
      t.setAttribute('aria-selected', k === i ? 'true' : 'false');
      t.tabIndex = k === i ? 0 : -1;
    });
    afterImg.src = pair.after; afterImg.alt = pair.alt;
    if (pair.before) { beforeImg.src = pair.before; beforeImg.alt = pair.beforeAlt || ''; beforeImg.hidden = false; ph.hidden = true; }
    else { beforeImg.hidden = true; beforeImg.removeAttribute('src'); ph.hidden = false; }
    if (focusTab) tabs[i].focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { setPair(i); });
    t.addEventListener('keydown', function (e) {
      var next = null;
      /* RTL: first tab is on the right, so left/down move forward. */
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next !== null) { e.preventDefault(); setPair(next, true); }
    });
  });
  setSplit(reduce ? 50 : 18);
  (function demoWipe() {
    if (reduce || !('IntersectionObserver' in window)) { if (!reduce) setSplit(50); return; }
    var io = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      var t0 = performance.now(), D = 2600;
      var ease = function (t) { return t * t * (3 - 2 * t); };
      (function step(now) {
        if (userControlled) return;
        var t = clamp((now - t0) / D);
        setSplit(t < 0.6 ? lerp(18, 84, ease(t / 0.6)) : lerp(84, 50, ease((t - 0.6) / 0.4)));
        if (t < 1) requestAnimationFrame(step);
      })(t0);
    }, { threshold: 0.6 });
    io.observe(frame);
  })();

  /* ---- 4. act 4b: the pinned gallery. Scroll maps straight onto sideways travel, eased so it glides. --- */
  var phaseRail = $('#phaseRail');
  var rail = $('#rail'), railVp = $('#railViewport'), reel = $('#reelVideo');
  var railOver = 0;
  function measureRail() { railOver = Math.max(0, rail.offsetWidth - railVp.clientWidth); }
  measureRail();
  window.addEventListener('resize', measureRail);
  window.addEventListener('load', measureRail);

  if (reduce && reel) { reel.controls = true; reel.removeAttribute('loop'); }
  /* The reel is the heaviest asset after the hero: fetch it only when the visitor is about to reach it. */
  if (reel) {
    var loadReel = function () { if (!reel.getAttribute('src')) { reel.src = reel.dataset.src; reel.preload = 'auto'; } };
    if ('IntersectionObserver' in window) {
      var reelIO = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { loadReel(); reelIO.disconnect(); } }, { rootMargin: '150% 0px 150% 0px' });
      reelIO.observe(peak);
    } else loadReel();
  }

  var lastKey = '', railCur = 0, railBar = $('#railBar'), lastMoving = '';
  function tickPeak() {
    if (reduce) { stage.setAttribute('data-sc-verify-state', 'static'); return; }
    var p = pOf(peak);
    /* no dead zone: travel starts with the pin and ends just before it releases */
    var target = railOver * clamp(p / 0.92);
    var d = target - railCur;
    railCur = Math.abs(d) < 0.4 ? target : railCur + d * 0.16;
    rail.style.transform = 'translate3d(' + railCur.toFixed(1) + 'px,0,0)';
    if (railBar) railBar.style.transform = 'scaleX(' + (railOver ? Math.min(1, railCur / railOver) : 0).toFixed(4) + ')';
    var moving = railCur > railOver * 0.1 ? 'true' : 'false';   /* keep the hint up for the first flick or two */
    if (moving !== lastMoving) { stage.dataset.moving = moving; lastMoving = moving; }

    if (reel) {
      if (p > 0.02 && p < 0.99) { if (reel.paused && reel.getAttribute('src')) { var pr = reel.play(); if (pr && pr.catch) pr.catch(function () {}); } }
      else if (!reel.paused) reel.pause();
    }

    /* telemetry so the verification harness can see this act is alive */
    var key = Math.round(railCur) + '|' + Math.round(split);
    if (key !== lastKey) { stage.setAttribute('data-sc-verify-state', key); lastKey = key; }
  }

  /* ---- 5. act 1: the hero plays on entry (no scroll needed) ---------------- */
  var heroStage = $('#heroStage'), heroEl = $('#hero'), hv = $('#heroVideo'), heroBtn = $('#heroPlay');
  var HERO_COPY_OUT = 2.2;           /* seconds into the clip when the headline steps aside (landscape clip) */
  var HERO_COPY_OUT_PORTRAIT = 2.8;  /* the portrait clip is longer and its copy sits over the car */
  var heroArmed = true, heroState = { rejected: '', errors: [], started: false };
  function setPhase(p) { if (heroStage.dataset.phase !== p) heroStage.dataset.phase = p; }
  function heroPlay() {
    heroArmed = false;
    var pr = hv.play();
    if (pr && pr.catch) pr.catch(function (e) { heroArmed = true; heroState.rejected = (e && e.name) + ': ' + (e && e.message); showPlayBtn(); });
  }
  function heroReset() {
    hv.pause();
    try { hv.currentTime = 0; } catch (e) {}
    setPhase('intro');
    heroArmed = true;
  }
  function showPlayBtn() { if (heroBtn && !heroState.started) heroBtn.hidden = false; }
  var heroPause = $('#heroPause');
  if (hv) {
    /* Owner decision: the hero clip autoplays for every visitor, reduced-motion included. It is muted,
       plays once (7.9s) and holds; a pause button is always offered while it runs (WCAG 2.2.2). */
    var portraitMQ = matchMedia('(orientation: portrait)');
    var heroSrc = function () { return portraitMQ.matches ? hv.dataset.srcPortrait : hv.dataset.src; };
    hv.src = heroSrc();
    var onRotate = function () {
      var next = heroSrc();
      if (hv.currentSrc && hv.currentSrc.indexOf(next.split('?')[0]) !== -1) return;
      var wasVisible = heroEl.getBoundingClientRect().bottom > innerHeight * 0.5;
      heroReset(); heroState.started = false; hv.classList.remove('is-playing');
      hv.src = next; hv.load();
      if (wasVisible) heroPlay();
    };
    if (portraitMQ.addEventListener) portraitMQ.addEventListener('change', onRotate);
    else if (portraitMQ.addListener) portraitMQ.addListener(onRotate);
    hv.addEventListener('playing', function () {
      heroState.started = true; hv.classList.add('is-playing');
      if (heroBtn) heroBtn.hidden = true;
      if (heroPause) heroPause.hidden = false;
    });
    hv.addEventListener('pause', function () { if (heroPause) heroPause.hidden = true; });
    hv.addEventListener('ended', function () { setPhase('end'); if (heroPause) heroPause.hidden = true; });
    hv.addEventListener('error', function () { heroState.errors.push('video error ' + (hv.error && hv.error.code) + ' ' + (hv.error && hv.error.message)); showPlayBtn(); });
    new IntersectionObserver(function (entries) {
      var e = entries[entries.length - 1];
      if (e.intersectionRatio >= 0.5 && heroArmed) heroPlay();
      else if (e.intersectionRatio < 0.1 && heroState.started) { heroReset(); heroState.started = false; }
    }, { threshold: [0, 0.1, 0.5] }).observe(heroEl);
    /* Safety nets for browsers that refuse autoplay: a button after 2.5s, and any real gesture starts it. */
    setTimeout(function () { if (!heroState.started) showPlayBtn(); }, 2500);
    ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (ev) {
      window.addEventListener(ev, function (e) {
        if (e.target && e.target.closest && e.target.closest('#heroPause, #heroPlay')) return;
        if (!heroState.started && !heroState.userPaused && hv.paused && heroEl.getBoundingClientRect().bottom > innerHeight * 0.5) heroPlay();
      }, { passive: true });
    });
    if (heroBtn) heroBtn.addEventListener('click', function () { heroState.userPaused = false; heroPlay(); });
    if (heroPause) heroPause.addEventListener('click', function () {
      heroState.userPaused = true; hv.pause(); heroArmed = false;
      heroState.started = false; showPlayBtn();
    });
  }
  function tickHero() {
    if (!hv || hv.paused) return;
    var out = matchMedia('(orientation: portrait)').matches ? HERO_COPY_OUT_PORTRAIT : HERO_COPY_OUT;
    if (heroStage.dataset.phase === 'intro' && hv.currentTime >= out) setPhase('reveal');
  }

  /* ---- ?debug : what the browser actually reports about the hero video ------ */
  if (/[?&]debug\b/.test(location.search)) {
    var dbg = document.createElement('div'); dbg.className = 'dbg'; document.body.appendChild(dbg);
    window.addEventListener('error', function (e) { heroState.errors.push('JS: ' + e.message); });
    window.addEventListener('unhandledrejection', function (e) { heroState.errors.push('promise: ' + (e.reason && e.reason.message || e.reason)); });
    setInterval(function () {
      var ok = hv ? hv.canPlayType('video/mp4; codecs="avc1.640028"') : 'n/a';
      dbg.textContent = [
        'HERO VIDEO DEBUG',
        'reduced-motion: ' + reduce,
        'src: ' + (hv && hv.currentSrc ? hv.currentSrc.split('/').slice(-2).join('/') : '(none)'),
        'paused: ' + (hv && hv.paused) + '   ended: ' + (hv && hv.ended) + '   t=' + (hv ? hv.currentTime.toFixed(2) : '-'),
        'readyState: ' + (hv && hv.readyState) + ' (4=ready)   networkState: ' + (hv && hv.networkState) + ' (3=no source)',
        'size: ' + (hv ? hv.videoWidth + 'x' + hv.videoHeight : '-') + '   opacity: ' + (hv ? getComputedStyle(hv).opacity : '-'),
        'h264: ' + (ok || 'NO'),
        'play() rejected: ' + (heroState.rejected || 'no'),
        'errors: ' + (heroState.errors.join(' | ') || 'none'),
        'phase: ' + heroStage.dataset.phase + '   started: ' + heroState.started,
        'UA: ' + navigator.userAgent.replace(/^Mozilla\/5.0 /, '').slice(0, 90)
      ].join('\n');
    }, 400);
  }

  /* one cheap loop: reads the engine's --sc-p, writes only what changed */
  function loop() { tickPeak(); tickHero(); updateDocket(); requestAnimationFrame(loop); }
  stage.setAttribute('data-sc-verify-state', 'init');
  requestAnimationFrame(loop);
})();
