/* Echo & Chrome page transitions.
   1. "Logo moment" (+ filament glow): pressing a "Shop" link fades to a dark screen
   with the Echo and Chrome logo, then the shop page fades up from behind it.
   - Leaving: any link to shop.html whose text is exactly "Shop"
     ("Back to Shop" is left as a normal, quick link)
   - Arriving: shop.html opens with #arrive, starts covered, and fades the cover away
   2. "Slide over": tapping a photo in the shop grid nudges the grid left while the
      product page slides in from the right; the header stays put
      (product.html#3~in arrives, then the address is tidied back to #3)
   3. "Lights on": pressing "The Studio" goes dark, a pendant drops in and switches on, then the
      Studio opens with the lamp lifting away and the content popping in (styles in theme.css)
   Visitors with reduced motion turned on skip all three. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var html = document.documentElement;
  var HOLD_BEFORE_LEAVING = 1100;  // logo fades in and the filament glow flickers on (1s)
  var HOLD_ON_ARRIVAL = 350;       // logo holds on the shop page before fading out

  function getVeil() {
    var v = document.querySelector('.veil');
    if (!v) {
      v = document.createElement('div');
      v.className = 'veil';
      v.setAttribute('aria-hidden', 'true');
      v.innerHTML = '<div class="veil__glow"></div><p class="veil__mark">Echo<i>and</i>Chrome</p>';
      document.body.appendChild(v);
    }
    return v;
  }

  // Arriving on the shop
  if (html.classList.contains('arriving')) {
    getVeil();
    setTimeout(function () {
      html.classList.remove('arriving');           // the cover fades out
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    }, reduce ? 0 : HOLD_ON_ARRIVAL);
  }

  // Leaving for the shop
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href="shop.html"]');
    if (!a || a.textContent.trim() !== 'Shop') return;
    if (/shop\.html$/.test(location.pathname)) return;               // already here
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (reduce) return;
    e.preventDefault();
    var v = getVeil();
    void v.offsetWidth;                                               // let the fade start from clear
    v.classList.add('is-on');
    setTimeout(function () { location.href = 'shop.html#arrive'; }, HOLD_BEFORE_LEAVING);
  });

  // ---- "Slide over": tapping a shop photo slides its product page in from the right ----
  var SLIDE_MS = 600;
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('#grid a.slot');
    if (!a) return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (reduce) return;
    e.preventDefault();
    var cover = document.querySelector('.slide-cover');
    if (!cover) {
      cover = document.createElement('div');
      cover.className = 'slide-cover';
      cover.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cover);
    }
    void cover.offsetWidth;                                           // start from off-screen
    html.classList.add('sliding-out');
    setTimeout(function () { location.href = a.getAttribute('href') + '~in'; }, SLIDE_MS);
  });

  // Arriving on a product page from the shop: the details settle in, then tidy the address
  if (html.classList.contains('slide-in')) {
    try { history.replaceState(null, '', location.pathname + location.search + location.hash.replace(/~in$/, '')); } catch (e) {}
    setTimeout(function () { html.classList.remove('slide-in'); }, 700);
  }

  // ---- 3. "Lights on": pressing a link to the Studio ----
  // The screen goes dark, a pendant drops in and flickers on (about 1.3s), then the Studio opens
  // (studio.html#lit), where the lit lamp lifts away and the title, "Studio Supervisors" and the cats pop in.
  var LIGHTS_BEFORE_LEAVING = 1350;
  function getLights() {
    var l = document.querySelector('.lights');
    if (!l) {
      l = document.createElement('div');
      l.className = 'lights';
      l.setAttribute('aria-hidden', 'true');
      l.innerHTML = '<div class="lights__glow"></div><div class="lights__pendant"><div class="lights__cord"></div><div class="lights__cap"></div><div class="lights__shade"></div></div>';
      document.body.appendChild(l);
    }
    return l;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href="studio.html"]');
    if (!a) return;
    if (/studio\.html$/.test(location.pathname)) return;             // already here
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (reduce) return;
    e.preventDefault();
    var l = getLights();
    void l.offsetWidth;
    l.classList.add('is-on');
    setTimeout(function () { location.href = 'studio.html#lit'; }, LIGHTS_BEFORE_LEAVING);
  });
  // Arriving on the Studio with the light on: tidy up once the content has popped in
  if (html.classList.contains('lit-arrive')) {
    setTimeout(function () {
      html.classList.remove('lit-arrive');
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    }, 1800);
  }

  // Coming back with the browser's Back button: make sure no cover is left showing
  window.addEventListener('pageshow', function () {
    var v = document.querySelector('.veil');
    if (v) v.classList.remove('is-on');
    var l = document.querySelector('.lights');
    if (l) l.classList.remove('is-on');
    html.classList.remove('sliding-out');
  });
})();
