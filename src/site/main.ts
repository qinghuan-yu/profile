import '../style.css';
import '../graphic.css';
import './site.css';
import { assetUrl, resolveMarkupAssets } from '../assets.ts';
import { icon, seal, ring, opArc, ARC_NODES } from '../ui.ts';
import { birdPlate, flock, rng } from '../graphics.ts';
import { Reticle, NodeField, scramble, burst, ripple, morphGlyph, countTo, type Burst } from '../fx.ts';
import { homePlate, personnelPlate } from '../plates.ts';
import { projectPlate } from './project-plate.ts';
import { RouteMap } from '../route.ts';
import { Covenant } from '../covenant.ts';
import { wrap } from '../util.ts';
import { readStored, saveStored } from '../storage.ts';
import type { RouteNode } from '../data.ts';
import { profile as P, identity, works, WORKS_WIDTH, workLinks, skills } from './profile.ts';

// A personal site on the festival template: the same screens, motion and interactions, fed by profile.ts.
type Page='home'|'about'|'works'|'skills'|'contact';
const PAGES:[Page,string,string][]=[['home','首页','HOME'],['about','关于','ABOUT'],['works','作品','WORKS'],['skills','方向','FOCUS'],['contact','联系','CONTACT']];
// Pages borrow the template's screen styles.
const SKIN:Record<Page,string>={home:'mode-home',about:'mode-operators',works:'mode-records',skills:'mode-atlas',contact:'mode-atlas mode-contact'};
const BURST:Record<Page,Burst>={home:'wipe',about:'mosaic',works:'scan',skills:'scan',contact:'wipe'};
const GLYPHS:Record<Page,{ch:string;x:number;y:number;size:number;depth:number;flip?:string}[]>={
 home:[{ch:'N',x:38.5,y:30,size:118,depth:.6,flip:'x'},{ch:'A',x:31,y:70,size:62,depth:1.2,flip:'y'},{ch:'T',x:1.6,y:72,size:70,depth:.8},{ch:'C',x:89,y:60,size:118,depth:.5}],
 about:[{ch:'Ι',x:2,y:66,size:120,depth:.6},{ch:'A',x:40,y:8,size:64,depth:1.1,flip:'y'},{ch:'S',x:44,y:28,size:70,depth:.7,flip:'x'}],
 works:[{ch:'K',x:12,y:70,size:150,depth:.5}],skills:[],contact:[{ch:'N',x:6,y:6,size:110,depth:.6,flip:'x'},{ch:'T',x:4,y:70,size:80,depth:.8}]
};
const motion=!new URLSearchParams(location.search).has('still')&&readStored<boolean>('site-motion',!matchMedia('(prefers-reduced-motion: reduce)').matches)!==false;
let page:Page='home',blueprint=readStored<boolean>('site-blueprint',false)===true,arcTag=-1,scanTimer=0,enterTimer=0,active:HTMLElement|null=null,pendingParallax:{x:number;y:number}|null=null,released=new Set<number>();
const accentStyle=`--accent:${P.accent}`;
const app=document.querySelector<HTMLDivElement>('#app')!;
const nameLines=(seed:number)=>{const r=rng(seed);let j=0;return P.name.lines.map((line,i)=>`<span class="name-line line-${i}">${[...line].map(c=>`<span class="ch" style="--dx:${((r()-.5)*260).toFixed(0)}px;--dy:${((r()-.5)*140).toFixed(0)}px;--r:${((r()-.5)*40).toFixed(0)}deg;--sc:${(.6+r()*1.4).toFixed(2)};--j:${j++}">${c}</span>`).join('')}</span>`).join('');};
const skillBirds=flock(6,skills.length*3);

app.innerHTML=resolveMarkupAssets(`
<main id="stage" class="mode-home site" style="${accentStyle}" aria-label="${P.name.cn} 的个人主页">
 <div class="site-backdrop"><img src="/assets/game/map-pano-sky.webp" alt=""></div><div class="world-veil"></div><div id="haze" aria-hidden="true"><i></i><i></i><i></i></div><canvas id="node-field" aria-hidden="true"></canvas><div id="glyphs"></div><div class="paper-grain"></div><div id="blueprint-wash" aria-hidden="true"></div>
 <div class="crosshair crosshair-one">+</div><div class="crosshair crosshair-two">+</div><div class="edge-label">${P.name.latin.toUpperCase()} / PERSONAL NODE</div><div class="edge-ruler" aria-hidden="true">${'<i></i>'.repeat(9)}</div>
 <header class="topbar"><button class="brand" data-action="home" aria-label="返回首页">${seal}<span>${P.name.latin.toUpperCase()}<small>${P.roleEn}</small></span></button><div class="top-context"><span id="mode-caption">个人主页</span></div><div class="top-tools"><button data-action="contact" aria-label="联系我" title="联系">${icon('info')}</button><button id="blueprint-toggle" data-action="blueprint" aria-label="图纸模式" title="图纸模式 B">${icon('grid')}</button><button data-action="fullscreen" aria-label="全屏" title="全屏 F">${icon('full')}</button></div></header>

 <section id="home" class="screen home-screen" aria-label="首页">
  <div class="home-geometry">${ring}<span>${P.name.cn}</span></div>
  <div class="home-stack back" aria-hidden="true"><img class="hs rays" src="/assets/game/rays-white.webp" alt=""><img class="hs spire" src="/assets/game/sky-spire.webp" alt=""><img class="hs ruler" src="/assets/game/y-ruler.webp" alt=""></div>
  <div class="home-plate plate-host">${homePlate(undefined,'QU',`${P.name.latin.toUpperCase()} / AI SYSTEMS / MUSIC / `,'html',identity)}<i class="plate-scanline"></i></div>
  <div class="home-stack front" aria-hidden="true"><img class="hs blade" src="/assets/game/blade-a.webp" alt=""><img class="hs star s1" src="/assets/game/star-blue.webp" alt=""><img class="hs star s2" src="/assets/game/star-blue.webp" alt=""><img class="hs star s3" src="/assets/game/star-blue.webp" alt=""></div>
  <span class="home-stamp" aria-hidden="true">${P.name.lines[0][0]}</span>
  <div class="home-copy"><div class="home-wordmark" aria-label="${P.name.latin}"><span>个人主页</span><span>${P.name.lines[0]}</span><span>${P.name.lines[1]}</span></div><div class="title-cn"><span class="hairline"></span><h1>${P.name.cn}</h1><span class="tiny-symbol">✦</span></div><p class="home-quote">${P.tagline}</p><div class="home-actions"><button class="primary" data-action="works" data-scan><span>看作品</span><small>${works.length} PROJECTS</small>${icon('arrow')}</button><button class="text-button" data-action="contact" data-scan>联系我 <span>↗</span></button></div></div>
  <nav class="home-dial" aria-label="快速入口">${[['about','关于','ABOUT','info'],['works','作品','WORKS','route'],['skills','方向','FOCUS','bird']].map(([a,cn,en,ic],i)=>`<button data-action="${a}" data-scan style="--i:${i}"><span class="dial-icon">${icon(ic)}<i></i></span><b>${cn}<small>${en}</small></b></button>`).join('')}</nav>
  <div class="home-caption"><p>${P.role}</p><a href="https://blog.reliarc.com" target="_blank" rel="noreferrer">博客 ↗</a></div>

 </section>

 <section id="operators" class="screen hidden" aria-label="关于">
  <div class="operator-grid"></div><div class="operator-orbit">${ring}<span class="ring-label">A / PROFILE</span></div>
  <div class="op-arc">${opArc}${ARC_NODES.map((a,i)=>`<button class="arc-node" data-action="arc-tag" data-tag="${i}" style="left:${50+46*Math.cos(a*Math.PI/180)}%;top:${50+46*Math.sin(a*Math.PI/180)}%" aria-label="${P.facts[i].label}">＋</button>`).join('')}<div class="arc-tip" id="arc-tip"></div></div>
  <div class="op-stack" aria-hidden="true"><img class="os star a" src="/assets/game/star-blue.webp" alt=""><img class="os blade" src="/assets/game/blade-d.webp" alt=""><img class="os hex" src="/assets/game/hex-set.webp" alt=""></div>
  <div class="operator-art plate-host" id="operator-art">${personnelPlate({id:'me',name:P.name.cn,english:P.name.latin,lines:P.name.lines,role:'开发',branch:P.role,stars:3,color:P.accent,note:P.bio,quote:P.tagline,tags:P.facts.map(f=>f.value),roleEn:P.roleEn},0,undefined,false,'html',[],identity)}</div>
  <div class="op-glitch" aria-hidden="true"></div>
  <div class="operator-copy"><div class="operator-kicker"><span>关于我</span><i></i></div><h2 id="op-name" class="graceb">${nameLines(5)}</h2><div class="op-subtitle"><span>${P.name.cn}</span><span class="op-latin">${P.name.latin.toUpperCase()}</span></div><div class="op-profession"><span>✧</span><div><strong>${P.role}</strong><small>${P.roleEn}</small></div></div><p class="site-bio">${P.bio}</p><dl class="site-education" aria-label="学习经历">${P.education.map(e=>`<div><dt>${e.period}</dt><dd>${e.subject}</dd></div>`).join('')}</dl><div class="op-tools"><button data-action="works" class="line-button solid">看作品 ${icon('arrow')}</button><button data-action="contact" class="line-button">联系我</button></div></div>
  <div class="op-footnote"><a href="${P.otherWork.url}" target="_blank" rel="noreferrer">${P.otherWork.label} ↗</a><span>其他项目</span></div>
 </section>

 <section id="records" class="screen hidden" aria-label="作品"></section>

 <section id="atlas" class="screen hidden" aria-label="方向"><div class="atlas-stage" data-plate="0" data-cursor="方向"><div class="atlas-plate p0">${birdPlate(true,'skill',skillBirds.length,{title:'',rows:[]})}</div><i class="atlas-scan"></i></div>
  <div class="atlas-head"><h2>方向</h2><p>点选条目，查看对应项目。</p></div>
  <div class="atlas-readout"><small>FOCUS</small><b id="skill-name">AI 工作流</b><div id="skill-spec"></div></div>
  <div class="atlas-tools"><div class="tools-0" style="display:flex"><button class="line-button" data-action="recall">召回 RECALL</button><span class="atlas-count">已放飞 <b id="skill-count">00</b> / ${skillBirds.length}</span></div></div>
  <div class="skill-list">${skills.map((s,i)=>`<button data-skill="${i}"><small>${String(i+1).padStart(2,'0')}</small>${s.name}<span aria-hidden="true">↗</span></button>`).join('')}</div>
 </section>

 <section id="contact" class="screen hidden" aria-label="联系"><div class="cv-root"></div>
  <div class="atlas-head"><h2>联系</h2><p>邮箱、代码和日常记录。</p></div>
  <div class="contact-card visible" id="contact-card" aria-live="polite"><small>LINKS</small><h3>${P.name.cn}</h3><a class="contact-mail" href="${P.contact.url}" target="_blank" rel="noreferrer">${P.contact.label}<span>写邮件 ↗</span></a><div class="contact-links">${P.contact.links.map(l=>`<a href="${l.url}" target="_blank" rel="noreferrer">${l.label} ↗</a>`).join('')}</div></div>
  <div class="atlas-tools"><div class="tools-0" style="display:flex"><button class="line-button" data-action="part">重置图形</button></div></div>
 </section>

 <footer class="bottom-bar"><span class="edition">PERSONAL NODE <i>${String(new Date().getFullYear()).slice(2)}</i></span><nav aria-label="主导航">${PAGES.map(([m,cn,en],i)=>`<button data-action="${m}" data-nav="${m}" data-cursor="${en}"><small>0${i}</small><span data-scramble>${cn}</span></button>`).join('')}</nav><a class="edition site-credit" href="https://github.com/qinghuan-yu" target="_blank" rel="noreferrer">GitHub ↗</a></footer>
 <div id="transition-fx" aria-hidden="true"></div><div id="bloom" aria-hidden="true"></div><div id="ripples" aria-hidden="true"></div><div id="toast" role="status" aria-live="polite"></div>
</main>`);

const $=<T extends HTMLElement=HTMLElement>(s:string)=>document.querySelector<T>(s)!;
const stage=$('#stage');
const reticle=new Reticle(stage),field=new NodeField($<HTMLCanvasElement>('#node-field'));
const visited=new Set<string>(readStored<string[]>('site-visited',[])??[]);

// Works: the festival route map with project nodes and a project panel.
function workPanel(n:RouteNode,i:number){
 return `<div class="rp-head"><span class="rp-kind">${n.label??'PROJECT'}</span><span class="rp-code" data-scramble>${n.code}</span><span class="rp-time">${n.meta??''}</span></div>
  <figure class="rp-image stage project-flow">${projectPlate(n,i)}</figure>
  <h3>${n.title}</h3><p class="rp-en">${n.en}</p><p class="rp-desc">${n.description}</p><div class="rp-tags">${(n.tags??[]).map(t=>`<span>${t}</span>`).join('')}</div>
  <div class="rp-actions"><a class="line-button solid" href="${n.link}" target="_blank" rel="noreferrer">GitHub 源码 ↗</a></div>
  <div class="rp-step"><button data-action="work-prev" aria-label="上一个作品">←</button><span>${n.code}</span><button data-action="work-next" aria-label="下一个作品">→</button></div>`;
}
const route=new RouteMap($('#records'),visited,()=>new Set(),id=>{saveStored('site-visited',[...visited]);if(page==='works')history.replaceState(null,'',`#/works/${id}`);},{nodes:works,width:WORKS_WIDTH,links:workLinks,head:{eyebrow:'SELECTED WORKS',title:'作品',sub:'AI 工具、音乐与小型软件'},counter:'已看作品',panel:workPanel,labels:{words:['AI SYSTEMS','MUSIC','SOFTWARE'],zones:[[0,'city','AI SYSTEMS'],[170,'people','COMPUTATIONAL MUSIC'],[240,'light','TOOLS'],[350,'ex','HARDWARE']],sequence:['AI 系统','计算音乐','交互工具','联系'],word:'CONNECT'},
 portals:`<button data-action="about">${icon('info')}<span>关于</span></button><button data-action="skills">${icon('bird')}<span>方向</span></button><button data-action="contact">${icon('arrow')}<span>联系</span></button>`});
route.seq.reduced=!motion;

// Contact: the covenant hands; touching fingertips reveals the card.
const covenant=new Covenant($('#contact .cv-root'),true,'CONNECT');
covenant.onContact=()=>{reveal();};
function reveal(){const c=$('#contact-card');if(!c.classList.contains('visible')){c.classList.add('visible');}}

function toast(m:string){$('#toast').textContent=m;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=window.setTimeout(()=>$('#toast').classList.remove('visible'),2400);}let toastTimer=0;
function renderGlyphs(){$('#glyphs').innerHTML=GLYPHS[page].map((g,i)=>`<span class="glyph${g.flip?` flip-${g.flip}`:''}" style="--x:${g.x}%;--y:${g.y}%;--s:${g.size}px;--d:${g.depth};--i:${i};--dof:${g.depth<.7?2.4:g.depth>1.15?1:0}px">${g.ch}</span>`).join('');}
function screenOf(p:Page){return $(p==='home'?'#home':p==='about'?'#operators':p==='works'?'#records':p==='skills'?'#atlas':'#contact');}
function setPage(next:Page,animate=true){
 const anim=animate&&motion;const outgoing=anim?active:null;
 if(anim)burst($('#transition-fx'),BURST[next],P.accent);
 page=next;stage.className=`${SKIN[next]} site${blueprint?' theme-blueprint':''}${motion?'':' reduced-motion'}${reticle.enabled?' has-reticle':''}`;
 document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));
 const incoming=screenOf(next);incoming.classList.remove('hidden');active=incoming;
 document.querySelectorAll<HTMLElement>('[data-nav]').forEach(b=>{b.classList.toggle('selected',b.dataset.nav===next);b.setAttribute('aria-current',b.dataset.nav===next?'page':'false');});
 $('#mode-caption').textContent=`${P.name.cn} · ${PAGES.find(p=>p[0]===next)![1]}`;
 field.active=next==='home'||next==='about';if(next==='home')field.set(7,[.46,.14,.96,.86],18,{x:.66,y:.44,r:.21});if(next==='about')field.set(19,[.5,.1,.96,.9],16,{x:.72,y:.46,r:.24});
 covenant.active=next==='contact';if(next==='contact')requestAnimationFrame(()=>covenant.resize());
 if(next==='works')route.enter();
 if(next==='about'){const n=$('#op-name');n.classList.remove('assemble');void n.offsetWidth;if(motion)n.classList.add('assemble');$('#operator-art').classList.remove('assemble');void $('#operator-art').offsetWidth;if(motion)$('#operator-art').classList.add('assemble');}
 if(next==='skills'){$('.atlas-stage').classList.remove('scanning');void $('.atlas-stage').offsetWidth;$('.atlas-stage').classList.add('scanning');}
 renderGlyphs();
 if(anim){incoming.classList.remove('entering');void incoming.offsetWidth;incoming.classList.add('entering');clearTimeout(enterTimer);enterTimer=window.setTimeout(()=>incoming.classList.remove('entering'),1100);
  if(outgoing&&outgoing!==incoming){outgoing.classList.remove('hidden');outgoing.classList.add('leaving');outgoing.inert=true;setTimeout(()=>{outgoing.classList.remove('leaving');outgoing.inert=false;if(outgoing!==active)outgoing.classList.add('hidden');},460);}}
 if(motion)document.querySelectorAll<HTMLElement>(`#${incoming.id} [data-scramble]`).forEach((el,i)=>setTimeout(()=>scramble(el,640),i*90));
 const h=next==='home'?'':next==='works'?`#/works/${works[route.selected].id}`:`#/${next}`;if(location.hash!==h)history.replaceState(null,'',h||location.pathname);
}
function homeScan(on:boolean){clearTimeout(scanTimer);if(page!=='home')return;if(on)stage.classList.add('home-scan');else scanTimer=window.setTimeout(()=>stage.classList.remove('home-scan'),260);}
function showFact(i:number){arcTag=arcTag===i?-1:i;document.querySelectorAll<HTMLElement>('.arc-node').forEach(b=>b.classList.toggle('active',(+b.dataset.tag!)===arcTag));const tip=$('#arc-tip');if(arcTag<0)return tip.classList.remove('visible');const f=P.facts[i];const node=document.querySelector<HTMLElement>(`.arc-node[data-tag="${i}"]`)!;tip.style.left=node.style.left;tip.style.top=node.style.top;tip.innerHTML=`<small>${String(i+1).padStart(2,'0')} / ${f.en}</small><b>${f.value}</b><span>${f.label}</span>`;tip.classList.remove('visible');void tip.offsetWidth;tip.classList.add('visible');}
function skillOf(n:number){return skills[(n-1)%skills.length];}
function showSkill(n:number){const s=skillOf(n);const el=$('#skill-name');el.textContent=s.name;$('#skill-spec').innerHTML=`${s.description}<br><a href="${s.url}" target="_blank" rel="noreferrer">${s.project} ↗</a>`;document.querySelectorAll<HTMLElement>('[data-skill]').forEach(b=>b.classList.toggle('active',skills[+b.dataset.skill!]===s));}

const actions:Record<string,(el:HTMLElement)=>void>={
 home:()=>setPage('home'),about:()=>setPage('about'),works:()=>setPage('works'),skills:()=>setPage('skills'),contact:()=>setPage('contact'),
 blueprint:()=>{blueprint=!blueprint;saveStored('site-blueprint',blueprint);stage.classList.toggle('theme-blueprint',blueprint);$('#blueprint-toggle').classList.toggle('active',blueprint);},
 fullscreen:()=>{void (document.fullscreenElement?document.exitFullscreen():stage.requestFullscreen()).catch(()=>toast('可使用 F11 进入全屏'));},
 'arc-tag':el=>showFact(+el.dataset.tag!),'work-prev':()=>route.step(-1),'work-next':()=>route.step(1),'route-seq':el=>route.seekStage(+el.dataset.seq!),'route-pins-clear':()=>route.clearPins(),
 recall:()=>{document.querySelectorAll('.p0 .flown').forEach(g=>{g.classList.remove('flown');g.classList.add('returning');});released.clear();countTo($('#skill-count'),0);},
 part:()=>covenant.reset(),
};
document.addEventListener('click',e=>{
 const t=e.target as HTMLElement;const b=t.closest<HTMLElement>('button,[data-action]');
 const bird=t.closest<SVGElement>('[data-bird]');if(bird&&!released.has(+bird.dataset.bird!)){const n=+bird.dataset.bird!;released.add(n);bird.classList.remove('returning');bird.classList.add('flown');countTo($('#skill-count'),released.size);showSkill(n);return;}
 if(!b){if(motion&&!t.closest('.route-view,.atlas-stage,.covenant,a'))ripple($('#ripples'),e.clientX,e.clientY);return;}
 const a=b.dataset.action;if(a&&actions[a]){actions[a](b);return;}
 if(b.dataset.route!==undefined)route.select(+b.dataset.route);
 if(b.dataset.skill!==undefined){const i=+b.dataset.skill;showSkill(i+1);const g=document.querySelector(`.p0 [data-bird="${i+1}"]`);g?.classList.add('hot');setTimeout(()=>g?.classList.remove('hot'),900);}
});
stage.addEventListener('pointerover',e=>{const t=e.target as Element;if(t.closest('[data-scan]'))homeScan(true);const bird=t.closest<SVGElement>('[data-bird]');document.querySelectorAll('.p0 .hot').forEach(x=>x.classList.remove('hot'));if(bird){bird.classList.add('hot');showSkill(+bird.dataset.bird!);}const nav=t.closest('[data-nav]');const s=nav?.querySelector<HTMLElement>('[data-scramble]');if(s&&motion&&!nav!.contains(e.relatedTarget as Node))scramble(s,360);});
stage.addEventListener('pointerout',e=>{const t=(e.target as Element).closest('[data-scan]');if(t&&!t.contains(e.relatedTarget as Node))homeScan(false);});
stage.addEventListener('pointermove',e=>{
 field.point(e.clientX,e.clientY);if(!motion)return;pendingParallax={x:e.clientX/innerWidth-.5,y:e.clientY/innerHeight-.5};
});
document.addEventListener('keydown',e=>{
 if(e.target instanceof HTMLInputElement||e.ctrlKey||e.metaKey)return;
 const i=PAGES.findIndex(p=>p[0]===page);
 if(e.key==='Escape'&&page!=='home')setPage('home');
 if(e.key.toLowerCase()==='b')actions.blueprint($('#blueprint-toggle'));
 if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const d=e.key==='ArrowRight'?1:-1;if(page==='works'){e.preventDefault();route.step(d);}else{e.preventDefault();setPage(PAGES[wrap(i+d,PAGES.length)][0]);}}
});
setInterval(()=>{if(motion&&!document.hidden)morphGlyph($('#glyphs'));},2300);

// Deep links: #/about, #/works/wk-03, #/skills, #/contact.
function openHash(){const [m='',arg='']=location.hash.replace(/^#\/?/,'').split('/').map(decodeURIComponent);if(m==='works'){const i=works.findIndex(w=>w.id===arg);if(i>=0)route.selected=i;}if(PAGES.some(p=>p[0]===m)){setPage(m as Page,false);return true;}return false;}
addEventListener('hashchange',()=>{openHash();});
$('#blueprint-toggle').classList.toggle('active',blueprint);
showSkill(1);
if(!openHash())setPage('home',false);
let last=performance.now();
function frame(now:number){const dt=Math.min((now-last)/1000,.1);last=now;if(!document.hidden){
 if(pendingParallax){stage.style.setProperty('--mx',pendingParallax.x.toFixed(3));stage.style.setProperty('--my',pendingParallax.y.toFixed(3));pendingParallax=null;}
 reticle.frame(dt);field.frame(motion?dt:0);if(page==='works')route.frame(dt);
 if(page==='contact')covenant.frame(dt);
}requestAnimationFrame(frame);}
requestAnimationFrame(frame);
