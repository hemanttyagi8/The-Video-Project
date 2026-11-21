import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const duration = 32.363958;
// Phrase boundaries estimated using two local ASR passes. These are editorial
// timing cues, not a claim that the automatic lyric transcription is exact.
const shots = [
  {name:'The reveal', image:'01-arrival.png', start:0, end:4.60, from:1.02, to:1.105, x1:0,x2:-14,y1:0,y2:22, origin:'51% 35%', dissolve:0.55},
  {name:'His response', image:'03-heart.png', start:4.24, end:9.28, from:1.07,to:1.02,x1:-10,x2:6,y1:12,y2:0,origin:'45% 36%',dissolve:0.36},
  {name:'Face to face', image:'02-meeting.png', start:9.04,end:14.32,from:1.015,to:1.11,x1:0,x2:6,y1:0,y2:38,origin:'50% 34%',dissolve:0.25},
  {name:'The world falls away',image:'02-meeting.png',start:14.16,end:18.10,from:1.20,to:1.26,x1:8,x2:-8,y1:40,y2:50,origin:'50% 30%',dissolve:0.18},
  {name:'Her gaze',image:'04-gaze.png',start:17.96,end:20.92,from:1.015,to:1.06,x1:0,x2:5,y1:0,y2:12,origin:'53% 36%',dissolve:0.12},
  {name:'His gaze',image:'03-heart.png',start:20.80,end:23.20,from:1.20,to:1.24,x1:0,x2:-8,y1:40,y2:45,origin:'49% 30%',dissolve:0.10},
  {name:'A playful exchange',image:'04-gaze.png',start:23.08,end:25.32,from:1.12,to:1.16,x1:-4,x2:5,y1:15,y2:20,origin:'50% 32%',dissolve:0.10},
  {name:'The feeling settles',image:'03-heart.png',start:25.20,end:27.36,from:1.08,to:1.035,x1:5,x2:0,y1:10,y2:0,origin:'49% 37%',dissolve:0.10},
  {name:'Shared happiness',image:'05-smile.png',start:27.12,end:duration,from:1.10,to:1.015,x1:0,x2:0,y1:16,y2:0,origin:'50% 35%',dissolve:0.24}
];
fs.writeFileSync(path.join(dir,'edit-plan.json'),JSON.stringify({duration,width:1080,height:1920,fps:30,shots},null,2));
const particles=Array.from({length:32},(_,i)=>`<i id="dust-${i}" class="dust" style="left:${(i*313+97)%1080}px;top:${(i*197+31)%1920}px;width:${2+i%4}px;height:${2+i%4}px"></i>`).join('');
const petals=Array.from({length:11},(_,i)=>`<i id="petal-${i}" class="petal" style="left:${i%2?930+(i*19)%120:10+(i*37)%160}px;top:${(i*233+71)%1920}px;width:${14+i%3*6}px;height:${9+i%4*3}px"></i>`).join('');
fs.writeFileSync(path.join(dir,'index.html'),`<!doctype html>
<html><head><meta charset="utf-8"><title>Be Hijabana — An Illustrated Film</title><style>
*{box-sizing:border-box}html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:#08171c}
#film{position:relative;width:1080px;height:1920px;overflow:hidden;background:#08171c}
.shot{position:absolute;inset:0;width:1080px;height:1920px;object-fit:cover;opacity:0;will-change:transform,opacity}
#light{position:absolute;inset:-180px;background:radial-gradient(ellipse at 8% 30%,#ffb76717,transparent 53%);mix-blend-mode:screen;pointer-events:none}
#vignette{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 43%,transparent 42%,#02101655 100%);pointer-events:none}
#veil{position:absolute;left:-280px;top:-100px;width:750px;height:2150px;border-radius:40% 70% 35% 40%;transform:rotate(9deg);background:linear-gradient(100deg,#ad693800,#e9cf9d88 37%,#ffe8bf22 70%,transparent);filter:blur(18px);pointer-events:none}
.dust{position:absolute;display:block;border-radius:50%;background:#ffe3a6;opacity:.25;box-shadow:0 0 7px #ffd38570;pointer-events:none}
.petal{position:absolute;display:block;background:linear-gradient(135deg,#f28d9a,#9f253e 76%);border-radius:80% 14% 70% 25%;box-shadow:inset 1px 1px 3px #ffd5c333;opacity:.55;pointer-events:none}
#black{position:absolute;inset:0;background:#071218;opacity:0;pointer-events:none}
</style></head><body>
<div id="film" data-composition-id="be-hijabana" data-start="0" data-duration="${duration}" data-width="1080" data-height="1920" data-fps="30">
${shots.map((s,i)=>`<img id="shot-${i}" class="shot clip" src="assets/${s.image}" data-start="${s.start}" data-duration="${s.end-s.start}" data-track-index="${i}" style="transform-origin:${s.origin}" alt="${s.name}">`).join('\n')}
<div id="light" class="clip" data-start="0" data-duration="${duration}" data-track-index="10"></div>
<div id="atmosphere" class="clip" data-start="0" data-duration="${duration}" data-track-index="11" style="position:absolute;inset:0;pointer-events:none">${particles}${petals}</div>
<div id="vignette" class="clip" data-start="0" data-duration="${duration}" data-track-index="12"></div>
<div id="veil" class="clip" data-start="0" data-duration="4.5" data-track-index="13"></div>
<div id="black" class="clip" data-start="0" data-duration="${duration}" data-track-index="14"></div>
<audio id="song" class="clip" src="assets/song.wav" data-start="0" data-duration="${duration}" data-volume="1" data-track-index="15"></audio>
</div><script src="assets/gsap.min.js"></script><script>
const shots=${JSON.stringify(shots)};
const tl=gsap.timeline({paused:true});
shots.forEach((s,i)=>{
 const el='#shot-'+i, length=s.end-s.start;
 tl.fromTo(el,{opacity:0},{opacity:1,duration:s.dissolve,ease:'sine.inOut',immediateRender:false},s.start);
 tl.fromTo(el,{scale:s.from,x:s.x1,y:s.y1},{scale:s.to,x:s.x2,y:s.y2,duration:length,ease:'none',immediateRender:false},s.start);
});
tl.fromTo('#veil',{x:0,opacity:.7},{x:-630,opacity:0,duration:3.4,ease:'power2.out'},0);
tl.fromTo('#light',{x:-30,opacity:.6},{x:50,opacity:1,duration:8,ease:'sine.inOut',repeat:4,yoyo:true},0);
for(let i=0;i<32;i++){
 tl.fromTo('#dust-'+i,{x:0,y:0,opacity:.12+(i%4)*.06},{x:Math.sin(i)*80,y:-220-(i%5)*38,opacity:.24+(i%3)*.07,duration:${duration},ease:'sine.inOut'},0);
}
for(let i=0;i<11;i++){
 tl.fromTo('#petal-'+i,{x:0,y:-70,rotation:i*41,rotationY:0},{x:(i%2?-1:1)*(30+i*4),y:330+(i%4)*75,rotation:i*41+130,rotationY:240+(i%3)*90,duration:${duration},ease:'sine.inOut'},0);
}
tl.fromTo('#black',{opacity:.65},{opacity:0,duration:.45,ease:'sine.out'},0);
tl.to('#black',{opacity:1,duration:.5,ease:'sine.in'},${duration-.5});
window.__timelines={'be-hijabana':tl};
</script></body></html>`);
console.log('Built Be Hijabana: '+shots.length+' shots, '+duration+' seconds');
