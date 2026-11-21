// Scene 1: The Hook & Buying Intent Reality (Strict Reel Safe Zone)
import { PAL, drawRoundRect, drawBadge, drawSearchBar, drawProgressBar } from './ui_components.js';

export function drawScene1(ctx, t) {
  const W = 1080;

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
  drawBadge(ctx, 'GOOGLE ADS GROWTH SYSTEM', W / 2, 280, {
    bg: 'rgba(66, 133, 244, 0.15)',
    color: PAL.gBlue,
    border: PAL.gBlue
  });

  // Headline (Safe Area y = 380, 460)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '800 56px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('WHY YOUR BUSINESS', W / 2, 380);
  ctx.fillStyle = PAL.gRed;
  ctx.fillText('IS NOT SCALING? 📉', W / 2, 460);
  ctx.restore();

  // Comparison Container Card (x: 150 to 930, y: 520 to 1160)
  const cardX = 150;
  const cardY = 520;
  const cardW = 780;
  const cardH = 640;

  drawRoundRect(ctx, cardX, cardY, cardW, cardH, 24, PAL.cardBg, PAL.cardBorder, 2);

  // Card 1: Passive Scrolling (Red Alert)
  const topBlockY = cardY + 30;
  drawRoundRect(ctx, cardX + 30, topBlockY, cardW - 60, 240, 18, '#181f30', 'rgba(234, 67, 53, 0.4)', 2);

  ctx.save();
  ctx.fillStyle = PAL.gRed;
  ctx.font = '700 28px "Inter", sans-serif';
  ctx.fillText('❌ SOCIAL MEDIA: PASSIVE USERS', cardX + 60, topBlockY + 45);

  ctx.fillStyle = PAL.textMuted;
  ctx.font = '500 26px "Inter", sans-serif';
  ctx.fillText('People are scrolling for entertainment, reels & memes.', cardX + 60, topBlockY + 95);
  ctx.fillText('Buying Intent is extremely low.', cardX + 60, topBlockY + 135);

  // Intent Gauge 1
  ctx.fillStyle = PAL.textDim;
  ctx.font = '600 22px "Inter", sans-serif';
  ctx.fillText('CONVERSION INTENT', cardX + 60, topBlockY + 185);
  drawProgressBar(ctx, cardX + 320, topBlockY + 165, cardW - 400, 32, 0.05, {
    bg: '#0c111c',
    fill: PAL.gRed,
    label: '0.8% Intent'
  });
  ctx.restore();

  // VS Divider Badge
  drawBadge(ctx, 'VS ACTIVE SEARCH', W / 2, cardY + 315, {
    bg: '#0f172a',
    color: PAL.gYellow,
    border: PAL.gYellow
  });

  // Card 2: Google Active Search (High Intent Green/Blue)
  const botBlockY = cardY + 355;
  drawRoundRect(ctx, cardX + 30, botBlockY, cardW - 60, 250, 18, '#182438', 'rgba(52, 168, 83, 0.5)', 2);

  ctx.save();
  ctx.fillStyle = PAL.gGreen;
  ctx.font = '700 28px "Inter", sans-serif';
  ctx.fillText('✅ GOOGLE SEARCH: ACTIVE BUYERS', cardX + 60, botBlockY + 45);

  // Simulated Typing Effect in Google Search Bar
  const fullQuery = 'Best Service / Buy Now...';
  const chars = Math.min(fullQuery.length, Math.floor(t * 7));
  const typed = fullQuery.substring(0, chars);
  drawSearchBar(ctx, cardX + 60, botBlockY + 70, cardW - 120, 68, typed, (Math.floor(t * 3) % 2 === 0));

  // Intent Gauge 2
  ctx.fillStyle = PAL.textDim;
  ctx.font = '600 22px "Inter", sans-serif';
  ctx.fillText('BUYING INTENT', cardX + 60, botBlockY + 195);
  const intentProg = Math.min(0.92, 0.2 + (t / 10.0) * 0.72);
  drawProgressBar(ctx, cardX + 320, botBlockY + 175, cardW - 400, 32, intentProg, {
    bg: '#0c111c',
    fill: PAL.gGreen,
    label: '85% Ready to Buy'
  });
  ctx.restore();

  // Bottom Takeaway Ribbon (y = 1200 to 1270, inside safe zone)
  drawRoundRect(ctx, cardX, 1200, cardW, 70, 18, 'rgba(66, 133, 244, 0.12)', PAL.gBlue, 1.5);
  ctx.save();
  ctx.fillStyle = PAL.gBlue;
  ctx.font = '700 28px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Target intent, not just impressions! 🎯', W / 2, 1235);
  ctx.restore();
}
