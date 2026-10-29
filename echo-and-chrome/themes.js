/* Echo & Chrome background themes + a temporary switcher for trying them on the real pages.
   Load in the <head> (before the page paints) so the chosen background shows right away.
   The choice is remembered in this browser only, so it carries from page to page while trying them. */
(function () {
  var THEMES = {
    charcoal: { name: 'Charcoal (now)', tone: 'dark', v: {} },
    gallery: { name: 'Gallery white', tone: 'light', v: {
      bg: '#FFFFFF', band: '#F4F4F2', bar: '#FFFFFF', 'bar-ink': '#1C1C1A', 'bar-soft': '#6B6A64',
      fg: '#1C1C1A', head: '#1C1C1A', soft: '#6B6A64', body: '#3A3935', line: '#E4E3DE',
      accent: '#DAD62C', rule: '#DAD62C', hl: 'transparent' } },
    paper: { name: 'Paper', tone: 'light', v: {
      bg: '#FAF9F6', band: '#F0EFEA', bar: '#FAF9F6', 'bar-ink': '#232321', 'bar-soft': '#6B6A64',
      fg: '#232321', head: '#6E6C10', soft: '#6B6A64', body: '#3A3935', line: '#E3E1DA',
      accent: '#C9C52A', rule: '#C9C52A', hl: 'transparent' } },
    cream: { name: 'Crisp cream', tone: 'light', v: {
      bg: '#F7F3EA', band: '#EEE8DB', bar: '#F7F3EA', 'bar-ink': '#2A2925', 'bar-soft': '#6E6A60',
      fg: '#2A2925', head: '#2A2925', soft: '#6E6A60', body: '#3D3A34', line: '#E2DCCD',
      accent: '#DAD62C', rule: '#DAD62C', hl: 'rgba(218,214,44,0.6)' } },
    bone: { name: 'Bone and charcoal', tone: 'light', v: {
      bg: '#F2F0EB', band: '#262626', bar: '#262626', 'bar-ink': '#DAD62C', 'bar-soft': 'rgba(218,214,44,0.62)',
      fg: '#262626', head: '#262626', soft: '#6B6862', body: '#3A3833', line: '#DCD8CF',
      accent: '#DAD62C', rule: '#DAD62C', hl: 'transparent' } },
    band: { name: 'Chartreuse band', tone: 'light', v: {
      bg: '#FFFFFF', band: '#F4F4F2', bar: '#DAD62C', 'bar-ink': '#111110', 'bar-soft': '#5E5E58',
      fg: '#111110', head: '#111110', soft: '#5E5E58', body: '#333331', line: '#E4E3DE',
      accent: '#111110', rule: '#DAD62C', hl: 'transparent' } }
  };
  var KEY = 'ec-bg';
  var root = document.documentElement;
  var current = 'charcoal';

  function apply(id) {
    var t = THEMES[id] || THEMES.charcoal;
    current = THEMES[id] ? id : 'charcoal';
    // clear any earlier palette, then set this one
    Object.keys(THEMES.gallery.v).forEach(function (k) { root.style.removeProperty('--t-' + k); });
    Object.keys(t.v).forEach(function (k) { root.style.setProperty('--t-' + k, t.v[k]); });
    root.setAttribute('data-tone', t.tone);
    try { localStorage.setItem(KEY, current); } catch (e) {}
    var picker = document.querySelector('.bg-picker');
    if (picker) {
      picker.querySelector('.bg-picker__name').textContent = t.name;
      [].forEach.call(picker.querySelectorAll('button'), function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-bg') === current ? 'true' : 'false');
      });
    }
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  apply(saved || 'charcoal');

  function buildPicker() {
    if (document.querySelector('.bg-picker')) return;
    var box = document.createElement('div');
    box.className = 'bg-picker';
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Try a background color');
    box.innerHTML = '<span class="bg-picker__label">Try a background:</span><span class="bg-picker__swatches"></span><span class="bg-picker__name" aria-live="polite"></span>';
    var sw = box.querySelector('.bg-picker__swatches');
    Object.keys(THEMES).forEach(function (id) {
      var t = THEMES[id];
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-bg', id);
      b.setAttribute('aria-label', t.name);
      b.title = t.name;
      b.style.setProperty('--sw', id === 'charcoal' ? '#262626' : t.v.bg);
      b.style.setProperty('--sa', id === 'charcoal' ? '#DAD62C' : (id === 'band' || id === 'bone' ? t.v.bar : t.v.accent));
      b.addEventListener('click', function () { apply(id); });
      sw.appendChild(b);
    });
    document.body.appendChild(box);
    apply(current);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildPicker);
  else buildPicker();
})();
