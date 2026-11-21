import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);
const c = JSON.parse(fs.readFileSync('status.json', 'utf8'));
const esc = s => String(s).replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
if (!Number.isFinite(c.duration) || c.duration < 8 || c.duration > 60) throw new Error('duration must be 8-60 seconds');
if (!Array.isArray(c.lines) || c.lines.length < 1 || c.lines.length > 4 || c.lines.some(x => typeof x !== 'string' || x.length > 34)) throw new Error('Use 1-4 short lines, max 34 characters each');
if (!/^#[0-9a-f]{6}$/i.test(c.accent)) throw new Error('accent must be a hex color');
if (!Number.isFinite(c.musicVolume) || c.musicVolume < 0 || c.musicVolume > 1) throw new Error('musicVolume must be 0-1');
for (const f of [c.music, c.background].filter(Boolean)) {
  if (!f.startsWith('assets/') || f.includes('..') || !fs.existsSync(f)) throw new Error('Missing local asset: ' + f);
}
for (const d of ['assets/vendor','assets/music','assets/backgrounds','output']) fs.mkdirSync(d, {recursive:true});
fs.copyFileSync('node_modules/gsap/dist/gsap.min.js','assets/vendor/gsap.min.js');
const D = c.duration;
const bg = c.background ? `<img id="photo" src="${esc(c.background)}" alt="">` : '';
const music = c.music ? `<audio id="music" class="clip" src="${esc(c.music)}" data-start="0" data-duration="${D}" data-track-index="2" data-volume="${c.musicVolume}"></audio>` : '';
fs.writeFileSync('index.html', `<!doctype html>
<html lang="hi"><head><meta charset="utf-8"><title>Shayari Status</title>
<style>
@font-face{font-family:'Status Hindi';src:url('assets/fonts/NotoSansDevanagari.ttf') format('truetype');font-weight:100 900;font-display:block}
*{box-sizing:border-box}html,body{margin:0;width:1080px;height:1920px;background:#0a141b;overflow:hidden}
#root{position:relative;width:1080px;height:1920px;overflow:hidden;background:radial-gradient(ellipse at 68% 22%,#344248 0%,#172b34 34%,#0a141b 74%);color:#f5ecdd}
#photo{position:absolute;width:100%;height:100%;object-fit:cover;opacity:.4}
#halo{position:absolute;left:530px;top:180px;width:460px;height:460px;border:1px solid #d9b78830;border-radius:50%;box-shadow:0 0 180px #d9b78808,inset 0 0 130px #d9b78808}
#moon{position:absolute;left:716px;top:335px;width:78px;height:78px;border-radius:50%;background:#eddec0;box-shadow:0 0 65px #eddec035}
#hill{position:absolute;width:1500px;height:850px;left:-250px;bottom:-400px;border-radius:50%;background:#08131b;transform:rotate(-14deg)}
#hill2{position:absolute;width:1300px;height:700px;right:-450px;bottom:-330px;border-radius:50%;background:#0d1d25;transform:rotate(16deg)}
#text{position:absolute;top:710px;left:110px;right:110px;text-align:center}
#label{font:22px Arial,sans-serif;letter-spacing:8px;color:${c.accent};margin-bottom:70px}
.line{font-family:'Status Hindi',sans-serif;font-size:70px;line-height:1.65;font-weight:400;white-space:nowrap}
.line:last-child{color:${c.accent}}
#rule{width:68px;height:2px;background:${c.accent};margin:62px auto 36px}
#footer{font:italic 27px Georgia,serif;letter-spacing:3px;color:#c3c7c6}
.star{position:absolute;width:3px;height:3px;background:#e6d7b8;border-radius:50%;opacity:.35}
#progress{position:absolute;left:150px;bottom:235px;height:2px;width:780px;background:${c.accent};transform-origin:left center;opacity:.4}
</style></head><body>
<div id="root" data-composition-id="shayari-status" data-start="0" data-duration="${D}" data-width="1080" data-height="1920">
<div id="scene" class="clip" data-start="0" data-duration="${D}" data-track-index="0" style="position:absolute;inset:0">
${bg}<div id="halo"></div><div id="moon"></div><div id="hill"></div><div id="hill2"></div>
${Array.from({length:28},(_,i)=>`<i class="star" style="left:${80+(i*197)%920}px;top:${140+(i*131)%1250}px"></i>`).join('')}
<div id="text"><div id="label">${esc(c.label)}</div>${c.lines.map(s=>`<div class="line">${esc(s)}</div>`).join('')}<div id="rule"></div><div id="footer">${esc(c.footer)}</div></div><div id="progress"></div>
</div>${music}
</div><script src="assets/vendor/gsap.min.js"></script><script>
const tl = gsap.timeline({paused:true});
tl.from('#scene',{opacity:0,duration:1.1},0);
tl.from('#label',{opacity:0,y:12,duration:1},0.5);
tl.from('.line',{opacity:0,y:28,stagger:0.85,duration:1.3,ease:'power2.out'},1.3);
tl.from('#rule, #footer',{opacity:0,y:10,stagger:0.2,duration:1},4.5);
tl.fromTo('#progress',{scaleX:0},{scaleX:1,duration:${D},ease:'none'},0);
tl.to('#halo',{scale:1.12,x:-18,duration:${D},ease:'none'},0);
tl.to('.star',{y:-35,opacity:.65,stagger:0.025,duration:${D-1},ease:'sine.inOut'},0);
${c.background ? `tl.to('#photo',{scale:1.08,duration:${D},ease:'none'},0);` : ''}
tl.to('#scene',{opacity:0,duration:0.9},${D-0.9});
window.__timelines = {'shayari-status':tl};
</script></body></html>`);
console.log('Built index.html: 1080 x 1920, ' + D + ' seconds');
