import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const duration = 37.5;
const fps = 30;
const width = 1080;
const height = 1920;

// Exact timestamped beats aligned with the source audio
const shots = [
  {
    name: 'Beat 0: Broken petals under tree',
    image: 'assets/images/01-road-walk.png',
    start: 0,
    end: 9.6,
    from: 1.00,
    to: 1.05,
    origin: '50% 40%',
    dissolve: 0.8
  },
  {
    name: 'Beat 1: Hands gathering petals',
    image: 'assets/images/02-hands-gathering.png',
    start: 9.2,
    end: 16.5,
    from: 1.00,
    to: 1.05,
    origin: '50% 50%',
    dissolve: 0.6
  },
  {
    name: 'Beat 2: Name Tu completed in sunlight',
    image: 'assets/images/03-name-tu.png',
    start: 16.1,
    end: 22.5,
    from: 1.00,
    to: 1.05,
    origin: '50% 45%',
    dissolve: 0.6
  },
  {
    name: 'Beat 3: Shielding name from wind',
    image: 'assets/images/04-hands-shielding.png',
    start: 22.1,
    end: 28.4,
    from: 1.00,
    to: 1.05,
    origin: '50% 45%',
    dissolve: 0.8
  },
  {
    name: 'Beat 4: Sunlight and blooming rose',
    image: 'assets/images/05-sunlight-bloom.png',
    start: 28.0,
    end: 33.8,
    from: 1.06,
    to: 1.00, // Only pull-back in the film per plan
    origin: '50% 50%',
    dissolve: 0.6
  },
  {
    name: 'Beat 5: Boy walks away, name holds',
    image: 'assets/images/06-boy-walking-away.png',
    start: 33.4,
    end: duration,
    from: 1.00,
    to: 1.02,
    origin: '50% 40%',
    dissolve: 0.6
  }
];

const lyrics = [
  {
    id: 'lyric-0',
    beat: 0,
    start: 0.6,
    end: 9.4,
    words: [
      { text: 'आ...', start: 0.8 },
      { text: 'बिखरी', start: 1.5 },
      { text: 'पड़ी', start: 2.2 },
      { text: 'थीं', start: 2.9 },
      { text: 'टूट', start: 3.6 },
      { text: 'के', start: 4.3 },
      { text: 'कलियाँ', start: 5.0 },
      { text: 'ज़मीन', start: 5.7 },
      { text: 'पर', start: 6.4 }
    ],
    meaning: 'The buds lay broken, scattered on the ground;',
    meaningStart: 6.8
  },
  {
    id: 'lyric-1',
    beat: 1,
    start: 9.6,
    end: 16.3,
    words: [
      { text: 'तरतीब', start: 9.8 },
      { text: 'दे', start: 10.4 },
      { text: 'के', start: 11.0 },
      { text: 'मैंने', start: 11.6 },
      { text: 'तेरा', start: 12.2 },
      { text: 'नाम', start: 12.8, pulse: true },
      { text: 'लिख', start: 13.4 },
      { text: 'दिया', start: 14.0 }
    ],
    meaning: 'set them in order, and wrote your name;',
    meaningStart: 14.3
  },
  {
    id: 'lyric-2',
    beat: 2,
    start: 16.5,
    end: 22.3,
    words: [
      { text: 'तरतीब', start: 16.6 },
      { text: 'दे', start: 17.1 },
      { text: 'के', start: 17.6 },
      { text: 'मैंने', start: 18.1 },
      { text: 'तेरा', start: 18.6 },
      { text: 'नाम', start: 19.1 },
      { text: 'लिख', start: 19.6 },
      { text: 'दिया', start: 20.1 }
    ],
    meaning: 'from what was broken, I wrote your name;',
    meaningStart: 20.4,
    specialTu: { start: 20.0, end: 22.3 }
  },
  {
    id: 'lyric-3',
    beat: 3,
    start: 22.5,
    end: 28.2,
    words: [
      { text: 'आ...', start: 22.8 }
    ],
    meaning: 'The wind came, but the name did not scatter; he protected it.',
    meaningStart: 24.2
  },
  {
    id: 'lyric-4',
    beat: 4,
    start: 28.4,
    end: 33.6,
    isSargam: true,
    words: [
      { text: 'ग म म ध नि ध नि ध नि ध ग म ग म ध नि', start: 28.6 }
    ],
    meaning: 'Sunlight breaks through, and what was broken blooms again.',
    meaningStart: 29.5
  }
];

// Save edit-plan.json
fs.writeFileSync(
  path.join(dir, 'edit-plan.json'),
  JSON.stringify({ duration, width, height, fps, shots, lyrics }, null, 2)
);

// Generate floating petals and atmosphere particles
const petalsCount = 18;
const petalsHtml = Array.from({ length: petalsCount }, (_, i) => {
  const left = (i * 61 + 35) % 1020;
  const top = (i * 107 + 50) % 1800;
  const sizeW = 18 + (i % 4) * 5;
  const sizeH = 12 + (i % 3) * 4;
  return `<i id="petal-${i}" class="petal" style="left:${left}px;top:${top}px;width:${sizeW}px;height:${sizeH}px"></i>`;
}).join('');

const dustCount = 28;
const dustHtml = Array.from({ length: dustCount }, (_, i) => {
  const left = (i * 39 + 71) % 1040;
  const top = (i * 73 + 120) % 1850;
  const size = 3 + (i % 3);
  return `<i id="dust-${i}" class="dust" style="left:${left}px;top:${top}px;width:${size}px;height:${size}px"></i>`;
}).join('');

// Generate HTML
const html = `<!doctype html>
<html lang="hi">
<head>
<meta charset="utf-8">
<title>Bikhri Padi Thin — Impasto Film</title>
<style>
@font-face {
  font-family: 'Devanagari';
  src: url('assets/fonts/NotoSansDevanagari.ttf') format('truetype');
  font-weight: 400 700;
  font-display: block;
}

* { box-sizing: border-box; }
html, body {
  margin: 0;
  width: ${width}px;
  height: ${height}px;
  overflow: hidden;
  background: #0d1217;
  font-family: 'Devanagari', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

#film {
  position: relative;
  width: ${width}px;
  height: ${height}px;
  overflow: hidden;
  background: #0d1217;
}

/* Background shots */
.shot-container {
  position: absolute;
  inset: 0;
  width: ${width}px;
  height: ${height}px;
  overflow: hidden;
}

.shot {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  will-change: transform, opacity;
}

/* Fallback canvas/gradient for impasto background if image is rendering */
.shot-fallback {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 40%, #3a4a5e 0%, #1f1c1a 70%, #0d1217 100%);
  z-index: 0;
}

/* Atmospheric Overlays */
#sunlight-wash {
  position: absolute;
  inset: -100px;
  background: radial-gradient(ellipse at 45% 25%, rgba(255, 179, 71, 0.35) 0%, rgba(255, 158, 61, 0.15) 45%, transparent 70%);
  mix-blend-mode: screen;
  pointer-events: none;
  opacity: 0;
  z-index: 10;
}

#vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(15, 20, 26, 0.45) 80%, rgba(8, 12, 16, 0.78) 100%);
  pointer-events: none;
  z-index: 11;
}

#grain {
  position: absolute;
  inset: 0;
  background: repeating-radial-gradient(circle at 50% 50%, transparent 0, rgba(0,0,0,0.03) 1px, transparent 2px);
  opacity: 0.45;
  pointer-events: none;
  z-index: 12;
}

/* Particles: Petals & Dust */
#particles-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 13;
}

.petal {
  position: absolute;
  display: block;
  background: linear-gradient(135deg, #e0245c 0%, #c0392b 45%, #9d174d 100%);
  border-radius: 80% 15% 75% 25%;
  box-shadow: 0 0 6px rgba(192, 57, 43, 0.4), inset 1px 1px 2px rgba(255, 209, 102, 0.3);
  opacity: 0;
  pointer-events: none;
}

.dust {
  position: absolute;
  display: block;
  border-radius: 50%;
  background: #ffd166;
  opacity: 0;
  box-shadow: 0 0 8px rgba(255, 209, 102, 0.6);
  pointer-events: none;
}

/* Text System - Top-Center y=180 to 420 */
#text-stage {
  position: absolute;
  top: 0;
  left: 0;
  width: ${width}px;
  height: ${height}px;
  pointer-events: none;
  z-index: 20;
}

.lyric-card {
  position: absolute;
  top: 180px;
  left: 60px;
  right: 60px;
  text-align: center;
  opacity: 0;
}

.hindi-line {
  font-family: 'Devanagari', serif;
  font-size: 76px;
  line-height: 1.3;
  font-weight: 700;
  color: #FFD166;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.8), 0 0 22px rgba(245, 197, 66, 0.35);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px 22px;
}

.sargam-line {
  font-family: 'Devanagari', serif;
  font-size: 56px;
  line-height: 1.4;
  font-weight: 600;
  color: #FFD166;
  letter-spacing: 4px;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.85), 0 0 28px rgba(255, 209, 102, 0.5);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px 18px;
}

.word {
  display: inline-block;
  opacity: 0;
  transform: scale(0.96);
  will-change: transform, opacity;
}

.word.pulse {
  text-shadow: 0 0 30px #ffd166, 0 0 50px #ff9e3d;
}

.meaning-line {
  margin-top: 22px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 34px;
  font-weight: 400;
  line-height: 1.35;
  color: rgba(255, 255, 255, 0.88);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
  opacity: 0;
  letter-spacing: 0.5px;
}

/* Peak Glowing Tu */
#glowing-tu-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  font-family: 'Devanagari', serif;
  font-size: 110px;
  font-weight: 700;
  color: #FFD166;
  text-shadow: 0 0 35px rgba(255, 209, 102, 0.9), 0 0 70px rgba(255, 158, 61, 0.7);
  opacity: 0;
  z-index: 25;
  pointer-events: none;
}

/* Outro Title */
#outro-title {
  position: absolute;
  bottom: 230px;
  left: 60px;
  right: 60px;
  text-align: center;
  font-family: 'Devanagari', serif;
  font-size: 50px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #FFD166;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.9), 0 0 25px rgba(255, 209, 102, 0.4);
  opacity: 0;
  z-index: 20;
}

#outro-sub {
  font-family: -apple-system, sans-serif;
  font-size: 26px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 2px;
  margin-top: 12px;
}

/* Final black fade */
#black-fade {
  position: absolute;
  inset: 0;
  background: #000000;
  opacity: 0;
  pointer-events: none;
  z-index: 100;
}
</style>
</head>
<body>
<div id="film" data-composition-id="bikhri-padi-thin" data-start="0" data-duration="${duration}" data-width="${width}" data-height="${height}" data-fps="${fps}">
  <div class="shot-fallback"></div>
  <div class="shot-container">
    ${shots.map((s, i) => `<img id="shot-${i}" class="shot clip" src="${s.image}" data-start="${s.start}" data-duration="${(s.end - s.start).toFixed(2)}" data-track-index="${i}" style="transform-origin:${s.origin}" alt="${s.name}">`).join('\n    ')}
  </div>

  <div id="sunlight-wash" class="clip" data-start="0" data-duration="${duration}" data-track-index="10"></div>
  <div id="vignette" class="clip" data-start="0" data-duration="${duration}" data-track-index="11"></div>
  <div id="grain" class="clip" data-start="0" data-duration="${duration}" data-track-index="12"></div>
  <div id="particles-layer" class="clip" data-start="0" data-duration="${duration}" data-track-index="13">${petalsHtml}${dustHtml}</div>

  <div id="text-stage" class="clip" data-start="0" data-duration="${duration}" data-track-index="14">
    ${lyrics.map(lyr => `
    <div id="${lyr.id}" class="lyric-card">
      <div class="${lyr.isSargam ? 'sargam-line' : 'hindi-line'}">
        ${lyr.words.map((w, wi) => `<span id="${lyr.id}-w-${wi}" class="word${w.pulse ? ' pulse' : ''}">${w.text}</span>`).join('\n        ')}
      </div>
      <div id="${lyr.id}-meaning" class="meaning-line">${lyr.meaning}</div>
    </div>`).join('\n')}
    <div id="glowing-tu-badge">तू</div>
    <div id="outro-title">
      <div>बिखरी पड़ी थीं</div>
      <div id="outro-sub">Bikhri Padi Thin</div>
    </div>
  </div>

  <div id="black-fade" class="clip" data-start="0" data-duration="${duration}" data-track-index="15"></div>
  <audio id="song" class="clip" src="assets/audio/source.wav" data-start="0" data-duration="${duration}" data-volume="1" data-track-index="16"></audio>
</div>

<script src="assets/js/gsap.min.js"></script>
<script>
const duration = ${duration};
const tl = gsap.timeline({ paused: true });

// Initial fade in from black (0.8s)
tl.fromTo('#black-fade', { opacity: 1 }, { opacity: 0, duration: 0.8, ease: 'sine.out' }, 0);

// Shots crossfades and Ken Burns motion
${shots.map((s, i) => {
  const el = `#shot-${i}`;
  const length = (s.end - s.start).toFixed(2);
  return `
tl.fromTo('${el}', { opacity: 0 }, { opacity: 1, duration: ${s.dissolve}, ease: 'sine.inOut', immediateRender: false }, ${s.start});
tl.fromTo('${el}', { scale: ${s.from} }, { scale: ${s.to}, duration: ${length}, ease: 'none', immediateRender: false }, ${s.start});
${i < shots.length - 1 ? `tl.to('${el}', { opacity: 0, duration: ${s.dissolve}, ease: 'sine.inOut' }, ${(s.end - s.dissolve).toFixed(2)});` : ''}
`;
}).join('\n')}

// Sunlight wash animation (rises in Beats 2-4)
tl.fromTo('#sunlight-wash', { opacity: 0 }, { opacity: 0.75, duration: 6, ease: 'sine.inOut' }, 16.0);
tl.to('#sunlight-wash', { opacity: 1.0, duration: 8, ease: 'sine.inOut' }, 26.0);

// Particles motion
for (let i = 0; i < ${petalsCount}; i++) {
  const pId = '#petal-' + i;
  tl.fromTo(pId, 
    { opacity: 0, y: -80, rotationX: i * 20, rotationY: i * 35, rotationZ: i * 15 }, 
    { opacity: 0.7, duration: 2.5, ease: 'sine.inOut' }, 
    (i * 1.5) % 25
  );
  tl.to(pId, 
    { 
      y: 700 + (i % 5) * 160, 
      x: (i % 2 === 0 ? 1 : -1) * (60 + (i % 4) * 30), 
      rotationZ: 180 + i * 45, 
      rotationY: 360 + i * 60, 
      duration: duration, 
      ease: 'none' 
    }, 
    0
  );
}

for (let i = 0; i < ${dustCount}; i++) {
  const dId = '#dust-' + i;
  tl.fromTo(dId, 
    { opacity: 0, scale: 0.5, y: 0 }, 
    { opacity: 0.35 + (i % 4) * 0.1, duration: 3, ease: 'sine.inOut' }, 
    (i * 0.9) % 22
  );
  tl.to(dId, 
    { 
      y: -240 - (i % 6) * 40, 
      x: Math.sin(i) * 70, 
      duration: duration, 
      ease: 'sine.inOut' 
    }, 
    0
  );
}

// Lyrics word-by-word entry
${lyrics.map(lyr => {
  const cardId = `#${lyr.id}`;
  const lines = [];
  // Show card container
  lines.push(`tl.set('${cardId}', { opacity: 1 }, ${lyr.start});`);
  
  // Word by word entry (0.35s blur to sharp + scale + opacity)
  lyr.words.forEach((w, wi) => {
    const wId = `${cardId}-w-${wi}`;
    lines.push(`tl.fromTo('${wId}', { opacity: 0, filter: 'blur(8px)', scale: 0.96 }, { opacity: 1, filter: 'blur(0px)', scale: 1.0, duration: 0.35, ease: 'power2.out' }, ${w.start});`);
    if (w.pulse) {
      lines.push(`tl.to('${wId}', { textShadow: '0 0 35px #FFD166, 0 0 60px #FF9E3D', duration: 0.4, yoyo: true, repeat: 1 }, ${w.start + 0.1});`);
    }
  });

  // Meaning line entry
  const mId = `${cardId}-meaning`;
  lines.push(`tl.fromTo('${mId}', { opacity: 0, y: 8 }, { opacity: 0.88, y: 0, duration: 0.5, ease: 'sine.out' }, ${lyr.meaningStart});`);

  // Card fade out at end of beat
  lines.push(`tl.to('${cardId}', { opacity: 0, filter: 'blur(4px)', duration: 0.4, ease: 'sine.in' }, ${(lyr.end - 0.4).toFixed(2)});`);

  return lines.join('\n');
}).join('\n\n')}

// Special glowing Tu in Beat 2 (20.0s)
tl.fromTo('#glowing-tu-badge', 
  { opacity: 0, xPercent: -50, yPercent: -50, scale: 0.8 }, 
  { opacity: 0.95, xPercent: -50, yPercent: -50, scale: 1.05, duration: 0.4, ease: 'back.out(1.5)', immediateRender: false }, 
  20.0
);
tl.to('#glowing-tu-badge', { opacity: 0, scale: 1.15, duration: 0.6, ease: 'sine.in' }, 21.6);

// Outro title (34.2s)
tl.fromTo('#outro-title', 
  { opacity: 0, y: 15 }, 
  { opacity: 1, y: 0, duration: 0.8, ease: 'sine.out', immediateRender: false }, 
  34.2
);

// Final fade to black at 36.8s to 37.5s
tl.to('#black-fade', 
  { opacity: 1, duration: 0.7, ease: 'sine.in' }, 
  36.8
);

window.__timelines = { 'bikhri-padi-thin': tl };
</script>
</body>
</html>`;

fs.writeFileSync(path.join(dir, 'index.html'), html);
console.log(`Built index.html for Bikhri Padi Thin: ${width}x${height}, ${duration}s @ ${fps}fps`);
