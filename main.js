(()=>{
document.getElementById('y').textContent=new Date().getFullYear();
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(el.closest('.hero')?i*90:0)+'ms';io.observe(el)});
// stagger children of grids
document.querySelectorAll('.projects,.skills,.facts').forEach(g=>[...g.children].forEach((c,i)=>c.style.transitionDelay=i*80+'ms'));
// counters
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,n=+el.dataset.count;cio.unobserve(el);if(reduce){el.textContent=n;return}let t0;const step=t=>{t0??=t;const p=Math.min((t-t0)/1200,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));
// progress bar + active nav
const bar=document.querySelector('.progress'),links=[...document.querySelectorAll('.nav a[href^="#"]')];
const secs=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
const onScroll=()=>{const h=document.documentElement;bar.style.transform=`scaleX(${h.scrollTop/(h.scrollHeight-h.clientHeight)||0})`;
 let cur;secs.forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.4)cur=s.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur&&!a.classList.contains('pill')))};
addEventListener('scroll',onScroll,{passive:true});onScroll();
// mobile menu
const btn=document.querySelector('.menu-btn'),menu=document.getElementById('menu');
btn.addEventListener('click',()=>{const o=menu.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
menu.addEventListener('click',e=>{if(e.target.tagName==='A'){menu.classList.remove('open');btn.setAttribute('aria-expanded',false)}});
// tilt phone
const ph=document.querySelector('.tilt');
if(ph&&!reduce&&matchMedia('(pointer:fine)').matches){addEventListener('mousemove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;ph.style.transform=`rotateY(${x*14}deg) rotateX(${-y*10}deg)`})}
// spotlight on cards
document.querySelectorAll('.project.feature').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}));
})();
