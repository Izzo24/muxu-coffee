/* ===================================================
   木序咖啡 MUXU COFFEE — Shared nav / footer / behaviour
   =================================================== */
(function(){
  'use strict';
  var nav = '\
  <nav class="site-nav" id="siteNav">\
    <div class="container nav-inner">\
      <a href="./index.html" class="nav-logo" aria-label="木序咖啡首頁"><img src="./logos/muxu-coffee-logo.svg" alt="木序咖啡 Muxu Coffee"></a>\
      <div class="nav-links">\
        <a href="./index.html" class="nav-link">首頁</a>\
        <a href="./products.html" class="nav-link">咖啡與菜單</a>\
        <a href="./about.html" class="nav-link">品牌故事</a>\
        <a href="./contact.html" class="nav-link">門市・預約</a>\
        <a href="./contact.html" class="nav-cta">預約座位</a>\
      </div>\
      <button class="nav-hamburger" aria-label="開啟選單"><span></span><span></span><span></span></button>\
    </div>\
  </nav>\
  <div class="nav-mobile">\
    <button class="nav-mobile-close" aria-label="關閉選單">&times;</button>\
    <a href="./index.html">首頁</a>\
    <a href="./products.html">咖啡與菜單</a>\
    <a href="./about.html">品牌故事</a>\
    <a href="./contact.html">門市・預約</a>\
  </div>';

  var footer = '\
  <footer class="site-footer">\
    <div class="container">\
      <div class="footer-grid">\
        <div class="footer-brand">\
          <img src="./logos/muxu-coffee-logo-white.svg" alt="木序咖啡">\
          <p>木序咖啡，台北赤峰街上的自家烘焙咖啡館。以一杯慢沖，記錄木質光影與時序流轉。</p>\
        </div>\
        <div class="footer-col">\
          <h4>探索</h4>\
          <a href="./index.html">首頁</a>\
          <a href="./products.html">咖啡與菜單</a>\
          <a href="./about.html">品牌故事</a>\
          <a href="./contact.html">門市・預約</a>\
        </div>\
        <div class="footer-col">\
          <h4>服務</h4>\
          <a href="./products.html">單品手沖</a>\
          <a href="./products.html">自家烘焙豆</a>\
          <a href="./contact.html">內用訂位</a>\
          <a href="./contact.html">企業團購</a>\
        </div>\
        <div class="footer-col">\
          <h4>聯絡我們</h4>\
          <a href="./contact.html">台北市大同區赤峰街</a>\
          <a href="tel:+886227000000">02-2700-0000</a>\
          <a href="mailto:hello@muxucoffee.tw">hello@muxucoffee.tw</a>\
          <a href="./contact.html">每日 09:00–20:00</a>\
        </div>\
      </div>\
      <div class="footer-bottom">\
        <span>© 2026 木序咖啡 MUXU COFFEE. 版權所有。</span>\
        <span>台北・赤峰街｜自家烘焙 Specialty Coffee</span>\
      </div>\
    </div>\
  </footer>\
  <button id="back-to-top" aria-label="回到頂端">↑</button>';

  var nm = document.getElementById('nav-mount');
  if(nm) nm.innerHTML = nav;
  var fm = document.getElementById('footer-mount');
  if(fm) fm.innerHTML = footer;

  // active link
  var cur = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-link').forEach(function(l){
    var h = l.getAttribute('href').replace('./','');
    if(h===cur || (cur===''&&h==='index.html')) l.classList.add('active');
  });

  // scroll nav + back to top
  var snav = document.getElementById('siteNav');
  var btt = document.getElementById('back-to-top');
  window.addEventListener('scroll', function(){
    var y = window.scrollY;
    if(snav) snav.classList.toggle('scrolled', y>56);
    if(btt) btt.classList.toggle('visible', y>420);
  }, {passive:true});
  if(btt) btt.addEventListener('click', function(){ window.scrollTo({top:0,behavior:'smooth'}); });

  // mobile drawer
  var ham = document.querySelector('.nav-hamburger');
  var drawer = document.querySelector('.nav-mobile');
  var close = document.querySelector('.nav-mobile-close');
  if(ham&&drawer) ham.addEventListener('click', function(){ drawer.classList.add('open'); document.body.style.overflow='hidden'; });
  if(close&&drawer) close.addEventListener('click', function(){ drawer.classList.remove('open'); document.body.style.overflow=''; });
  if(drawer) drawer.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ drawer.classList.remove('open'); document.body.style.overflow=''; }); });

  // loader
  window.addEventListener('load', function(){
    var loader = document.querySelector('.page-loader');
    if(loader) setTimeout(function(){ loader.classList.add('hidden'); document.body.style.overflow=''; }, 650);
  });

  // reveal
  var rev = document.querySelectorAll('.reveal');
  if(rev.length){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      rev.forEach(function(e){ e.classList.add('visible'); });
    } else {
      var io = new IntersectionObserver(function(ents){
        ents.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
      }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
      rev.forEach(function(e){ io.observe(e); });
    }
  }

  // counters
  function animate(el,target,suffix,dur){
    var start=null;
    function step(ts){ if(!start)start=ts; var p=Math.min((ts-start)/dur,1); var e=1-Math.pow(1-p,3);
      el.textContent=Math.floor(e*target).toLocaleString()+(suffix||''); if(p<1)requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  var stats=document.querySelector('.stats-section');
  if(stats){ var done=false;
    new IntersectionObserver(function(ents){ if(ents[0].isIntersecting&&!done){ done=true;
      document.querySelectorAll('[data-count]').forEach(function(el){ animate(el,parseInt(el.dataset.count,10),el.dataset.suffix||'',1700); }); }
    },{threshold:0.4}).observe(stats);
  }

  // filter tabs
  var tabs=document.querySelectorAll('.tab-btn');
  if(tabs.length){ tabs.forEach(function(t){ t.addEventListener('click', function(){
    var f=t.dataset.filter; tabs.forEach(function(x){x.classList.remove('active');}); t.classList.add('active');
    document.querySelectorAll('[data-category]').forEach(function(c){
      var ok = (f==='all'||c.dataset.category===f);
      if(ok){ c.style.display=''; setTimeout(function(){ c.style.opacity='1'; c.style.transform=''; },10); }
      else { c.style.opacity='0'; c.style.transform='scale(.96)'; setTimeout(function(){ c.style.display='none'; },280); }
    });
  }); }); }

  // forms
  document.querySelectorAll('form[data-mock]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn=form.querySelector('[type="submit"]'); var orig=btn.textContent;
      btn.textContent='送出中…'; btn.disabled=true;
      setTimeout(function(){
        btn.textContent='已收到，謝謝您！'; btn.style.background='var(--caramel)';
        if(!form.querySelector('.form-success')){
          var d=document.createElement('div'); d.className='form-success';
          d.innerHTML='<strong>感謝您的來信。</strong><br>木序團隊將於營業時間內主動與您聯繫確認，期待與您共度一段咖啡時光。';
          form.appendChild(d);
        }
      },1200);
    });
  });

  // smooth anchor
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){ var t=document.querySelector(this.getAttribute('href'));
      if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); } });
  });
})();
