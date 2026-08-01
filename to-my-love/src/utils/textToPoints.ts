/**
 * Renders `text` to an offscreen canvas and samples bright pixels into
 * normalized 3D points (roughly -width/2..width/2 on X, -height/2..height/2 on Y, 0 on Z).
 * Used by StarNameFormation to make a starfield converge into letter shapes.
 */
export function textToPoints(
  text: string,
  options: {
    fontSize?: number;
    fontFamily?: string;
    width?: number;
    height?: number;
    sampleGap?: number; // sample every N pixels — lower = more points/denser text
    scale?: number; // world-space scale of the resulting point cloud
  } = {}
): [number, number, number][] {
  const {
    fontSize = 200,
    fontFamily = '600 200px "Cormorant Garamond", serif',
    width = 1400,
    height = 400,
    sampleGap = 4,
    scale = 0.02,
  } = options;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.font = fontFamily.replace('200px', `${fontSize}px`);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  const imageData = ctx.getImageData(0, 0, width, height).data;
  const points: [number, number, number][] = [];

  for (let y = 0; y < height; y += sampleGap) {
    for (let x = 0; x < width; x += sampleGap) {
      const alpha = imageData[(y * width + x) * 4 + 3];
      if (alpha > 128) {
        const worldX = (x - width / 2) * scale;
        const worldY = -(y - height / 2) * scale;
        const worldZ = (Math.random() - 0.5) * 1.5;
        points.push([worldX, worldY, worldZ]);
      }
    }
  }

  return points;
}
