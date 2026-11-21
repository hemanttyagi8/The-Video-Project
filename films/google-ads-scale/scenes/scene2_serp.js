// Scene 2: Google SERP & High Purchase Intent (Strict Reel Safe Zone)
import { PAL, drawRoundRect, drawBadge, drawGoogleG, drawStarRating } from './ui_components.js';

export function drawScene2(ctx, t) {
  const W = 1080;
  const relT = t - 10.63;

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
  drawBadge(ctx, 'THE HIGH INTENT ADVANTAGE', W / 2, 280, {
    bg: 'rgba(52, 168, 83, 0.15)',
    color: PAL.gGreen,
    border: PAL.gGreen
  });

  // Headline (Safe Area y = 370, 445)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '800 52px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('WHY GOOGLE ADS WINS?', W / 2, 370);
  ctx.fillStyle = PAL.gBlue;
  ctx.font = '800 48px "Inter", sans-serif';
  ctx.fillText('ACTIVE BUYER TRAFFIC ⚡', W / 2, 445);
  ctx.restore();

  // Google G Logo with soft scale pulse
  const pulse = 1.0 + Math.sin(relT * 3) * 0.04;
  drawGoogleG(ctx, W / 2, 550, 90 * pulse);

  // Big Stat Counter (Safe Area y = 640)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '800 56px "Inter", sans-serif';
  ctx.fillStyle = PAL.gYellow;
  ctx.fillText('8.5 BILLION+', W / 2, 650);
  ctx.font = '600 28px "Inter", sans-serif';
  ctx.fillStyle = PAL.textMuted;
  ctx.fillText('Daily Searches Happening Right Now', W / 2, 700);
  ctx.restore();

  // SERP Result Card (x: 150 to 930, y: 740 to 1180)
  const cardX = 150;
  const cardY = 740;
  const cardW = 780;
  const cardH = 430;

  drawRoundRect(ctx, cardX, cardY, cardW, cardH, 22, PAL.cardBg, PAL.gBlue, 2.5);

  // Sponsored Label + URL
  ctx.save();
  ctx.font = '700 24px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('Sponsored', cardX + 35, cardY + 45);
  ctx.font = '500 22px "Inter", sans-serif';
  ctx.fillStyle = PAL.textDim;
  ctx.fillText(' · https://www.yourbrand.com', cardX + 165, cardY + 45);

  // Ad Title
  ctx.font = '800 36px "Inter", sans-serif';
  ctx.fillStyle = PAL.gBlue;
  ctx.fillText('#1 Best Rated Solution - Scale Today', cardX + 35, cardY + 105);

  // Ad Description
  ctx.font = '500 26px "Inter", sans-serif';
  ctx.fillStyle = PAL.textMuted;
  ctx.fillText('Get instant leads & verified buyers with smart targeting.', cardX + 35, cardY + 160);
  ctx.fillText('Guaranteed highest intent traffic in your industry.', cardX + 35, cardY + 200);

  // Star Ratings & Reviews
  drawStarRating(ctx, cardX + 35, cardY + 250, 5);
  ctx.font = '700 24px "Inter", sans-serif';
  ctx.fillStyle = PAL.accentGold;
  ctx.fillText('4.9  (2,450+ Verified Client Reviews)', cardX + 175, cardY + 250);

  // Interactive Sitelink Buttons (Call / Quote / Fast Delivery)
  drawRoundRect(ctx, cardX + 35, cardY + 300, 210, 56, 12, '#182438', PAL.cardBorder, 1.5);
  ctx.fillStyle = PAL.textWhite;
  ctx.font = '600 22px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('📞 Call Now', cardX + 140, cardY + 335);

  drawRoundRect(ctx, cardX + 265, cardY + 300, 220, 56, 12, '#182438', PAL.cardBorder, 1.5);
  ctx.fillText('⚡ Instant Quote', cardX + 375, cardY + 335);

  drawRoundRect(ctx, cardX + 505, cardY + 300, 235, 56, 12, 'rgba(52, 168, 83, 0.2)', PAL.gGreen, 1.5);
  ctx.fillStyle = PAL.gGreen;
  ctx.fillText('🚀 Order Online', cardX + 622, cardY + 335);
  ctx.restore();

  // Bottom Takeaway Ribbon (Safe Area y = 1205)
  drawRoundRect(ctx, cardX, 1205, cardW, 68, 16, 'rgba(251, 188, 5, 0.12)', PAL.gYellow, 1.5);
  ctx.save();
  ctx.fillStyle = PAL.gYellow;
  ctx.font = '700 28px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('People search with wallet in hand! 💳', W / 2, 1239);
  ctx.restore();
}
