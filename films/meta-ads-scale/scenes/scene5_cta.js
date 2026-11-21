// Scene 5: Final Call To Action & Scale Roadmap (Strict Reel Safe Zone)
import { PAL, drawRoundRect, drawBadge, drawMetaLogo } from './ui_components.js';

export function drawScene5(ctx, t) {
  const W = 1080;

  // Category Tag
  drawBadge(ctx, 'YOUR NEXT STEP TO SCALE', W / 2, 280, {
    bg: 'rgba(245, 158, 11, 0.15)',
    color: PAL.accentGold,
    border: PAL.accentGold
  });

  // Main Headline
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '800 58px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('STOP GUESSING,', W / 2, 380);
  ctx.fillStyle = PAL.growthGreen;
  ctx.fillText('START SCALING IN 2026! 🚀', W / 2, 460);
  ctx.restore();

  // Exponential Growth Chart Graphic (Safe Zone x: 160 to 920, y: 530 to 860)
  const graphY = 530;
  drawRoundRect(ctx, 160, graphY, 760, 330, 24, PAL.cardBg, PAL.cardBorder, 2);

  ctx.save();
  // Grid lines
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  for (let y = graphY + 60; y <= graphY + 260; y += 55) {
    ctx.beginPath(); ctx.moveTo(190, y); ctx.lineTo(890, y); ctx.stroke();
  }

  // Hockey-Stick Growth Line
  const lineK = Math.min(1.0, Math.max(0.0, (t - 36.0) / 3.0));
  ctx.strokeStyle = PAL.growthGreen;
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(200, graphY + 260);
  ctx.quadraticCurveTo(480, graphY + 250, 640, graphY + 180);
  ctx.quadraticCurveTo(740, graphY + 120, 860, graphY + 50);
  ctx.stroke();

  // Rocket Icon at the tip of the curve
  const rocketX = 200 + (860 - 200) * lineK;
  const rocketY = graphY + 260 - (Math.pow(lineK, 2.3) * 210);
  ctx.font = '40px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🚀', rocketX, rocketY - 10);

  ctx.font = '800 28px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('EXPONENTIAL REVENUE CURVE', W / 2, graphY + 300);
  ctx.restore();

  // High-Converting CTA Card (Safe Zone x: 160 to 920, y: 890 to 1340)
  const ctaY = 890;
  drawRoundRect(ctx, 160, ctaY, 760, 440, 28, PAL.cardBg, PAL.metaBlue, 2.5);

  // Meta Logo Center
  drawMetaLogo(ctx, W / 2, ctaY + 80, 85, 1.0 + Math.sin(t * 5) * 0.05);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '800 32px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('WANT TO SCALE WITH META ADS?', W / 2, ctaY + 160);

  // Instagram Handle Tag
  drawBadge(ctx, 'FOLLOW @MEGACROWDLAB 📲', W / 2, ctaY + 215, {
    bg: 'rgba(0, 129, 251, 0.2)',
    color: PAL.metaCyan,
    border: PAL.metaBlue
  });

  // Pulsing Interactive Button
  const btnPulse = 1.0 + Math.sin(t * 7) * 0.03;
  const bw = 580 * btnPulse, bh = 76 * btnPulse;
  const bx = (W - bw) / 2, by = ctaY + 265;

  const btnGrad = ctx.createLinearGradient(bx, by, bx + bw, by);
  btnGrad.addColorStop(0, '#0081fb');
  btnGrad.addColorStop(0.5, '#00c6ff');
  btnGrad.addColorStop(1, '#10b981');

  drawRoundRect(ctx, bx, by, bw, bh, bh / 2, btnGrad, '#ffffff', 2);

  ctx.font = '800 28px "Inter", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = 'middle';
  ctx.fillText('DM "SCALE" TO @MEGACROWDLAB', W / 2, by + bh / 2);

  // Subtext Guarantee
  ctx.font = '600 21px "Inter", sans-serif';
  ctx.fillStyle = PAL.textMuted;
  ctx.fillText('Instant Access to Free 2026 Growth Blueprint', W / 2, ctaY + 390);
  ctx.restore();
}
