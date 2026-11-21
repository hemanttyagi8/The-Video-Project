// Master Film Director for "How Meta Ads Help Scale Business" Explainer Reel
// Strictly mapped to standard 9:16 Reel Safe Zone (x: 140-940, y: 260-1480)
import { drawScene1 } from './scenes/scene1_hook.js';
import { drawScene2 } from './scenes/scene2_targeting.js';
import { drawScene3 } from './scenes/scene3_funnel.js';
import { drawScene4 } from './scenes/scene4_roas.js';
import { drawScene5 } from './scenes/scene5_cta.js';

export const W = 1080;
export const H = 1920;
export const DUR = 45.3;

let CUES = [];

export async function setup(canvas) {
  canvas.width = W;
  canvas.height = H;

  try {
    const res = await fetch('./audio/word_cues.json');
    if (res.ok) {
      CUES = await res.json();
    }
  } catch (e) {
    console.warn('Word cues fetch warning, using defaults:', e);
  }

  const ctx = canvas.getContext('2d');
  window.DUR = DUR;
  return (t) => frame(ctx, t);
}

// Draw Kinetic Spoken Caption inside Safe Zone (x: 180 to 900, y = 1380 to 1460)
function drawKineticCaptions(ctx, t) {
  let activeCue = null;
  for (const c of CUES) {
    if (t >= c.start && t <= c.end + 0.15) {
      activeCue = c;
      break;
    }
  }

  if (!activeCue) return;

  const text = activeCue.text;
  ctx.save();
  ctx.font = '800 36px "Inter", sans-serif';
  
  // Word wrap logic to guarantee text NEVER overflows 720px safe width
  const maxW = 680;
  const words = text.split(' ');
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const testLine = currentLine + ' ' + words[i];
    if (ctx.measureText(testLine).width < maxW) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = words[i];
    }
  }
  lines.push(currentLine);

  // Measure max width of lines
  let textW = 0;
  for (const l of lines) {
    textW = Math.max(textW, ctx.measureText(l).width);
  }

  const padX = 36;
  const bh = lines.length === 1 ? 72 : 110;
  const bw = Math.min(760, Math.max(340, textW + padX * 2));
  const bx = (W - bw) / 2;
  const by = lines.length === 1 ? 1390 : 1365;

  // Glowing Backdrop Shadow
  ctx.shadowColor = 'rgba(0, 129, 251, 0.45)';
  ctx.shadowBlur = 20;

  // Caption Pill Background
  ctx.fillStyle = 'rgba(10, 15, 30, 0.94)';
  ctx.strokeStyle = '#0081fb';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(bx, by, bw, bh, 24);
  ctx.fill();
  ctx.stroke();

  ctx.shadowBlur = 0;

  // Spoken Caption Text (Vibrant High-Contrast Yellow)
  ctx.fillStyle = '#fde047';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (lines.length === 1) {
    ctx.fillText(lines[0], W / 2, by + bh / 2);
  } else {
    ctx.fillText(lines[0], W / 2, by + 34);
    ctx.fillText(lines[1], W / 2, by + 76);
  }

  ctx.restore();
}

export function frame(ctx, t) {
  // Clear frame with deep tech navy background
  ctx.fillStyle = '#0a0e17';
  ctx.fillRect(0, 0, W, H);

  // Scene Dispatch based on authentic voiceover timing
  if (t < 6.2) {
    drawScene1(ctx, t);
  } else if (t < 16.45) {
    drawScene2(ctx, t);
  } else if (t < 25.63) {
    drawScene3(ctx, t);
  } else if (t < 35.88) {
    drawScene4(ctx, t);
  } else {
    drawScene5(ctx, t);
  }

  // Draw Kinetic Spoken Caption (within safe zone)
  drawKineticCaptions(ctx, t);
}
