// Scene 5: Actionable CTA & Competitor Urgency (Strict Reel Safe Zone)
import { PAL, drawRoundRect, drawBadge, drawGoogleG } from './ui_components.js';

export function drawScene5(ctx, t) {
  const W = 1080;
  const relT = t - 48.65;

  // Background Grid Matrix
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 70) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1920); ctx.stroke();
  }
  for (let y = 0; y < 1920; y += 70) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  ctx.restore();

  // Top Tag (Safe Area y = 280)
  drawBadge(ctx, 'ACTION BLUEPRINT', W / 2, 280, {
    bg: 'rgba(234, 67, 53, 0.15)',
    color: PAL.gRed,
    border: PAL.gRed
  });

  // Headline (Safe Area y = 370, 445)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '800 52px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('DON\'T LET COMPETITORS', W / 2, 370);
  ctx.fillStyle = PAL.gYellow;
  ctx.font = '800 46px "Inter", sans-serif';
  ctx.fillText('STEAL YOUR CUSTOMERS! ⚠️', W / 2, 445);
  ctx.restore();

  const cardX = 150;
  const cardW = 780;

  // Card 1: Google Ads Live Campaign Dashboard Mockup (y = 515 to 830)
  drawRoundRect(ctx, cardX, 515, cardW, 315, 22, PAL.cardBg, PAL.cardBorder, 2);

  ctx.save();
  // Header with Google G Logo
  drawGoogleG(ctx, cardX + 65, 565, 55);

  ctx.fillStyle = PAL.textWhite;
  ctx.font = '800 30px "Inter", sans-serif';
  ctx.fillText('Google Ads Dashboard', cardX + 115, 560);

  // Status Indicator Pill
  drawBadge(ctx, '🟢 ACTIVE & SCALING', cardX + cardW - 170, 560, {
    bg: 'rgba(52, 168, 83, 0.2)',
    color: PAL.gGreen,
    border: PAL.gGreen
  });

  // 4 Metrics Grid Inside
  const mY = 620;
  const mW = (cardW - 80) / 2;

  // Metric 1: Impressions
  drawRoundRect(ctx, cardX + 30, mY, mW, 85, 14, '#182438', PAL.cardBorder, 1);
  ctx.fillStyle = PAL.textDim;
  ctx.font = '600 20px "Inter", sans-serif';
  ctx.fillText('IMPRESSIONS', cardX + 50, mY + 30);
  ctx.fillStyle = PAL.textWhite;
  ctx.font = '800 34px "Inter", sans-serif';
  ctx.fillText('248,500', cardX + 50, mY + 68);

  // Metric 2: High-Intent Clicks
  drawRoundRect(ctx, cardX + 50 + mW, mY, mW, 85, 14, '#182438', PAL.cardBorder, 1);
  ctx.fillStyle = PAL.textDim;
  ctx.font = '600 20px "Inter", sans-serif';
  ctx.fillText('QUALIFIED CLICKS', cardX + 70 + mW, mY + 30);
  ctx.fillStyle = PAL.gBlue;
  ctx.font = '800 34px "Inter", sans-serif';
  ctx.fillText('14,280', cardX + 70 + mW, mY + 68);

  // Metric 3: Leads Generated
  drawRoundRect(ctx, cardX + 30, mY + 95, mW, 85, 14, '#182438', PAL.cardBorder, 1);
  ctx.fillStyle = PAL.textDim;
  ctx.font = '600 20px "Inter", sans-serif';
  ctx.fillText('BUYER CONVERSIONS', cardX + 50, mY + 125);
  ctx.fillStyle = PAL.gGreen;
  ctx.font = '800 34px "Inter", sans-serif';
  ctx.fillText('1,890 Leads', cardX + 50, mY + 163);

  // Metric 4: ROAS
  drawRoundRect(ctx, cardX + 50 + mW, mY + 95, mW, 85, 14, '#182438', PAL.cardBorder, 1);
  ctx.fillStyle = PAL.textDim;
  ctx.font = '600 20px "Inter", sans-serif';
  ctx.fillText('OVERALL RETURN', cardX + 70 + mW, mY + 125);
  ctx.fillStyle = PAL.accentGold;
  ctx.font = '800 34px "Inter", sans-serif';
  ctx.fillText('+420% ROI', cardX + 70 + mW, mY + 163);
  ctx.restore();

  // Card 2: Pulsing High-Converting CTA Box (y = 855 to 1180)
  const pulse = 1.0 + Math.sin(relT * 5) * 0.03;
  ctx.save();
  ctx.translate(W / 2, 1015);
  ctx.scale(pulse, pulse);
  ctx.translate(-W / 2, -1015);

  drawRoundRect(ctx, cardX, 855, cardW, 320, 24, 'rgba(66, 133, 244, 0.15)', PAL.gBlue, 3);

  // CTA Text
  ctx.textAlign = 'center';
  ctx.fillStyle = PAL.textWhite;
  ctx.font = '700 28px "Inter", sans-serif';
  ctx.fillText('WANT TO SCALE YOUR BUSINESS?', W / 2, 910);

  // Glowing Comment Button
  drawRoundRect(ctx, cardX + 60, 940, cardW - 120, 95, 20, PAL.gBlue);

  ctx.fillStyle = PAL.textWhite;
  ctx.font = '900 44px "Inter", sans-serif';
  ctx.fillText('COMMENT "GOOGLE" 👇', W / 2, 1000);

  ctx.fillStyle = PAL.textMuted;
  ctx.font = '600 24px "Inter", sans-serif';
  ctx.fillText('We will send you the 7-Day Scaling Strategy Guide!', W / 2, 1075);
  ctx.fillText('Follow @megacrowdlab for daily growth blueprints', W / 2, 1120);

  ctx.restore();

  // Bottom Takeaway Ribbon (Safe Area y = 1205)
  drawRoundRect(ctx, cardX, 1205, cardW, 68, 16, 'rgba(234, 67, 53, 0.15)', PAL.gRed, 1.5);
  ctx.save();
  ctx.fillStyle = PAL.gRed;
  ctx.font = '700 28px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Stop waiting. Launch your campaign today! 🚀', W / 2, 1239);
  ctx.restore();
}
