// Scene 2: AI Advantage+ & Hyper-Targeting (Strict Reel Safe Zone)
import { PAL, drawRoundRect, drawBadge } from './ui_components.js';

export function drawScene2(ctx, t) {
  const W = 1080;

  // Top Category Tag
  drawBadge(ctx, 'PILLAR 1: AUDIENCE PRECISION', W / 2, 280, {
    bg: 'rgba(0, 129, 251, 0.15)',
    color: PAL.metaCyan,
    border: PAL.metaBlue
  });

  // Headline
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '800 58px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('META AI ADVANTAGE+', W / 2, 380);
  ctx.fillStyle = PAL.accentGold;
  ctx.fillText('TARGETS HIGH BUYING INTENT 🎯', W / 2, 460);
  ctx.restore();

  // Radar Scanner (Center: 540, 720, Radius: 210)
  const cx = W / 2, cy = 710, R = 210;

  ctx.save();
  // Radar concentric rings
  for (let r = 70; r <= R; r += 50) {
    ctx.strokeStyle = 'rgba(0, 129, 251, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Crosshairs
  ctx.strokeStyle = 'rgba(0, 129, 251, 0.35)';
  ctx.beginPath();
  ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy);
  ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R);
  ctx.stroke();

  // Rotating Radar Sweep Beam
  const sweepAngle = (t - 6.2) * 3.5;
  const sweepGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, R);
  sweepGrad.addColorStop(0, 'rgba(0, 198, 255, 0.6)');
  sweepGrad.addColorStop(1, 'rgba(0, 129, 251, 0)');

  ctx.fillStyle = sweepGrad;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, R, sweepAngle - 0.45, sweepAngle);
  ctx.closePath();
  ctx.fill();

  // Outer ring
  ctx.strokeStyle = PAL.metaBlue;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Audience Nodes locked by Radar
  const targetProfiles = [
    { x: cx - 110, y: cy - 90, label: 'Age: 24-38', intent: '98% Intent' },
    { x: cx + 110, y: cy - 40, label: 'E-com Shopper', intent: '95% Intent' },
    { x: cx - 10, y: cy + 120, label: 'High Spender', intent: '99% Intent' }
  ];

  targetProfiles.forEach((p, idx) => {
    const pPulse = 1.0 + Math.sin(t * 8 + idx) * 0.12;
    ctx.save();
    ctx.beginPath();
    ctx.arc(p.x, p.y, 28 * pPulse, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
    ctx.fill();

    // Node icon
    ctx.beginPath();
    ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
    ctx.fillStyle = PAL.growthGreen;
    ctx.fill();

    // Target callout pill
    drawRoundRect(ctx, p.x + 24, p.y - 20, 180, 44, 12, PAL.cardBg, PAL.growthGreen, 1.5);
    ctx.font = '700 18px "Inter", sans-serif';
    ctx.fillStyle = PAL.textWhite;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.label, p.x + 36, p.y - 6);
    ctx.font = '600 15px "Inter", sans-serif';
    ctx.fillStyle = PAL.accentGold;
    ctx.fillText(p.intent, p.x + 36, p.y + 10);
    ctx.restore();
  });

  // Feature Cards Stack (Safe Zone y = 990 to 1340, width = 760, centered at 540)
  const cardY = 990;
  const features = [
    { title: 'AI BEHAVIORAL TRACKING', desc: 'Active online buyers ko accurately identify karta hai' },
    { title: 'ADVANTAGE+ AUTOMATION', desc: 'Creatives & bidding budgets ko auto-optimize karta hai' },
    { title: 'ZERO WASTED AD SPEND', desc: 'Sirf high conversion intent audience par spend hota hai' }
  ];

  features.forEach((feat, i) => {
    const y = cardY + i * 115;
    drawRoundRect(ctx, 160, y, 760, 96, 20, PAL.cardBg, PAL.cardBorder, 1.5);

    // Number bullet
    ctx.save();
    ctx.beginPath();
    ctx.arc(215, y + 48, 25, 0, Math.PI * 2);
    ctx.fillStyle = PAL.metaBlue;
    ctx.fill();
    ctx.font = '800 22px "Inter", sans-serif';
    ctx.fillStyle = PAL.textWhite;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`0${i + 1}`, 215, y + 49);

    // Text details
    ctx.textAlign = 'left';
    ctx.font = '700 24px "Inter", sans-serif';
    ctx.fillStyle = PAL.textWhite;
    ctx.fillText(feat.title, 260, y + 36);

    ctx.font = '500 20px "Inter", sans-serif';
    ctx.fillStyle = PAL.textMuted;
    ctx.fillText(feat.desc, 260, y + 68);
    ctx.restore();
  });
}
