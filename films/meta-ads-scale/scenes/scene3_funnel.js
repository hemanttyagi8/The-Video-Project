// Scene 3: The 3-Stage Scaling Funnel (Strict Reel Safe Zone)
import { PAL, drawRoundRect, drawBadge } from './ui_components.js';

export function drawScene3(ctx, t) {
  const W = 1080;

  // Category Tag
  drawBadge(ctx, 'PILLAR 2: SCALING ARCHITECTURE', W / 2, 280, {
    bg: 'rgba(138, 43, 226, 0.15)',
    color: '#c084fc',
    border: PAL.metaPurple
  });

  // Headline
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '800 58px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('THE 3-STAGE', W / 2, 380);
  ctx.fillStyle = PAL.metaCyan;
  ctx.fillText('SCALING FUNNEL ⏳', W / 2, 460);
  ctx.restore();

  // 3 Funnel Tiers (Centered in x: 180 to 900, y: 530 to 960)
  const tiers = [
    {
      name: 'TOP OF FUNNEL (TOFU)',
      role: 'Cold Brand Awareness',
      stats: '100,000 Impressions',
      topW: 720, botW: 520, h: 130, y: 530,
      col1: '#0081fb', col2: '#0052cc'
    },
    {
      name: 'MIDDLE OF FUNNEL (MOFU)',
      role: 'Engagement & Consideration',
      stats: '15,000 Engaged Visitors',
      topW: 500, botW: 340, h: 130, y: 680,
      col1: '#8a2be2', col2: '#6b21a8'
    },
    {
      name: 'BOTTOM OF FUNNEL (BOFU)',
      role: 'Direct Conversion / Sales',
      stats: '1,200 High-Ticket Orders',
      topW: 320, botW: 180, h: 130, y: 830,
      col1: '#10b981', col2: '#047857'
    }
  ];

  tiers.forEach((tier) => {
    ctx.save();
    const cx = W / 2;
    const x1 = cx - tier.topW / 2, x2 = cx + tier.topW / 2;
    const x3 = cx + tier.botW / 2, x4 = cx - tier.botW / 2;
    const yTop = tier.y, yBot = tier.y + tier.h;

    const grad = ctx.createLinearGradient(0, yTop, 0, yBot);
    grad.addColorStop(0, tier.col1);
    grad.addColorStop(1, tier.col2);

    ctx.beginPath();
    ctx.moveTo(x1, yTop);
    ctx.lineTo(x2, yTop);
    ctx.lineTo(x3, yBot);
    ctx.lineTo(x4, yBot);
    ctx.closePath();

    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = PAL.textWhite;
    ctx.font = '800 26px "Inter", sans-serif';
    ctx.fillText(tier.name, cx, yTop + 40);

    ctx.font = '600 21px "Inter", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText(tier.role, cx, yTop + 72);

    ctx.font = '700 20px "Inter", sans-serif';
    ctx.fillStyle = PAL.accentGold;
    ctx.fillText(tier.stats, cx, yTop + 102);
    ctx.restore();
  });

  // Flowing Particles
  for (let p = 0; p < 12; p++) {
    const cycle = (t * 0.8 + p * 0.28) % 1.0;
    const py = 530 + cycle * 430;
    const curW = (1.0 - cycle * 0.7) * 550;
    const px = W / 2 + (Math.sin(p * 2.3 + t * 4) * (curW * 0.35));

    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, 7, 0, Math.PI * 2);
    ctx.fillStyle = cycle > 0.65 ? PAL.growthGreen : (cycle > 0.35 ? '#c084fc' : PAL.metaCyan);
    ctx.fill();
    ctx.restore();
  }

  // Bottom Output Box: REVENUE ENGINE (Safe Zone y = 1010 to 1230, width = 760)
  const outY = 1010;
  drawRoundRect(ctx, 160, outY, 760, 220, 28, PAL.cardBg, PAL.growthGreen, 2.5);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '800 36px "Inter", sans-serif';
  ctx.fillStyle = PAL.growthGreen;
  ctx.fillText('PREDICTABLE REVENUE ENGINE 💰', W / 2, outY + 65);

  ctx.font = '600 26px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.fillText('Spend ₹100  ➔  Earn ₹300 - ₹500', W / 2, outY + 120);

  ctx.font = '500 22px "Inter", sans-serif';
  ctx.fillStyle = PAL.textMuted;
  ctx.fillText('Har rupee click se checkout tak accurately tracked hai!', W / 2, outY + 170);
  ctx.restore();
}
