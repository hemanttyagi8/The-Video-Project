// Reusable 2D Vector UI Components for Flat Infographic Explainer Reel
// Color Palette
export const PAL = {
  bgDark: '#0a0e17',
  bgNavy: '#0f172a',
  cardBg: '#1e293b',
  cardBorder: '#334155',
  metaBlue: '#0081fb',
  metaCyan: '#00c6ff',
  metaPurple: '#8a2be2',
  growthGreen: '#10b981',
  alertRed: '#ef4444',
  accentGold: '#f59e0b',
  textWhite: '#f8fafc',
  textMuted: '#94a3b8'
};

// Helper: Rounded Rectangle
export function drawRoundRect(ctx, x, y, w, h, r, fillStyle, strokeStyle, strokeWidth = 0) {
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (strokeStyle && strokeWidth > 0) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }
  ctx.restore();
}

// Helper: Pill Badge
export function drawBadge(ctx, text, x, y, { bg = PAL.cardBg, color = PAL.textWhite, border = PAL.cardBorder, icon = '' } = {}) {
  ctx.save();
  ctx.font = '600 32px "Inter", sans-serif';
  const fullText = (icon ? icon + '  ' : '') + text;
  const metrics = ctx.measureText(fullText);
  const padX = 28, padY = 16;
  const bw = metrics.width + padX * 2;
  const bh = 54;

  drawRoundRect(ctx, x - bw / 2, y - bh / 2, bw, bh, 27, bg, border, 2);

  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(fullText, x, y);
  ctx.restore();
}

// Helper: Glowing Meta Infinity Logo
export function drawMetaLogo(ctx, cx, cy, size = 120, pulse = 1.0) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(size / 100 * pulse, size / 100 * pulse);

  // Soft Outer Glow
  const glow = ctx.createRadialGradient(0, 0, 30, 0, 0, 100);
  glow.addColorStop(0, 'rgba(0, 129, 251, 0.45)');
  glow.addColorStop(1, 'rgba(0, 129, 251, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, 100, 0, Math.PI * 2);
  ctx.fill();

  // Infinity Loop Curves
  const grad = ctx.createLinearGradient(-70, -40, 70, 40);
  grad.addColorStop(0, '#0081fb');
  grad.addColorStop(0.5, '#00c6ff');
  grad.addColorStop(1, '#8a2be2');

  ctx.strokeStyle = grad;
  ctx.lineWidth = 18;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  // Left loop
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-35, -45, -70, -45, -70, 0);
  ctx.bezierCurveTo(-70, 45, -35, 45, 0, 0);
  // Right loop
  ctx.bezierCurveTo(35, -45, 70, -45, 70, 0);
  ctx.bezierCurveTo(70, 45, 35, 45, 0, 0);
  ctx.stroke();

  ctx.restore();
}

// Helper: Progress Bar
export function drawProgressBar(ctx, x, y, w, h, progress, { bg = '#1e293b', fill = PAL.metaBlue, label = '' } = {}) {
  drawRoundRect(ctx, x, y, w, h, h / 2, bg, '#334155', 2);
  const fillW = Math.max(h, w * Math.min(1.0, Math.max(0, progress)));
  drawRoundRect(ctx, x, y, fillW, h, h / 2, fill);

  if (label) {
    ctx.save();
    ctx.font = '600 24px "Inter", sans-serif';
    ctx.fillStyle = PAL.textWhite;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x + w - 16, y + h / 2);
    ctx.restore();
  }
}
