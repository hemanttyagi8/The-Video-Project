// UI Components & Vector Graphics for Google Ads Scale Explainer Reel
export const PAL = {
  bgDark: '#080c15',
  cardBg: '#111726',
  cardBgLight: '#182235',
  cardBorder: '#223048',
  gBlue: '#4285F4',
  gRed: '#EA4335',
  gYellow: '#FBBC05',
  gGreen: '#34A853',
  textWhite: '#F8FAFC',
  textMuted: '#94A3B8',
  textDim: '#64748B',
  accentGold: '#F59E0B'
};

// Rounded Rectangle
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

// Pill Badge
export function drawBadge(ctx, text, x, y, { bg = PAL.cardBg, color = PAL.textWhite, border = PAL.cardBorder, icon = '' } = {}) {
  ctx.save();
  ctx.font = '700 28px "Inter", sans-serif';
  const fullText = (icon ? icon + '  ' : '') + text;
  const metrics = ctx.measureText(fullText);
  const padX = 26;
  const bw = metrics.width + padX * 2;
  const bh = 52;

  drawRoundRect(ctx, x - bw / 2, y - bh / 2, bw, bh, 26, bg, border, 2);

  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(fullText, x, y);
  ctx.restore();
}

// Official 4-Color Google 'G' Logo rendered precisely in pure Canvas 2D
export function drawGoogleG(ctx, cx, cy, size = 80) {
  ctx.save();
  ctx.translate(cx, cy);
  const r = size / 2;

  // Soft Radial Glow
  const glow = ctx.createRadialGradient(0, 0, r * 0.4, 0, 0, r * 1.5);
  glow.addColorStop(0, 'rgba(66, 133, 244, 0.35)');
  glow.addColorStop(1, 'rgba(66, 133, 244, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, r * 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = r * 0.4;
  ctx.lineCap = 'butt';

  // 1. Red Arc (Top Left / Top)
  ctx.beginPath();
  ctx.strokeStyle = PAL.gRed;
  ctx.arc(0, 0, r * 0.8, -Math.PI * 0.75, -Math.PI * 0.25);
  ctx.stroke();

  // 2. Yellow Arc (Bottom Left)
  ctx.beginPath();
  ctx.strokeStyle = PAL.gYellow;
  ctx.arc(0, 0, r * 0.8, Math.PI * 0.65, Math.PI * 1.25);
  ctx.stroke();

  // 3. Green Arc (Bottom)
  ctx.beginPath();
  ctx.strokeStyle = PAL.gGreen;
  ctx.arc(0, 0, r * 0.8, Math.PI * 0.15, Math.PI * 0.65);
  ctx.stroke();

  // 4. Blue Arc & Center Bar
  ctx.beginPath();
  ctx.strokeStyle = PAL.gBlue;
  ctx.arc(0, 0, r * 0.8, -Math.PI * 0.25, Math.PI * 0.15);
  ctx.stroke();

  // Blue horizontal crossbar
  ctx.fillStyle = PAL.gBlue;
  ctx.fillRect(0, -r * 0.2, r * 0.85, r * 0.4);

  ctx.restore();
}

// Google Search Bar (Interactive / Animated)
export function drawSearchBar(ctx, x, y, w, h, queryText, cursorBlink = true) {
  ctx.save();
  // Pill bar with subtle glow
  drawRoundRect(ctx, x, y, w, h, h / 2, 'rgba(24, 34, 53, 0.95)', PAL.gBlue, 2.5);

  // Search Magnifying Glass Icon (Google Blue)
  ctx.strokeStyle = PAL.gBlue;
  ctx.lineWidth = 3.5;
  const iconX = x + 40;
  const iconY = y + h / 2;
  ctx.beginPath();
  ctx.arc(iconX, iconY - 3, 13, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(iconX + 9, iconY + 6);
  ctx.lineTo(iconX + 19, iconY + 16);
  ctx.stroke();

  // Query Text
  ctx.font = '600 32px "Inter", sans-serif';
  ctx.fillStyle = PAL.textWhite;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(queryText, x + 76, y + h / 2);

  // Blinking Typing Cursor
  if (cursorBlink) {
    const textW = ctx.measureText(queryText).width;
    ctx.fillStyle = PAL.gBlue;
    ctx.fillRect(x + 80 + textW, y + h / 2 - 20, 3, 40);
  }

  // Mic & Camera Icons on the right
  ctx.fillStyle = PAL.gGreen;
  ctx.beginPath();
  ctx.arc(x + w - 46, y + h / 2, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// Animated Star Rating
export function drawStarRating(ctx, x, y, count = 5) {
  ctx.save();
  ctx.fillStyle = PAL.gYellow;
  ctx.font = '28px "Inter", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  let stars = '';
  for (let i = 0; i < count; i++) stars += '★ ';
  ctx.fillText(stars, x, y);
  ctx.restore();
}

// Progress / Gauge Bar
export function drawProgressBar(ctx, x, y, w, h, progress, { bg = '#182235', fill = PAL.gGreen, label = '' } = {}) {
  drawRoundRect(ctx, x, y, w, h, h / 2, bg, PAL.cardBorder, 1);
  const fillW = Math.max(h, Math.min(w, w * progress));
  drawRoundRect(ctx, x, y, fillW, h, h / 2, fill);

  if (label) {
    ctx.save();
    ctx.font = '700 24px "Inter", sans-serif';
    ctx.fillStyle = PAL.textWhite;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x + w / 2, y + h / 2);
    ctx.restore();
  }
}
