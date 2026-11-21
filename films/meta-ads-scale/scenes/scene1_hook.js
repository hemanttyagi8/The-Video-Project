// Scene 1: The Hook & Organic Reach Reality (Strict Reel Safe Zone)
import { PAL, drawRoundRect, drawBadge, drawMetaLogo, drawProgressBar } from './ui_components.js';

export function drawScene1(ctx, t) {
  const W = 1080;

  // Background Grid Matrix
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 70) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1920); ctx.stroke();
  }
  for (let y = 0; y < 1920; y += 70) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  ctx.restore();

  // Top Tag (Safe Area y = 280)
  drawBadge(ctx, 'DIGITAL MARKETING BLUEPRINT 2026', W / 2, 280, {
    bg: 'rgba(0, 129, 251, 0.15)',
    color: PAL.metaCyan,
    border: PAL.metaBlue
  });

  if (t < 7.7) {
    // ---- 0.0s - 7.7s: THE HOOK ----
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '800 58px "Inter", sans-serif';
    ctx.fillStyle = PAL.textWhite;
    ctx.fillText('WHY YOUR BUSINESS', W / 2, 380);
    ctx.fillStyle = PAL.alertRed;
    ctx.fillText('IS NOT SCALING? 📉', W / 2, 460);
    ctx.restore();

    // Problem Card (width: 780, x: 150 to 930, y: 530 to 1180)
    const cardY = 530;
    drawRoundRect(ctx, 150, cardY, 780, 650, 28, PAL.cardBg, PAL.cardBorder, 2);

    // Storefront Icon (vector)
    ctx.save();
    ctx.translate(W / 2, cardY + 140);
    // Roof
    ctx.fillStyle = PAL.alertRed;
    ctx.beginPath();
    ctx.moveTo(0, -80);
    ctx.lineTo(120, -15);
    ctx.lineTo(-120, -15);
    ctx.closePath();
    ctx.fill();
    // Shop base
    ctx.fillStyle = '#334155';
    ctx.fillRect(-100, -15, 200, 115);
    // Door
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-30, 20, 60, 80);
    // Windows
    ctx.fillStyle = '#64748b';
    ctx.fillRect(-80, 0, 36, 44);
    ctx.fillRect(44, 0, 36, 44);
    ctx.restore();

    // Organic Reach Drop Gauge
    const dropProg = Math.max(0.018, Math.min(1.0, 1.0 - (t / 6.0)));
    drawProgressBar(ctx, 210, cardY + 340, 660, 40, dropProg, {
      bg: '#0f172a',
      fill: dropProg > 0.3 ? PAL.accentGold : PAL.alertRed,
      label: (dropProg * 100).toFixed(1) + '%'
    });

    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '700 38px "Inter", sans-serif';
    ctx.fillStyle = PAL.alertRed;
    ctx.fillText('ORGANIC REACH: CRITICAL DROP ⚠️', W / 2, cardY + 440);

    ctx.font = '500 28px "Inter", sans-serif';
    ctx.fillStyle = PAL.textMuted;
    ctx.fillText('Problem product me nahi, reach me hai!', W / 2, cardY + 505);

    drawBadge(ctx, 'LESS THAN 2% AUDIENCE SEES THIS', W / 2, cardY + 580, {
      bg: 'rgba(239, 68, 68, 0.15)',
      color: PAL.alertRed,
      border: PAL.alertRed
    });
    ctx.restore();

  } else {
    // ---- 7.7s - 14.6s: THE REALITY & META ADS REVEAL ----
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '800 58px "Inter", sans-serif';
    ctx.fillStyle = PAL.textWhite;
    ctx.fillText('TRADITIONAL REACH IS DEAD', W / 2, 380);
    ctx.fillStyle = PAL.metaCyan;
    ctx.fillText('ENTER META ADS 🚀', W / 2, 460);
    ctx.restore();

    // 100 Audience Dots Grid (Centered in x: 280 to 800, y: 540 to 1020)
    const startX = 290, startY = 540;
    const dotSpacing = 55;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 10; c++) {
        const dotIdx = r * 10 + c;
        const isOrganicReach = dotIdx < 2; // Only 2% reach!
        const x = startX + c * dotSpacing;
        const y = startY + r * dotSpacing;

        ctx.beginPath();
        ctx.arc(x, y, 13, 0, Math.PI * 2);
        ctx.fillStyle = isOrganicReach ? PAL.growthGreen : '#334155';
        ctx.fill();
      }
    }

    // Callout badge for Organic Reach (Safe y = 1080)
    drawBadge(ctx, 'ORGANIC REACH = ONLY 2% ❌', W / 2, 1080, {
      bg: 'rgba(239, 68, 68, 0.15)',
      color: PAL.alertRed,
      border: PAL.alertRed
    });

    // Glowing Meta Logo burst (Safe y = 1240)
    if (t > 11.0) {
      const burstK = Math.min(1.0, (t - 11.0) / 1.5);
      drawMetaLogo(ctx, W / 2, 1220, 130 * burstK, 1.0 + Math.sin(t * 6) * 0.05);

      ctx.save();
      ctx.textAlign = 'center';
      ctx.font = '800 38px "Inter", sans-serif';
      ctx.fillStyle = PAL.metaCyan;
      ctx.fillText('100% ON-DEMAND AUDIENCE SCALE', W / 2, 1340);
      ctx.restore();
    }
  }
}
