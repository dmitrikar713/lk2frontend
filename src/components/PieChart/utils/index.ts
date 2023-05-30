export const drawSlice = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  color: string,
  lineWidth: number
) => {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - lineWidth / 2, startAngle, endAngle);
  ctx.stroke();
  startAngle = endAngle;
};

export const draw = (
  ctx: CanvasRenderingContext2D,
  size: number,
  data: Array<number>,
  colors: Array<string>,
  lineWidth: number
) => {
  let total_value = 0;
  let color_index = 0;
  let start_angle = -90 * (Math.PI / 180);

  for (const categ in data) {
    const val = data[categ];
    total_value += val;
  }
  for (const categ in data) {
    const val = data[categ];
    const slice_angle = (2 * Math.PI * val) / total_value;

    drawSlice(
      ctx,
      size / 2,
      size / 2,
      Math.min(size / 2, size / 2),
      start_angle,
      start_angle + slice_angle,
      colors[color_index % colors.length],
      lineWidth
    );

    start_angle += slice_angle;
    color_index++;
  }

  start_angle = -90 * (Math.PI / 180);
  for (const categ in data) {
    const val = data[categ];
    const slice_angle = (2 * Math.PI * val) / total_value;
    const pieRadius = Math.min(size / 2, size / 2) + lineWidth;
    const offset = 0;
    const labelX =
      size / 2 +
      (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle / 2) -
      5;
    const labelY =
      size / 2 +
      (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle / 2) +
      5;

    const labelText = Math.round((100 * val) / total_value);
    if (Number(categ) === 0) {
      ctx.fillStyle = 'white';
    } else {
      ctx.fillStyle = 'black';
    }

    ctx.font = '10px Arial';
    ctx.fillText(labelText.toString(), labelX, labelY);
    start_angle += slice_angle;
  }
};
