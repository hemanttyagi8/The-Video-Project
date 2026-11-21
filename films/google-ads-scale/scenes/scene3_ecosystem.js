// Scene 3: The 3-Way Scaling Ecosystem (Strict Reel Safe Zone)
import { PAL, drawRoundRect, drawBadge } from './ui_components.js';

export function drawScene3(ctx, t) {
  const W = 1080;
  const relT = t - 23.30;

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
  drawBadge(ctx, 'THE COMPLETE AD ECOSYSTEM', W / 2, 280, {
    bg: 'rgba(66, 133, 244, 0.15)',
    color: PAL.gBlue,
    border: PAL.gBlue
  });

  // Headline (Safe Area y = 370, 445)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '800 52px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('GOOGLE 3-WAY ENGINE', W / 2, 370);
  ctx.fillStyle = PAL.gGreen;
  ctx.font = '800 44px "Inter", sans-serif';
  ctx.fillText('90% INTERNET REACH 🚀', W / 2, 445);
  ctx.restore();

  // Container (x: 150 to 930)
  const cardX = 150;
  const cardW = 780;

  // Card 1: Google Search Ads (Blue)
  const c1Y = 515;
  const c1Active = relT > 1.0;
  drawRoundRect(ctx, cardX, c1Y, cardW, 205, 20, PAL.cardBg, c1Active ? PAL.gBlue : PAL.cardBorder, 2.5);

  ctx.save();
  ctx.fillStyle = PAL.gBlue;
  ctx.font = '800 32px "Inter", sans-serif';
  ctx.fillText('🔍 1. GOOGLE SEARCH ADS', cardX + 35, c1Y + 50);

  ctx.fillStyle = PAL.textWhite;
  ctx.font = '600 26px "Inter", sans-serif';
  ctx.fillText('Direct High-Intent Customer Capture', cardX + 35, c1Y + 100);

  ctx.fillStyle = PAL.textMuted;
  ctx.font = '500 24px "Inter", sans-serif';
  ctx.fillText('Appears #1 on Google when customers need you.', cardX + 35, c1Y + 145);

  // Badge tag
  drawBadge(ctx, 'HIGH INTENT', cardX + cardW - 130, c1Y + 50, {
    bg: 'rgba(66, 133, 244, 0.2)',
    color: PAL.gBlue,
    border: PAL.gBlue
  });
  ctx.restore();

  // Card 2: YouTube Video Ads (Red)
  const c2Y = 745;
  const c2Active = relT > 4.5;
  drawRoundRect(ctx, cardX, c2Y, cardW, 205, 20, PAL.cardBg, c2Active ? PAL.gRed : PAL.cardBorder, 2.5);

  ctx.save();
  ctx.fillStyle = PAL.gRed;
  ctx.font = '800 32px "Inter", sans-serif';
  ctx.fillText('▶ 2. YOUTUBE VIDEO ADS', cardX + 35, c2Y + 50);

  ctx.fillStyle = PAL.textWhite;
  ctx.font = '600 26px "Inter", sans-serif';
  ctx.fillText('Instant Trust & Brand Authority', cardX + 35, c2Y + 100);

  ctx.fillStyle = PAL.textMuted;
  ctx.font = '500 24px "Inter", sans-serif';
  ctx.fillText('Video storytelling to build massive social proof.', cardX + 35, c2Y + 145);

  // Badge tag
  drawBadge(ctx, 'HIGH TRUST', cardX + cardW - 130, c2Y + 50, {
    bg: 'rgba(234, 67, 53, 0.2)',
    color: PAL.gRed,
    border: PAL.gRed
  });
  ctx.restore();

  // Card 3: Performance Max & Display (Green)
  const c3Y = 975;
  const c3Active = relT > 8.0;
  drawRoundRect(ctx, cardX, c3Y, cardW, 205, 20, PAL.cardBg, c3Active ? PAL.gGreen : PAL.cardBorder, 2.5);

  ctx.save();
  ctx.fillStyle = PAL.gGreen;
  ctx.font = '800 32px "Inter", sans-serif';
  ctx.fillText('⚡ 3. PERFORMANCE MAX', cardX + 35, c3Y + 50);

  ctx.fillStyle = PAL.textWhite;
  ctx.font = '600 26px "Inter", sans-serif';
  ctx.fillText('35 Lakh+ Websites, Gmail & Apps', cardX + 35, c3Y + 100);

  ctx.fillStyle = PAL.textMuted;
  ctx.font = '500 24px "Inter", sans-serif';
  ctx.fillText('Smart AI retargeting across the entire web.', cardX + 35, c3Y + 145);

  // Badge tag
  drawBadge(ctx, 'FULL WEB REACH', cardX + cardW - 150, c3Y + 50, {
    bg: 'rgba(52, 168, 83, 0.2)',
    color: PAL.gGreen,
    border: PAL.gGreen
  });
  ctx.restore();

  // Bottom Takeaway Ribbon (Safe Area y = 1205)
  drawRoundRect(ctx, cardX, 1205, cardW, 68, 16, 'rgba(66, 133, 244, 0.12)', PAL.gBlue, 1.5);
  ctx.save();
  ctx.fillStyle = PAL.gBlue;
  ctx.font = '700 28px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Surround customers on all channels! 🌐', W / 2, 1239);
  ctx.restore();
}
