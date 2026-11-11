/* LungFresh US — main.js | lungfresh-us.vercel.app */
(function(){
  'use strict';

  /* ── Scroll reveal (js-ready pattern) ── */
  function initReveal(){
    document.body.classList.add('js-ready'); /* MUST be first line */
    var els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
    if(!els.length) return;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){ io.observe(el); });
  }

  /* ── FAQ accordion ── */
  function initFAQ(){
    document.querySelectorAll('.faq-q').forEach(function(q){
      q.addEventListener('click', function(){
        var item = this.closest('.faq-item');
        var wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function(o){ o.classList.remove('open'); });
        if(!wasOpen) item.classList.add('open');
        this.setAttribute('aria-expanded', !wasOpen);
      });
      q.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); this.click(); }
      });
    });
  }

  /* ── Nav scroll shadow ── */
  function initNav(){
    var nav = document.getElementById('main-nav');
    if(!nav) return;
    window.addEventListener('scroll', function(){
      nav.style.boxShadow = window.scrollY > 50
        ? '0 4px 24px rgba(14,165,233,.18)'
        : 'none';
    }, {passive:true});
  }

  /* ── Countdown timer (30 min urgency) ── */
  function initCountdown(){
    var el = document.getElementById('countdown');
    if(!el) return;
    var end = Date.now() + 29 * 60 * 1000 + 59 * 1000;
    function tick(){
      var diff = end - Date.now();
      if(diff <= 0){ el.textContent = '00:00'; return; }
      var m = Math.floor(diff / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
      setTimeout(tick, 1000);
    }
    tick();
  }

  /* ── Breathing label animation ── */
  function initBreathLabel(){
    var label = document.querySelector('.breath-label');
    if(!label) return;
    var texts = ['Breathe In...','Hold...','Breathe Out...','Pause...'];
    var durations = [2000, 1000, 2000, 1000];
    var i = 0;
    function cycle(){
      label.textContent = texts[i];
      setTimeout(function(){
        i = (i + 1) % texts.length;
        cycle();
      }, durations[i]);
    }
    cycle();
  }

  /* ── Init ── */
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      initReveal(); initFAQ(); initNav(); initCountdown(); initBreathLabel();
    });
  } else {
    initReveal(); initFAQ(); initNav(); initCountdown(); initBreathLabel();
  }
})();
