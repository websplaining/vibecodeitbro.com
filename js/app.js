/* VibeCode It, Bro - App */
(function(){
'use strict';
var h=document.documentElement;
var $=function(s){return document.querySelector(s);};
var $$=function(s){return Array.from(document.querySelectorAll(s));};

/* Lang */
var ls=$('#langSelect');
function ad(d){
$$('[data-i18n]').forEach(function(e){
var k=e.getAttribute('data-i18n');
if(!k||!d[k])return;
/<[a-z][\s\S]*>/i.test(d[k])?e.innerHTML=d[k]:e.textContent=d[k];
});
$$('[data-i18n-attr]').forEach(function(e){
var k=e.getAttribute('data-i18n');
if(!k||!d[k])return;
e.getAttribute('data-i18n-attr').split(',').forEach(function(a){
a=a.trim();if(a)e.setAttribute(a,d[k]);
});
});
}
function sl(c){
h.lang=c;h.dir=c==='ar'||c==='fa'?'rtl':'ltr';localStorage.setItem('lang',c);
if(ls)ls.value=c;
var d=window.I18N&&window.I18N[c];
if(!d){var s=document.createElement('script');s.src='/js/i18n/'+c+'.js?v=14';s.onload=function(){sl(c);};s.onerror=function(){if(c!=='en')sl('en');};document.head.appendChild(s);return;}
ad(d);
if(window.ModelsGo)window.ModelsGo.render();
}
function dl(){
var s=localStorage.getItem('lang');
if(s&&window.I18N&&window.I18N[s])return sl(s);
var n=(navigator.language||'en').split('-')[0];
if(window.I18N&&window.I18N[n])return sl(n);
sl('en');
}
if(ls)ls.addEventListener('change',function(){sl(this.value);});
dl();

// Async IP-based language detection
setTimeout(function(){
if(localStorage.getItem('lang'))return; // dont override manual choice
var x=new XMLHttpRequest();
x.timeout=4000;
x.open('GET','https://ipapi.co/json/',true);
x.onload=function(){
if(x.status!==200)return;
try{var d=JSON.parse(x.responseText);
var map={FR:'fr',ES:'es',NL:'nl',BE:'nl',JP:'ja',CN:'zh',TW:'zh',HK:'zh',AE:'ar',SA:'ar',EG:'ar',MA:'ar',DZ:'ar',QA:'ar',IR:'fa',VN:'vi',DE:'de',AT:'de',CH:'de',PT:'pt',BR:'pt',IN:'hi',KR:'ko',IT:'it',TR:'tr',PL:'pl',ID:'id',RU:'ru',KZ:'ru',UA:'ru',BY:'ru'};
var c=map[d.country_code];
if(c&&window.I18N&&window.I18N[c]&&!localStorage.getItem('lang'))sl(c);
}catch(e){}
};
x.send();
},800);

/* Theme */

/* Nav scroll */
var nv=$('#nav'),nl=$('#navLinks'),nb=$('#navBurger'),np=$('#navProgress'),tp=$('#toTop');
function os(){
var y=window.scrollY;
nv.classList.toggle('is-scrolled',y>20);
var dh=document.documentElement.scrollHeight-window.innerHeight;
np.style.width=(dh>0?Math.min(100,(y/dh)*100):0)+'%';
tp.classList.toggle('is-visible',y>500);
var c='';
$$('section[id]').forEach(function(s){if(s.getBoundingClientRect().top<110)c=s.id;});
$$('.nav__ls a').forEach(function(a){a.classList.toggle('is-active',a.getAttribute('href')==='#'+c);});
}
window.addEventListener('scroll',os,{passive:true});os();

/* Burger */
if(nb)nb.addEventListener('click',function(){var o=nb.getAttribute('aria-expanded')!=='true';nb.setAttribute('aria-expanded',o);nl.classList.toggle('is-open',o);});
$$('.nav__ls a').forEach(function(a){a.addEventListener('click',function(){nb.setAttribute('aria-expanded','false');nl.classList.remove('is-open');});});

/* To top */
if(tp)tp.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});

/* Copy */
$$('[data-copy]').forEach(function(b){b.addEventListener('click',function(){var e=document.getElementById(b.getAttribute('data-copy'));if(!e)return;var t=e.textContent||'';var done=function(){var orig=b.textContent;b.textContent='copied!';b.classList.add('is-copied');setTimeout(function(){b.textContent=orig;b.classList.remove('is-copied');},1500);};if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done);}else{var ta=document.createElement('textarea');ta.value=t;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');done();}catch(err){}document.body.removeChild(ta);}});});

/* Smooth scroll */
document.addEventListener('click',function(e){var l=e.target.closest('a[href^="#"]');if(!l)return;var t=$(l.getAttribute('href'));if(!t)return;e.preventDefault();t.scrollIntoView({behavior:'smooth'});});

/* Year */
var y=$('#year');if(y)y.textContent=new Date().getFullYear();
})();
