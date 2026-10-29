/* Echo & Chrome parallax.
   Two kinds of movement, set right in the HTML:
   - data-px="0.12"  on a photo inside a frame: the photo drifts inside its frame,
                     slower than the page (0.12 = up to 12% of the frame's height each way)
   - data-pxf="-60"  on a block of text or a photo: the whole thing drifts up to 60px
                     (negative = lags behind the page, positive = runs ahead of it)
   Everything sits in its normal place when centered on screen, and nothing moves
   for visitors who have reduced motion turned on. */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var frames = [].slice.call(document.querySelectorAll('[data-px]'));
  var floats = [].slice.call(document.querySelectorAll('[data-pxf]'));
  if (!frames.length && !floats.length) return;

  frames.forEach(function (el) {
    el.style.setProperty('--f', parseFloat(el.getAttribute('data-px')) || 0.12);
  });
  document.documentElement.classList.add('has-parallax');

  // -1 when the box is leaving the top of the screen, 0 at the middle, 1 entering at the bottom
  function progress(box, vh) {
    var r = box.getBoundingClientRect();
    if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) return null;
    var p = ((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2);
    return { p: Math.max(-1, Math.min(1, p)), h: r.height };
  }

  var queued = false;
  function update() {
    queued = false;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    frames.forEach(function (el) {
      var m = progress(el.closest('.shot') || el.parentElement, vh);   // the photo's frame (skips a <picture> wrapper)
      if (!m) return;
      var f = parseFloat(el.getAttribute('data-px')) || 0.12;
      el.style.transform = 'translate3d(0,' + (-m.p * f * m.h).toFixed(1) + 'px,0)';
    });
    floats.forEach(function (el) {
      // measure the untransformed parent so the movement doesn't feed back on itself
      var m = progress(el.parentElement, vh);
      if (!m) return;
      var amt = parseFloat(el.getAttribute('data-pxf')) || 0;
      el.style.transform = 'translate3d(0,' + (m.p * amt).toFixed(1) + 'px,0)';
    });
  }
  function queue() {
    if (!queued) { queued = true; window.requestAnimationFrame(update); }
  }

  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  window.addEventListener('load', queue);
  update();
})();
