/* Diamond Lux — Luxury Motion System v2 */
(function () {
  'use strict';

  /* ── CURSOR ─────────────────────────────────────────────── */
  var dot  = document.getElementById('cx-dot');
  var ring = document.getElementById('cx-ring');
  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    var mx=0,my=0,rx=0,ry=0,shown=false;
    document.addEventListener('mousemove',function(e){
      mx=e.clientX;my=e.clientY;
      dot.style.left=mx+'px';dot.style.top=my+'px';
      if(!shown){dot.style.opacity='1';ring.style.opacity='1';shown=true;}
    });
    document.addEventListener('mouseleave',function(){
      dot.style.opacity='0';ring.style.opacity='0';shown=false;
    });
    (function lerpRing(){
      rx+=(mx-rx)*0.09;ry+=(my-ry)*0.09;
      ring.style.left=rx+'px';ring.style.top=ry+'px';
      requestAnimationFrame(lerpRing);
    })();
    document.querySelectorAll('a,button,select,input,textarea,label').forEach(function(el){
      el.addEventListener('mouseenter',function(){document.body.classList.add('cx-hover');});
      el.addEventListener('mouseleave',function(){document.body.classList.remove('cx-hover');});
    });
    document.querySelectorAll('.btn-primary,.nav-cta,.submit-btn,.faq-sidebar-cta').forEach(function(el){
      el.addEventListener('mouseenter',function(){document.body.classList.add('cx-cta');document.body.classList.remove('cx-hover');});
      el.addEventListener('mouseleave',function(){document.body.classList.remove('cx-cta');});
    });
  }

  /* ── PAGE READY ─────────────────────────────────────────── */
  document.body.classList.add('page-ready');

  /* ── NAV SCROLL ─────────────────────────────────────────── */
  var nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll',function(){
      nav.classList.toggle('scrolled',window.scrollY>40);
    },{passive:true});
  }

  /* ── INTERSECTION OBSERVER ──────────────────────────────── */
  if (!window.IntersectionObserver) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){entry.target.classList.add('dlx-in');io.unobserve(entry.target);}
    });
  },{threshold:0.08,rootMargin:'0px 0px -24px 0px'});

  document.querySelectorAll('.h-rule').forEach(function(el){io.observe(el);});

  document.querySelectorAll('.section-label-tag').forEach(function(el){
    el.classList.add('dlx-reveal');io.observe(el);
  });
  document.querySelectorAll('.section-title-lg').forEach(function(el){
    el.classList.add('dlx-title');io.observe(el);
  });

  var singles=[
    '.manifesto-strip-text','.manifesto-strip-attr',
    '.problem-intro','.problem-statement','.comparison-block',
    '.service-body','.leveling-callout','.addon-block',
    '.science-intro','.services-note','.process-note',
    '.cta-label','.cta-title','.cta-sub','.cta-action',
    '.faq-intro','.faq-sidebar-cta',
    '.form-title','.form-sub','.form-contact-detail','.form-grid','.form-submit',
    '.footer-top','.footer-bottom'
  ];
  document.querySelectorAll(singles.join(',')).forEach(function(el){
    el.classList.add('dlx-reveal');io.observe(el);
  });

  [{parent:'.science-points',child:'.science-point'},
   {parent:'.process-steps',child:'.step-row'},
   {parent:'.reviews-grid',child:'.review-card'},
   {parent:'.faq-list',child:'.faq-item'}
  ].forEach(function(g){
    var p=document.querySelector(g.parent);
    if(!p)return;
    p.querySelectorAll(g.child).forEach(function(child,i){
      child.classList.add('dlx-reveal');
      child.style.setProperty('--dlx-d',(i*0.09)+'s');
      io.observe(child);
    });
  });

  /* ── HERO PARALLAX (home only) ──────────────────────────── */
  var heroEl=document.querySelector('.hero');
  var heroBgImg=heroEl?heroEl.querySelector('img[src*="hero-bg"]'):null;
  if(heroEl&&heroBgImg){
    heroBgImg.style.transition='transform 1.2s cubic-bezier(0.16,1,0.3,1)';
    heroBgImg.style.willChange='transform';
    heroEl.addEventListener('mousemove',function(e){
      if(window.innerWidth<960)return;
      var r=heroEl.getBoundingClientRect();
      var nx=(e.clientX-r.left)/r.width-0.5;
      var ny=(e.clientY-r.top)/r.height-0.5;
      heroBgImg.style.transform='translate('+(-nx*14)+'px,'+(-ny*8)+'px) scale(1.05)';
    });
    heroEl.addEventListener('mouseleave',function(){heroBgImg.style.transform='scale(1)';});
  }

  /* ── FAQ ACCORDION ──────────────────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(function(btn){
    btn.addEventListener('click',function(){
      var item=btn.closest('.faq-item');
      var isOpen=item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(el){el.classList.remove('open');});
      if(!isOpen)item.classList.add('open');
      btn.setAttribute('aria-expanded',!isOpen);
    });
  });

}());
