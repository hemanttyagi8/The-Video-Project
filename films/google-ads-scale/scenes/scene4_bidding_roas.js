// Scene 4: Pay-Per-Click & Smart Bidding ROAS (Strict Reel Safe Zone)
import { PAL, drawRoundRect, drawBadge, drawProgressBar } from './ui_components.js';

export function drawScene4(ctx, t) {
  const W = 1080;
  const relT = t - 34.65;

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
  drawBadge(ctx, 'PPC & SMART BIDDING AI', W / 2, 280, {
    bg: 'rgba(251, 188, 5, 0.15)',
    color: PAL.gYellow,
    border: PAL.gYellow
  });

  // Headline (Safe Area y = 370, 445)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '800 52px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('PAY-PER-CLICK MODEL', W / 2, 370);
  ctx.fillStyle = PAL.gGreen;
  ctx.font = '800 44px "Inter", sans-serif';
  ctx.fillText('ZERO BUDGET WASTAGE 💰', W / 2, 445);
  ctx.restore();

  const cardX = 150;
  const cardW = 780;

  // Card 1: The PPC Guarantee (y = 515 to 745)
  drawRoundRect(ctx, cardX, 515, cardW, 230, 20, PAL.cardBg, PAL.gGreen, 2.5);

  ctx.save();
  ctx.fillStyle = PAL.gGreen;
  ctx.font = '800 32px "Inter", sans-serif';
  ctx.fillText('💡 THE GOOGLE PPC GUARANTEE', cardX + 35, 565);

  // Impressions Free Pill
  drawRoundRect(ctx, cardX + 35, 600, cardW - 70, 56, 12, 'rgba(52, 168, 83, 0.12)', PAL.gGreen, 1.5);
  ctx.fillStyle = PAL.textWhite;
  ctx.font = '700 24px "Inter", sans-serif';
  ctx.fillText('👁️ 10,000 Views / Impressions = ₹0 (FREE)', cardX + 55, 636);

  // Pay Only On Click Pill
  drawRoundRect(ctx, cardX + 35, 668, cardW - 70, 56, 12, 'rgba(66, 133, 244, 0.15)', PAL.gBlue, 1.5);
  ctx.fillStyle = PAL.gBlue;
  ctx.fillText('🖱️ Pay ONLY when a real customer clicks!', cardX + 55, 704);
  ctx.restore();

  // Card 2: Smart Bidding AI & ROAS Growth Chart (y = 765 to 1180)
  drawRoundRect(ctx, cardX, 765, cardW, 415, 22, PAL.cardBg, PAL.cardBorder, 2);

  ctx.save();
  ctx.fillStyle = PAL.gYellow;
  ctx.font = '800 32px "Inter", sans-serif';
  ctx.fillText('🤖 SMART BIDDING ALGORITHM', cardX + 35, 815);

  ctx.fillStyle = PAL.textMuted;
  ctx.font = '500 24px "Inter", sans-serif';
  ctx.fillText('Google AI continuously optimizes for highest value sales.', cardX + 35, 855);

  // Animated ROAS Bars
  const animProg = Math.min(1.0, relT / 7.0);

  // Spend Bar
  ctx.fillStyle = PAL.textDim;
  ctx.font = '600 22px "Inter", sans-serif';
  ctx.fillText('AD SPEND', cardX + 35, 915);
  drawProgressBar(ctx, cardX + 180, 895, cardW - 220, 32, 0.35, {
    bg: '#0c111c',
    fill: PAL.cardBgLight,
    label: '₹10,000 Spend'
  });

  // Revenue Return Bar (Grows Dynamically)
  ctx.fillStyle = PAL.gGreen;
  ctx.font = '700 22px "Inter", sans-serif';
  ctx.fillText('REVENUE', cardX + 35, 985);
  const revProg = 0.35 + animProg * 0.58;
  drawProgressBar(ctx, cardX + 180, 965, cardW - 220, 36, revProg, {
    bg: '#0c111c',
    fill: PAL.gGreen,
    label: `₹${Math.round(10000 + animProg * 38000)} Generated!`
  });

  // ROAS Badge Box
  drawRoundRect(ctx, cardX + 35, 1030, cardW - 70, 125, 16, '#182438', PAL.gGreen, 2);

  ctx.fillStyle = PAL.gGreen;
  ctx.font = '900 48px "Inter", sans-serif';
  ctx.fillText('4.8X ROAS', cardX + 60, 1105);

  ctx.fillStyle = PAL.textWhite;
  ctx.font = '700 28px "Inter", sans-serif';
  ctx.fillText('+380% Net Return on Ad Spend', cardX + 320, 1085);
  ctx.fillStyle = PAL.accentGold;
  ctx.font = '600 22px "Inter", sans-serif';
  ctx.fillText('Predictable & Scalable Revenue Pipeline', cardX + 320, 1125);
  ctx.restore();

  // Bottom Takeaway Ribbon (Safe Area y = 1205)
  drawRoundRect(ctx, cardX, 1205, cardW, 68, 16, 'rgba(52, 168, 83, 0.12)', PAL.gGreen, 1.5);
  ctx.save();
  ctx.fillStyle = PAL.gGreen;
  ctx.font = '700 28px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Every single rupee is tracked & optimized! 📈', W / 2, 1239);
  ctx.restore();
}
