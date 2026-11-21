// Scene 4: Retargeting & 4.5X ROAS (Strict Reel Safe Zone)
import { PAL, drawRoundRect, drawBadge } from './ui_components.js';

export function drawScene4(ctx, t) {
  const W = 1080;

  // Category Tag
  drawBadge(ctx, 'PILLAR 3: THE SECRET SAUCE', W / 2, 280, {
    bg: 'rgba(16, 185, 129, 0.15)',
    color: PAL.growthGreen,
    border: PAL.growthGreen
  });

  // Headline
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '800 58px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('97% VISITORS DROP OFF?', W / 2, 380);
  ctx.fillStyle = PAL.growthGreen;
  ctx.fillText('PIXEL RETARGETING TO 4.5X 🚀', W / 2, 460);
  ctx.restore();

  // Retargeting Flow Card (Safe Zone x: 160 to 920, y: 530 to 830)
  const cardY = 530;
  drawRoundRect(ctx, 160, cardY, 760, 300, 24, PAL.cardBg, PAL.cardBorder, 2);

  // Step 1: Abandoned Cart
  drawRoundRect(ctx, 190, cardY + 30, 200, 110, 16, '#0f172a', PAL.alertRed, 1.5);
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '700 36px "Inter", sans-serif';
  ctx.fillText('🛒❌', 290, cardY + 80);
  ctx.font = '600 18px "Inter", sans-serif';
  ctx.fillStyle = PAL.alertRed;
  ctx.fillText('Abandoned Cart', 290, cardY + 118);
  ctx.restore();

  // Animated Arrow Beam
  ctx.save();
  ctx.strokeStyle = PAL.metaCyan;
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 10]);
  ctx.lineDashOffset = -t * 35;
  ctx.beginPath();
  ctx.moveTo(405, cardY + 85);
  ctx.lineTo(670, cardY + 85);
  ctx.stroke();
  ctx.restore();

  // Step 2: Pixel Beacon
  drawRoundRect(ctx, 690, cardY + 30, 200, 110, 16, '#0f172a', PAL.growthGreen, 1.5);
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '700 36px "Inter", sans-serif';
  ctx.fillText('🎯🔔', 790, cardY + 80);
  ctx.font = '600 18px "Inter", sans-serif';
  ctx.fillStyle = PAL.growthGreen;
  ctx.fillText('Pixel Retargeted', 790, cardY + 118);
  ctx.restore();

  // Notification Banner
  drawRoundRect(ctx, 190, cardY + 165, 700, 110, 18, '#172554', PAL.metaBlue, 1.5);
  ctx.save();
  ctx.textAlign = 'left';
  ctx.font = '700 24px "Inter", sans-serif';
  ctx.fillStyle = PAL.metaCyan;
  ctx.fillText('⚡ SPECIAL RETARGET OFFER SENT:', 220, cardY + 208);
  ctx.font = '500 20px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('"Complete your order & get 15% OFF today!"', 220, cardY + 248);
  ctx.restore();

  // Dynamic ROAS Bar Chart (Safe Zone x: 160 to 920, y: 860 to 1290)
  const chartY = 860;
  drawRoundRect(ctx, 160, chartY, 760, 430, 28, PAL.cardBg, PAL.cardBorder, 2);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '800 34px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('CAMPAIGN SCALING METRICS', W / 2, chartY + 50);

  // Big 4.5X ROAS Badge
  drawBadge(ctx, 'PROVEN 4.5X ROAS 🚀', W / 2, chartY + 85, {
    bg: PAL.growthGreen,
    color: '#022c22',
    border: '#f8fafc'
  });

  // Bars Base: y = chartY + 340
  const barBaseY = chartY + 350;
  const barW = 150;

  // Bar 1: Ad Spend (₹10,000)
  const bar1X = 280;
  const bar1H = 65;
  drawRoundRect(ctx, bar1X, barBaseY - bar1H, barW, bar1H, 14, PAL.metaBlue);

  ctx.font = '700 24px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('₹10,000', bar1X + barW / 2, barBaseY - bar1H - 15);
  ctx.font = '600 20px "Inter", sans-serif';
  ctx.fillStyle = PAL.textMuted;
  ctx.fillText('Ad Spend', bar1X + barW / 2, barBaseY + 35);

  // Bar 2: Revenue Generated (₹45,000)
  const surgeK = Math.min(1.0, Math.max(0.0, (t - 27.0) / 2.5));
  const bar2X = 580;
  const bar2H = (130 * surgeK) + 25;
  drawRoundRect(ctx, bar2X, barBaseY - bar2H, barW, bar2H, 14, PAL.growthGreen);

  ctx.font = '800 28px "Inter", sans-serif';
  ctx.fillStyle = PAL.growthGreen;
  ctx.fillText(`₹${Math.round(10000 + 35000 * surgeK).toLocaleString()}`, bar2X + barW / 2, barBaseY - bar2H - 15);
  ctx.font = '600 20px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('Revenue', bar2X + barW / 2, barBaseY + 35);
  ctx.restore();
}
